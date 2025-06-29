export interface ArchitectureLayer {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  responsibilities: string[];
  icon?: string;
}

export interface ProjectArchitecture {
  id: string;
  projectId: string;
  type: 'monolithic' | 'microservices' | 'serverless' | 'jamstack' | 'layered' | 'mvc' | 'component-based';
  description: string;
  layers: ArchitectureLayer[];
  dataFlow: string[];
  advantages: string[];
  considerations: string[];
}

export interface ArchitecturePattern {
  name: string;
  description: string;
  usedIn: string[];
  benefits: string[];
}

// Datos de arquitectura para los proyectos existentes
export const PROJECT_ARCHITECTURES: ProjectArchitecture[] = [
  {
    id: 'arch-webpage-unab',
    projectId: 'Webpage_Unab',
    type: 'component-based',
    description: 'Single Page Application (SPA) with React component-based architecture and PostgreSQL backend integration.',
    layers: [
      {
        id: 'presentation',
        name: 'Presentation Layer',
        description: 'React components with TypeScript for type safety and Tailwind CSS for styling',
        technologies: ['React 19.1.0', 'TypeScript 5.8.3', 'Tailwind CSS 4.1.6', 'Headless UI'],
        responsibilities: [
          'User interface rendering',
          'User interaction handling',
          'State management with React hooks',
          'Form validation and submission',
          'Responsive design implementation'
        ],
        icon: '🎨'
      },
      {
        id: 'routing',
        name: 'Routing Layer', 
        description: 'Client and server-side routing with React Router for navigation',
        technologies: ['React Router 7.5.3', 'SSR capabilities'],
        responsibilities: [
          'Page navigation management',
          'Protected route handling',
          'Server-side rendering setup',
          'Route-based code splitting'
        ],
        icon: '🛣️'
      },
      {
        id: 'business',
        name: 'Business Logic Layer',
        description: 'Services and context providers for application logic',
        technologies: ['React Context', 'Custom Hooks', 'TypeScript'],
        responsibilities: [
          'Authentication logic',
          'Event registration management', 
          'Free hours calculation',
          'Data validation and processing',
          'API integration logic'
        ],
        icon: '⚙️'
      },
      {
        id: 'data',
        name: 'Data Layer',
        description: 'PostgreSQL database with structured data models',
        technologies: ['PostgreSQL', 'Database schemas', 'JSON data handling'],
        responsibilities: [
          'Student data persistence',
          'Event information storage',
          'User session management',
          'Academic records tracking',
          'Free hours tracking'
        ],
        icon: '🗄️'
      },
      {
        id: 'infrastructure',
        name: 'Infrastructure Layer',
        description: 'Development and deployment infrastructure',
        technologies: ['Vite 6.3.3', 'Docker', 'ESLint', 'Prettier'],
        responsibilities: [
          'Build and bundling process',
          'Development server setup',
          'Code quality enforcement',
          'Container orchestration',
          'Environment configuration'
        ],
        icon: '🏗️'
      }
    ],
    dataFlow: [
      'User interacts with React components',
      'Components trigger business logic through context/hooks',
      'Services validate and process data',
      'Data layer stores/retrieves information',
      'Updated state propagates back to UI components'
    ],
    advantages: [
      'Modular and reusable component structure',
      'Type safety with TypeScript',
      'Excellent developer experience with hot reloading',
      'SEO benefits from SSR capabilities',
      'Responsive design out of the box'
    ],
    considerations: [
      'Client-side rendering may impact initial load time',
      'Requires JavaScript enabled in browser',
      'Complex state management as application grows',
      'Bundle size optimization needed for production'
    ]
  },
  {
    id: 'arch-calculus-solver',
    projectId: 'ollama-calculus-solver',
    type: 'microservices',
    description: 'Containerized microservices architecture with AI model integration and web interface.',
    layers: [
      {
        id: 'presentation',
        name: 'Presentation Layer',
        description: 'OpenWebUI providing chat-based interface for user interactions',
        technologies: ['OpenWebUI', 'Web Interface', 'Chat UI Components'],
        responsibilities: [
          'User chat interface',
          'Problem input handling',
          'Solution display formatting',
          'Real-time communication with backend',
          'User authentication and session management'
        ],
        icon: '💬'
      },
      {
        id: 'api-gateway',
        name: 'API Gateway',
        description: 'FastAPI serving as the main API endpoint and request orchestrator',
        technologies: ['FastAPI', 'Python', 'RESTful APIs', 'Pydantic'],
        responsibilities: [
          'HTTP request handling',
          'Request validation and serialization',
          'API documentation generation',
          'Authentication middleware',
          'Error handling and logging'
        ],
        icon: '🚪'
      },
      {
        id: 'business',
        name: 'Business Logic Layer',
        description: 'Core calculus solving logic and problem processing',
        technologies: ['Python', 'Mathematical Computing', 'Custom Algorithms'],
        responsibilities: [
          'Problem parsing and analysis',
          'Solution step generation',
          'Mathematical notation handling',
          'Error detection and correction',
          'Solution validation'
        ],
        icon: '🧮'
      },
      {
        id: 'ai-service',
        name: 'AI Service Layer',
        description: 'Ollama server running DeepSeek-R1 model for advanced problem solving',
        technologies: ['Ollama', 'DeepSeek-R1 LLM', 'Model APIs'],
        responsibilities: [
          'Natural language processing',
          'Mathematical problem interpretation',
          'Step-by-step solution generation',
          'Context understanding',
          'Response optimization'
        ],
        icon: '🤖'
      },
      {
        id: 'infrastructure',
        name: 'Infrastructure Layer',
        description: 'Docker containerization and orchestration setup',
        technologies: ['Docker', 'Docker Compose', 'Container Networking'],
        responsibilities: [
          'Service containerization',
          'Inter-service communication',
          'Environment isolation',
          'Scalability management',
          'Configuration management'
        ],
        icon: '🐳'
      }
    ],
    dataFlow: [
      'User inputs calculus problem through OpenWebUI',
      'API Gateway receives and validates the request',
      'Business logic processes and structures the problem',
      'AI Service (Ollama + DeepSeek-R1) generates solution',
      'Response flows back through the layers to the user interface'
    ],
    advantages: [
      'Scalable microservices architecture',
      'Local AI processing for privacy',
      'Containerized for easy deployment',
      'RESTful API enables integration flexibility',
      'Specialized services for optimal performance'
    ],
    considerations: [
      'Complex inter-service communication',
      'Resource intensive AI model',
      'Container orchestration complexity',
      'Network latency between services',
      'GPU requirements for optimal AI performance'
    ]
  }
];