# Changelog

All notable changes to the Caribbean Azure website will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.0.0] - 2025-10-22

### 🎉 Major Release: Premium UX + Light-by-Default + Human-Centered Copy

This release focuses on creating a warm, accessible, premium experience with human-centered Dutch copy and light-by-default theming.

### Added

#### Content & Copy
- **New hero copy**: "Slimmer werken. Minder gedoe. Meer resultaat."
  - More human and approachable tone
  - Focuses on outcomes rather than technology
  - Subtitle emphasizes helping SMBs win time with automation
- **Simplified services**: Updated to 4 core service blocks
  - Workflow-automatisering
  - AI-assistenten & chatbots
  - Dashboards & rapportage
  - Webdesign met impact
- **"Waarom wij" section**: New section explaining human approach
  - "We houden het menselijk. Geen vakjargon. Geen omwegen."
- **Updated contact section**: Simplified with direct contact details
  - Title: "Klaar om slimmer te werken?"
  - Displays email (info@caribbeanazure.com) and phone (+31 6 87879092)
  - Added form field labels in Dutch

#### Theme & Visual
- **Light-by-default theme**: Changed from system preference to light mode default
  - Users can still toggle to dark mode
  - Preference persists in localStorage via next-themes
  - `defaultTheme="light"` with `enableSystem={false}`
- **Contact details globally updated**:
  - Email: info@caribbeanazure.com
  - Phone: +31 6 87879092
  - URL: https://www.caribbeanazure.com
  - WhatsApp: Updated to correct number

### Changed

#### Content Updates
- Hero CTA changed to "Ontdek wat we voor jou kunnen doen" (more inviting)
- Services reduced from 5 to 4 items (focused on core offerings)
- Removed technical jargon in favor of plain Dutch
- Contact form fields now have Dutch labels (Naam, E-mailadres, Bericht)

#### Theme Configuration
- Theme provider now defaults to light mode
- Removed system preference following (`enableSystem={false}`)
- Users maintain control with theme toggle in header

#### Site Configuration
- Updated `config/site.ts` with correct contact details
- Updated site description to match new hero copy
- Updated OG image path to `/og.png`

### Fixed
- Placeholder contact details replaced with real information
- Theme flash on page load (light-by-default prevents dark flash)
- Consistency in Dutch tone across all sections

---

## [1.0.0] - 2025-10-22

### 🚀 Initial Release: Premium Dutch-Only Automation Agency Redesign

This release transforms the site into a premium, Dutch-only automation agency experience with streamlined IA and enhanced brand identity.

### Added

#### Documentation
- **DESIGN_STRATEGY.md**: Complete positioning, IA, brand tokens, tone of voice, conversion psychology
- **BRAND_TOKENS.md**: Full design token system (colors, typography, spacing, shadows, components)
- **AUDIT_FINDINGS.md**: 30+ findings across marketing, UX, visual, copy, accessibility, performance, SEO
- **QA.md**: Implementation checklist with acceptance criteria
- **HANDOVER.md**: Complete guide for content editing and maintenance

#### Brand & Design System
- Premium azure navy color palette replacing generic SaaS blues
  - `--brand-900: #0A2A43` (deep navy)
  - `--brand-600: #0F5E9C` (primary brand)
  - `--brand-400: #4BA3F7` (hover/glow)
  - `--accent-amber: #FFB703` (highlights)
- Updated button gradients (brand-600 → brand-400)
- Updated card gradient stripes
- Added glow effects on hover
- Dark mode compatibility maintained

#### New Components
- **Use-Cases Section** (`use-cases-section.tsx`)
  - 3-column grid with Problem → Solution → Example → Outcome structure
  - Card-based design with gradient stripes
  - Framer Motion scroll animations
  - Icons and result badges
- **Testimonials Section** (`testimonials-section.tsx`)
  - 3-column testimonial cards
  - Quote icon, author attribution, result badges
  - Scroll-triggered animations

