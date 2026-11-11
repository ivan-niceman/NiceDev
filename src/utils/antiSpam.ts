/**
 * NiceDev Anti-Spam & Lead Protection Engine
 * 
 * Provides comprehensive multi-layered defense against spam bots, scrapers, and automated form fillers:
 * 1. Multi-field invisible honeypots (bot traps with silent fake success)
 * 2. Time-to-fill validation (rejects submissions faster than human typing thresholds)
 * 3. In-memory sliding-window IP rate limiting
 * 4. Content heuristics (link density, spam keywords, casino/scam signatures)
 * 5. Name & phone sanity verification
 * 6. Duplicate submission suppression (prevents burst replay attacks)
 */

interface RateLimitRecord {
  timestamps: number[];
  lastBlockedUntil?: number;
}

// In-memory IP tracking cache
const ipStore = new Map<string, RateLimitRecord>();

// Duplicate submission tracker: hash -> timestamp
const duplicateStore = new Map<string, number>();

// Configuration constants
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;            // Max 5 submissions per IP in 10 minutes
const MIN_REQUEST_INTERVAL_MS = 2500;         // Minimum 2.5s between submissions from same IP
const MIN_SUBMISSION_TIME_MS = 2000;          // Minimum 2 seconds to realistically fill the form
const MAX_SUBMISSION_TIME_MS = 24 * 60 * 60 * 1000; // Max 24 hours (prevents replay of ancient tokens)
const DUPLICATE_WINDOW_MS = 3 * 60 * 1000;    // 3 minutes duplicate suppression

// Periodically prune stale entries to keep memory low
setInterval(() => {
  const now = Date.now();

  for (const [ip, record] of ipStore.entries()) {
    record.timestamps = record.timestamps.filter((ts) => now - ts < RATE_LIMIT_WINDOW_MS);
    if (record.timestamps.length === 0 && (!record.lastBlockedUntil || record.lastBlockedUntil < now)) {
      ipStore.delete(ip);
    }
  }

  for (const [hash, ts] of duplicateStore.entries()) {
    if (now - ts > DUPLICATE_WINDOW_MS) {
      duplicateStore.delete(hash);
    }
  }
}, 5 * 60 * 1000);

export interface SpamCheckParams {
  name: string;
  phone: string;
  email?: string;
  message?: string;
  honeypot?: string;       // company_website / _gotcha / website
  gotcha?: string;
  clientTime?: number;     // Timestamp when form was loaded or first interacted with
  ip: string;
  userAgent?: string;
}

export interface SpamCheckResult {
  isSpam: boolean;
  silentDrop: boolean;     // If true, respond with HTTP 200 fake success to mislead bot
  status: number;
  reason?: string;
  publicError?: string;
}

// Known spam phrases, casino, adult, and mass-mailing patterns
const SPAM_KEYWORD_PATTERNS: RegExp[] = [
  /(?:casino|казино|вулкан|1xbet|slot[s]?|free spins|онлайн-казино|игровые автоматы)/i,
  /(?:crypto|bitcoin|btc|usdt|binance|криптовалют|заработок в интернете|пассивный доход|инвестируй)/i,
  /(?:viagra|cialis|виагра|дженерик|сиалис|порно|секс-шоп|эротик)/i,
  /(?:xrumer|хрумер|прогон по базам|базы емейл|рассылка по формам|рассылка в директ)/i,
  /(?:микрозайм|быстрые деньги|кредит без отказа|займ онлайн|займы под 0%)/i,
  /(?:купить диплом|пробить номер|взлом аккаунтов)/i,
];

// Suspicious URL patterns inside contact form messages
const SUSPICIOUS_URL_REGEX = /(https?:\/\/[^\s]+|www\.[^\s]+|\.xyz\b|\.top\b|\.pw\b|\.buzz\b|\.click\b)/gi;

/**
 * Validates a lead submission against multiple anti-spam defense layers.
 */
