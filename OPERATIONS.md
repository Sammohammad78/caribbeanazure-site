# Operations Guide

This document explains how to operate and maintain the Caribbean Azure website after deployment.

## Editing Content

All editable copy—including headings, button labels, pricing plans, FAQs and contact options—is centralized in **`content/site.ts`**.

To update copy:

1. Open `content/site.ts`.
2. Modify the values under the `en` key. For multilingual support, add keys under `nl` (e.g. `site.nl.hero.title`).
3. Commit and push your changes. The site will redeploy automatically if connected to Vercel.

Adding a new pricing tier or FAQ entry is as simple as appending a new object to the corresponding array in `content/site.ts`.

## Running Locally

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env.local` and fill in the required environment variables (see **Secrets** below).
3. Start the development server: `npm run dev`.

The app uses the Next.js App Router and server actions; Node 18 or later is required.

## Environment Variables

Environment variables are defined in `.env.example`. Create a `.env.local` file with the following keys:

| Variable              | Description                               |
|-----------------------|-------------------------------------------|
| `RESEND_API_KEY`      | Your Resend API key for sending emails.   |
| `RESEND_FROM_EMAIL`   | Verified sender address for Resend emails. |
| `RESEND_TO_EMAIL`     | Destination address for contact messages.  |
| `PLAUSIBLE_DOMAIN`    | Domain used by Plausible (e.g. `caribbeanazure.com`). |

See **SECRETS.md** for more details.

After updating `.env.local`, restart the development server for changes to take effect.

## Rotating Secrets

1. Generate a new API key or credential in the respective service (Resend, Plausible, etc.).
2. Update the value in your hosting platform’s environment settings (e.g. Vercel > Settings > Environment Variables).
3. Update your local `.env.local` file.
4. Redeploy the site.

## Deployment

This project is optimized for deployment on Vercel:

1. Import the GitHub repository into Vercel.
2. Set environment variables in the project settings.
3. Trigger a deployment. Vercel will build the site and provide a preview URL.
4. Once ready, add your custom domain (e.g. `caribbeanazure.com`) in Vercel and update DNS records (CNAME or A/AAAA as instructed by Vercel).

The `/api/health` endpoint returns `{status:"ok"}` and can be used for uptime monitoring.

## Analytics

Plausible analytics is used to track page views. Plausible is a privacy‑focused, cookie‑less analytics provider and does not collect personal data【816421071388910†L83-L87】. If you self‑host Plausible, update the script URL in `app/(marketing)/page.tsx` accordingly.

## Contact Form Email Delivery

Contact form submissions are handled via a server action defined in `app/(marketing)/actions/contact.ts`. Emails are sent using the Resend API in `lib/email.ts`. Ensure that `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, and `RESEND_TO_EMAIL` are configured.

## Adding/Updating Translations

The site is multilingual‑ready. To add Dutch translations:

1. Create corresponding keys under `site.nl` in `content/site.ts`.
2. Populate the values in Dutch. Any missing values will fall back to English.
3. Optionally, implement locale detection or a language switcher.

## Testing

Playwright tests live in the `tests/` directory. Run them with `npm test`. The provided test covers the happy path of the contact form.

---

For any further questions or assistance, please reach out to the Caribbean Azure development team.