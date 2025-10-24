import { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://caribbeanazure.com'

interface GenerateMetadataParams {
  locale: 'nl' | 'en'
  title: string
  description: string
  path: string
  image?: string
  type?: 'website' | 'article' | 'product'
}

/**
 * Generate standardized metadata for pages
 * Includes OpenGraph, Twitter Cards, and SEO tags
 */
export function generatePageMetadata({
  locale,
  title,
  description,
  path,
  image = '/og-image.png',
  type = 'website',
}: GenerateMetadataParams): Metadata {
  const fullTitle = title.includes('|') ? title : `${title} | Caribbean Azure`
  const url = `${baseUrl}${locale === 'en' ? '/en' : ''}${path}`
  const imageUrl = image.startsWith('http') ? image : `${baseUrl}${image}`

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: url,
      languages: {
        nl: `${baseUrl}${path}`,
        en: `${baseUrl}/en${path}`,
        'x-default': `${baseUrl}${path}`,
      },
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: 'Caribbean Azure',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: locale === 'nl' ? 'nl_NL' : 'en_US',
      type: type === 'product' ? 'website' : type, // OpenGraph only supports 'website' or 'article'
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [imageUrl],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

/**
 * Homepage metadata
 */
export const homeMetadata = {
  nl: {
    title: 'Caribbean Azure - Automatisering voor MKB',
    description:
      'Van aanvraag tot productie—geautomatiseerd voor MKB-makers. Workflow automatisering, AI-oplossingen en configurators voor Nederlandse maakindustrie.',
  },
  en: {
    title: 'Caribbean Azure - Automation for SMEs',
    description:
      'From request to production—automated for SME manufacturers. Workflow automation, AI solutions and configurators for Dutch manufacturing.',
  },
}

/**
 * Solutions metadata
 */
export const solutionsMetadata = {
  light: {
    nl: {
      title: 'Light Automations - vanaf €999',
      description:
        'Automatiseer inbox-to-action, leads-naar-booking en basis workflows. Elimineer repetitief werk voor je team.',
    },
    en: {
      title: 'Light Automations - from €999',
      description:
        'Automate inbox-to-action, leads-to-booking and basic workflows. Eliminate repetitive work for your team.',
    },
  },
  manufacturing: {
    nl: {
      title: 'Maakindustrie Automatisering - vanaf €1.999',
      description:
        'Sales→BOM & Drawing Packs automatisering. Van offerte direct naar productie-klare output zonder handmatige stappen.',
    },
    en: {
      title: 'Manufacturing Automation - from €1,999',
      description:
        'Sales→BOM & Drawing Packs automation. From quote directly to production-ready output without manual steps.',
    },
  },
  configurators: {
    nl: {
      title: 'CPQ & Configure-to-Production',
      description:
        'Enterprise configurators die complexe producten vertalen naar fabricage-klare output. CPQ en C2P voor de maakindustrie.',
    },
    en: {
      title: 'CPQ & Configure-to-Production',
      description:
        'Enterprise configurators that translate complex products into manufacturing-ready output. CPQ and C2P for manufacturing.',
    },
  },
}

/**
 * About page metadata
 */
export const aboutMetadata = {
  nl: {
    title: 'Over Ons - Caribbean Azure',
    description:
      'Pragmatische automatisering voor Nederlandse MKB. EU-first, ROI-gedreven, open workflows zonder vendor lock-in.',
  },
  en: {
    title: 'About Us - Caribbean Azure',
    description:
      'Pragmatic automation for Dutch SMEs. EU-first, ROI-driven, open workflows without vendor lock-in.',
  },
}
