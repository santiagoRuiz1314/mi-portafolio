/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Habilitar para detectar problemas
  swcMinify: true,
  
  // Configuración de imágenes mejorada
  images: {
    domains: ['localhost'],
    formats: ['image/webp', 'image/avif'],
    unoptimized: false, // Cambiar a false para optimización
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Configuración básica
  compress: true,
  trailingSlash: false,
  poweredByHeader: false,

  // Variables de entorno públicas
  env: {
    SITE_NAME: 'Mi Portafolio',
    SITE_URL: process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000',
  },

  // Configuración experimental mejorada
  experimental: {
    // Remover configuraciones problemáticas
    optimizeCss: false,
  },

  // Configuración de webpack para evitar problemas de hidratación
  webpack: (config, { dev, isServer }) => {
    // Optimizaciones solo para producción
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          vendor: {
            name: 'vendor',
            chunks: 'all',
            test: /node_modules/,
          },
        },
      };
    }
    
    return config;
  },

  // Headers de seguridad
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;