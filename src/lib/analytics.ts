// Google Analytics y otras herramientas de análisis
import React from 'react';

// Configuración de Google Analytics
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

// Extender tipos de window para TypeScript
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

/**
 * Inicializa Google Analytics
 */
export function initGA(): void {
  if (!GA_TRACKING_ID || typeof window === 'undefined') return;

  // Inicializar dataLayer si no existe
  window.dataLayer = window.dataLayer || [];
  
  // Función gtag
  window.gtag = window.gtag || function(...args: any[]) {
    if (window.dataLayer) {
      window.dataLayer.push(args);
    }
  };

  // Configuración inicial
  if (window.gtag) {
    window.gtag('js', new Date());
    window.gtag('config', GA_TRACKING_ID, {
      page_title: document.title,
      page_location: window.location.href,
      // Respetar la privacidad del usuario
      anonymize_ip: true,
      // Configuraciones de cookies
      cookie_flags: 'secure;samesite=strict',
    });
  }
}

/**
 * Rastrea vistas de página
 */
export function trackPageView(url: string, title?: string): void {
  if (!GA_TRACKING_ID || typeof window === 'undefined' || !window.gtag) return;

  window.gtag('config', GA_TRACKING_ID, {
    page_title: title || document.title,
    page_location: url,
  });
}

/**
 * Rastrea eventos personalizados
 */
export function trackEvent(
  action: string,
  category: string,
  label?: string,
  value?: number
): void {
  if (!GA_TRACKING_ID || typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
}

/**
 * Eventos predefinidos para el portafolio
 */
export const events = {
  // Navegación
  navigation: {
    menuClick: (item: string) => trackEvent('click', 'navigation', `menu_${item}`),
    logoClick: () => trackEvent('click', 'navigation', 'logo'),
    footerClick: (item: string) => trackEvent('click', 'navigation', `footer_${item}`),
  },

  // Proyectos
  projects: {
    view: (projectId: string) => trackEvent('view', 'projects', projectId),
    clickDemo: (projectId: string) => trackEvent('click', 'projects', `demo_${projectId}`),
    clickGithub: (projectId: string) => trackEvent('click', 'projects', `github_${projectId}`),
    filter: (technology: string) => trackEvent('filter', 'projects', technology),
  },

  // Blog
  blog: {
    readPost: (slug: string) => trackEvent('read', 'blog', slug),
    sharePost: (slug: string, platform: string) => 
      trackEvent('share', 'blog', `${slug}_${platform}`),
    likePost: (slug: string) => trackEvent('like', 'blog', slug),
    commentPost: (slug: string) => trackEvent('comment', 'blog', slug),
  },

  // Contacto
  contact: {
    formSubmit: () => trackEvent('submit', 'contact', 'form'),
    formError: (field: string) => trackEvent('error', 'contact', `form_${field}`),
    emailClick: () => trackEvent('click', 'contact', 'email'),
    phoneClick: () => trackEvent('click', 'contact', 'phone'),
    socialClick: (platform: string) => trackEvent('click', 'contact', `social_${platform}`),
  },

  // Descargas
  downloads: {
    cv: () => trackEvent('download', 'documents', 'cv'),
    portfolio: () => trackEvent('download', 'documents', 'portfolio'),
    attachment: (filename: string) => trackEvent('download', 'documents', filename),
  },

  // Interacciones
  interactions: {
    themeToggle: (theme: string) => trackEvent('toggle', 'theme', theme),
    search: (query: string) => trackEvent('search', 'site', query),
    scrollToSection: (section: string) => trackEvent('scroll', 'navigation', section),
    copyEmail: () => trackEvent('copy', 'contact', 'email'),
    copyPhone: () => trackEvent('copy', 'contact', 'phone'),
  },

  // Errores
  errors: {
    pageNotFound: (path: string) => trackEvent('error', '404', path),
    jsError: (error: string) => trackEvent('error', 'javascript', error),
    imageLoadError: (src: string) => trackEvent('error', 'image', src),
  },

  // Performance
  performance: {
    pageLoadTime: (time: number) => trackEvent('timing', 'performance', 'page_load', time),
    apiResponseTime: (endpoint: string, time: number) => 
      trackEvent('timing', 'api', endpoint, time),
  },
};

/**
 * Hook para usar analytics en componentes React
 */
export function useAnalytics() {
  const track = {
    pageView: trackPageView,
    event: trackEvent,
    ...events,
  };

  return track;
}

/**
 * HOC para trackear vistas de página automáticamente
 */
export function withPageTracking<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  pageName?: string
) {
  return function TrackedComponent(props: P) {
    React.useEffect(() => {
      const title = pageName || document.title;
      trackPageView(window.location.pathname, title);
    }, []);

    return React.createElement(WrappedComponent, props);
  };
}

/**
 * Utilidades para consentimiento de cookies (GDPR)
 */
export const cookieConsent = {
  // Verificar si el usuario ha dado consentimiento
  hasConsent(): boolean {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('cookie_consent') === 'true';
  },

  // Establecer consentimiento
  setConsent(consent: boolean): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem('cookie_consent', consent.toString());
    
    if (consent) {
      initGA();
    } else {
      // Limpiar cookies de analytics si se retira el consentimiento
      this.clearAnalyticsCookies();
    }
  },

  // Limpiar cookies de analytics
  clearAnalyticsCookies(): void {
    if (typeof document === 'undefined') return;
    
    const cookies = document.cookie.split(';');
    cookies.forEach(cookie => {
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
      
      // Eliminar cookies de Google Analytics
      if (name.startsWith('_ga') || name.startsWith('_gid')) {
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
      }
    });
  },

  // Verificar si necesita mostrar el banner de cookies
  needsConsentBanner(): boolean {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('cookie_consent') === null;
  },
};

/**
 * Utilidades para Web Vitals
 */
export function reportWebVitals(metric: any): void {
  if (!GA_TRACKING_ID || typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', metric.name, {
    event_category: 'Web Vitals',
    event_label: metric.id,
    value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
    non_interaction: true,
  });
}

/**
 * Rastreo de errores
 */
export function trackError(error: Error, errorInfo?: any): void {
  if (!GA_TRACKING_ID || typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'exception', {
    description: error.message,
    fatal: false,
    error_boundary: errorInfo ? 'true' : 'false',
  });
}

/**
 * Configuración del Google Tag Manager
 */
export function initGTM(): void {
  if (!GTM_ID || typeof window === 'undefined') return;

  // Código del GTM
  const script = document.createElement('script');
  script.innerHTML = `
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','${GTM_ID}');
  `;
  
  document.head.appendChild(script);
}

/**
 * Heatmaps y grabaciones de sesiones (ejemplo con Hotjar)
 */
export function initHotjar(): void {
  const hotjarId = process.env.NEXT_PUBLIC_HOTJAR_ID;
  if (!hotjarId || typeof window === 'undefined') return;

  const script = document.createElement('script');
  script.innerHTML = `
    (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:${hotjarId},hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
  `;
  
  document.head.appendChild(script);
}

/**
 * Inicialización completa de analytics
 */
export function initAnalytics(): void {
  // Solo inicializar si hay consentimiento o si no es necesario (desarrollo)
  if (process.env.NODE_ENV === 'development' || cookieConsent.hasConsent()) {
    initGA();
    initGTM();
    initHotjar();
  }
}

// Exportar configuración por defecto
export default {
  init: initAnalytics,
  track: events,
  pageView: trackPageView,
  event: trackEvent,
  consent: cookieConsent,
  reportWebVitals,
  trackError,
};