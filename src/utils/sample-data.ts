// sample-data.ts - Datos de ejemplo para proyectos y habilidades

import type { Project } from '@/components/ProjectCard';
import type { Skill } from '@/components/SkillBadge';

// Proyectos de ejemplo
export const SAMPLE_PROJECTS: Project[] = [
  {
    id: 'Webpage_Unab',
    title: 'Student Webpage',
    description: 'It is a website created so that students can register for events, as well as view their free hours and other personal information.',
    longDescription: 'This is a web platform designed to allow students to register for events that grant them free hours required for graduation. The platform was created with the goal of offering students a more visual, intuitive, and comprehensive service, making it easier to track their progress, manage their time, and access relevant academic and personal information. It aims to streamline the event registration process while improving the overall user experience for students.',
    image: '/images/proyectos/proyecto-a-desktop.png',
    images: [
      '/images/proyectos/proyecto-a-desktop.png',
      '/images/proyectos/proyecto-a-mobile.png',
      '/images/proyectos/proyecto-a-admin.png'
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'React Router', 'Headless UI', 'Vite', "Docker"],
    githubUrl: 'https://github.com/santiagoRuiz1314/Webpage_Unab',
    liveUrl: 'https://ecommerce-demo.vercel.app',
    featured: true,
    status: 'completed',
    startDate: '2025-04-04',
    endDate: '2025-05-20',
    category: 'Webpage',
    tags: ['Full Stack', 'Webpage', 'Admin Dashboard'],
    highlights: [
      'Event registration with tracked accumulated hours',
      'Student dashboard displaying free hours and personal information',
      'Intuitive and user-friendly interface',
      'Responsive design for mobile and desktop devices'
    ]
  },
  {
    id: 'task-manager',
    title: 'Gestor de Tareas',
    description: 'Aplicación de gestión de tareas y proyectos con colaboración en tiempo real y notificaciones.',
    image: '/images/proyectos/proyecto-b-hero.png',
    technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'Express'],
    githubUrl: 'https://github.com/tu-usuario/task-manager',
    liveUrl: 'https://task-manager-demo.netlify.app',
    featured: false,
    status: 'completed',
    startDate: '2023-11-01',
    endDate: '2024-01-10',
    category: 'Productividad',
    tags: ['Real-time', 'Colaboración', 'Dashboard']
  },
  {
    id: 'weather-app',
    title: 'App del Clima',
    description: 'Aplicación meteorológica con pronósticos detallados, mapas interactivos y alertas personalizadas.',
    image: '/images/proyectos/weather-app.png',
    technologies: ['React Native', 'Expo', 'Weather API', 'Redux'],
    githubUrl: 'https://github.com/tu-usuario/weather-app',
    liveUrl: 'https://expo.dev/@tu-usuario/weather-app',
    featured: false,
    status: 'completed',
    startDate: '2023-08-15',
    endDate: '2023-10-20',
    category: 'Mobile',
    tags: ['React Native', 'API Integration', 'Geolocation']
  },
  {
    id: 'portfolio-cms',
    title: 'CMS para Portafolios',
    description: 'Sistema de gestión de contenido especializado para portafolios de desarrolladores y diseñadores.',
    image: '/images/proyectos/cms-dashboard.png',
    technologies: ['Next.js', 'Sanity CMS', 'TypeScript', 'Vercel'],
    githubUrl: 'https://github.com/tu-usuario/portfolio-cms',
    status: 'in-progress',
    startDate: '2024-04-01',
    category: 'CMS',
    tags: ['Headless CMS', 'Content Management', 'Developer Tools']
  },
  {
    id: 'ai-chat-bot',
    title: 'Chatbot con IA',
    description: 'Chatbot inteligente integrado con GPT para atención al cliente automatizada.',
    image: '/images/proyectos/chatbot-ui.png',
    technologies: ['Python', 'FastAPI', 'OpenAI API', 'React', 'WebSocket'],
    githubUrl: 'https://github.com/tu-usuario/ai-chatbot',
    status: 'planned',
    startDate: '2024-06-01',
    category: 'Inteligencia Artificial',
    tags: ['AI', 'Natural Language', 'Customer Service']
  },
  {
    id: 'crypto-tracker',
    title: 'Tracker de Criptomonedas',
    description: 'Dashboard para seguimiento de criptomonedas con gráficos en tiempo real y alertas de precios.',
    image: '/images/proyectos/crypto-dashboard.png',
    technologies: ['Vue.js', 'Chart.js', 'CoinGecko API', 'Vuex'],
    githubUrl: 'https://github.com/tu-usuario/crypto-tracker',
    liveUrl: 'https://crypto-tracker-vue.netlify.app',
    status: 'completed',
    startDate: '2023-05-10',
    endDate: '2023-07-15',
    category: 'Fintech',
    tags: ['Cryptocurrency', 'Real-time Data', 'Charts']
  }
];

