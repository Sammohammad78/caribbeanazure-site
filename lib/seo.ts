/**
 * Returns Schema.org organization structured data for Caribbean Azure.
 */
export function organizationStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Caribbean Azure',
    url: 'https://caribbeanazure.com',
    logo: 'https://caribbeanazure.com/logo.svg',
  };
}

/**
 * Returns Schema.org website structured data for Caribbean Azure.
 */
export function websiteStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Caribbean Azure',
    url: 'https://caribbeanazure.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://caribbeanazure.com/?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };
}