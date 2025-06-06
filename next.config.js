/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Temporalmente deshabilitado para evitar hydration issues
  swcMinify: true,
  
  // Configuración de imágenes
  images: {
    domains: ['localhost'],
    formats: ['image/webp', 'image/avif'],
    unoptimized: true, // Simplifica el manejo de imágenes
  },

  // Configuración básica
  compress: true,
  trailingSlash: false,

  // Variables de entorno públicas
  env: {
    SITE_NAME: 'Mi Portafolio',
    SITE_URL: process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000',
  },

  // Configuración experimental para mejorar hydration
  experimental: {
    // Optimizaciones que pueden ayudar
    optimizeCss: false,
  },
};

module.exports = nextConfig;