export function evaluateLeadSpam(params: SpamCheckParams): SpamCheckResult {
  const now = Date.now();
  const { name, phone, email = '', message = '', honeypot, gotcha, clientTime, ip, userAgent = '' } = params;

  // ---------------------------------------------------------------------------
  // Layer 1: Honeypot Traps
  // ---------------------------------------------------------------------------
  // If automated bots filled hidden honeypot fields, silently drop without alerts
  if ((honeypot && honeypot.trim().length > 0) || (gotcha && gotcha.trim().length > 0)) {
    console.warn(`[NiceDev Anti-Spam] Honeypot triggered from IP ${ip}. Silently dropping spam.`);
    return {
      isSpam: true,
      silentDrop: true,
      status: 200,
      reason: 'Honeypot field was filled by automated scraper',
    };
  }

  // ---------------------------------------------------------------------------
  // Layer 2: Suspicious Automated Scraper User-Agents
  // ---------------------------------------------------------------------------
  const lowerUa = userAgent.toLowerCase();
  const knownScraperAgents = [
    'curl/', 'python-requests', 'aiohttp', 'scrapy', 'urllib', 'wget', 
    'httpclient', 'go-http-client', 'java/', 'postmanruntime'
  ];
  if (knownScraperAgents.some((agent) => lowerUa.startsWith(agent))) {
    // Only flag if it doesn't look like legitimate local development test
    if (ip !== '127.0.0.1' && ip !== '::1' && !ip.startsWith('192.168.') && !ip.startsWith('10.')) {
      console.warn(`[NiceDev Anti-Spam] Automated user-agent detected: ${userAgent} from ${ip}`);
      return {
        isSpam: true,
        silentDrop: true,
        status: 200,
        reason: `Scraper User-Agent: ${userAgent}`,
      };
    }
  }

  // ---------------------------------------------------------------------------
  // Layer 3: Fill Timing & Token Verification
  // ---------------------------------------------------------------------------
  if (clientTime && typeof clientTime === 'number') {
    const elapsed = now - clientTime;

    // Filled in less than 2 seconds (faster than realistic human typing)
    if (elapsed < MIN_SUBMISSION_TIME_MS) {
      console.warn(`[NiceDev Anti-Spam] Superhuman submission time (${elapsed}ms) from ${ip}.`);
      return {
        isSpam: true,
        silentDrop: true,
        status: 200,
        reason: `Superhuman submission speed (${elapsed}ms < ${MIN_SUBMISSION_TIME_MS}ms)`,
      };
    }

    // Submitted with token far in the future or older than 24 hours
    if (elapsed < -60000 || elapsed > MAX_SUBMISSION_TIME_MS) {
      console.warn(`[NiceDev Anti-Spam] Stale or invalid client timestamp (${clientTime}) from ${ip}.`);
      return {
        isSpam: true,
        silentDrop: true,
        status: 200,
        reason: 'Expired or malformed form submission token',
      };
    }
  }

  // ---------------------------------------------------------------------------
  // Layer 4: IP Rate Limiting (Sliding Window)
  // ---------------------------------------------------------------------------
  const cleanIp = ip || 'unknown';
  let ipRecord = ipStore.get(cleanIp);
  if (!ipRecord) {
    ipRecord = { timestamps: [] };
    ipStore.set(cleanIp, ipRecord);
  }

  // Check if currently under temporary rate-limit cooldown
  if (ipRecord.lastBlockedUntil && ipRecord.lastBlockedUntil > now) {
    const remainingSeconds = Math.ceil((ipRecord.lastBlockedUntil - now) / 1000);
    return {
      isSpam: true,
      silentDrop: false,
      status: 429,
      reason: `IP rate-limited for ${remainingSeconds}s`,
      publicError: 'Слишком много обращений. Пожалуйста, подождите 2-3 минуты или напишите нам: info@nice-dev.ru',
    };
  }

  // Filter timestamps to current window
  ipRecord.timestamps = ipRecord.timestamps.filter((ts) => now - ts < RATE_LIMIT_WINDOW_MS);

  // Check burst speed: consecutive requests within < 2.5s
  if (ipRecord.timestamps.length > 0) {
    const lastRequest = ipRecord.timestamps[ipRecord.timestamps.length - 1];
    if (now - lastRequest < MIN_REQUEST_INTERVAL_MS) {
      console.warn(`[NiceDev Anti-Spam] Rapid burst submission from ${cleanIp}.`);
      return {
        isSpam: true,
        silentDrop: false,
        status: 429,
        reason: 'Burst submission limit reached',
        publicError: 'Пожалуйста, не отправляйте форму слишком часто. Подождите несколько секунд.',
      };
    }
  }

  // Check max limit within window
  if (ipRecord.timestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    ipRecord.lastBlockedUntil = now + 5 * 60 * 1000; // Block for 5 minutes
    console.warn(`[NiceDev Anti-Spam] Rate limit exceeded for IP ${cleanIp} (${ipRecord.timestamps.length} requests).`);
    return {
      isSpam: true,
      silentDrop: false,
      status: 429,
      reason: `Exceeded max ${MAX_REQUESTS_PER_WINDOW} requests per 10min`,
      publicError: 'Превышен лимит заявок. Пожалуйста, свяжитесь с нами напрямую: info@nice-dev.ru',
    };
  }

  // ---------------------------------------------------------------------------
  // Layer 5: Duplicate Submission Protection
  // ---------------------------------------------------------------------------
  const submissionKey = `${phone.replace(/\D/g, '')}:${name.toLowerCase()}:${message.slice(0, 50).toLowerCase()}`;
  const lastSubmittedTime = duplicateStore.get(submissionKey);
  if (lastSubmittedTime && now - lastSubmittedTime < DUPLICATE_WINDOW_MS) {
    console.warn(`[NiceDev Anti-Spam] Duplicate submission suppressed for ${phone} from ${cleanIp}.`);
    return {
      isSpam: true,
      silentDrop: true,
      status: 200,
      reason: 'Duplicate identical submission received in < 3 minutes',
    };
  }

  // ---------------------------------------------------------------------------
  // Layer 6: Content & Field Heuristics
  // ---------------------------------------------------------------------------
  // A. Name validation: Spambots often stuff URLs or spam phrases into the name field
  if (name.includes('http://') || name.includes('https://') || name.includes('www.') || name.includes('.ru') || name.includes('.com')) {
    console.warn(`[NiceDev Anti-Spam] URL detected inside client name field: "${name}"`);
    return {
      isSpam: true,
      silentDrop: true,
      status: 200,
      reason: 'URL detected inside Name field',
    };
  }

  if (name.length > 70) {
    return {
      isSpam: true,
      silentDrop: false,
      status: 400,
      reason: 'Name is unusually long',
      publicError: 'Пожалуйста, укажите реальное имя (не длиннее 60 символов).',
    };
  }

  // B. Phone Sanity: Reject dummy repetitive digits
  const rawDigits = phone.replace(/\D/g, '');
  const bodyDigits = (rawDigits.startsWith('7') || rawDigits.startsWith('8')) && rawDigits.length >= 10
    ? rawDigits.slice(1)
    : rawDigits;

  if (/^(\d)\1{6,}$/.test(rawDigits) || /^(\d)\1{6,}$/.test(bodyDigits)) { // e.g. 1111111111 or +7 111 111 11 11
    console.warn(`[NiceDev Anti-Spam] Dummy repetitive phone detected: ${phone}`);
    return {
      isSpam: true,
      silentDrop: false,
      status: 400,
      reason: 'Repetitive dummy phone number',
      publicError: 'Пожалуйста, укажите корректный номер телефона.',
    };
  }

  if (rawDigits === '1234567890' || rawDigits === '9876543210' || rawDigits === '79999999999') {
    return {
      isSpam: true,
      silentDrop: false,
      status: 400,
      reason: 'Known dummy phone sequence',
      publicError: 'Пожалуйста, укажите ваш настоящий номер телефона.',
    };
  }

  // C. Message Link Density: Check if message has multiple external links
  const linksFound = message.match(SUSPICIOUS_URL_REGEX) || [];
  if (linksFound.length >= 2) {
    console.warn(`[NiceDev Anti-Spam] Excessive link spam detected (${linksFound.length} links) in message.`);
    return {
      isSpam: true,
      silentDrop: true,
      status: 200,
      reason: `Excessive URLs in message (${linksFound.length} links)`,
    };
  }

  // D. Spam Keywords & Stop-Words
  const combinedText = `${name} ${message} ${email}`;
  for (const pattern of SPAM_KEYWORD_PATTERNS) {
    if (pattern.test(combinedText)) {
      console.warn(`[NiceDev Anti-Spam] Spam keyword matched (${pattern}) from IP ${cleanIp}.`);
      return {
        isSpam: true,
        silentDrop: true,
        status: 200,
        reason: `Matched spam keyword pattern: ${pattern.source}`,
      };
    }
  }

  // ---------------------------------------------------------------------------
  // Validation Passed: Record submission to rate limit and duplicate store
  // ---------------------------------------------------------------------------
  ipRecord.timestamps.push(now);
  duplicateStore.set(submissionKey, now);

  return {
    isSpam: false,
    silentDrop: false,
    status: 200,
  };
}
