import React from 'react';
import Head from 'next/head';
import { siteConfig } from '@/lib/seo';
import type { SEOConfig } from '@/types/global';

interface SEOHeadProps extends Partial<SEOConfig> {
  children?: React.ReactNode;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  keywords,
  image,
  url,
  author,
  publishedTime,
  modifiedTime,
  type = 'website',
  locale = 'es_ES',
  children,
}) => {
  // Construir valores con defaults
  const pageTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name;
  const pageDescription = description || siteConfig.description;
  const pageKeywords = Array.isArray(keywords) ? keywords.join(', ') : keywords || siteConfig.keywords.join(', ');
  const pageImage = image ? (image.startsWith('http') ? image : `${siteConfig.url}${image}`) : `${siteConfig.url}${siteConfig.ogImage}`;
  const pageUrl = url ? (url.startsWith('http') ? url : `${siteConfig.url}${url}`) : siteConfig.url;
  const pageAuthor = author || siteConfig.author.name;

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content={pageKeywords} />
      <meta name="author" content={pageAuthor} />
      <meta name="creator" content={pageAuthor} />
      <meta name="publisher" content={pageAuthor} />

      {/* Viewport - solo una vez */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      {/* Language */}
      <meta httpEquiv="content-language" content="es" />
      <meta name="language" content="Spanish" />

      {/* Robots */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />

      {/* Open Graph */}
      <meta property="og:type" content={type === 'article' ? 'article' : 'website'} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:site_name" content={siteConfig.name} />
      <meta property="og:locale" content={locale} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:image" content={pageImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={pageTitle} />
      
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {type === 'article' && <meta property="article:author" content={pageAuthor} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={pageImage} />
      {siteConfig.social.twitter && (
        <meta name="twitter:creator" content={`@${siteConfig.social.twitter.split('/').pop() || ''}`} />
      )}

      {/* Canonical URL */}
      <link rel="canonical" href={pageUrl} />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': type === 'article' ? 'Article' : 'WebSite',
            name: pageTitle,
            description: pageDescription,
            url: pageUrl,
            image: pageImage,
            author: {
              '@type': 'Person',
              name: pageAuthor,
            },
            ...(type === 'article' && publishedTime && {
              datePublished: publishedTime,
              dateModified: modifiedTime || publishedTime,
            }),
          }),
        }}
      />

      {/* Google Analytics - solo en producción */}
      {process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_GA_ID && (
        <>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                  anonymize_ip: true,
                  cookie_flags: 'secure;samesite=strict'
                });
              `,
            }}
          />
        </>
      )}

      {/* Custom Children */}
      {children}
    </Head>
  );
};