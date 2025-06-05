module.exports = {
  plugins: {
    'tailwindcss': {},
    'autoprefixer': {},
    // Optimizaciones adicionales para producción
    ...(process.env.NODE_ENV === 'production' && {
      'cssnano': {
        preset: ['default', {
          discardComments: {
            removeAll: true,
          },
          normalizeWhitespace: false,
        }],
      },
      '@fullhuman/postcss-purgecss': {
        content: [
          './src/pages/**/*.{js,ts,jsx,tsx}',
          './src/components/**/*.{js,ts,jsx,tsx}',
          './src/**/*.{js,ts,jsx,tsx}',
        ],
        defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
        safelist: [
          // Clases que no deben ser eliminadas
          'html',
          'body',
          /^prose/,
          /^hljs/,
          // Clases de animación
          /^animate-/,
          // Clases de transición
          /^transition-/,
          // Clases de estado
          /^hover:/,
          /^focus:/,
          /^active:/,
          /^group-hover:/,
          // Clases de responsive
          /^sm:/,
          /^md:/,
          /^lg:/,
          /^xl:/,
          /^2xl:/,
          // Clases dinámicas comunes
          /^bg-.*-[0-9]+$/,
          /^text-.*-[0-9]+$/,
          /^border-.*-[0-9]+$/,
        ],
      },
    }),
  },
};