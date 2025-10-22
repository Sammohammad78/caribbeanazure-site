import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://caribbeanazur.nl' // TODO: Replace with actual domain

  const routes = [
    '',
    '/diensten',
    '/cases',
    '/over-ons',
    '/inzichten',
    '/contact',
    '/privacybeleid',
    '/voorwaarden',
  ]

  const locales = ['nl', 'en']

  const urls: MetadataRoute.Sitemap = []

  locales.forEach((locale) => {
    routes.forEach((route) => {
      urls.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'daily' : 'weekly',
        priority: route === '' ? 1 : 0.8,
      })
    })
  })

  return urls
}