// Habilidades de ejemplo
export const SAMPLE_SKILLS: Skill[] = [
  // Frontend
  {
    id: 'react',
    name: 'React',
    level: 5,
    category: 'Frontend',
    icon: '⚛️',
    description: 'Biblioteca para construir interfaces de usuario',
    yearsOfExperience: 4,
    certified: true,
    projects: ['ecommerce-app', 'task-manager', 'portfolio-cms']
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    level: 5,
    category: 'Frontend',
    icon: '▲',
    description: 'Framework de React para aplicaciones web',
    yearsOfExperience: 3,
    certified: true,
    projects: ['ecommerce-app', 'portfolio-cms']
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    level: 4,
    category: 'Lenguajes',
    icon: '🔷',
    description: 'JavaScript con tipado estático',
    yearsOfExperience: 3,
    certified: false,
    projects: ['ecommerce-app', 'portfolio-cms']
  },
  {
    id: 'tailwindcss',
    name: 'Tailwind CSS',
    level: 5,
    category: 'Frontend',
    icon: '🎨',
    description: 'Framework CSS utility-first',
    yearsOfExperience: 2,
    certified: false,
    projects: ['ecommerce-app', 'portfolio-cms']
  },
  {
    id: 'vuejs',
    name: 'Vue.js',
    level: 4,
    category: 'Frontend',
    icon: '💚',
    description: 'Framework progresivo de JavaScript',
    yearsOfExperience: 2,
    certified: false,
    projects: ['crypto-tracker']
  },

  // Backend
  {
    id: 'nodejs',
    name: 'Node.js',
    level: 4,
    category: 'Backend',
    icon: '🟢',
    description: 'Runtime de JavaScript para servidor',
    yearsOfExperience: 4,
    certified: false,
    projects: ['task-manager', 'ai-chat-bot']
  },
  {
    id: 'python',
    name: 'Python',
    level: 4,
    category: 'Backend',
    icon: '🐍',
    description: 'Lenguaje de programación versátil',
    yearsOfExperience: 3,
    certified: true,
    projects: ['ai-chat-bot']
  },
  {
    id: 'express',
    name: 'Express.js',
    level: 4,
    category: 'Backend',
    icon: '🚀',
    description: 'Framework web para Node.js',
    yearsOfExperience: 3,
    projects: ['task-manager']
  },
  {
    id: 'fastapi',
    name: 'FastAPI',
    level: 3,
    category: 'Backend',
    icon: '⚡',
    description: 'Framework moderno para APIs en Python',
    yearsOfExperience: 1,
    projects: ['ai-chat-bot']
  },

  // Bases de Datos
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    level: 4,
    category: 'Databases',
    icon: '🐘',
    description: 'Base de datos relacional avanzada',
    yearsOfExperience: 3,
    projects: ['ecommerce-app']
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    level: 4,
    category: 'Bases de Datos',
    icon: '🍃',
    description: 'Base de datos NoSQL',
    yearsOfExperience: 3,
    projects: ['task-manager']
  },
  {
    id: 'redis',
    name: 'Redis',
    level: 3,
    category: 'Bases de Datos',
    icon: '📮',
    description: 'Cache y almacén de datos en memoria',
    yearsOfExperience: 2,
    projects: ['task-manager']
  },

  // DevOps y Herramientas
  {
    id: 'docker',
    name: 'Docker',
    level: 3,
    category: 'DevOps',
    icon: '🐳',
    description: 'Plataforma de contenedores',
    yearsOfExperience: 2,
    projects: ['ecommerce-app', 'ai-chat-bot']
  },
  {
    id: 'git',
    name: 'Git',
    level: 5,
    category: 'Tools',
    icon: '📚',
    description: 'Control de versiones',
    yearsOfExperience: 5,
    certified: false,
    projects: ['ecommerce-app', 'task-manager', 'crypto-tracker']
  },
  {
    id: 'aws',
    name: 'AWS',
    level: 3,
    category: 'Cloud',
    icon: '☁️',
    description: 'Servicios en la nube de Amazon',
    yearsOfExperience: 2,
    certified: true,
    projects: ['ecommerce-app']
  },
  {
    id: 'vercel',
    name: 'Vercel',
    level: 4,
    category: 'Cloud',
    icon: '▲',
    description: 'Plataforma de deployment',
    yearsOfExperience: 2,
    projects: ['ecommerce-app', 'portfolio-cms']
  },

  // Mobile
  {
    id: 'react-native',
    name: 'React Native',
    level: 3,
    category: 'Mobile',
    icon: '📱',
    description: 'Framework para apps móviles',
    yearsOfExperience: 1,
    projects: ['weather-app']
  },
  {
    id: 'expo',
    name: 'Expo',
    level: 3,
    category: 'Mobile',
    icon: '🚀',
    description: 'Plataforma para React Native',
    yearsOfExperience: 1,
    projects: ['weather-app']
  }
];

