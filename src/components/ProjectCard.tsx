import React, { useCallback } from 'react';
import Image from 'next/image';
import { ExternalLink, Github, Calendar, Tag } from 'lucide-react';
import { cn } from '@/utils/cn';
import { useAnalytics } from '@/lib/analytics';

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  images?: string[];
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  status: 'completed' | 'in-progress' | 'planned';
  startDate: string;
  endDate?: string;
  category: string;
  tags?: string[];
  highlights?: string[];
}

interface ProjectCardProps {
  project: Project;
  variant?: 'default' | 'featured';
  className?: string;
  onProjectClick?: (project: Project) => void;
}

// Configuración constante para evitar recreación
const STATUS_CONFIG = {
  completed: {
    label: 'Completado',
    className: 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
  },
  'in-progress': {
    label: 'En progreso', 
    className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100'
  },
  planned: {
    label: 'Planeado',
    className: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100'
  }
} as const;

const PLACEHOLDER_IMAGE = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...";

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  variant = 'default',
  className,
  onProjectClick,
}) => {
  const analytics = useAnalytics();
  const statusConfig = STATUS_CONFIG[project.status];

  // Memoizar handlers para evitar recreación
  const handleCardClick = useCallback(() => {
    analytics.projects.view(project.id);
    onProjectClick?.(project);
  }, [analytics, project.id, onProjectClick]);

  const createExternalLinkHandler = useCallback((
    url: string | undefined,
    analyticsMethod: (id: string) => void
  ) => (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!url) return;
    
    analyticsMethod(project.id);
    window.open(url, '_blank', 'noopener,noreferrer');
  }, [project.id]);

  const handleGithubClick = createExternalLinkHandler(
    project.githubUrl,
    analytics.projects.clickGithub
  );

  const handleLiveClick = createExternalLinkHandler(
    project.liveUrl,
    analytics.projects.clickDemo
  );

  const cardClasses = cn(
    'group bg-white dark:bg-gray-800 rounded-xl shadow-soft hover:shadow-medium transition-all duration-300',
    'border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600',
    'overflow-hidden hover:transform hover:-translate-y-1 cursor-pointer',
    variant === 'featured' && 'lg:col-span-2',
    className
  );

  return (
    <article className={cardClasses} onClick={handleCardClick}>
      <ProjectImage 
        project={project}
        statusConfig={statusConfig}
      />
      
      <ProjectContent 
        project={project}
        onGithubClick={handleGithubClick}
        onLiveClick={handleLiveClick}
      />
    </article>
  );
};

// Componente separado para la imagen
const ProjectImage: React.FC<{
  project: Project;
  statusConfig: typeof STATUS_CONFIG[keyof typeof STATUS_CONFIG];
}> = ({ project, statusConfig }) => (
  <div className="relative overflow-hidden">
    <Image
      src={project.image}
      alt={`Preview del proyecto ${project.title}`}
      width={400}
      height={200}
      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
      placeholder="blur"
      blurDataURL={PLACEHOLDER_IMAGE}
    />

    <div className="absolute top-4 left-4">
      <span className={cn('px-2 py-1 text-xs font-medium rounded-full', statusConfig.className)}>
        {statusConfig.label}
      </span>
    </div>

    {project.featured && (
      <div className="absolute top-4 right-4">
        <span className="px-2 py-1 text-xs font-medium rounded-full bg-primary-100 text-primary-800 dark:bg-primary-800 dark:text-primary-100">
          Destacado
        </span>
      </div>
    )}
  </div>
);

// Componente separado para el contenido
const ProjectContent: React.FC<{
  project: Project;
  onGithubClick: (e: React.MouseEvent) => void;
  onLiveClick: (e: React.MouseEvent) => void;
}> = ({ project, onGithubClick, onLiveClick }) => (
  <div className="p-6">
    <ProjectMeta project={project} />
    
    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
      {project.title}
    </h3>
    
    <p className="text-gray-600 dark:text-gray-300 mb-4">
      {project.description}
    </p>

    <ProjectLinks 
      project={project}
      onGithubClick={onGithubClick}
      onLiveClick={onLiveClick}
    />
  </div>
);

// Meta información del proyecto
const ProjectMeta: React.FC<{ project: Project }> = ({ project }) => (
  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
    <span className="flex items-center">
      <Tag size={14} className="mr-1" />
      {project.category}
    </span>
    <span className="flex items-center">
      <Calendar size={14} className="mr-1" />
      {new Date(project.startDate).getFullYear()}
    </span>
  </div>
);

// Enlaces del proyecto
const ProjectLinks: React.FC<{
  project: Project;
  onGithubClick: (e: React.MouseEvent) => void;
  onLiveClick: (e: React.MouseEvent) => void;
}> = ({ project, onGithubClick, onLiveClick }) => (
  <div className="flex space-x-4">
    {project.githubUrl && (
      <button
        onClick={onGithubClick}
        className="flex items-center space-x-1 text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline transition-colors"
        aria-label={`Ver código fuente de ${project.title}`}
      >
        <Github size={16} />
        <span>GitHub</span>
      </button>
    )}
    
    {project.liveUrl && (
      <button
        onClick={onLiveClick}
        className="flex items-center space-x-1 text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline transition-colors"
        aria-label={`Ver demo de ${project.title}`}
      >
        <ExternalLink size={16} />
        <span>Demo</span>
      </button>
    )}
  </div>
);
