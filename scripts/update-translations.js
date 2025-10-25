const fs = require('fs');
const path = require('path');

const updates = {
  nl: {
    hero: {
      badge: 'Caribbean Azure - Automatisering Studio',
      title: 'Automatiseer van aanvraag tot productie',
      subtitle: 'Offertes sneller, foutloze stuklijsten en tekenpakketten met engineer-grade automatisering. GDPR-safe. n8n self-host optie.',
      ctaPrimary: 'Plan een intake',
      ctaSecondary: 'Bereken jouw ROI',
      secondaryCta: 'Bekijk onze aanpak',
      trustedBy: 'Vertrouwd door 50+ maakbedrijven',
    },
    roiSection: {
      badge: 'ROI-calculator',
      title: 'ROI-calculator (rendement & terugverdientijd)',
      subtitle: 'Bereken binnen 60 seconden hoeveel tijd en omzet je wint met automatisering.',
      disclaimerStrong: 'Let op:',
      disclaimer: 'De berekening is indicatief; resultaten verschillen per organisatie.',
    },
    roiCalculator: {
      title: 'Pas de cijfers aan voor jouw situatie',
      subtitle: 'Gebruik de presets als startpunt of vul je eigen cijfers in. Wij rekenen automatisch mee.',
      presets: {
        light: 'Light automatisaties',
        manufacturing: 'Maakindustrie',
        c2p: 'Configure-to-Production',
      },
      inputs: {
        teamSize: 'Teamgrootte (personen)',
        hourlyRate: 'Uurtarief (EUR)',
        hoursSavedPerWeek: 'Uren bespaard per week',
        adoption: 'Adoptie (%)',
      },
      outputs: {
        weeklySavings: 'Wekelijkse besparing',
        monthlySavings: 'Maandelijkse besparing',
        annualSavings: 'Jaarlijkse besparing',
        hoursSavedAnnually: 'Uren bespaard per jaar',
      },
      cta: {
        primary: 'Plan een intake',
        secondary: 'Download als CSV',
        email: 'E-mail me mijn berekening',
      },
      hints: {
        teamSize: 'Aantal mensen dat met het proces werkt',
        hourlyRate: 'Gemiddeld uurtarief van het team (excl. btw)',
        hoursSavedPerWeek: 'Hoeveel uur per week je per persoon wint',
        adoption: 'Welk percentage van het team de oplossing actief gebruikt',
      },
      methodology: {
        title: 'Hoe berekenen we ROI?',
        description: 'We gebruiken een conservatieve formule gebaseerd op 100+ automatiseringstrajecten.',
        formula: 'Wekelijkse besparing = teamgrootte x uurtarief x uren bespaard x adoptie',
      },
      validation: {
        teamSize: 'Teamgrootte moet tussen 1 en 1000 zijn',
        hourlyRate: 'Uurtarief moet tussen EUR 10 en EUR 500 liggen',
        hoursSavedPerWeek: 'Bespaarde uren moet tussen 0,5 en 40 liggen',
        adoption: 'Adoptie moet tussen 10% en 100% zijn',
      },
      error: {
        submit: 'Er ging iets mis. Probeer het opnieuw.',
      },
      privacy: 'We verwerken je gegevens uitsluitend binnen de EU. Geen externe verwerkers.',
      emailConsent: 'Stuur mij deze berekening per e-mail (optioneel)',
    },
    solutions: {
      light: {
        badge: 'Tier 1',
        pricePrefix: 'vanaf',
        priceNote: 'Excl. btw, exacte prijs afhankelijk van scope',
        ctaPrimary: 'Plan een intake',
        ctaSecondary: 'Bekijk alle tarieven',
        note: 'Groeit je vraag? Plan een intake voor maatwerk.',
      },
      manufacturing: {
        badge: 'Tier 2',
        pricePrefix: 'vanaf',
        priceNote: 'Excl. btw, vanaf-prijs. Exacte scope in intake.',
        ctaPrimary: 'Plan een intake',
        ctaSecondary: 'Bekijk alle tarieven',
        note: 'Wil je verder automatiseren? Plan een intake voor maatwerk.',
      },
      configurators: {
        badge: 'Tier 3',
        ctaPrimary: 'Plan intake',
        ctaSecondary: 'Vraag intake aan',
      },
    },
  },
  en: {
    hero: {
      badge: 'Caribbean Azure - Automation Studio',
      title: 'Automate from request to production',
      subtitle: 'Faster quotes, error-free BOMs, and drawing packs with engineer-grade automation. GDPR-safe. n8n self-host option.',
      ctaPrimary: 'Book an intake',
      ctaSecondary: 'Calculate your ROI',
      secondaryCta: 'Explore our approach',
      trustedBy: 'Trusted by 50+ manufacturing SMEs',
    },
    roiSection: {
      badge: 'ROI calculator',
      title: 'ROI calculator (return & payback)',
      subtitle: 'Estimate within 60 seconds how much time and revenue automation unlocks.',
      disclaimerStrong: 'Note:',
      disclaimer: 'This calculation is indicative; actual results vary per organisation.',
    },
    roiCalculator: {
      title: 'Adjust the numbers for your scenario',
      subtitle: 'Use the presets as a starting point or plug in your own inputs. We will do the math for you.',
      presets: {
        light: 'Light automations',
        manufacturing: 'Manufacturing',
        c2p: 'Configure-to-Production',
      },
      inputs: {
        teamSize: 'Team size (people)',
        hourlyRate: 'Hourly rate (EUR)',
        hoursSavedPerWeek: 'Hours saved per week',
        adoption: 'Adoption (%)',
      },
      outputs: {
        weeklySavings: 'Weekly savings',
        monthlySavings: 'Monthly savings',
        annualSavings: 'Annual savings',
        hoursSavedAnnually: 'Hours saved annually',
      },
      cta: {
        primary: 'Book an intake',
        secondary: 'Download as CSV',
        email: 'Email me my calculation',
      },
      hints: {
        teamSize: 'Number of people involved in the process',
        hourlyRate: 'Average hourly rate of the team (ex VAT)',
        hoursSavedPerWeek: 'How many hours you save per person each week',
        adoption: 'Percentage of the team actively using the solution',
      },
      methodology: {
        title: 'How do we calculate ROI?',
        description: 'We use a conservative formula grounded in 100+ automation projects.',
        formula: 'Weekly savings = team size x hourly rate x hours saved x adoption',
      },
      validation: {
        teamSize: 'Team size must be between 1 and 1000',
        hourlyRate: 'Hourly rate must be between EUR 10 and EUR 500',
        hoursSavedPerWeek: 'Hours saved must be between 0.5 and 40',
        adoption: 'Adoption must be between 10% and 100%',
      },
      error: {
        submit: 'Something went wrong. Please try again.',
      },
      privacy: 'We process your data within the EU only. No third-party processors.',
      emailConsent: 'Email this calculation to me (optional)',
    },
    solutions: {
      light: {
        badge: 'Tier 1',
        pricePrefix: 'from',
        priceNote: 'Excl. VAT, final price depends on scope',
        ctaPrimary: 'Book an intake',
        ctaSecondary: 'View all pricing',
        note: 'Need more? Book an intake for a tailored plan.',
      },
      manufacturing: {
        badge: 'Tier 2',
        pricePrefix: 'from',
        priceNote: 'Excl. VAT, from-price. Exact scope set during intake.',
        ctaPrimary: 'Book an intake',
        ctaSecondary: 'View all pricing',
        note: 'Ready to scale further? Book an intake for a tailored build.',
      },
      configurators: {
        badge: 'Tier 3',
        ctaPrimary: 'Book intake',
        ctaSecondary: 'Request intake',
      },
    },
  },
};

