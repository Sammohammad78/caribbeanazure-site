const fs = require('fs');
const path = require('path');

const updates = {
  nl: {
    solutions: {
      light: {
        badge: 'Tier 1',
        pricePrefix: 'Vanaf',
        priceHeroNote: 'excl. btw · exacte prijs afhankelijk van scope',
        useCasesTitle: 'Concrete use-cases',
        includesTitle: 'Inbegrepen bij elke Light Automation',
        roiTitle: 'Bereken jouw ROI',
        roiSubtitle: 'Ontdek hoeveel je kunt besparen met Light Automations',
        upgrade: {
          title: 'Klaar voor meer?',
          description: 'Complexere processen nodig? Bekijk onze Manufacturing en Configurator oplossingen.',
          buttons: {
            manufacturing: 'Manufacturing oplossingen',
            configurators: 'Configurator oplossingen'
          }
        }
      },
      manufacturing: {
        badge: 'Tier 2 · Aanbevolen voor maakbedrijven',
        pricePrefix: 'Vanaf',
        priceHeroNote: 'excl. btw · vanaf-prijs, exacte scope bepaald in intake',
        modulesTitle: 'Wat we bouwen voor je',
        modulesIntro: 'Productie-klare oplossingen die sales direct koppelen aan manufacturing',
        roiTitle: 'Bereken jouw ROI',
        roiSubtitle: 'Typisch bespaart Manufacturing Automation 60% engineering tijd',
        upgrade: {
          title: 'Volledige product configuratie nodig?',
          description: 'Bekijk onze CPQ & Configure-to-Production oplossingen voor complexe producten met duizenden varianten.',
          buttons: {
            configurators: 'Configurator oplossingen'
          }
        }
      },
      configurators: {
        badge: 'Tier 3 · Maatwerk',
        pricePrefix: 'Prijs',
        priceHeroNote: 'Prijs op aanvraag',
        servicesTitle: 'Twee niveaus van configuratie',
        roiTitle: 'Bereken jouw ROI',
        roiSubtitle: 'Configurators besparen typisch 60-80% engineering tijd en elimineren productiefouten',
        upgrade: {
          title: 'Klaar voor een configurator?',
          description: 'Plan een intake om jouw product, varianten en productieproces door te nemen. We beoordelen samen of een configurator de beste oplossing is.',
          buttons: {
            contact: 'Plan intake',
            cases: 'Bekijk cases'
          }
        }
      }
    },
    pricing: {
      roiCta: 'Bereken jouw ROI'
    }
  },
  en: {
    solutions: {
      light: {
        badge: 'Tier 1',
        pricePrefix: 'From',
        priceHeroNote: 'excl. VAT · exact price depends on scope',
        useCasesTitle: 'Concrete use cases',
        includesTitle: 'Included with every Light Automation',
        roiTitle: 'Calculate your ROI',
        roiSubtitle: 'Discover how much you can save with Light Automations',
        upgrade: {
          title: 'Ready for more?',
          description: 'Need more complex processes? Check out our Manufacturing and Configurator solutions.',
          buttons: {
            manufacturing: 'Manufacturing solutions',
            configurators: 'Configurator solutions'
          }
        }
      },
      manufacturing: {
        badge: 'Tier 2 · Recommended for manufacturing',
        pricePrefix: 'From',
        priceHeroNote: 'excl. VAT · from price, exact scope determined in intake',
        modulesTitle: 'What we build for you',
        modulesIntro: 'Production-ready solutions that connect sales directly to manufacturing',
        roiTitle: 'Calculate your ROI',
        roiSubtitle: 'Manufacturing Automation typically saves 60% engineering time',
        upgrade: {
          title: 'Need full product configuration?',
          description: 'Explore our CPQ & Configure-to-Production solutions for complex products with thousands of variants.',
          buttons: {
            configurators: 'Configurator solutions'
          }
        }
      },
      configurators: {
        badge: 'Tier 3 · Custom',
        pricePrefix: 'Price',
        priceHeroNote: 'Price on request',
        servicesTitle: 'Two levels of configuration',
        roiTitle: 'Calculate your ROI',
        roiSubtitle: 'Configurators typically save 60-80% engineering time and eliminate production errors',
        upgrade: {
          title: 'Ready for a configurator?',
          description: 'Book an intake to discuss your product, variants, and production process. We will assess if a configurator is the best fit.',
          buttons: {
            contact: 'Book intake',
            cases: 'View cases'
          }
        }
      }
    },
    pricing: {
      roiCta: 'Calculate your ROI'
    }
  }
};

function merge(target, source) {
  if (!source) return target;
  for (const [key, value] of Object.entries(source)) {
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      target[key] = merge(target[key] || {}, value);
    } else {
      target[key] = value;
    }
  }
  return target;
}

for (const locale of Object.keys(updates)) {
  const file = path.join(__dirname, '..', 'messages', locale + '.json');
  const raw = fs.readFileSync(file, 'utf8').replace(/^\uFEFF/, '');
  const data = JSON.parse(raw);
  merge(data, updates[locale]);
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}
