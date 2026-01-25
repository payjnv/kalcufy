import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/*/login',
          '/*/register',
          '/*/dashboard',
          '/*/profile',
          '/*/admin',
        ],
      },
    ],
    sitemap: 'https://kalcufy.com/sitemap.xml',
  };
}
