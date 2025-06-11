import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, Download, Mail, MapPin, Code, Coffee } from 'lucide-react';
import { cn } from '@/utils/cn';
import { useAnalytics } from '@/lib/analytics';

interface HeroSectionProps {
  name?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  profileImage?: string;
  location?: string;
  availableForWork?: boolean;
  cvUrl?: string;
  className?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  name = 'Tu Nombre',
  title = 'Desarrollador Full Stack',
  subtitle = 'Creando experiencias digitales excepcionales',
  description = 'Desarrollador apasionado especializado en React, Next.js y tecnologías modernas. Me enfoco en crear aplicaciones web escalables y experiencias de usuario intuitivas.',
  profileImage = '/images/foto-perfil.jpg',
  location = 'Bucaramanga, Colombia',
  availableForWork = true,
  cvUrl = '/cv.pdf',
  className,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentWord, setCurrentWord] = useState(0);
  const analytics = useAnalytics();

  const animatedWords = ['Developer', 'Creative', 'Innovative', 'Professional'];

  useEffect(() => {
    setIsVisible(true);
    
    // Animación de palabras rotativas
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % animatedWords.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleDownloadCV = () => {
    analytics.downloads.cv();
  };

  const handleContactClick = () => {
    analytics.contact.emailClick();
  };

  const handleScrollDown = () => {
    const nextSection = document.querySelector('#about') || document.querySelector('main > section:nth-child(2)');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
      analytics.interactions.scrollToSection('about');
    }
  };

  return (
    <section className={cn('relative min-h-screen flex items-center justify-center overflow-hidden', className)}>
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800" />
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f1f5f9' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div 
          className="absolute inset-0 opacity-30 dark:block hidden"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23374151' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className={cn(
            'space-y-6 transition-all duration-1000',
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          )}>
            {/* Status Badge */}
            {availableForWork && (
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100 rounded-full text-sm font-medium">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span>Available for new projects</span>
              </div>
            )}

            {/* Greeting */}
            <div className="space-y-2">
              <p className="text-lg text-gray-600 dark:text-gray-400">
                👋 Hello, I'm
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white">
                {name}
              </h1>
            </div>

            {/* Animated Title */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-2xl sm:text-3xl lg:text-4xl font-semibold">
                <span className="text-gray-700 dark:text-gray-300">I'm</span>
                <span className="text-primary-600 dark:text-primary-400 min-w-[200px] transition-all duration-500">
                  {animatedWords[currentWord]}
                </span>
              </div>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                {subtitle}
              </p>
            </div>

            {/* Description */}
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed">
              {description}
            </p>

            {/* Location */}
            <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
              <MapPin size={18} />
              <span>{location}</span>
            </div>

            {/* Stats */}
            <div className="flex space-x-8 py-4">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 text-2xl font-bold text-gray-900 dark:text-white">
                  <Code size={24} className="text-primary-600 dark:text-primary-400" />
                  <span>3+</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Projects</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 text-2xl font-bold text-gray-900 dark:text-white">
                  <Coffee size={24} className="text-primary-600 dark:text-primary-400" />
                  <span>1+</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Yrs. exp.</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href="/contact"
                onClick={handleContactClick}
                className="btn btn-primary flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all hover:shadow-lg"
              >
                <Mail size={18} />
                <span>Contact</span>
              </Link>
              
              <a
                href={cvUrl}
                download
                onClick={handleDownloadCV}
                className="btn btn-secondary flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all hover:shadow-lg"
              >
                <Download size={18} />
                <span>Download CV</span>
              </a>
            </div>
          </div>

          {/* Profile Image */}
          <div className={cn(
            'relative flex justify-center lg:justify-end transition-all duration-1000 delay-300',
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          )}>
            <div className="relative">
              {/* Decorative Elements */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary-400 to-accent-400 rounded-full blur-lg opacity-20 animate-pulse-gentle" />
              <div className="absolute -inset-2 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full opacity-30" />
              
              {/* Main Image */}
              <div className="relative w-80 h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-2xl">
                <Image
                  src={profileImage}
                  alt={`Foto de perfil de ${name}`}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 320px, 384px"
                />
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center text-white animate-bounce-gentle">
                <Code size={24} />
              </div>
              
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-accent-500 rounded-full flex items-center justify-center text-white animate-bounce-gentle animation-delay-1000">
                <Coffee size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <button
            onClick={handleScrollDown}
            className="flex flex-col items-center space-y-2 text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors group"
            aria-label="Scroll hacia abajo"
          >
            <span className="text-sm font-medium">Explore</span>
            <ArrowDown size={20} className="animate-bounce group-hover:text-primary-600 dark:group-hover:text-primary-400" />
          </button>
        </div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={cn(
              'absolute w-2 h-2 bg-primary-400 rounded-full opacity-30',
              'animate-pulse-gentle'
            )}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
    </section>
  );
};