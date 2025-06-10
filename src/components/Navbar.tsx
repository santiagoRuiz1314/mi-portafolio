import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Menu, X, Sun, Moon, Github, Linkedin, Mail } from 'lucide-react';
import { cn } from '@/utils/cn';
import { useAnalytics } from '@/lib/analytics';

interface NavItem {
  href: string;
  label: string;
  external?: boolean;
}

const navigation: NavItem[] = [
  { href: '/', label: 'Inicio' },
  { href: '/about', label: 'Sobre mí' },
  { href: '/projects', label: 'Proyectos' },
  { href: '/skills', label: 'Habilidades' },
  { href: '/contact', label: 'Contacto' },
];

const socialLinks = [
  {
    href: process.env.NEXT_PUBLIC_GITHUB_URL || 'https://github.com/santiagoRuiz1314',
    icon: Github,
    label: 'GitHub',
  },
  {
    href: process.env.NEXT_PUBLIC_LINKEDIN_URL || 'https://linkedin.com/in/santiago-steven-ruiz-carreño-880571369',
    icon: Linkedin,
    label: 'LinkedIn',
  },
  {
    href: 'mailto:' + (process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'santiago06ruiz@gmail.com'),
    icon: Mail,
    label: 'Email',
  },
];

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const analytics = useAnalytics();

  // Detectar scroll para cambiar apariencia del navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Manejar tema oscuro
  useEffect(() => {
    const theme = localStorage.getItem('theme');
    const isDarkMode = theme === 'dark' || 
      (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    setIsDark(isDarkMode);
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    localStorage.setItem('theme', newIsDark ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', newIsDark);
    analytics.interactions.themeToggle(newIsDark ? 'dark' : 'light');
  };

  const handleNavClick = (item: NavItem) => {
    setIsOpen(false);
    analytics.navigation.menuClick(item.label.toLowerCase());
  };

  const handleLogoClick = () => {
    analytics.navigation.logoClick();
  };

  const handleSocialClick = (platform: string) => {
    analytics.contact.socialClick(platform);
  };

  const isActiveRoute = (href: string) => {
    if (href === '/') {
      return router.pathname === '/';
    }
    return router.pathname.startsWith(href);
  };

  const navbarClasses = cn(
    'sticky top-0 z-50 w-full transition-all duration-300',
    scrolled 
      ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-md border-b border-gray-200/20 dark:border-gray-700/20'
      : 'bg-transparent'
  );

  return (
    <header className={navbarClasses}>
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center space-x-2 text-xl font-bold text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              onClick={handleLogoClick}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                MP
              </div>
              <span className="hidden sm:block">Mi Portafolio</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'px-3 py-2 rounded-md text-sm font-medium transition-colors relative',
                    isActiveRoute(item.href)
                      ? 'text-primary-600 dark:text-primary-400'
                      : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'
                  )}
                  onClick={() => handleNavClick(item)}
                >
                  {item.label}
                  {isActiveRoute(item.href) && (
                    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary-500 rounded-full" />
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Social Links */}
            <div className="flex items-center space-x-2">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="p-2 text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  aria-label={label}
                  onClick={() => handleSocialClick(label.toLowerCase())}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              aria-label={isDark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Theme Toggle Mobile */}
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              aria-label={isDark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Hamburger Menu */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              aria-label="Abrir menú de navegación"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-gray-800 rounded-lg mt-2 shadow-lg border border-gray-200 dark:border-gray-700">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'block px-3 py-2 rounded-md text-base font-medium transition-colors',
                    isActiveRoute(item.href)
                      ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20'
                      : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                  )}
                  onClick={() => handleNavClick(item)}
                >
                  {item.label}
                </Link>
              ))}
              
              {/* Mobile Social Links */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-center space-x-6">
                  {socialLinks.map(({ href, icon: Icon, label }) => (
                    <a
                      key={label}
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="p-3 text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                      aria-label={label}
                      onClick={() => handleSocialClick(label.toLowerCase())}
                    >
                      <Icon size={20} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};