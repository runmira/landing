import type { MetadataRoute } from 'next';

/**
 * Single-page marketing site — one entry today. When we add subroutes
 * (e.g. /docs, /pricing), extend this array; Next handles the XML
 * serialization + Vercel's build hooks it into `/sitemap.xml`.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://runmira.com',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
  ];
}
