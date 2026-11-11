import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';
import { evaluateLeadSpam } from '../../utils/antiSpam';

export const prerender = false;

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function getEnvVar(key: string, defaultValue: string = ''): string {
  const metaVal = (import.meta.env && (import.meta.env as Record<string, string>)[key]) || '';
  const procVal = (typeof process !== 'undefined' && process.env && process.env[key]) || '';
  return (metaVal || procVal || defaultValue).trim();
}

export const POST: APIRoute = async (context) => {
  const { request } = context;
  try {
    const contentType = request.headers.get('content-type') || '';
    let name = '';
    let phone = '';
    let email = '';
    let message = '';
    let source = 'Форма на сайте';
    let honeypot = '';
    let gotcha = '';
    let clientTime: number | undefined = undefined;

    if (contentType.includes('application/json')) {
      const data = await request.json();
      name = (data.name || '').trim();
      phone = (data.phone || '').trim();
      email = (data.email || '').trim();
      message = (data.message || '').trim();
      source = (data.source || 'Форма на сайте').trim();
      honeypot = (data.company_website || data.website || '').trim();
      gotcha = (data._gotcha || data.gotcha || '').trim();
      if (data._time || data.clientTime) {
        clientTime = Number(data._time || data.clientTime);
      }
    } else {
      const formData = await request.formData();
      name = (formData.get('name')?.toString() || '').trim();
      phone = (formData.get('phone')?.toString() || '').trim();
      email = (formData.get('email')?.toString() || '').trim();
      message = (formData.get('message')?.toString() || '').trim();
      source = (formData.get('source')?.toString() || 'Форма на сайте').trim();
      honeypot = (formData.get('company_website')?.toString() || formData.get('website')?.toString() || '').trim();
      gotcha = (formData.get('_gotcha')?.toString() || formData.get('gotcha')?.toString() || '').trim();
      const timeVal = formData.get('_time')?.toString() || formData.get('clientTime')?.toString();
      if (timeVal) {
        clientTime = Number(timeVal);
      }
    }

    // Determine client IP address
    const clientIp = 
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      request.headers.get('cf-connecting-ip') ||
      context.clientAddress ||
      '127.0.0.1';
    const userAgent = request.headers.get('user-agent') || '';

    // =========================================================================
    // ANTI-SPAM DEFENSE EVALUATION
    // =========================================================================
    const spamCheck = evaluateLeadSpam({
      name,
      phone,
      email,
      message,
      honeypot,
      gotcha,
      clientTime,
      ip: clientIp,
      userAgent,
    });

    if (spamCheck.isSpam) {
      if (spamCheck.silentDrop) {
        console.warn(`[NiceDev Anti-Spam] Bot lead intercepted & neutralized silently (reason: ${spamCheck.reason}) from ${clientIp}`);
        return new Response(JSON.stringify({ 
          success: true, 
          telegram: false,
          email: false,
          message: 'Заявка успешно принята! Мы скоро с вами свяжемся.' 
        }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      console.warn(`[NiceDev Anti-Spam] Blocked submission (status: ${spamCheck.status}, reason: ${spamCheck.reason}) from ${clientIp}`);
      return new Response(JSON.stringify({ 
        error: spamCheck.publicError || 'Ошибка проверки формы' 
      }), {
        status: spamCheck.status,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (!name || name.length < 2) {
      return new Response(JSON.stringify({ error: 'Пожалуйста, укажите ваше имя (не менее 2 символов)' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const digitsCount = phone.replace(/\D/g, '').length;
    if (digitsCount < 7) {
      return new Response(JSON.stringify({ error: 'Пожалуйста, укажите корректный номер телефона' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const timestamp = new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' });

    // =========================================================================
    // 1. TELEGRAM DISPATCH
    // =========================================================================
    const telegramBotToken = getEnvVar('TELEGRAM_BOT_TOKEN', '7376635579:AAGwnepQ7hmh_yaJ8R--YHBNO26lPIYouPY');
    let targetChatId = getEnvVar('TELEGRAM_CHAT_ID');

    let telegramDelivered = false;
    let telegramError: string | null = null;

    if (telegramBotToken) {
      // Note: 7376635579 is the bot's own user ID. A Telegram bot cannot message itself.
      // If TELEGRAM_CHAT_ID is missing or set to the bot's ID, attempt to auto-detect
      // the latest chat from getUpdates (e.g. if an admin pressed /start in @NiceDev_bot).
      if (!targetChatId || targetChatId === '7376635579') {
        try {
          const updatesRes = await fetch(`https://api.telegram.org/bot${telegramBotToken}/getUpdates?limit=10`);
          if (updatesRes.ok) {
            const updatesData = await updatesRes.json();
            const updates: Array<{
              message?: { chat?: { id?: number } };
              channel_post?: { chat?: { id?: number } };
              my_chat_member?: { chat?: { id?: number } };
            }> = updatesData?.result || [];

            if (updates.length > 0) {
              const lastUpdate = [...updates].reverse().find(
                (u) => u.message?.chat?.id || u.channel_post?.chat?.id || u.my_chat_member?.chat?.id
              );
              const foundId = lastUpdate?.message?.chat?.id || lastUpdate?.channel_post?.chat?.id || lastUpdate?.my_chat_member?.chat?.id;
              if (foundId && String(foundId) !== '7376635579') {
                targetChatId = String(foundId);
                console.log(`[NiceDev Telegram] Auto-detected recipient chat_id: ${targetChatId}`);
              }
            }
          }
        } catch (e) {
          console.warn('[NiceDev Telegram] Failed to auto-detect chat_id via getUpdates:', e);
        }
      }

      if (targetChatId && targetChatId !== '7376635579') {
        try {
          const cleanPhone = phone.replace(/\s+/g, '');
          const tgMessage = [
            '🚀 <b>Новая заявка с сайта NiceDev!</b>\n',
            `👤 <b>Имя клиента:</b> ${escapeHtml(name)}`,
            `📱 <b>Телефон:</b> <a href="tel:${escapeHtml(cleanPhone)}">${escapeHtml(phone)}</a>`,
            `✉️ <b>Email:</b> ${email ? `<a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>` : '<i>Не указан</i>'}`,
            `📍 <b>Источник:</b> ${escapeHtml(source)}\n`,
            `💬 <b>Задача / Пожелания:</b>`,
            `${escapeHtml(message || '—')}\n`,
            `⏱ <i>${timestamp} (МСК)</i>`
          ].join('\n');

          const tgRes = await fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: targetChatId,
              text: tgMessage,
              parse_mode: 'HTML',
              disable_web_page_preview: true,
            }),
          });

          const tgData = await tgRes.json().catch(() => null);
          if (tgRes.ok && tgData?.ok) {
            telegramDelivered = true;
            console.log(`[NiceDev Telegram] Lead successfully dispatched to chat_id ${targetChatId}`);
          } else {
            telegramError = tgData?.description || `HTTP ${tgRes.status}`;
            console.warn(`[NiceDev Telegram Warning] Delivery error:`, telegramError);
          }
        } catch (err: unknown) {
          telegramError = err instanceof Error ? err.message : String(err);
          console.warn(`[NiceDev Telegram Error]`, telegramError);
        }
      } else {
        console.info(
          '[NiceDev Telegram Info] Telegram chat_id is not configured or equals the bot ID (7376635579). ' +
          'Send /start to @NiceDev_bot and specify TELEGRAM_CHAT_ID in .env to receive alerts.'
        );
      }
    }

    // =========================================================================
    // 2. EMAIL NOTIFICATIONS (Timeweb SMTP)
    // =========================================================================
    const smtpHost = getEnvVar('SMTP_HOST', 'smtp.timeweb.ru');
    const smtpPort = Number(getEnvVar('SMTP_PORT', '465'));
    const smtpUser = getEnvVar('SMTP_USER', 'info@nice-dev.ru');
    const smtpPass = getEnvVar('SMTP_PASS');
    const smtpSecure = String(getEnvVar('SMTP_SECURE', 'true')) !== 'false';
    const smtpFrom = getEnvVar('SMTP_FROM', `"NiceDev Web Studio" <${smtpUser}>`);

    // Studio admin recipients: info@nice-dev.ru
    const rawTo = getEnvVar('SMTP_TO', 'info@nice-dev.ru');
    const parsedToList = rawTo.split(',').map((s) => s.trim()).filter(Boolean);
    if (!parsedToList.includes('info@nice-dev.ru')) parsedToList.push('info@nice-dev.ru');
    const adminRecipients = Array.from(new Set(parsedToList));

    let emailDelivered = false;
    let clientEmailDelivered = false;

    if (smtpPass) {
      try {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpSecure,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
          connectionTimeout: 10000,
          greetingTimeout: 10000,
          socketTimeout: 15000,
          tls: {
            rejectUnauthorized: false,
          },
        });

        // 2.1 Admin Notification Email (to info@nice-dev.ru)
        const adminHtmlBody = `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0A0D14; color: #FFFFFF; padding: 28px; border-radius: 12px; max-width: 620px; margin: 0 auto; border: 1px solid rgba(255,200,87,0.3);">
            <div style="border-bottom: 2px solid #FFC857; padding-bottom: 16px; margin-bottom: 24px;">
              <h2 style="color: #FFC857; margin: 0 0 6px 0; font-size: 22px; font-weight: 700;">🚀 Новая заявка с сайта NiceDev</h2>
              <p style="color: #8E9AA8; margin: 0; font-size: 13px;">Источник: ${escapeHtml(source)} • ${timestamp} (МСК)</p>
            </div>

            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); color: #8E9AA8; width: 140px; font-weight: 600;">Имя клиента:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); color: #FFFFFF; font-size: 16px; font-weight: 700;">${escapeHtml(name)}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); color: #8E9AA8; font-weight: 600;">Телефон:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); color: #FFC857; font-size: 16px; font-weight: 700;">
                  <a href="tel:${phone.replace(/\s+/g, '')}" style="color: #FFC857; text-decoration: none;">${escapeHtml(phone)}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); color: #8E9AA8; font-weight: 600;">Email:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); color: #00F5D4;">
                  ${email ? `<a href="mailto:${escapeHtml(email)}" style="color: #00F5D4; text-decoration: none;">${escapeHtml(email)}</a>` : '<span style="color: #8E9AA8; font-style: italic;">Не указан</span>'}
                </td>
              </tr>
              <tr>
                <td style="padding: 12px 0; color: #8E9AA8; vertical-align: top; font-weight: 600;">Задача / Детали:</td>
                <td style="padding: 12px 0; color: #FFFFFF; line-height: 1.5; white-space: pre-wrap;">${escapeHtml(message || '—')}</td>
              </tr>
            </table>

            <div style="background: rgba(255,200,87,0.08); padding: 14px 18px; border-radius: 8px; font-size: 12px; color: #8E9AA8; border-left: 3px solid #FFC857;">
              Письмо направлено администраторам NiceDev (${adminRecipients.join(', ')}).
            </div>
          </div>
        `;

        await transporter.sendMail({
          from: smtpFrom,
          to: adminRecipients,
          replyTo: email || smtpUser,
          subject: `🔔 Новая заявка: ${name} (${phone})`,
          text: `Имя: ${name}\nТелефон: ${phone}\nEmail: ${email || '—'}\nЗадача: ${message || '—'}\nВремя: ${timestamp}`,
          html: adminHtmlBody,
        });

        emailDelivered = true;
        console.log(`[NiceDev SMTP] Admin notification sent to: ${adminRecipients.join(', ')}`);

        // 2.2 Client Confirmation Email (if valid client email was entered)
        if (email && email.includes('@')) {
          try {
            const clientHtmlBody = `
              <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0A0D14; color: #FFFFFF; padding: 28px; border-radius: 12px; max-width: 620px; margin: 0 auto; border: 1px solid rgba(255,200,87,0.3);">
                <div style="border-bottom: 2px solid #FFC857; padding-bottom: 16px; margin-bottom: 20px;">
                  <h2 style="color: #FFC857; margin: 0 0 6px 0; font-size: 22px; font-weight: 700;">Веб-студия NiceDev</h2>
                  <p style="color: #8E9AA8; margin: 0; font-size: 13px;">Создание премиальных сайтов и цифровых платформ</p>
                </div>

                <p style="font-size: 16px; line-height: 1.6; color: #FFFFFF; margin-bottom: 16px;">
                  Здравствуйте, <strong>${escapeHtml(name)}</strong>!
                </p>
                <p style="font-size: 14px; line-height: 1.6; color: #D1D5DB; margin-bottom: 20px;">
                  Благодарим за обращение в веб-студию NiceDev. Мы успешно получили вашу заявку! Наш специалист уже изучает информацию и скоро свяжется с вами для обсуждения деталей и предварительного расчета.
                </p>

                <div style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 16px; margin-bottom: 24px;">
                  <div style="font-size: 13px; color: #8E9AA8; margin-bottom: 8px; font-weight: 600;">Параметры вашего запроса:</div>
                  <div style="font-size: 14px; color: #FFFFFF; margin-bottom: 4px;">• Телефон: <strong>${escapeHtml(phone)}</strong></div>
                  ${message ? `<div style="font-size: 14px; color: #FFFFFF; margin-bottom: 4px;">• Задача: ${escapeHtml(message)}</div>` : ''}
                </div>

                <div style="border-top: 1px solid rgba(255,255,255,0.08); padding-top: 16px; font-size: 13px; color: #8E9AA8; line-height: 1.5;">
                  Если у вас срочный вопрос, вы можете связаться с нами напрямую:<br />
                  • Email: <a href="mailto:${smtpUser}" style="color: #00F5D4; text-decoration: none;">${smtpUser}</a><br />
                  • Сайт: <a href="https://nice-dev.ru" style="color: #FFC857; text-decoration: none;">nice-dev.ru</a>
                </div>
              </div>
            `;

            await transporter.sendMail({
              from: smtpFrom,
              to: email,
              replyTo: smtpUser,
              subject: `Ваша заявка принята | Веб-студия NiceDev`,
              text: `Здравствуйте, ${name}!\n\nБлагодарим за обращение в веб-студию NiceDev. Мы получили вашу заявку и скоро свяжемся с вами.\n\nКонтакты: ${smtpUser}, https://nice-dev.ru`,
              html: clientHtmlBody,
            });

            clientEmailDelivered = true;
            console.log(`[NiceDev SMTP] Confirmation email delivered to client: ${email}`);
          } catch (clientErr) {
            console.warn(`[NiceDev SMTP Warning] Failed to deliver client copy:`, clientErr);
          }
        }
      } catch (smtpErr) {
        console.error('[NiceDev SMTP Error]', smtpErr);
      }
    } else {
      console.info(
        '[NiceDev SMTP Info] SMTP_PASS is empty in .env. Email dispatch will be activated once the password is provided.'
      );
    }

    console.log(
      `[NiceDev Lead Summary] Telegram: ${telegramDelivered ? 'OK' : (telegramError || 'Pending/Skipped')} | ` +
      `Admin Email: ${emailDelivered ? 'OK' : 'Waiting for SMTP_PASS'} | ` +
      `Client Copy: ${clientEmailDelivered ? 'OK' : '—'} | ` +
      `Client: ${name} (${phone})`
    );

    return new Response(JSON.stringify({ 
      success: true, 
      telegram: telegramDelivered,
      email: emailDelivered,
      clientConfirmation: clientEmailDelivered,
      message: 'Заявка успешно принята! Мы скоро с вами свяжемся.' 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Lead dispatch error:', error);
    return new Response(JSON.stringify({ 
      error: 'Ошибка при обработке заявки. Пожалуйста, свяжитесь с нами напрямую: info@nice-dev.ru',
      details: errMessage
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
