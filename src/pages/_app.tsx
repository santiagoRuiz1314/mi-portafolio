import React from 'react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import '@/styles/globals.css';

// Importar analytics si está disponible
let analytics: any = null;
try {
  analytics = require('@/lib/analytics').default;
} catch (error) {
  console.log('Analytics not available');
}

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    // Inicializar analytics si está disponible
    if (analytics?.init && typeof window !== 'undefined') {
      analytics.init();
    }

    // Manejar cambios de ruta para analytics
    const handleRouteChange = (url: string) => {
      if (analytics?.pageView) {
        analytics.pageView(url);
      }
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  // Error boundary simple
  const [hasError, setHasError] = React.useState(false);

  React.useEffect(() => {
    const handleError = (error: ErrorEvent) => {
      console.error('Global error:', error);
      setHasError(true);
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (hasError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Algo salió mal
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Ocurrió un error inesperado. Por favor, recarga la página.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Recargar página
          </button>
        </div>
      </div>
    );
  }

  return <Component {...pageProps} />;
}

export default MyApp;