for (const locale of Object.keys(updates)) {
  const file = path.join(__dirname, '..', 'messages', `${locale}.json`);
  const raw = fs.readFileSync(file, 'utf8').replace(/^\uFEFF/, '');
  const data = JSON.parse(raw);
  const update = updates[locale];

  // Hero
  if (data.hero) {
    data.hero.badge = update.hero.badge;
    data.hero.title = update.hero.title;
    data.hero.subtitle = update.hero.subtitle;
    if (!data.hero.cta) data.hero.cta = {};
    data.hero.cta.primary = update.hero.ctaPrimary;
    data.hero.cta.secondary = update.hero.ctaSecondary;
    data.hero.secondaryCta = update.hero.secondaryCta;
    data.hero.trustedBy = update.hero.trustedBy;
  }

  // ROI section overview copy
  if (!data.roi) data.roi = {};
  data.roi.section = update.roiSection;

  // ROI calculator strings
  if (!data.roiCalculator) data.roiCalculator = {};
  Object.assign(data.roiCalculator, {
    title: update.roiCalculator.title,
    subtitle: update.roiCalculator.subtitle,
    presets: Object.assign(data.roiCalculator.presets || {}, update.roiCalculator.presets),
    inputs: Object.assign(data.roiCalculator.inputs || {}, update.roiCalculator.inputs),
    outputs: Object.assign(data.roiCalculator.outputs || {}, update.roiCalculator.outputs),
    cta: Object.assign(data.roiCalculator.cta || {}, update.roiCalculator.cta),
    hints: Object.assign(data.roiCalculator.hints || {}, update.roiCalculator.hints),
    methodology: Object.assign(data.roiCalculator.methodology || {}, update.roiCalculator.methodology),
    validation: Object.assign(data.roiCalculator.validation || {}, update.roiCalculator.validation),
    error: Object.assign(data.roiCalculator.error || {}, update.roiCalculator.error),
    privacy: update.roiCalculator.privacy,
    emailConsent: update.roiCalculator.emailConsent,
  });

  // Solutions page extras
  if (data.solutions) {
    const solUpdate = update.solutions;
    for (const key of Object.keys(solUpdate)) {
      if (!data.solutions[key]) data.solutions[key] = {};
      Object.assign(data.solutions[key], solUpdate[key]);
    }
  }

  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}
