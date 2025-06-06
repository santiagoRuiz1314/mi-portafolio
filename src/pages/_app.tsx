import React, { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import '@/styles/globals.css';

// Importar analytics de forma segura
let analytics: any = null;
try {
  analytics = require('@/lib/analytics').default;
} catch (error) {
  // Analytics no disponible en desarrollo
  if (process.env.NODE_ENV === 'development') {
    console.log('Analytics not available in development');
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  // Evitar hidration mismatch esperando a que el componente se monte
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Inicializar analytics solo en el cliente
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

  // Error boundary mejorado
  const [hasError, setHasError] = React.useState(false);

  React.useEffect(() => {
    const handleError = (error: ErrorEvent) => {
      console.error('Global error:', error);
      setHasError(true);
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error('Unhandled promise rejection:', event.reason);
      setHasError(true);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('error', handleError);
      window.addEventListener('unhandledrejection', handleUnhandledRejection);
      
      return () => {
        window.removeEventListener('error', handleError);
        window.removeEventListener('unhandledrejection', handleUnhandledRejection);
      };
    }
  }, []);

  // Mostrar loading hasta que el componente esté montado
  if (!isMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center max-w-md mx-auto p-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Algo salió mal
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Ocurrió un error inesperado. Por favor, recarga la página.
          </p>
          <button
            onClick={() => {
              setHasError(false);
              window.location.reload();
            }}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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