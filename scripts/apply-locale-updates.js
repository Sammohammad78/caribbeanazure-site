const fs = require('fs');
const path = require('path');

const updates = {
  nl: {
    hero: {
      subtitle: 'Snel resultaat voor het MKB. GDPR-veilig. n8n self-host kan.',
      trustedBy: 'Bewijst zich bij Nederlandse maakbedrijven',
    },
    trust: {
      title: 'Onze waarborgen',
      items: ['EU-hosting', 'DPA beschikbaar', 'n8n self-host optie'],
    },
    solutions: {
      title: 'Oplossingen voor elke schaal',
      subtitle: 'Van micro-automaties tot volledige configurators.',
      cta: 'Niet zeker? Plan een intake.',
      light: {
        title: 'Snelle automaties met direct effect',
        subtitle: 'Minder handwerk. Minder fouten. Meer tijd voor klanten.',
        description: 'Kleine automatiseringen die binnen dagen live staan en direct tijd vrijmaken voor je team.',
        homeCta: 'Bekijk snelle automatisaties',
        priceNote: 'Vanaf \u20ac 999 excl. btw',
        bullets: ['Minder handwerk', 'Minder fouten', 'Meer tijd voor klanten'],
        micro: {
          title: 'Micro-automatie',
          subtitle: 'E\u00e9n flow. E\u00e9n integratie. Binnen drie werkdagen.',
          priceNote: 'Vanaf \u20ac 799 excl. btw',
          note: 'Kleine stap. Snel resultaat.',
          ctaPrimary: 'Plan een intake',
          ctaSecondary: 'Bekijk alle tarieven'
        }
      },
      manufacturing: {
        title: 'Van offerte naar stuklijst zonder omweg',
        subtitle: 'Productie-klare oplossingen voor maakbedrijven.',
        description: 'Vertaal sales-configuraties direct naar BOM\'s, tekenpakketten en ERP-integraties.',
        homeCta: 'Van offerte naar stuklijst',
        priceNote: 'Vanaf \u20ac 1.999 excl. btw',
        modules: ['Sales\u2192BOM Bridge', 'Drawing Pack Generator', 'ERP-connectors', 'Configuratie-validatie', 'Productie-klare output']
      },
      configurators: {
        title: 'Configureer. Prijs. Produceer.',
        subtitle: 'Volledige configurators voor complexe producten.',
        description: 'Automatiseer CPQ en Configure-to-Production voor varianten met complexe regels.',
        homeCta: 'CPQ & C2P mogelijkheden',
        priceNote: 'Prijs op aanvraag',
        services: {
          cpq: {
            title: 'CPQ (standard)',
            benefits: ['Visualiseer opties en prijzen direct', 'Automatische offertes met goedkeuring', 'CRM-integratie met logging']
          },
          c2p: {
            title: 'C2P (Configure-to-Production)',
            benefits: ['Multi-level BOM output', 'Tekenpakketten en CNC-bestanden', 'Integraties met ERP/PLM/MES']
          }
        }
      }
    },
    pricing: {
      finePrint: 'Prijzen zijn "vanaf" en exclusief btw. De scope en integraties bepalen de totaalprijs.',
      micro: {
        title: 'Micro-automatie',
        priceDisplay: 'Vanaf \u20ac 799 excl. btw',
        note: 'Kleine stap. Snel resultaat.'
      },
      tiers: {
        light: {
          tagline: 'Snelle automaties met direct effect',
          priceDisplay: 'Vanaf \u20ac 999 excl. btw',
          priceNote: 'Alle prijzen exclusief btw; exacte prijs na intake.',
          cta: 'Bekijk Light automatisaties'
        },
        manufacturing: {
          tagline: 'Productie-klare Sales\u2192BOM & tekenpakketten',
          priceDisplay: 'Vanaf \u20ac 1.999 excl. btw',
          priceNote: 'Vanaf-prijs; exacte scope bepalen we in de intake.',
          cta: 'Bekijk maakindustrie oplossingen'
        },
        configurators: {
          tagline: 'CPQ & Configure-to-Production voor complexe producten',
          priceDisplay: 'Prijs op aanvraag',
          priceNote: 'Plan een intake om je use-case te beoordelen.',
          cta: 'Plan intake voor configurators'
        }
      }
    },
    useCases: {
      labels: {
        problem: 'Probleem',
        solution: 'Onze oplossing',
        example: 'Voorbeeld'
      }
    },
    roi: {
      section: {
        title: 'ROI-calculator',
        subtitle: 'Rendement en terugverdientijd in minuten.'
      }
    },
    cta: {
      button: 'Plan een intake'
    }
  },
  en: {
    hero: {
      subtitle: 'Fast results for manufacturing SMEs. GDPR-safe. n8n self-host available.',
      trustedBy: 'Proven with Dutch manufacturing teams',
    },
    trust: {
      title: 'Our safeguards',
      items: ['EU hosting', 'DPA available', 'n8n self-host option'],
    },
    solutions: {
      title: 'Solutions for every scale',
      subtitle: 'From micro automations to full configurators.',
      cta: 'Not sure? Book an intake.',
      light: {
        title: 'Fast automations with direct impact',
        subtitle: 'Less manual work. Fewer errors. More time for customers.',
        description: 'Small automations that go live within days and instantly free up time.',
        homeCta: 'See quick automations',
        priceNote: 'From \u20ac999 excl. VAT',
        bullets: ['Less manual work', 'Fewer errors', 'More time for customers'],
        micro: {
          title: 'Micro automation',
          subtitle: 'One flow. One integration. Live within three days.',
          priceNote: 'From \u20ac799 excl. VAT',
          note: 'Small step. Fast impact.',
          ctaPrimary: 'Book an intake',
          ctaSecondary: 'View all pricing'
        }
      },
      manufacturing: {
        title: 'From quote to BOM without detours',
        subtitle: 'Production-ready solutions for manufacturing teams.',
        description: 'Translate sales configurations into BOMs, drawing packs, and ERP integrations.',
        homeCta: 'From quote to BOM',
        priceNote: 'From \u20ac1,999 excl. VAT',
        modules: ['Sales\u2192BOM Bridge', 'Drawing Pack Generator', 'ERP connectors', 'Configuration validation', 'Production-ready output']
      },
      configurators: {
        title: 'Configure. Price. Produce.',
        subtitle: 'Full configurators for complex products.',
        description: 'Automate CPQ and Configure-to-Production for complex rule sets.',
        homeCta: 'CPQ & C2P options',
        priceNote: 'Price on request',
        services: {
          cpq: {
            title: 'CPQ (standard)',
            benefits: ['Instant pricing with approvals', 'Automated quote packages', 'CRM integration with logging']
          },
          c2p: {
            title: 'C2P (Configure-to-Production)',
            benefits: ['Multi-level BOM output', 'Drawing packs and CNC files', 'ERP/PLM/MES integrations']
          }
        }
      }
    },
    pricing: {
      finePrint: 'Prices are "from" and exclude VAT. Scope and integrations determine the final price.',
      micro: {
        title: 'Micro automation',
        priceDisplay: 'From \u20ac799 excl. VAT',
        note: 'Small step. Fast impact.'
      },
      tiers: {
        light: {
          tagline: 'Fast automations with direct impact',
          priceDisplay: 'From \u20ac999 excl. VAT',
          priceNote: 'All prices exclude VAT; final quote after intake.',
          cta: 'View Light automations'
        },
        manufacturing: {
          tagline: 'Production-ready Sales\u2192BOM & drawing packs',
          priceDisplay: 'From \u20ac1,999 excl. VAT',
          priceNote: 'From-price; scope captured during intake.',
          cta: 'View manufacturing solutions'
        },
        configurators: {
          tagline: 'CPQ & Configure-to-Production for complex products',
          priceDisplay: 'Price on request',
          priceNote: 'Book an intake to assess your use case.',
          cta: 'Book configurator intake'
        }
      }
    },
    useCases: {
      labels: {
        problem: 'Challenge',
        solution: 'Our solution',
        example: 'Example'
      }
    },
    roi: {
      section: {
        title: 'ROI calculator',
        subtitle: 'Return and payback in minutes.'
      }
    },
    cta: {
      button: 'Book an intake'
    }
  }
};

for (const locale of Object.keys(updates)) {
  const file = path.join(__dirname, '..', 'messages', locale + '.json');
  const raw = fs.readFileSync(file, 'utf8').replace(/^\uFEFF/, '');
  const data = JSON.parse(raw);
  const update = updates[locale];

  data.hero = { ...data.hero, ...update.hero };
  data.trust = { ...data.trust, ...update.trust };
  data.solutions = { ...data.solutions, ...update.solutions };
  data.pricing = { ...data.pricing, ...update.pricing };
  data.useCases = { ...data.useCases, ...update.useCases };
  data.roi = { ...data.roi, ...update.roi };
  data.cta = { ...data.cta, ...update.cta };

  if (Array.isArray(data.pricing?.tiers) && update.pricing?.tiers) {
    data.pricing.tiers = data.pricing.tiers.map((tier) => {
      const tierUpdate = update.pricing.tiers[tier.id];
      return tierUpdate ? { ...tier, ...tierUpdate } : tier;
    });
  }

  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}
