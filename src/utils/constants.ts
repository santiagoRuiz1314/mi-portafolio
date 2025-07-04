export const SITE_CONFIG = {
  name: 'Mi Portafolio',
  author: 'Santiago Steven Ruiz Carreño',
  title: 'Full Stack Developer',
  subtitle: 'Creating exceptional digital experiences',
  description: "Full Stack developer who builds solutions that matter. Solving complex problems into intuitive digital experiences using modern web technologies.",
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://tu-dominio.com',
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'santiago06ruiz@gmail.com',
  phone: '+57 305 383 0143',
  location: 'Bucaramanga, Colombia',
  yearsOfExperience: 1,
  availableForWork: true,
  profileImage: '/images/foto-perfil.jpg',
  cvUrl: '/cv.pdf',
};

export const SOCIAL_LINKS = {
  github: process.env.NEXT_PUBLIC_GITHUB_URL || 'https://github.com/santiagoRuiz1314',
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || 'https://linkedin.com/in/santiago-steven-ruiz-carreño-880571369',
  twitter: process.env.NEXT_PUBLIC_TWITTER_URL || 'https://twitter.com',
};


export const PERSONAL_INFO = {
  bio: `I'm a Full Stack Developer creating scalable, efficient, and user-centered web applications, with a strong focus on accessibility and performance.
   I enjoy collaborating with teams, learning from other professionals, and contributing solutions that make a real impact.
    My goal is to build tech products that combine functionality, design, and purpose.`,
  
  interests: [
    'Web Development',
    'Learning Programming Languages',
    'UX/UI Design',
    'Performance Optimization',
    'API Development & Integration',
    'Prototyping & Design with Figma',
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

//
export const NAVIGATION = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Me' },
  { href: '/projects', label: 'Projects' },
  { href: '/skills', label: 'Skills' },
  { href: '/contact', label: 'Contact' },
];


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


export const ANIMATION_CONFIG = {
  hero: {
    stagger: 0.2,
    duration: 0.6,
  },
  stats: {
    countUp: {
      duration: 2,
      preserveValue: true,
    },
  },
  skills: {
    hover: {
      scale: 1.05,
      duration: 0.2,
    },
  },
};


export const PREVIEW_LIMITS = {
  skills: 8,
  projects: 3,
  interests: 6,
  achievements: 3,
};