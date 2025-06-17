import React from 'react';
import Link from 'next/link';
import { Github, Linkedin, Mail, Heart, ArrowUp } from 'lucide-react';
import { useAnalytics } from '@/lib/analytics';
import { cn } from '@/utils/cn';

const socialLinks = [
  {
    href: process.env.NEXT_PUBLIC_GITHUB_URL || '#',
    icon: Github,
    label: 'GitHub',
    color: 'hover:text-gray-900 dark:hover:text-white',
  },
  {
    href: process.env.NEXT_PUBLIC_LINKEDIN_URL || '#',
    icon: Linkedin,
    label: 'LinkedIn',
    color: 'hover:text-blue-600',
  },
  {
    href: 'mailto:' + (process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'contacto@ejemplo.com'),
    icon: Mail,
    label: 'Email',
    color: 'hover:text-red-500',
  },
];

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Me' },
  { href: '/projects', label: 'Projects' },
  { href: '/skills', label: 'Skills' },
];

const resourceLinks = [
  { href: '/contact', label: 'contact' }
];

export const Footer: React.FC = () => {
  const analytics = useAnalytics();
  const currentYear = new Date().getFullYear();

  const handleSocialClick = (platform: string) => {
    analytics.contact.socialClick(platform);
  };

  const handleLinkClick = (label: string) => {
    analytics.navigation.footerClick(label.toLowerCase());
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    analytics.interactions.scrollToSection('top');
  };

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Brand & Description */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                MP
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                Mi Portafolio
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
              Passionate web developer focused on creating exceptional digital experiences.
              Specialized in React, Next.js, and modern technologies.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map(({ href, icon: Icon, label, color }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className={cn(
                    'p-2 text-gray-500 dark:text-gray-400 transition-colors rounded-lg',
                    'hover:bg-gray-100 dark:hover:bg-gray-800',
                    color
                  )}
                  aria-label={label}
                  onClick={() => handleSocialClick(label.toLowerCase())}
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Navigation
            </h3>
            <ul className="space-y-3">
              {quickLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    onClick={() => handleLinkClick(label)}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Resources
            </h3>
            <ul className="space-y-3">
              {resourceLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    onClick={() => handleLinkClick(label)}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            {/* Copyright */}
            <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400 mb-4 md:mb-0">
              <span>© {currentYear} Mi Portafolio. Built with</span>
              <Heart size={14} className="text-red-500 fill-current" />
              <span>using</span>
              <a
                href="https://nextjs.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 dark:text-primary-400 hover:underline"
              >
                Next.js
              </a>
            </div>

            {/* Back to Top */}
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              aria-label="Volver al inicio"
            >
              <span>Back to Top</span>
              <ArrowUp size={16} />
            </button>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-500">
            Developed with best practices in accessibility.
          </p>
        </div>
      </div>

      {/* Google Tag Manager (noscript) */}
      {process.env.NEXT_PUBLIC_GTM_ID && (
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
      )}
    </footer>
  );
};