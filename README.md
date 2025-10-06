# Caribbean Azure Website

This repository contains the source code for **Caribbean Azure**, a conversion‑focused landing page for automation and website services. It is built with **Next.js 14 (App Router)**, **TypeScript**, and **Tailwind CSS**.

## Features

- Landing page with hero, services, process, pricing, FAQ and contact sections.
- Contact form that sends an email via Resend and redirects to a thank‑you page.
- GDPR‑friendly analytics via Plausible (cookie‑less) and SEO‑ready metadata.
- All copy, links, pricing and contact details are defined in `content/site.ts` (multilingual‑ready).
- Structured data (JSON‑LD) for `Organization` and `WebSite` schemas.
- Basic Playwright test for the contact form.

## Getting Started

### Requirements

- Node.js 18 or later

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/YOUR_USERNAME/caribbeanazure-site.git
   cd caribbeanazure-site
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env.local` file based on `.env.example` and set the required environment variables.

4. Run the development server:

   ```bash
   npm run dev
   ```

   The site will be available at `http://localhost:3000`.

### Scripts

- `npm run dev` – Start the Next.js development server.
- `npm run build` – Build for production.
- `npm start` – Start the production server.
- `npm run lint` – Run ESLint.
- `npm test` – Run Playwright tests.

## Content Editing

All text, links, pricing tiers and FAQs live in **`content/site.ts`**. To update copy, edit the English (`en`) entries. Dutch (`nl`) entries can be added as needed; unspecified values fall back to English. After editing, redeploy to apply changes.

## Deployment

The site is designed to deploy easily on Vercel (recommended) or Cloudflare Pages:

1. Push your repository to GitHub.
2. In Vercel, import the repository and set the environment variables defined in `.env.example`.
3. Trigger a deployment. The `/api/health` route returns `{status: "ok"}` when live.

## Contributing

Feel free to fork this project and adapt it for your own services. Pull requests are welcome!

## License

This project is open source under the [MIT](LICENSE) license.