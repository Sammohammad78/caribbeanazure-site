import { NextResponse } from 'next/server'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(10),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const data = contactSchema.parse(body)

    // TODO: Implement actual email sending
    // For now, just log to console
    console.log('Contact form submission:', data)

    // In production, you would send an email here using:
    // - Resend (recommended): https://resend.com
    // - SendGrid
    // - Nodemailer with SMTP
    // - Or your email service of choice

    // Example with Resend:
    // const { Resend } = require('resend');
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: 'contact@caribbeanazur.nl',
    //   to: 'info@caribbeanazur.nl',
    //   subject: `New Contact Form Submission from ${data.name}`,
    //   html: `
    //     <h2>New Contact Form Submission</h2>
    //     <p><strong>Name:</strong> ${data.name}</p>
    //     <p><strong>Email:</strong> ${data.email}</p>
    //     ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
    //     <p><strong>Message:</strong></p>
    //     <p>${data.message}</p>
    //   `,
    // });

    return NextResponse.json(
      { success: true, message: 'Message sent successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Invalid form data', details: error.issues },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { success: false, error: 'Failed to send message' },
      { status: 500 }
    )
  }
}
