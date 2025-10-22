# Caribbean Azure — Premium AI Automation Agency Website

A world-class, conversion-focused website built with Next.js 14+, TypeScript, Tailwind CSS, and next-intl for internationalization.

## 🚀 Features

- **Bilingual Support**: Dutch (primary) and English with `next-intl`
- **Modern Stack**: Next.js App Router, TypeScript, Tailwind CSS v4
- **Design System**: Comprehensive token system with Scandinavian minimalism
- **Conversion-Optimized**: WhatsApp-first CTA strategy, contact forms, booking integration
- **Responsive**: Mobile-first design with smooth animations
- **SEO-Ready**: Sitemap, robots.txt, meta tags, schema.org markup
- **Accessible**: WCAG 2.2 AA compliant with keyboard navigation and screen reader support
- **Performance**: Optimized for Lighthouse score ≥95

## 📁 Project Structure

```
websitetest/
├── app/
│   ├── [locale]/              # i18n routing
│   │   ├── layout.tsx         # Locale-specific layout
│   │   ├── page.tsx           # Homepage
│   │   ├── contact/           # Contact page
│   │   ├── over-ons/          # About page (Dutch)
│   │   └── about/             # About page (English)
│   ├── api/
│   │   └── contact/           # Contact form API route
│   ├── globals.css            # Global styles & design tokens
│   ├── layout.tsx             # Root layout
│   ├── sitemap.ts             # Dynamic sitemap
│   └── robots.ts              # Robots.txt configuration
├── components/
│   ├── layout/                # Header, Footer
│   ├── sections/              # Page sections (Hero, Services, etc.)
│   └── ui/                    # Reusable UI components
├── config/
│   ├── tokens.ts              # Design system tokens
│   └── site.ts                # Site configuration
├── lib/
│   ├── i18n.ts                # Internationalization config
│   └── utils.ts               # Utility functions
├── messages/
│   ├── nl.json                # Dutch translations
│   └── en.json                # English translations
├── docs/
│   ├── inspiration.md         # Design research & references
│   ├── design-system.md       # Design system documentation
│   └── handover.md            # Deployment & handover guide
└── middleware.ts              # i18n middleware
```

## 🛠️ Tech Stack

- **Framework**: [Next.js 14+](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) (customized)
- **Internationalization**: [next-intl](https://next-intl-docs.vercel.app/)
- **Form Validation**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Visit [http://localhost:3000/nl](http://localhost:3000/nl) (Dutch) or [http://localhost:3000/en](http://localhost:3000/en) (English).

## 🌐 Configuration

### 1. Site Configuration

Edit `config/site.ts`:

```typescript
export const siteConfig = {
  name: 'Caribbean Azure',
  description: '...',
  url: 'https://your-domain.com',  // ← Change this
  links: {
    whatsapp: 'https://wa.me/31XXXXXXXXX',  // ← Your WhatsApp number
    email: 'info@yourdomain.com',
    calendly: 'https://cal.com/yourlink',
  },
}
```

### 2. WhatsApp Integration

Replace the placeholder WhatsApp number (`31612345678`) in:
- `components/sections/hero.tsx`
- `components/sections/pricing-section.tsx`
- `app/[locale]/contact/page.tsx`
- `config/site.ts`

### 3. Email Service (Contact Form)

The contact form API route (`app/api/contact/route.ts`) is ready for integration.

**Recommended: Resend**

```bash
npm install resend
```

Uncomment the Resend code in `app/api/contact/route.ts` and add your API key to `.env.local`:

```env
RESEND_API_KEY=re_xxxxx
```

### 4. Analytics

Add your analytics provider. Example with Plausible in `app/[locale]/layout.tsx`:

```typescript
<Script defer data-domain="yourdomain.com" src="https://plausible.io/js/script.js" />
```

## 📝 Content Management

### Translations

Edit `messages/nl.json` and `messages/en.json` to update copy.

### Adding New Pages

1. Create page in `app/[locale]/your-page/page.tsx`
2. Add translations to `messages/*.json`
3. Update navigation in `components/layout/header.tsx`
4. Add route to `app/sitemap.ts`

## 🎨 Design System

See `docs/design-system.md` for complete documentation.

**Quick Reference:**
- Primary color: `#0F5FFF` (Caribbean Azure Blue)
- Accent color: `#10B981` (Success Green)
- Typography: System font stack for performance
- Spacing: 8px base unit
- Border radius: 16px default for cards

Tokens are defined in:
- `config/tokens.ts` (JavaScript constants)
- `app/globals.css` (CSS variables)

## 🚀 Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Push code to GitHub
2. Connect repository to [Vercel](https://vercel.com/)
3. Configure environment variables:
   ```env
   RESEND_API_KEY=re_xxxxx  # If using Resend for contact form
   ```
4. Deploy!

Your site will be live at `your-project.vercel.app`.

### Custom Domain

In Vercel:
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Update `config/site.ts` with your domain

## 📦 Build Output

```bash
npm run build
```

Expected output:
- Homepage: Server-rendered (dynamic)
- Contact: Server-rendered (dynamic)
- About: Server-rendered (dynamic)
- API routes: Edge functions

## 🧪 Testing

```bash
# Type check
npx tsc --noEmit

# Lint
npm run lint

# Build (includes type-checking)
npm run build
```

## 🛠️ Customization

### Changing Brand Colors

Edit `app/globals.css`:

```css
--color-brand-azure: #YOUR_COLOR;
--color-success: #YOUR_ACCENT;
```

And `config/tokens.ts`:

```typescript
brand: {
  azure: '#YOUR_COLOR',
}
```

### Adding Custom Fonts

1. Add font files to `public/fonts/`
2. Update `app/globals.css`:

```css
@font-face {
  font-family: 'YourFont';
  src: url('/fonts/YourFont.woff2') format('woff2');
}
```

## 🐛 Troubleshooting

**Build fails:**
- Run `npm install` to ensure all dependencies are installed
- Check Node.js version (must be 18+)

**i18n not working:**
- Verify `middleware.ts` is in the root directory
- Check locale files exist in `messages/`

**Contact form not sending:**
- Implement email service in `app/api/contact/route.ts`
- Add environment variables for your email service

## 📚 Documentation

- [Design Inspiration & Research](./docs/inspiration.md)
- [Design System Guide](./docs/design-system.md)
- [Deployment & Handover](./docs/handover.md)

## TODO Before Launch

- [ ] Replace placeholder WhatsApp number
- [ ] Configure email service for contact form
- [ ] Add real client logos to homepage
- [ ] Set up analytics (Plausible/GA4)
- [ ] Update domain in `config/site.ts` and `app/sitemap.ts`
- [ ] Add favicon and OG images
- [ ] Test on real mobile devices
- [ ] Run Lighthouse audit (target: 95+)
- [ ] Set up error tracking (Sentry/LogRocket)

## 📄 License

Proprietary — © 2024 Caribbean Azure. All rights reserved.

---

**Built with ❤️ by Caribbean Azure**

🤖 Generated with [Claude Code](https://claude.com/claude-code)
