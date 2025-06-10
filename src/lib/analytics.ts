// Versión simplificada de analytics para funcionar sin dependencias externas

/**
 * Hook simple para analytics que funciona sin configuración externa
 */
export function useAnalytics() {
  const track = {
    pageView: (url: string, title?: string) => {
      if (typeof window !== 'undefined') {
        console.log('Page view:', { url, title });
      }
    },
    
    event: (action: string, category: string, label?: string, value?: number) => {
      if (typeof window !== 'undefined') {
        console.log('Event:', { action, category, label, value });
      }
    },

    // Navegación
    navigation: {
      menuClick: (item: string) => {
        console.log('Navigation click:', item);
      },
      logoClick: () => {
        console.log('Logo clicked');
      },
      footerClick: (item: string) => {
        console.log('Footer click:', item);
      },
    },

    // Proyectos
    projects: {
      view: (projectId: string) => {
        console.log('Project viewed:', projectId);
      },
      clickDemo: (projectId: string) => {
        console.log('Demo clicked:', projectId);
      },
      clickGithub: (projectId: string) => {
        console.log('GitHub clicked:', projectId);
      },
      filter: (technology: string) => {
        console.log('Project filtered by:', technology);
      },
    },

    // Contacto
    contact: {
      formSubmit: () => {
        console.log('Contact form submitted');
      },
      formError: (field: string) => {
        console.log('Contact form error:', field);
      },
      emailClick: () => {
        console.log('Email clicked');
      },
      phoneClick: () => {
        console.log('Phone clicked');
      },
      socialClick: (platform: string) => {
        console.log('Social clicked:', platform);
      },
    },

    // Descargas
    downloads: {
      cv: () => {
        console.log('CV downloaded');
      },
      portfolio: () => {
        console.log('Portfolio downloaded');
      },
    },

    // Interacciones
    interactions: {
      themeToggle: (theme: string) => {
        console.log('Theme toggled to:', theme);
      },
      scrollToSection: (section: string) => {
        console.log('Scrolled to section:', section);
      },
    },
  };

  return track;
}

// Exportar por defecto un objeto simple
export default {
  init: () => {
    console.log('Analytics initialized (mock)');
  },
  pageView: (url: string, title?: string) => {
    console.log('Page view:', { url, title });
  },
  event: (action: string, category: string, label?: string, value?: number) => {
    console.log('Event:', { action, category, label, value });
  },
};