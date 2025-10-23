import { siteConfig } from '@/config/site'

export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Caribbean Azure',
    alternateName: 'Caribbean Azure Automation Studio',
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    description: siteConfig.description,
    email: siteConfig.contact.email,
    telephone: siteConfig.contact.phone,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'NL',
      addressLocality: 'Nederland',
    },
    sameAs: [
      siteConfig.links.whatsapp,
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: siteConfig.contact.phone,
      email: siteConfig.contact.email,
      contactType: 'customer support',
      availableLanguage: ['nl'],
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function ServiceSchema() {
  const services = [
    {
      '@type': 'Service',
      serviceType: 'Workflow Automatisering',
      provider: {
        '@type': 'Organization',
        name: 'Caribbean Azure',
      },
      description: 'We nemen terugkerende taken uit handen. E-mails, boekhouding, klantopvolging — het loopt gewoon. Jij focust op het werk dat telt.',
      areaServed: {
        '@type': 'Country',
        name: 'Nederland',
      },
    },
    {
      '@type': 'Service',
      serviceType: 'AI-assistenten & chatbots',
      provider: {
        '@type': 'Organization',
        name: 'Caribbean Azure',
      },
      description: 'We bouwen bots die klanten verder helpen, afspraken plannen of offertes voorbereiden. Via je website of WhatsApp, klaar voor productie.',
      areaServed: {
        '@type': 'Country',
        name: 'Nederland',
      },
    },
    {
      '@type': 'Service',
      serviceType: 'Dashboards & rapportage',
      provider: {
        '@type': 'Organization',
        name: 'Caribbean Azure',
      },
      description: 'Inzicht zonder ruis. Je ziet wat er goed gaat, waar tijd weglekt en waar je het beste kunt bijsturen.',
      areaServed: {
        '@type': 'Country',
        name: 'Nederland',
      },
    },
    {
      '@type': 'Service',
      serviceType: 'Webdesign met impact',
      provider: {
        '@type': 'Organization',
        name: 'Caribbean Azure',
      },
      description: 'Snel, helder en prettig in gebruik. Je site is mooi, maar vooral effectief — gekoppeld aan je automatisering en klaar om te groeien.',
      areaServed: {
        '@type': 'Country',
        name: 'Nederland',
      },
    },
  ]

  const schema = {
    '@context': 'https://schema.org',
    '@graph': services,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Caribbean Azure',
    image: `${siteConfig.url}/logo.png`,
    '@id': siteConfig.url,
    url: siteConfig.url,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    priceRange: '€€',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'NL',
    },
    geo: {
      '@type': 'GeoCoordinates',
      addressCountry: 'NL',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday'
      ],
      opens: '09:00',
      closes: '17:00'
    },
    sameAs: [
      siteConfig.links.whatsapp,
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function WebsiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Caribbean Azure',
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: 'nl',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.url}/?s={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
