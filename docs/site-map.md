# Caribbean Azure - Site Map

**Generated:** 2025-10-25
**Branch:** claude/liquid-glass-v2-011CUTU7fthGkkcaiGHaD585

## Overview
This document maps all routes in the Caribbean Azure website, documenting their structure, language availability, and any issues found during the liquid-glass design system implementation.

## Language Strategy Decision
**Primary Language:** Dutch (NL)
**Secondary Language:** English (EN) - Partial coverage

### Recommendation
Make Dutch the default language across all pages. English pages exist for some routes but not all. Options:
1. **Complete EN mirror** - Translate all missing EN pages
2. **NL-only with EN toggle removal** - Focus on Dutch market, remove incomplete EN
3. **Progressive EN rollout** - Document which pages have EN, add translations incrementally

**Decision for this PR:** Document current state; recommend completing EN translations in follow-up PR or removing EN toggle if not business-critical.

---

## Route Inventory

### Core Pages (Both NL & EN where noted)

| Path | Title (NL) | Languages | Status | Notes |
|------|------------|-----------|---------|-------|
| `/` | Home | NL, EN | ✅ 200 | Main landing page, has ROI calculator CTA |
| `/about` or `/over-ons` | About Us | NL, EN | ✅ 200 | Company information |
| `/contact` | Contact | NL, EN | ✅ 200 | Contact form, should use glass styling |
| `/demo` | Demo | NL | ✅ 200 | Demo request page |
| `/pricing` or `/tarieven` | Pricing | NL, EN | ✅ 200 | Pricing tiers (needs glass cards) |
| `/roi` | ROI Calculator | NL | ✅ 200 | Standalone ROI calculator |

### Solutions/Oplossingen (Tier Structure)

| Path | Tier | Languages | Status | Notes |
|------|------|-----------|---------|-------|
| `/oplossingen` | Solutions Overview | NL | ✅ 200 | Dutch solutions index |
| `/oplossingen/light` | Tier 1 - Light | NL | ✅ 200 | Has ROI calculator, €999/mo pricing |
| `/oplossingen/maakindustrie` | Tier 2 - Manufacturing | NL | ✅ 200 | Has ROI calculator, €1,999/mo pricing |
| `/oplossingen/configurators` | Tier 3 - Configurators | NL | ✅ 200 | Has ROI calculator, €3,999/mo pricing |
| `/solutions` | Solutions Overview | EN | ✅ 200 | English solutions index |
| `/solutions/light` | Tier 1 - Light | EN | ✅ 200 | English version |
| `/solutions/manufacturing` | Tier 2 - Manufacturing | EN | ✅ 200 | English version |
| `/solutions/configurators` | Tier 3 - Configurators | EN | ✅ 200 | English version |

### Services (NL: Diensten, EN: Services)

| Path | Languages | Status | Notes |
|------|-----------|---------|-------|
| `/diensten` | NL | ✅ 200 | Dutch services page |
| `/services` | EN | ✅ 200 | English services page |

### Industries/Sectors

| Path | Languages | Status | Notes |
|------|-----------|---------|-------|
| `/sectoren` | NL | ✅ 200 | Dutch industries |
| `/industries` | EN | ✅ 200 | English industries |

### Content & Resources

| Path | Languages | Status | Notes |
|------|-----------|---------|-------|
| `/cases` | NL, EN | ✅ 200 | Case studies index |
| `/cases/[caseSlug]` | NL, EN | ✅ 200 | Dynamic case study pages |
| `/insights` | NL, EN | ✅ 200 | Blog/insights index |
| `/insights/[slug]` | NL, EN | ✅ 200 | Dynamic blog post pages |

### Technical & Infrastructure

| Path | Languages | Status | Notes |
|------|-----------|---------|-------|
| `/integrations` or `/integraties` | NL, EN | ✅ 200 | Integration partners |
| `/security` | EN | ✅ 200 | Security information |
| `/blueprint` | NL | ✅ 200 | Blueprint/roadmap page |

### Legal & Policy

| Path | Languages | Status | Notes |
|------|-----------|---------|-------|
| `/privacy` | NL | ✅ 200 | Privacy policy |
| `/voorwaarden` | NL | ✅ 200 | Terms & conditions (Dutch) |
| `/cookies` | NL | ✅ 200 | Cookie policy |

