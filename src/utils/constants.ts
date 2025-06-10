// Información personal y configuración del sitio
export const SITE_CONFIG = {
  name: 'Mi Portafolio',
  author: 'Tu Nombre',
  title: 'Desarrollador Full Stack',
  subtitle: 'Creando experiencias digitales excepcionales',
  description: 'Desarrollador web apasionado especializado en React, Next.js y tecnologías modernas. Me enfoco en crear aplicaciones web escalables y experiencias de usuario intuitivas.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://tu-dominio.com',
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'contacto@ejemplo.com',
  phone: '+57 300 123 4567',
  location: 'Bucaramanga, Colombia',
  birthDate: '1995-06-15',
  yearsOfExperience: 5,
  availableForWork: true,
  profileImage: '/images/foto-perfil.jpg',
  cvUrl: '/cv.pdf',
};

// Redes sociales
export const SOCIAL_LINKS = {
  github: process.env.NEXT_PUBLIC_GITHUB_URL || 'https://github.com/tu-usuario',
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || 'https://linkedin.com/in/tu-perfil',
  twitter: process.env.NEXT_PUBLIC_TWITTER_URL || 'https://twitter.com/tu-usuario',
  instagram: 'https://instagram.com/tu-usuario',
  youtube: 'https://youtube.com/c/tu-canal',
  dribbble: 'https://dribbble.com/tu-usuario',
  behance: 'https://behance.net/tu-usuario',
};

// Información personal detallada
export const PERSONAL_INFO = {
  bio: `Soy un desarrollador full stack con más de ${SITE_CONFIG.yearsOfExperience} años de experiencia creando aplicaciones web modernas y escalables. 
  
  Mi pasión por la tecnología comenzó desde temprana edad, y desde entonces he estado constantemente aprendiendo y adaptándome a las nuevas tendencias del desarrollo web. Me especializo en el ecosistema de JavaScript, particularmente en React, Next.js, Node.js y TypeScript.
  
  Creo firmemente en escribir código limpio, mantenible y bien documentado. Me encanta trabajar en equipo y siempre estoy dispuesto a compartir conocimientos y aprender de otros desarrolladores.`,
  
  interests: [
    'Desarrollo Web',
    'Inteligencia Artificial',
    'Fotografía',
    'Música',
    'Lectura',
    'Viajes',
    'Gaming',
    'Tecnología',
  ],
  
  values: [
    'Código limpio y mantenible',
    'Aprendizaje continuo',
    'Colaboración en equipo',
    'Innovación constante',
    'Atención al detalle',
    'Comunicación efectiva',
  ],
  
  achievements: [
    {
      title: 'Certificación en React',
      description: 'Completé la certificación avanzada en React y Next.js',
      date: '2024',
    },
    {
      title: 'Proyecto Open Source',
      description: 'Contribuí a un proyecto open source con más de 1k estrellas en GitHub',
      date: '2023',
    },
    {
      title: 'Líder Técnico',
      description: 'Lideré un equipo de 5 desarrolladores en proyecto enterprise',
      date: '2023',
    },
  ],
};

// Configuración de navegación
export const NAVIGATION = [
  { href: '/', label: 'Inicio', icon: 'Home' },
  { href: '/about', label: 'Sobre mí', icon: 'User' },
  { href: '/projects', label: 'Proyectos', icon: 'FolderOpen' },
  { href: '/skills', label: 'Habilidades', icon: 'Code' },
  { href: '/contact', label: 'Contacto', icon: 'Mail' },
];

// Configuración de SEO
export const SEO_CONFIG = {
  defaultTitle: SITE_CONFIG.name,
  titleTemplate: `%s | ${SITE_CONFIG.name}`,
  defaultDescription: SITE_CONFIG.description,
  siteUrl: SITE_CONFIG.url,
  defaultImage: '/images/og-image.jpg',
  twitterHandle: '@tu-usuario',
  keywords: [
    'desarrollador web',
    'frontend',
    'backend',
    'fullstack',
    'react',
    'nextjs',
    'typescript',
    'javascript',
    'node.js',
    'portafolio',
    'bucaramanga',
    'colombia',
  ],
};

