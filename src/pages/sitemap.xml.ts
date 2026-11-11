import type { APIRoute } from 'astro';
import { SITE_URL } from '../consts';

export const prerender = true;

export const GET: APIRoute = async () => {
  const baseUrl = SITE_URL;
  const routes = [
    '',
    'en',
    'templates',
    'en/templates',
    'portfolio',
    'en/portfolio',
    'privacy-policy',
    'en/privacy-policy',
    'personal-data-consent',
    'en/personal-data-consent',
    '404',
    'en/404',
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${routes
    .map(
      (route) => `
    <url>
      <loc>${baseUrl}/${route}</loc>
      <changefreq>monthly</changefreq>
      <priority>${route === '' || route === 'en' ? '1.0' : '0.8'}</priority>
    </url>`
    )
    .join('')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
};