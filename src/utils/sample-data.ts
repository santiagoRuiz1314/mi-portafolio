import type { Project } from '@/components/ProjectCard';
import type { Skill } from '@/components/SkillBadge';

// Proyectos realmente usados en el portafolio
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
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'React Router', 'Headless UI', 'Vite', 'Docker'],
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
    description: 'Aplicación de gestión de tareas con colaboración en tiempo real.',
    image: '/images/proyectos/proyecto-b-hero.png',
    technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
    githubUrl: 'https://github.com/santiagoRuiz1314',
    featured: true,
    status: 'completed',
    startDate: '2023-11-01',
    category: 'Productividad',
    tags: ['Real-time'],
  }
];

// Habilidades técnicas principales
export const SAMPLE_SKILLS: Skill[] = [
  // Frontend
  {
    id: 'react',
    name: 'React',
    level: 5,
    category: 'Frontend',
    description: 'Modern library for building interactive user interfaces',
    projects: ['Webpage_Unab', 'task-manager']
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    level: 5,
    category: 'Frontend',
    description: 'React framework for production-ready web applications',
    projects: ['Webpage_Unab']
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    level: 4,
    category: 'Languages',
    description: 'JavaScript with static typing for better development experience',
    projects: ['Webpage_Unab']
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    level: 5,
    category: 'Languages',
    description: 'Core programming language for web development',
    projects: ['Webpage_Unab', 'task-manager']
  },
  {
    id: 'tailwindcss',
    name: 'Tailwind CSS',
    level: 5,
    category: 'Frontend',
    description: 'Utility-first CSS framework for rapid UI development',
    projects: ['Webpage_Unab']
  },
  {
    id: 'html5',
    name: 'HTML5',
    level: 5,
    category: 'Frontend',
    description: 'Semantic markup language for web structure',
    projects: ['Webpage_Unab', 'task-manager']
  },
  {
    id: 'css3',
    name: 'CSS3',
    level: 5,
    category: 'Frontend',
    description: 'Stylesheets for modern web design and animations',
    projects: ['Webpage_Unab', 'task-manager']
  },

  // Backend
  {
    id: 'nodejs',
    name: 'Node.js',
    level: 4,
    category: 'Backend',
    description: 'JavaScript runtime for server-side development',
    projects: ['task-manager']
  },
  {
    id: 'python',
    name: 'Python',
    level: 4,
    category: 'Backend',
    description: 'Versatile programming language for backend and AI',
    projects: []
  },

  // Databases
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    level: 4,
    category: 'Databases',
    description: 'Advanced open-source relational database',
    projects: ['Webpage_Unab']
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    level: 4,
    category: 'Databases',
    description: 'NoSQL document database for flexible data storage',
    projects: ['task-manager']
  },

  // DevOps and Tools
  {
    id: 'docker',
    name: 'Docker',
    level: 3,
    category: 'DevOps',
    description: 'Containerization platform for consistent deployments',
    projects: ['Webpage_Unab']
  },
  {
    id: 'git',
    name: 'Git',
    level: 5,
    category: 'Tools',
    description: 'Distributed version control system',
    projects: ['Webpage_Unab', 'task-manager']
  },
  {
    id: 'vercel',
    name: 'Vercel',
    level: 4,
    category: 'Cloud',
    description: 'Modern deployment platform for frontend projects',
    projects: ['Webpage_Unab']
  }
];

// Categorías de habilidades para organización
export const SKILL_CATEGORIES = [
  {
    id: 'frontend',
    name: 'Frontend',
    description: 'UI Technologies & Frameworks',
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
    id: 'databases',
    name: 'Databases',
    description: 'Data Management Systems',
    icon: '🗄️',
    color: 'purple'
  },
  {
    id: 'devops',
    name: 'DevOps',
    description: 'Development & Operations Tools',
    icon: '🚀',
    color: 'orange'
  },
  {
    id: 'tools',
    name: 'Tools',
    description: 'Development Tools & Utilities',
    icon: '🛠️',
    color: 'gray'
  },
  {
    id: 'cloud',
    name: 'Cloud',
    description: 'Cloud Platforms & Services',
    icon: '☁️',
    color: 'indigo'
  }
];

// Categorías de proyectos para filtros
export const PROJECT_CATEGORIES = [
  {
    id: 'all',
    name: 'All',
    description: 'Todos los proyectos'
  },
  {
    id: 'webpage',
    name: 'Webpage',
    description: 'Plataformas web'
  },
  {
    id: 'productivity',
    name: 'Productivity',
    description: 'Aplicaciones de gestión y productividad'
  }
];