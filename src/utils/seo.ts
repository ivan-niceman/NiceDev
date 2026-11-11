export interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  lang: 'ru' | 'en';
  canonicalPath?: string;
  siteUrl?: string;
}

/**
 * Generates SEO meta tags object for use in Astro components.
 * Returns an object with properties that can be spread into JSX.
 */
export function generateSEO({
  title,
  description,
  keywords,
  lang = 'ru',
  canonicalPath = '/',
  siteUrl = 'https://nice-dev.ru',
}: SEOProps) {
  const cleanSite = siteUrl.replace(/\/+$/, '');
  const cleanPath = canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`;
  const canonicalURL = `${cleanSite}${cleanPath}`;
  const ogLocale = lang === 'ru' ? 'ru_RU' : 'en_US';
  const ogAlternateLocale = lang === 'ru' ? 'en_US' : 'ru_RU';

  return {
    title,
    metaTitle: title,
    metaDescription: description,
    ...(keywords && { metaKeywords: keywords }),
    canonical: canonicalURL,
    ogLocale,
    ogAlternateLocale,
    // Additional tags can be added here
  };
}