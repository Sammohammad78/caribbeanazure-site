# Secrets Reference

This file describes the secrets used in the Caribbean Azure website. **Do not commit real secret values to version control.** Store secret values in `.env.local` (not tracked) and in your hosting provider’s environment variable settings.

| Secret             | Used In                       | Description and Notes                                        |
|--------------------|--------------------------------|---------------------------------------------------------------|
| `RESEND_API_KEY`   | `lib/email.ts`                | API key for [Resend](https://resend.com/), used to send contact form emails. Generate in your Resend dashboard. |
| `RESEND_FROM_EMAIL`| `lib/email.ts`                | Verified sender email address for Resend. Must be a domain you own and have verified with Resend. |
| `RESEND_TO_EMAIL`  | `lib/email.ts`                | The email address where contact form messages are delivered (e.g. your business inbox). |
| `PLAUSIBLE_DOMAIN` | Plausible script in `app/(marketing)/page.tsx` | Domain configured in your Plausible account (e.g. `caribbeanazure.com`). Not strictly secret, but defined for convenience. |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` (optional) | Components and site content | The phone number used to generate WhatsApp links. Could also be stored in `content/site.ts`. |

### Generating and Storing Secrets

1. **Resend API Key:** Log into your Resend account and create an API key under “API Keys.” Copy the value to `RESEND_API_KEY` in your environment.
2. **From / To Emails:** In Resend, verify your sender domain (e.g. `caribbeanazure.com`) and specify an email such as `info@caribbeanazure.com` for `RESEND_FROM_EMAIL`. Choose where incoming inquiries should be sent for `RESEND_TO_EMAIL` (can be the same as `RESEND_FROM_EMAIL`).
3. **Plausible Domain:** If you’re using self‑hosted Plausible or the hosted service, configure your domain there and set `PLAUSIBLE_DOMAIN` accordingly.

Store these secrets in `.env.local` and set them in Vercel’s or Cloudflare’s environment variable configuration. Never expose them publicly or commit them to the repository.