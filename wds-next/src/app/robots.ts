import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const isProduction = process.env.NODE_ENV === 'production' || process.env.VERCEL_ENV === 'production';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/api/'],
    },
    sitemap: 'https://warsawduragstore.pl/sitemap.xml',
  };
}