// Estadísticas del portafolio
export const PORTFOLIO_STATS = {
  projectsCompleted: 50,
  yearsOfExperience: SITE_CONFIG.yearsOfExperience,
  technologiesUsed: 25,
  coffeeConsumed: 1500,
  linesOfCode: 100000,
  clientsSatisfied: 30,
};

// Configuración de colores del tema
export const THEME_COLORS = {
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },
  accent: {
    50: '#fef7ff',
    100: '#fce7ff',
    200: '#f8d4fe',
    300: '#f2b5fc',
    400: '#e879f9',
    500: '#d946ef',
    600: '#c026d3',
    700: '#a21caf',
    800: '#86198f',
    900: '#701a75',
  },
};

// Configuración de animaciones
export const ANIMATION_CONFIG = {
  duration: {
    fast: 150,
    normal: 300,
    slow: 500,
  },
  easing: {
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  },
};

// Configuración de breakpoints
export const BREAKPOINTS = {
  xs: '475px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

// Configuración de API
export const API_CONFIG = {
  baseUrl: process.env.NODE_ENV === 'production' 
    ? SITE_CONFIG.url 
    : 'http://localhost:3000',
  endpoints: {
    contact: '/api/contact',
    newsletter: '/api/newsletter',
    projects: '/api/projects',
  },
  timeout: 10000,
};

// Configuración de archivos y assets
export const ASSETS_CONFIG = {
  images: {
    formats: ['webp', 'jpg', 'png'],
    sizes: [320, 640, 768, 1024, 1280, 1920],
    quality: 85,
  },
  maxFileSize: {
    image: 5 * 1024 * 1024, // 5MB
    document: 10 * 1024 * 1024, // 10MB
  },
};

// Mensajes del sistema
export const MESSAGES = {
  loading: 'Cargando...',
  error: {
    general: 'Algo salió mal. Por favor, intenta nuevamente.',
    network: 'Error de conexión. Verifica tu internet.',
    notFound: 'No se encontró el contenido solicitado.',
    permission: 'No tienes permisos para realizar esta acción.',
    validation: 'Por favor, revisa la información ingresada.',
  },
  success: {
    general: '¡Operación exitosa!',
    contact: '¡Mensaje enviado exitosamente! Te contactaré pronto.',
    newsletter: '¡Gracias por suscribirte!',
    download: 'Descarga iniciada.',
  },
  validation: {
    required: 'Este campo es requerido',
    email: 'Ingresa un email válido',
    minLength: 'Debe tener al menos {min} caracteres',
    maxLength: 'No puede exceder {max} caracteres',
    phone: 'Ingresa un número de teléfono válido',
    url: 'Ingresa una URL válida',
  },
};

// Configuración de cookies y privacidad
export const PRIVACY_CONFIG = {
  cookieConsent: {
    necessary: true,
    analytics: false,
    marketing: false,
  },
  dataRetention: {
    contactForms: 30, // días
    analytics: 365, // días
    logs: 90, // días
  },
};

// Configuración de rendimiento
export const PERFORMANCE_CONFIG = {
  enableSW: process.env.NODE_ENV === 'production',
  enableAnalytics: process.env.NODE_ENV === 'production',
  enableErrorTracking: process.env.NODE_ENV === 'production',
  cacheStrategy: {
    static: 'cache-first',
    api: 'network-first',
    images: 'cache-first',
  },
};

// Configuración de contenido
export const CONTENT_CONFIG = {
  projects: {
    projectsPerPage: 12,
    enableFiltering: true,
    enableSearch: true,
  },
  contact: {
    enableSpamProtection: true,
    maxAttachments: 3,
    allowedFileTypes: ['.pdf', '.doc', '.docx', '.txt'],
  },
};