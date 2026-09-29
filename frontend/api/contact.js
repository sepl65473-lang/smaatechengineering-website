import nodemailer from 'nodemailer';

// Vercel serverless function: POST /api/contact
// Required env vars (Vercel project settings):
//   GMAIL_USER          - Gmail address used to send (e.g. sepl65473@gmail.com)
//   GMAIL_APP_PASSWORD  - 16-char Gmail App Password (not the normal password)
//   CONTACT_TO          - optional, inbox that receives inquiries (defaults to info@smaatechengineering.com)

const escapeHtml = (value = '') =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
  const name = String(body.name || '').trim().slice(0, 200);
  const email = String(body.email || '').trim().slice(0, 200);
  const organization = String(body.organization || '').trim().slice(0, 200);
  const message = String(body.message || '').trim().slice(0, 5000);

  if (!name || !EMAIL_RE.test(email) || !message) {
    return res.status(400).json({ message: 'Name, valid email and message are required' });
  }

  // Trim (and strip spaces from the app password) to tolerate copy-paste whitespace in env values
  const GMAIL_USER = (process.env.GMAIL_USER || '').trim();
  const GMAIL_APP_PASSWORD = (process.env.GMAIL_APP_PASSWORD || '').replace(/\s+/g, '');
  const CONTACT_TO = (process.env.CONTACT_TO || '').trim();
  if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
    console.error('Contact form: GMAIL_USER / GMAIL_APP_PASSWORD not configured');
    return res.status(500).json({ message: 'Mail service not configured' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD },
  });

  try {
    await transporter.sendMail({
      from: `"Smaatech Website" <${GMAIL_USER}>`,
      to: CONTACT_TO || 'info@smaatechengineering.com',
      replyTo: email,
      subject: `New Project Inquiry: ${name}`,
      html: `
        <h3>New Inquiry from Smaatech Engineering</h3>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Organization:</strong> ${escapeHtml(organization) || 'N/A'}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
      `,
    });
    return res.status(200).json({ message: 'Inquiry sent successfully!' });
  } catch (error) {
    console.error('Contact form: failed to send email', error);
    return res.status(500).json({ message: 'Failed to send inquiry' });
  }
}
