import nodemailer from 'nodemailer';

/**
 * Vercel serverless function: delivers the contact form to the inbox.
 *
 * Credentials come from environment variables — never commit them:
 *   SMTP_HOST  smtpout.secureserver.net
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
  const isDev = process.env.NODE_ENV === 'development' || process.env.DEV_MODE === 'true';
  
  if (!isDev && (!SMTP_USER || !SMTP_PASS)) {
    return res.status(500).json({ error: 'Mail transport is not configured' });
  }

  // Development mode: Log instead of sending (when NODE_ENV=development or DEV_MODE=true)
  if (isDev) {
    console.log('\n✓ [DEVELOPMENT MODE] Contact form submission logged:');
    console.log('  From:', clean(name), `<${clean(email)}>`);
    console.log('  Phone:', clean(phone));
    console.log('  Subject:', clean(subject));
    console.log('  Message:', clean(message));
    console.log('  (In production, this will be emailed to', MAIL_TO || SMTP_USER, ')\n');
    return res.status(200).json({ ok: true });
  }

  const host = SMTP_HOST || 'smtpout.secureserver.net';
  const configured = Number(SMTP_PORT || 465);

  // secureserver accepts implicit TLS on 465 and STARTTLS on 587. Some mailboxes
  // are only enabled for one of them, so try the configured port first and fall
  // back to the other rather than failing outright.
  const ports = configured === 587 ? [587, 465] : [465, 587];

  const rows = [
    ['Name', clean(name)],
    ['Email', clean(email)],
    ['Phone', clean(phone)],
    ['Subject', clean(subject)],
  ];

  const textBody =
    rows.map(([k, v]) => k + ': ' + v).join('\n') + '\n\nMessage:\n' + clean(message);

  const htmlBody =
    '<table cellpadding="6">' +
    rows.map(([k, v]) => '<tr><td><strong>' + k + '</strong></td><td>' + v + '</td></tr>').join('') +
    '</table><p><strong>Message</strong></p><p>' +
    clean(message).replace(/\n/g, '<br>') +
    '</p>';

  const mail = {
    from: '"AEES website" <' + SMTP_USER + '>',
    to: MAIL_TO || SMTP_USER,
    replyTo: '"' + clean(name) + '" <' + clean(email) + '>',
    subject: 'Website enquiry — ' + clean(subject),
    text: textBody,
    html: htmlBody,
  };

  let lastError = null;

  for (const port of ports) {
    try {
      const transporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        requireTLS: port !== 465,
        auth: { user: SMTP_USER, pass: SMTP_PASS },
        connectionTimeout: 15000,
        greetingTimeout: 10000,
        socketTimeout: 20000,
      });

      await transporter.sendMail(mail);
      return res.status(200).json({ ok: true });
    } catch (error) {
      lastError = error;
      console.error('[contact] SMTP failure', {
        port,
        code: error?.code,
        command: error?.command,
        response: error?.response,
        message: error?.message,
      });
      // A rejected login fails identically on every port — retrying only burns
      // the function's time budget.
      if (error?.code === 'EAUTH') break;
    }
  }

  return res.status(502).json({ error: 'Could not send the message' });
}
