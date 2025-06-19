import type { Metadata } from 'next';
import type { SEOConfig } from '@/types/global';


export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'Mi Portafolio',
  description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION || 'Portafolio personal de desarrollo web',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://tu-dominio.com',
  ogImage: '/images/og-image.jpg',
  creator: 'Santiago Steven Ruiz Carreño',
  keywords: [
    'desarrollador web',
    'frontend',
    'backend',
    'fullstack',
    'react',
    'nextjs',
    'typescript',
    'javascript',
    'portafolio',
    'programador',
  ],
  author: {
    name: 'Santiago Steven Ruiz Carreño',
    email: 'santiago06ruiz@gmail.com',
    url: 'https://tu-dominio.com',
  },
  social: {
    twitter: process.env.NEXT_PUBLIC_TWITTER_URL || 'https://x.com/',
    github: process.env.NEXT_PUBLIC_GITHUB_URL || 'https://github.com/santiagoRuiz1314',
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || 'https://linkedin.com/in/santiago-steven-ruiz-carreño-880571369',
  },
};


export function generateSEO(config: Partial<SEOConfig> = {}): Metadata {
  const {
    title = siteConfig.name,
    description = siteConfig.description,
    image = siteConfig.ogImage,
    url = siteConfig.url,
    type = 'website',
    publishedTime,
    modifiedTime,
    keywords = siteConfig.keywords,
    author = siteConfig.author.name,
  } = config;

  const fullTitle = title === siteConfig.name ? title : `${title} | ${siteConfig.name}`;
  const imageUrl = image?.startsWith('http') ? image : `${siteConfig.url}${image}`;
  const pageUrl = url?.startsWith('http') ? url : `${siteConfig.url}${url}`;

  return {
    title: fullTitle,
    description,
    keywords: Array.isArray(keywords) ? keywords.join(', ') : keywords,
    authors: [{ name: author, url: siteConfig.author.url }],
    creator: siteConfig.creator,
    publisher: siteConfig.creator,
    
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

    openGraph: {
      type: type === 'article' ? 'article' : 'website',
      locale: 'es_ES',
      url: pageUrl,
      title: fullTitle,
      description,
      siteName: siteConfig.name,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(type === 'article' && {
        publishedTime,
        modifiedTime,
        authors: [author],
      }),
    },

    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [imageUrl],
      ...(siteConfig.social.twitter && {
        creator: `@${siteConfig.social.twitter.split('/').pop() || ''}`,
      }),
    },

    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon-16x16.png',
      apple: '/apple-touch-icon.png',
    },

    manifest: '/site.webmanifest',

    alternates: {
      canonical: pageUrl,
      types: {
        'application/rss+xml': `${siteConfig.url}/feed.xml`,
      },
    },

    ...(process.env.GOOGLE_SITE_VERIFICATION && {
      verification: {
        google: process.env.GOOGLE_SITE_VERIFICATION,
        ...(process.env.YANDEX_VERIFICATION && { yandex: process.env.YANDEX_VERIFICATION }),
        ...(process.env.YAHOO_VERIFICATION && { yahoo: process.env.YAHOO_VERIFICATION }),
      },
    }),

    category: 'technology',
  };
}


export function generateBlogSEO(config: {
  title: string;
  description: string;
  slug: string;
  image?: string;
  publishedTime: string;
  modifiedTime?: string;
  tags?: string[];
  author?: string;
}): Metadata {
  const {
    title,
    description,
    slug,
    image,
    publishedTime,
    modifiedTime,
    tags = [],
    author = siteConfig.author.name,
  } = config;

  return generateSEO({
    title,
    description,
    url: `/blog/${slug}`,
    image: image || '/images/blog/default-og.jpg',
    type: 'article',
    publishedTime,
    modifiedTime: modifiedTime || publishedTime,
    keywords: [...siteConfig.keywords, ...tags],
    author,
  });
}


export function generateProjectSEO(config: {
  title: string;
  description: string;
  slug: string;
  image?: string;
  technologies?: string[];
}): Metadata {
  const {
    title,
    description,
    slug,
    image,
    technologies = [],
  } = config;

  return generateSEO({
    title,
    description,
    url: `/projects/${slug}`,
    image: image || '/images/projects/default-og.jpg',
    keywords: [...siteConfig.keywords, ...technologies],
  });
}


export function generateJSONLD(type: 'Person' | 'Article' | 'WebSite' | 'Organization', data: any = {}) {
  const baseData = {
    '@context': 'https://schema.org',
    '@type': type,
  };

  switch (type) {
    case 'Person':
      return {
        ...baseData,
        name: siteConfig.author.name,
        url: siteConfig.url,
        email: siteConfig.author.email,
        jobTitle: 'Desarrollador Web',
        worksFor: {
          '@type': 'Organization',
          name: 'Freelancer',
        },
        sameAs: Object.values(siteConfig.social).filter(Boolean),
        image: `${siteConfig.url}/images/foto-perfil.jpg`,
        ...data,
      };

    case 'Article':
      return {
        ...baseData,
        headline: data.title,
        description: data.description,
        image: data.image ? `${siteConfig.url}${data.image}` : `${siteConfig.url}/images/blog/default-og.jpg`,
        author: {
          '@type': 'Person',
          name: siteConfig.author.name,
          url: siteConfig.url,
        },
        publisher: {
          '@type': 'Organization',
          name: siteConfig.name,
          logo: {
            '@type': 'ImageObject',
            url: `${siteConfig.url}/images/logo.png`,
          },
        },
        datePublished: data.publishedTime,
        dateModified: data.modifiedTime || data.publishedTime,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${siteConfig.url}/blog/${data.slug}`,
        },
        ...data,
      };

    case 'WebSite':
      return {
        ...baseData,
        name: siteConfig.name,
        description: siteConfig.description,
        url: siteConfig.url,
        author: {
          '@type': 'Person',
          name: siteConfig.author.name,
        },
        potentialAction: {
          '@type': 'SearchAction',
          target: `${siteConfig.url}/search?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
        ...data,
      };

    case 'Organization':
      return {
        ...baseData,
        name: siteConfig.name,
        url: siteConfig.url,
        logo: `${siteConfig.url}/images/logo.png`,
        sameAs: Object.values(siteConfig.social).filter(Boolean),
        contactPoint: {
          '@type': 'ContactPoint',
          email: siteConfig.author.email,
          contactType: 'customer service',
        },
        ...data,
      };

    default:
      return baseData;
  }
}

export function generateBreadcrumbsJSONLD(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${siteConfig.url}${item.url}`,
    })),
  };
}


export function generateFAQJSONLD(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function generateRobotsTxt(): string {
  const baseUrl = siteConfig.url;
  
  return `
User-agent: *
Allow: /

# Bloquear archivos sensibles
Disallow: /api/
Disallow: /_next/
Disallow: /admin/
Disallow: *.json$
Disallow: *.xml$

# Permitir específicamente
Allow: /api/og/
Allow: /sitemap.xml
Allow: /robots.txt

# Crawl delay
Crawl-delay: 1

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml
  `.trim();
}


export const seoCache = {
  revalidate: 3600, 
  tags: ['seo', 'metadata'],
};