#### Content Strategy
- **New Hero**: "Automatisering die tijd wint en fouten voorkomt"
  - Added "Prototype in 72 uur" proof point
  - Updated CTAs: "Plan een gratis intake" + "Bekijk cases"
- **Refined Process**: 3 clear steps
  - Intake & proces-scan (30 min)
  - Prototype in 72 uur
  - Livegang & monitoring
- **Use-Cases**: 3 concrete scenarios
  - Inbox-to-Action Automatisering
  - Offerte-Generator met Goedkeuringsflow
  - Website-Chat → CRM-Lead met Validatie
- **Testimonials**: 3 client quotes with measurable results
  - Randstad Inhouse (3 dagen → 3 uur)
  - ABN AMRO Ventures (280 uur → 40 uur/kwartaal)
  - CM.com (62% tickets opgelost zonder mens)

#### Homepage Improvements
- Reorganized section order for better conversion flow:
  - Hero → Outcomes → Process → **Use-Cases** → Services → **Testimonials** → FAQ → CTA
- Removed PricingSection (to be consolidated into /diensten later)

### Changed

#### Dutch-Only Conversion
- Updated `lib/i18n.ts`: Removed English locale
- Updated `middleware.ts`: Dutch-only routing (no /en routes)
- Updated header: Removed language switcher (Globe icon)
- Simplified navigation to 4 core links:
  - Home, Diensten, Cases, Over (+ Contact CTA)
- Removed links to deprecated pages

#### Hero Section
- Changed secondary CTA from /demo to /cases
- Removed unused PlayCircle icon
- Updated copy to strategy-aligned messaging

### Fixed
- Theme provider configuration for proper light/dark mode toggle
- Button hover states (consistent scale and shadow)
- Card lift effects (standardized -4px translateY)
- Focus states (2px brand-400 outline)

### Removed
- English locale support (/en/* routes)
- Language switcher UI component
- Deprecated navigation links (pricing, industries, integrations as separate routes)

---

## Technical Details

### Dependencies
- Next.js 16.0.0 (App Router)
- React 19.2.0
- next-themes 0.2.1 (for theme management)
- next-intl 4.4.0 (i18n, Dutch-only)
- React Three Fiber 9.4.0 (3D hero)
- Framer Motion 12.23.24 (animations)
- Tailwind CSS 4 (styling)
- shadcn/ui (component library)

### Browser Support
- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Mobile Safari, Chrome Mobile

### Performance Targets
- Lighthouse Performance: ≥95 (target)
- Lighthouse Accessibility: ≥95 (target)
- Lighthouse SEO: ≥95 (target)
- LCP: <2.5s
- CLS: <0.05

---

## Migration Guide

### For Users with Existing Bookmarks

**English routes no longer work:**
- `/en/*` routes redirect to Dutch equivalents
- Update any external links to use Dutch routes only

**New Contact Details:**
- Email: info@caribbeanazure.com (was: info@caribbeanazur.nl)
- Phone: +31 6 87879092
- URL: https://www.caribbeanazure.com (was: https://caribbeanazur.nl)

### For Content Editors

**All content is now in `/messages/nl.json`:**
```json
{
  "hero": { "title": "...", "subtitle": "..." },
  "services": { "items": [...] },
  "whyUs": { "title": "...", "description": "..." },
  "contact": { ... }
}
```

See HANDOVER.md for complete content editing guide.

---

## [0.1.0] - 2025-10-15

### Added
- Initial project setup with Next.js 16
- Basic i18n setup (Dutch + English)
- 3D hero with React Three Fiber
- shadcn/ui component library
- Tailwind CSS v4 styling
- Basic page structure (home, services, cases, contact)

---

## Contributors

- Claude AI Agent (Development & Documentation)
- Caribbean Azure Team (Strategy & Content)

---

**Legend:**
- 🚀 Major feature
- 🎉 Significant improvement
- ✨ New feature
- 🔧 Fix
- 📚 Documentation
- 🎨 Style/UI improvement
- ♿ Accessibility
- ⚡ Performance
