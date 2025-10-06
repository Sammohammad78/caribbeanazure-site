'use server';

import { z } from 'zod';
import { sendContactEmail } from '@/lib/email';
import { redirect } from 'next/navigation';

// Schema definition for contact form
const formSchema = z.object({
  name: z.string().min(2, { message: 'Name is required' }),
  email: z.string().email(),
  company: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().min(5, { message: 'Message is required' }),
  honeypot: z.string().optional(),
});

/**
 * Server action to handle contact form submission. Validates input, sends an email via Resend,
 * and redirects to the thank‑you page on success. A hidden honeypot field is used to deter bots.
 */
export async function submitContact(formData: FormData) {
  const data = Object.fromEntries(formData.entries());
  // If the honeypot field is filled, quietly ignore the submission
  if (data.honeypot) {
    return;
  }
  const parsed = formSchema.parse(data);
  await sendContactEmail({
    name: parsed.name as string,
    email: parsed.email as string,
    company: (parsed.company as string) || '',
    budget: (parsed.budget as string) || '',
    message: parsed.message as string,
  });
  redirect('/thank-you');
}