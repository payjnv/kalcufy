import { MetadataRoute } from 'next';
import { getSiteSettings } from '@/lib/site-settings';

export default function robots(): MetadataRoute.Robots {
  const settings = getSiteSettings();

  const rules: MetadataRoute.Robots['rules'] = [
    {
      userAgent: '*',
      allow: settings.robots.allowAll ? '/' : undefined,
      disallow: settings.robots.disallowPaths,
    },
  ];

  // Parse custom rules (e.g. "User-agent: GPTBot\nDisallow: /")
  if (settings.robots.customRules) {
    const lines = settings.robots.customRules.split('\n');
    let currentAgent = '';
    let currentDisallow: string[] = [];

    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.toLowerCase().startsWith('user-agent:')) {
        if (currentAgent) {
          rules.push({ userAgent: currentAgent, disallow: currentDisallow });
        }
        currentAgent = trimmed.replace(/user-agent:\s*/i, '').trim();
        currentDisallow = [];
      } else if (trimmed.toLowerCase().startsWith('disallow:')) {
        currentDisallow.push(trimmed.replace(/disallow:\s*/i, '').trim());
      }
    }
    if (currentAgent) {
      rules.push({ userAgent: currentAgent, disallow: currentDisallow });
    }
  }

  return {
    rules,
    sitemap: `${settings.site.url}/sitemap.xml`,
  };
}

