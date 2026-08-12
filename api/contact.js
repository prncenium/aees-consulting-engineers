import nodemailer from 'nodemailer';

/**
 * Vercel serverless function: delivers the contact form to the inbox.
 *
 * Credentials come from environment variables — never commit them:
 *   SMTP_HOST  smtp.titan.email
 *   SMTP_PORT  465
 *   SMTP_USER  info@aeesconsulting.in
 *   SMTP_PASS  <mailbox password>
 *   MAIL_TO    info@aeesconsulting.in
 */
const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(v).trim());
const clean = (v) => String(v ?? '').trim().slice(0, 5000);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, subject, message, company } = req.body ?? {};

  // Honeypot: bots fill hidden fields, humans do not.
  if (clean(company)) return res.status(200).json({ ok: true });

  if (!clean(name) || !isEmail(email) || !clean(subject) || clean(message).length < 20) {
    return res.status(400).json({ error: 'Invalid submission' });
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_TO } = process.env;
  if (!SMTP_USER || !SMTP_PASS) {
    return res.status(500).json({ error: 'Mail transport is not configured' });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST || 'smtp.titan.email',
      port: Number(SMTP_PORT || 465),
      secure: Number(SMTP_PORT || 465) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
      connectionTimeout: 15000,
      greetingTimeout: 10000,
      socketTimeout: 20000,
    });

    await transporter.verify();

    const rows = [
      ['Name', clean(name)],
      ['Email', clean(email)],
      ['Phone', clean(phone)],
      ['Subject', clean(subject)],
    ];

    await transporter.sendMail({
      from: `"AEES website" <${SMTP_USER}>`,
      to: MAIL_TO || SMTP_USER,
      replyTo: `"${clean(name)}" <${clean(email)}>`,
      subject: `Website enquiry — ${clean(subject)}`,
      text: `${rows.map(([k, v]) => `${k}: ${v}`).join('\n')}\n\nMessage:\n${clean(message)}`,
      html: `<table cellpadding="6">${rows
        .map(([k, v]) => `<tr><td><strong>${k}</strong></td><td>${v}</td></tr>`)
        .join('')}</table><p><strong>Message</strong></p><p>${clean(message).replace(
        /\n/g,
        '<br>'
      )}</p>`,
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    // Surfaced so SMTP misconfiguration is diagnosable from the response and
    // the Vercel function logs. Contains no credentials.
    console.error('[contact] SMTP failure', {
      code: error?.code,
      command: error?.command,
      response: error?.response,
      message: error?.message,
    });
    return res.status(502).json({
      error: 'Could not send the message',
      code: error?.code ?? null,
      detail: error?.response ?? error?.message ?? null,
    });
  }
}
