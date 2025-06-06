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

      {/* Viewport */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      {/* Language */}
      <meta httpEquiv="content-language" content="es" />
      <meta name="language" content="Spanish" />

      {/* Robots */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />

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

      {/* Icons */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="shortcut icon" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

      {/* Manifest */}
      <link rel="manifest" href="/site.webmanifest" />

      {/* Canonical URL */}
      <link rel="canonical" href={pageUrl} />

      {/* DNS Prefetch */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />

      {/* Preconnect */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

      {/* Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />

      {/* Theme Color */}
      <meta name="theme-color" content="#3b82f6" />
      <meta name="msapplication-TileColor" content="#3b82f6" />

      {/* Apple Meta Tags */}
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content={pageTitle} />

      {/* Microsoft Meta Tags */}
      <meta name="msapplication-config" content="/browserconfig.xml" />

      {/* Additional Meta Tags for better SEO */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="HandheldFriendly" content="true" />
      <meta name="MobileOptimized" content="320" />

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

      {/* Google Analytics */}
      {process.env.NEXT_PUBLIC_GA_ID && (
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
                  page_title: document.title,
                  page_location: window.location.href,
                  anonymize_ip: true,
                  cookie_flags: 'secure;samesite=strict'
                });
              `,
            }}
          />
        </>
      )}

      {/* Google Tag Manager */}
      {process.env.NEXT_PUBLIC_GTM_ID && (
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');
            `,
          }}
        />
      )}

      {/* Verification Tags */}
      {process.env.GOOGLE_SITE_VERIFICATION && (
        <meta name="google-site-verification" content={process.env.GOOGLE_SITE_VERIFICATION} />
      )}

      {/* Custom Children */}
      {children}
    </Head>
  );
};