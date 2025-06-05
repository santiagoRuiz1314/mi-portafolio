// Utilidades para optimización de rendimiento
import { register } from 'module';
import React from 'react';

/**
 * Lazy loading de imágenes con Intersection Observer
 */
export class LazyImageLoader {
  private observer: IntersectionObserver | null = null;
  private images: Set<HTMLImageElement> = new Set();

  constructor() {
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target as HTMLImageElement;
              this.loadImage(img);
            }
          });
        },
        {
          root: null,
          rootMargin: '50px',
          threshold: 0.1,
        }
      );
    }
  }

  observe(img: HTMLImageElement): void {
    if (this.observer) {
      this.images.add(img);
      this.observer.observe(img);
    } else {
      // Fallback para navegadores sin soporte
      this.loadImage(img);
    }
  }

  unobserve(img: HTMLImageElement): void {
    if (this.observer) {
      this.observer.unobserve(img);
      this.images.delete(img);
    }
  }

  private loadImage(img: HTMLImageElement): void {
    const src = img.dataset.src;
    const srcset = img.dataset.srcset;

    if (src) {
      img.src = src;
      img.removeAttribute('data-src');
    }

    if (srcset) {
      img.srcset = srcset;
      img.removeAttribute('data-srcset');
    }

    img.classList.remove('lazy');
    img.classList.add('loaded');

    if (this.observer) {
      this.observer.unobserve(img);
    }
  }

  disconnect(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.images.clear();
    }
  }
}

/**
 * Debounce para optimizar eventos frecuentes
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  immediate?: boolean
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      if (!immediate) func(...args);
    };

    const callNow = immediate && !timeout;
    
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    
    if (callNow) func(...args);
  };
}

/**
 * Throttle para limitar la frecuencia de ejecución
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false;
  
  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Preload de recursos críticos
 */
export function preloadResource(href: string, as: string, type?: string): void {
  if (typeof document === 'undefined') return;

  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = href;
  link.as = as;
  
  if (type) {
    link.type = type;
  }

  document.head.appendChild(link);
}

/**
 * Prefetch de recursos para navegación futura
 */
export function prefetchResource(href: string): void {
  if (typeof document === 'undefined') return;

  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = href;
  
  document.head.appendChild(link);
}

/**
 * Optimización de fuentes con font-display
 */
export function optimizeFonts(): void {
  if (typeof document === 'undefined') return;

  // Precargar fuentes críticas
  preloadResource('/fonts/inter-var.woff2', 'font', 'font/woff2');
  
  // Aplicar font-display: swap a todas las fuentes
  const style = document.createElement('style');
  style.textContent = `
    @font-face {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 100 900;
      font-display: swap;
      src: url('/fonts/inter-var.woff2') format('woff2');
    }
  `;
  
  document.head.appendChild(style);
}

/**
 * Cache de recursos con Service Worker
 */
export function registerServiceWorker(): void {
  if (
    typeof window !== 'undefined' &&
    'serviceWorker' in navigator &&
    process.env.NODE_ENV === 'production'
  ) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration);
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    });
  }
}
        register