---

## Design System Application Status

### Components Requiring Liquid-Glass Treatment

#### High Priority
- [ ] **Header/Navigation** - Sticky header with subtle glass effect
- [ ] **Pricing Cards** (3 tiers on `/pricing`, `/tarieven`) - Main cards need glass styling
- [ ] **Solution Tier Cards** - Cards on `/oplossingen/*` pages
- [ ] **Contact Form** - Form panels on `/contact`, `/demo`
- [ ] **ROI Calculator** - Calculator component (appears on multiple pages)
- [ ] **Footer** - Multi-column footer with glass panels

#### Medium Priority
- [ ] **Case Study Cards** - Cards on `/cases`
- [ ] **Insight/Blog Cards** - Cards on `/insights`
- [ ] **Feature Callouts** - Info boxes across all pages
- [ ] **Integration Badges** - Small chips on `/integrations`

#### Low Priority
- [ ] **Modal Dialogs** - Any modals/overlays
- [ ] **Tooltips** - Small glass tooltips
- [ ] **Badges/Tags** - Category badges

---

## Issues Found

### Navigation & Linking
- No broken internal links detected (initial review)
- Language toggle present but not all pages have EN equivalents
- ROI calculator CTA pattern is consistent across solution pages ✅

### Content Consistency
- Pricing display format consistent: "Vanaf € X.XXX excl. btw" ✅
- Button labels need standardization (some say "Plan een intake", others "Contact")

### Technical
- TypeScript build errors fixed (ROI calculator preset, contact form consent)
- Need to audit for `asChild` prop usage on non-Radix components

---

## Recommendations for Liquid-Glass Implementation

### Phase 1: Core Components (This PR)
1. Create `styles/glass.css` with tokens
2. Create React components: `GlassCard`, `GlassPanel`, `GlassBadge`
3. Apply to header, pricing cards, footer
4. Ensure WCAG AA contrast

### Phase 2: Content Areas (Follow-up)
1. Apply to case studies and blog cards
2. Standardize form styling
3. Add glass treatment to modals and overlays

### Phase 3: Polish & Optimization (Follow-up)
1. Optimize background animations
2. Add lazy-loading for heavy assets
3. Complete EN translations or remove toggle
4. Add noise texture for premium feel

---

## Localization Matrix

| Route Base | NL Path | EN Path | Both Complete? |
|------------|---------|---------|----------------|
| Home | `/` | `/` | ✅ Yes |
| About | `/over-ons` | `/about` | ✅ Yes |
| Contact | `/contact` | `/contact` | ✅ Yes |
| Pricing | `/tarieven` | `/pricing` | ✅ Yes |
| Solutions | `/oplossingen` | `/solutions` | ✅ Yes |
| Services | `/diensten` | `/services` | ✅ Yes |
| Industries | `/sectoren` | `/industries` | ✅ Yes |
| Integrations | `/integraties` | `/integrations` | ✅ Yes |
| Cases | `/cases` | `/cases` | ✅ Yes |
| Insights | `/insights` | `/insights` | ✅ Yes |
| Privacy | `/privacy` | ❌ None | ⚠️ NL only |
| Terms | `/voorwaarden` | ❌ None | ⚠️ NL only |
| Cookies | `/cookies` | ❌ None | ⚠️ NL only |
| ROI | `/roi` | ❌ None | ⚠️ NL only |
| Demo | `/demo` | ❌ None | ⚠️ NL only |
| Blueprint | `/blueprint` | ❌ None | ⚠️ NL only |
| Security | ❌ None | `/security` | ⚠️ EN only |

### Analysis
- **Core marketing pages:** Fully bilingual ✅
- **Legal pages:** Dutch only (appropriate for NL-based company)
- **Utility pages:** Mostly Dutch only
- **Security page:** English only (technical audience)

**Recommendation:** Legal pages should stay NL-only. Consider translating ROI, Demo, Blueprint to EN if targeting international clients.

---

## Next Steps

1. ✅ Site map documented
2. Create `styles/glass.css`
3. Build reusable glass components
4. Apply systematically to header → pricing → forms → footer
5. Test accessibility and performance
6. Document changes in `docs/changelog.md`
7. Capture before/after screenshots

---

*Last Updated: 2025-10-25*
*Auditor: Claude Code Agent*
