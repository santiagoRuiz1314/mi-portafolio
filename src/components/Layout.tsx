import React from 'react';
import Head from 'next/head';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { SEOHead } from './SEOHead';
import { cn } from '@/utils/cn';
import type { SEOConfig } from '@/types/global';

interface LayoutProps {
  children: React.ReactNode;
  seo?: Partial<SEOConfig>;
  className?: string;
  showNavbar?: boolean;
  showFooter?: boolean;
  containerized?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  seo,
  className,
  showNavbar = true,
  showFooter = true,
  containerized = true,
}) => {
  const mainClasses = cn(
    'min-h-screen flex flex-col',
    'bg-white dark:bg-gray-900',
    'text-gray-900 dark:text-white',
    'transition-colors duration-300',
    className
  );

  const contentClasses = cn(
    'flex-1',
    containerized && 'container mx-auto px-4 sm:px-6 lg:px-8'
  );

  return (
    <>
      <SEOHead {...seo} />
      <div className={mainClasses}>
        {/* Skip to content para accesibilidad */}
        <a
          href="#main-content"
          className="skip-link"
          tabIndex={1}
        >
          Saltar al contenido principal
        </a>

        {showNavbar && <Navbar />}
        
        <main
          id="main-content"
          className={contentClasses}
          role="main"
        >
          {children}
        </main>
        
        {showFooter && <Footer />}
      </div>
    </>
  );
};