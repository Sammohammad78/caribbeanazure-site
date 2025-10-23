import { Resend } from 'resend';

/**
 * Sends an email using Resend. Requires RESEND_API_KEY, RESEND_FROM_EMAIL and
 * RESEND_TO_EMAIL to be defined in the environment. Do not expose secrets on
 * the client. See SECRETS.md for details.
 */
const resend = new Resend(process.env.RESEND_API_KEY ?? '');

export interface ContactMessage {
  name: string;
  email: string;
  company?: string;
  budget?: string;
  message: string;
}

export async function sendContactEmail(data: ContactMessage) {
  const fromEmail = process.env.RESEND_FROM_EMAIL;
  const toEmail = process.env.RESEND_TO_EMAIL;
  if (!fromEmail || !toEmail) {
    console.warn('Missing Resend from/to email environment variables');
    return { success: false };
  }
  try {
    await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      subject: `New contact from ${data.name}`,
      text: `Name: ${data.name}\nEmail: ${data.email}\nCompany: ${data.company ?? ''}\nBudget: ${data.budget ?? ''}\n\n${data.message}`,
    });
    return { success: true };
  } catch (error) {
    console.error('Error sending email', error);
    return { success: false };
  }
}