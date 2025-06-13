// Información personal y configuración del sitio
export const SITE_CONFIG = {
  name: 'Mi Portafolio',
  author: 'Santiago Steven Ruiz Carreño',
  title: 'Full Stack Developer',
  subtitle: 'Creating exceptional digital experiences',
  description: "I'm a university student training to become a developer. I've built projects with HTML, CSS, and JavaScript, and I'm always looking to learn more. Passionate about tech, teamwork, and continuous growth, I enjoy turning ideas into real solutions.",
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
};

// Información personal detallada
export const PERSONAL_INFO = {
  bio: `I'm a full stack developer with over ${SITE_CONFIG.yearsOfExperience} years of experience building modern and scalable web applications.
  
  I'm a university student training to become a full stack developer. I've worked on several projects using HTML, CSS, and JavaScript, and I'm always looking to learn new technologies and frameworks.
  
  I strongly believe in writing clean, maintainable, and well-documented code. I enjoy working in a team and am always eager to share knowledge and learn from other developers.`,
  
  interests: [
    'Web Development',
    'Learning Programming Languages',
    'Photography',
    'Teamwork',
    'Music',
    'Traveling',
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
      title: 'Keep learning',
      description: 'Keep improving project by project to become a full-stack developer',
      date: '2025',
    },
  ],
};

// Configuración de navegación
export const NAVIGATION = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Me' },
  { href: '/projects', label: 'Projects' },
  { href: '/skills', label: 'Skills' },
  { href: '/contact', label: 'Contact' },
];

// Configuración de SEO
export const SEO_CONFIG = {
  defaultTitle: SITE_CONFIG.name,
  titleTemplate: `%s | ${SITE_CONFIG.name}`,
  defaultDescription: SITE_CONFIG.description,
  siteUrl: SITE_CONFIG.url,
  defaultImage: '/images/og-image.jpg',
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