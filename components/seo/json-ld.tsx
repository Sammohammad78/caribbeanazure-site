import Script from 'next/script'

/**
 * Organization Schema
 * Use on homepage and key pages
 */
interface OrganizationSchemaProps {
  locale: 'nl' | 'en'
}

export function OrganizationSchema({ locale }: OrganizationSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Caribbean Azure',
    alternateName: 'Caribbean Azure Automation',
    url: 'https://caribbeanazure.com',
    logo: 'https://caribbeanazure.com/logo.png',
    description:
      locale === 'nl'
        ? 'Van aanvraag tot productie—geautomatiseerd voor MKB-makers. Workflow automatisering, AI-oplossingen en configurators voor de maakindustrie.'
        : 'From request to production—automated for SME manufacturers. Workflow automation, AI solutions and configurators for manufacturing.',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'NL',
      addressRegion: 'Nederland',
    },
    sameAs: [
      // Add social profiles when available
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Sales',
      availableLanguage: ['nl', 'en'],
    },
  }

  return (
    <Script
      id="organization-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

/**
 * Product Schema for Tier 1 & 2 ONLY
 * NEVER use for Tier 3 (configurators)
 */
interface ProductSchemaProps {
  tier: 'light' | 'manufacturing' // Explicitly exclude configurators
  locale: 'nl' | 'en'
  basePrice: number
}

export function ProductSchema({ tier, locale, basePrice }: ProductSchemaProps) {
  const products = {
    light: {
      nl: {
        name: 'Light Automations',
        description:
          'Automatiseer inbox-to-action, leads-naar-booking en basis workflows. Voor teams die repetitief werk willen elimineren.',
      },
      en: {
        name: 'Light Automations',
        description:
          'Automate inbox-to-action, leads-to-booking and basic workflows. For teams that want to eliminate repetitive work.',
      },
    },
    manufacturing: {
      nl: {
        name: 'Maakindustrie Automatisering',
        description:
          'Sales→BOM & Drawing Packs automatisering. Van offerte direct naar productie-klare output zonder handmatige stappen.',
      },
      en: {
        name: 'Manufacturing Automation',
        description:
          'Sales→BOM & Drawing Packs automation. From quote directly to production-ready output without manual steps.',
      },
    },
  }

  const product = products[tier][locale]

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    brand: {
      '@type': 'Brand',
      name: 'Caribbean Azure',
    },
    offers: {
      '@type': 'Offer',
      price: basePrice,
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 1 year from now
      url: `https://caribbeanazure.com/${locale === 'en' ? 'en/' : ''}oplossingen/${tier}`,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '23',
    },
  }

  return (
    <Script
      id={`product-schema-${tier}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

/**
 * FAQ Schema
 * Use on pages with FAQ sections
 */
interface FAQSchemaProps {
  faqs: Array<{
    question: string
    answer: string
  }>
}

export function FAQSchema({ faqs }: FAQSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <Script
      id="faq-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

/**
 * Breadcrumb Schema
 * Use on all pages except homepage
 */
interface BreadcrumbSchemaProps {
  items: Array<{
    name: string
    url: string
  }>
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return (
    <Script
      id="breadcrumb-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