// Categorías de habilidades
export const SKILL_CATEGORIES = [
  {
    id: 'frontend',
    name: 'Frontend',
    description: 'UI Technologies',
    icon: '🎨',
    color: 'blue'
  },
  {
    id: 'backend',
    name: 'Backend',
    description: 'Server-Side Technologies',
    icon: '⚙️',
    color: 'green'
  },
  {
    id: 'database',
    name: 'Bases de Datos',
    description: 'Data Management Systems',
    icon: '🗄️',
    color: 'purple'
  },
  {
    id: 'devops',
    name: 'DevOps',
    description: 'Development and Operations Tools',
    icon: '🚀',
    color: 'orange'
  },
  {
    id: 'mobile',
    name: 'Mobile',
    description: 'Mobile App Development',
    icon: '📱',
    color: 'pink'
  },
  {
    id: 'tools',
    name: 'Tools',
    description: 'Development Tools',
    icon: '🛠️',
    color: 'gray'
  }
];

// Categorías de proyectos
export const PROJECT_CATEGORIES = [
  {
    id: 'all',
    name: 'All',
    description: 'Todos los proyectos'
  },
  {
    id: 'webpage',
    name: 'Webpage',
    description: 'Plataformas de comercio electrónico'
  },
  {
    id: 'productivity',
    name: 'productivity',
    description: 'Aplicaciones de gestión y productividad'
  },
  {
    id: 'mobile',
    name: 'Mobile',
    description: 'Aplicaciones móviles'
  },
  {
    id: 'cms',
    name: 'CMS',
    description: 'Sistemas de gestión de contenido'
  },
  {
    id: 'ai',
    name: 'AI',
    description: 'Proyectos con IA y ML'
  },
  {
    id: 'fintech',
    name: 'Fintech',
    description: 'Aplicaciones financieras y criptomonedas'
  }
];

// Testimonios (opcional)
export const TESTIMONIALS = [
  {
    id: 'testimonial-1',
    name: 'María González',
    role: 'Product Manager',
    company: 'TechCorp',
    avatar: '/images/testimonials/maria.jpg',
    rating: 5,
    text: 'Trabajar con él fue una experiencia excelente. Su atención al detalle y capacidad técnica son impresionantes.',
    date: '2024-03-15'
  },
  {
    id: 'testimonial-2',
    name: 'Carlos Rodríguez',
    role: 'CTO',
    company: 'StartupXYZ',
    avatar: '/images/testimonials/carlos.jpg',
    rating: 5,
    text: 'Entregó un proyecto complejo en tiempo récord y con calidad excepcional. Altamente recomendado.',
    date: '2024-02-20'
  },
  {
    id: 'testimonial-3',
    name: 'Ana Martínez',
    role: 'Diseñadora UX',
    company: 'DesignStudio',
    avatar: '/images/testimonials/ana.jpg',
    rating: 5,
    text: 'Su capacidad para convertir diseños complejos en código funcional es increíble. Gran colaborador.',
    date: '2024-01-10'
  }
];

// FAQ (Preguntas frecuentes)
export const FAQ_DATA = [
  {
    question: '¿Qué tecnologías utilizas principalmente?',
    answer: 'Me especializo en el ecosistema de JavaScript, particularmente React, Next.js, Node.js y TypeScript. También trabajo con Python, bases de datos como PostgreSQL y MongoDB, y herramientas de cloud como AWS y Vercel.'
  },
  {
    question: '¿Cuánto tiempo toma desarrollar un proyecto?',
    answer: 'El tiempo depende de la complejidad del proyecto. Un sitio web simple puede tomar 2-4 semanas, mientras que una aplicación web compleja puede requerir 2-6 meses. Siempre proporciono estimaciones detalladas después de analizar los requirements.'
  },
  {
    question: '¿Trabajas con clientes internacionales?',
    answer: 'Sí, trabajo con clientes de todo el mundo. Tengo experiencia colaborando en diferentes zonas horarias y me adapto a las necesidades de comunicación de cada cliente.'
  },
  {
    question: '¿Ofreces mantenimiento después del desarrollo?',
    answer: 'Sí, ofrezco planes de mantenimiento que incluyen actualizaciones de seguridad, corrección de bugs, actualizaciones de contenido y mejoras de rendimiento.'
  },
  {
    question: '¿Cuál es tu proceso de desarrollo?',
    answer: 'Sigo una metodología ágil que incluye: análisis de requirements, planificación, diseño de arquitectura, desarrollo iterativo, testing, deployment y mantenimiento. Mantengo comunicación constante con el cliente durante todo el proceso.'
  }
];