import { describe, it, expect } from 'vitest';
import { evaluateLeadSpam } from './antiSpam';

describe('evaluateLeadSpam', () => {
  const validLead = {
    name: 'Алексей Смирнов',
    phone: '+7 (906) 707-52-35',
    email: 'client@example.com',
    message: 'Здравствуйте! Нужен премиальный сайт для отеля.',
    ip: '192.0.2.1',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
    clientTime: Date.now() - 5000, // 5 seconds ago
  };

  it('allows valid human submissions', () => {
    const result = evaluateLeadSpam(validLead);
    expect(result.isSpam).toBe(false);
    expect(result.status).toBe(200);
  });

  it('catches and silently drops honeypot traps (company_website filled by bot)', () => {
    const result = evaluateLeadSpam({
      ...validLead,
      ip: '198.51.100.1',
      honeypot: 'http://spambot-promo.xyz',
    });
    expect(result.isSpam).toBe(true);
    expect(result.silentDrop).toBe(true);
    expect(result.status).toBe(200);
    expect(result.reason).toContain('Honeypot');
  });

  it('catches and silently drops bot submissions submitted too quickly (< 2 seconds)', () => {
    const result = evaluateLeadSpam({
      ...validLead,
      ip: '198.51.100.2',
      clientTime: Date.now() - 400, // Only 400ms - bot script
    });
    expect(result.isSpam).toBe(true);
    expect(result.silentDrop).toBe(true);
    expect(result.status).toBe(200);
    expect(result.reason).toContain('Superhuman submission speed');
  });

  it('detects URL in name field and silently neutralizes it', () => {
    const result = evaluateLeadSpam({
      ...validLead,
      ip: '198.51.100.3',
      name: 'Best SEO Services https://rank-booster.top',
    });
    expect(result.isSpam).toBe(true);
    expect(result.silentDrop).toBe(true);
  });

  it('detects online casino / gambling keywords', () => {
    const result = evaluateLeadSpam({
      ...validLead,
      ip: '198.51.100.4',
      message: 'Привет! Лучшие онлайн казино и слоты вулкан с бонусом на первый депозит',
    });
    expect(result.isSpam).toBe(true);
    expect(result.silentDrop).toBe(true);
    expect(result.reason).toContain('casino');
  });

  it('detects crypto passive income spam', () => {
    const result = evaluateLeadSpam({
      ...validLead,
      ip: '198.51.100.5',
      message: 'Earn $10,000 passive income daily with our new crypto btc trading bot',
    });
    expect(result.isSpam).toBe(true);
    expect(result.silentDrop).toBe(true);
  });

  it('detects repetitive fake phone numbers', () => {
    const result = evaluateLeadSpam({
      ...validLead,
      ip: '198.51.100.6',
      phone: '+7 (111) 111-11-11',
    });
    expect(result.isSpam).toBe(true);
    expect(result.silentDrop).toBe(false);
    expect(result.status).toBe(400);
  });

  it('detects excessive link blasting in message body', () => {
    const result = evaluateLeadSpam({
      ...validLead,
      ip: '198.51.100.7',
      message: 'Check out https://spam1.xyz and https://spam2.top for free backlinks',
    });
    expect(result.isSpam).toBe(true);
    expect(result.silentDrop).toBe(true);
  });
});
