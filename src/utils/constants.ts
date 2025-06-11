// Información personal y configuración del sitio
export const SITE_CONFIG = {
  name: 'Mi Portafolio',
  author: 'Santiago Steven Ruiz Carreño',
  title: 'Full Stack Developer',
  subtitle: 'Creating exceptional digital experiences',
  description: 'I’m a university student training to become a developer. I’ve built projects with HTML, CSS, and JavaScript, and I’m always looking to learn more. Passionate about tech, teamwork, and continuous growth, I enjoy turning ideas into real solutions.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://tu-dominio.com',
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'santiago06ruiz@gmail.com',
  phone: '+57 305 383 0143',
  location: 'Bucaramanga, Colombia',
  birthDate: '2006-11-13',
  yearsOfExperience: 1,
  availableForWork: true,
  profileImage: '/images/foto-perfil.jpg',
  cvUrl: '/cv.pdf',
};

// Redes sociales
export const SOCIAL_LINKS = {
  github: process.env.NEXT_PUBLIC_GITHUB_URL || 'https://github.com/santiagoRuiz1314',
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || 'https://linkedin.com/in/santiago-steven-ruiz-carreño-880571369',
  twitter: process.env.NEXT_PUBLIC_TWITTER_URL || 'https://twitter.com',
  instagram: 'https://instagram.com',
  youtube: 'https://youtube.com',
  dribbble: 'https://dribbble.com',
  behance: 'https://behance.net',
};

// Información personal detallada
export const PERSONAL_INFO = {
  bio: `I'm a full stack developer with over ${SITE_CONFIG.yearsOfExperience} ears of experience building modern and scalable web applications.
  
  I'm a university student training to become a full stack developer. I've worked on several projects using HTML, CSS, and JavaScript, and I'm always looking to learn new technologies and frameworks.
  
  I strongly believe in writing clean, maintainable, and well-documented code. I enjoy working in a team and am always eager to share knowledge and learn from other developers.`,
  
  interests: [
    'Web Development',
    'Learning Programming Languages',
    'Photography',
    'Teamwork',
    'Music',
    'Traveling',
    'Gaming',
    'Technology',
  ],
  
  values: [
    'Continuous Learning',
    'Team Collaboration',
    'Technical Curiosity',
    'Clean and Understandable Code',
    'Constant Innovation',
    'Problem Solving',
  ],
  
  achievements: [
    {
      title: 'Graduate from high school',
      description: 'Finish my studies',
      date: '2023',
    },
    {
      title: 'Begin my studies at UNAB',
      description: 'Start studying my degree at university',
      date: '2024',
    },
    {
      title: 'keep learning',
      description: 'keep improving project by project to become a full-stack developer',
      date: '2025',
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
    'python',
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