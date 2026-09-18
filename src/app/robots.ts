import type { MetadataRoute } from 'next';

/**
 * Marketing site — open to every crawler. If we ever add a preview
 * route that shouldn't index (e.g. a staging tunnel), disallow it here
 * rather than relying on a per-page `noindex` meta.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: 'https://runmira.com/sitemap.xml',
    host: 'https://runmira.com',
  };
}
