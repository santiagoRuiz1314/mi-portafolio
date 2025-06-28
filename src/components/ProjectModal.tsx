import React, { useEffect, useCallback, useMemo, useState } from 'react';
import Image from 'next/image';
import { 
  X, 
  Github, 
  ExternalLink, 
  Calendar, 
  Tag, 
  CheckCircle, 
  Clock, 
  Lightbulb, 
  LucideIcon,
  Layers,
  Info
} from 'lucide-react';
import { cn } from '@/utils/cn';
import { useAnalytics } from '@/lib/analytics';
import { ArchitectureView } from '@/components/ArchitectureView';
import { PROJECT_ARCHITECTURES } from '@/types/architecture';
import type { Project } from '@/components/ProjectCard';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}


const STATUS_CONFIG = {
  completed: {
    label: 'Completado',
    className: 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100',
    icon: CheckCircle
  },
  'in-progress': {
    label: 'En progreso',
    className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100',
    icon: Clock
  },
  planned: {
    label: 'Planeado',
    className: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100',
    icon: Lightbulb
  }
} as const;

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  isOpen,
  onClose,
}) => {
  const analytics = useAnalytics();
  const [activeTab, setActiveTab] = useState<'overview' | 'architecture'>('overview');

  // Find architecture data for this project
  const projectArchitecture = useMemo(() => {
    if (!project) return null;
    return PROJECT_ARCHITECTURES.find(arch => arch.projectId === project.id) || null;
  }, [project?.id]);

  // Memoized status configuration
  const statusConfig = useMemo(() => {
    if (!project) return null;
    return STATUS_CONFIG[project.status];
  }, [project?.status]);

  // Memoized event handlers
  const handleEscapeKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  }, [onClose]);

  const handleGithubClick = useCallback(() => {
    if (project?.githubUrl) {
      analytics.projects.clickGithub(project.id);
      window.open(project.githubUrl, '_blank', 'noopener,noreferrer');
    }
  }, [project?.githubUrl, project?.id, analytics]);

  const handleLiveClick = useCallback(() => {
    if (project?.liveUrl) {
      analytics.projects.clickDemo(project.id);
      window.open(project.liveUrl, '_blank', 'noopener,noreferrer');
    }
  }, [project?.liveUrl, project?.id, analytics]);

  // Reset tab when project changes
  useEffect(() => {
    if (isOpen && project) {
      setActiveTab('overview');
    }
  }, [isOpen, project?.id]);

  // Keyboard and body scroll effects
  useEffect(() => {
    if (!isOpen) return;

    document.addEventListener('keydown', handleEscapeKey);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, handleEscapeKey]);

  if (!isOpen || !project || !statusConfig) return null;

  const tabs = [
    { id: 'overview', label: 'Project Overview', icon: Info },
    ...(projectArchitecture ? [{ id: 'architecture', label: 'Architecture', icon: Layers }] : [])
  ];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        className={cn(
          "relative w-full max-w-6xl max-h-[90vh] overflow-auto",
          "bg-white dark:bg-gray-800 rounded-2xl shadow-2xl",
          "transform transition-all duration-300",
          "animate-in zoom-in-95 duration-300"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <ModalHeader 
          project={project}
          statusConfig={statusConfig}
          onClose={onClose}
        />

        {/* Navigation Tabs - Only show if architecture exists */}
        {tabs.length > 1 && (
          <div className="border-b border-gray-200 dark:border-gray-700 px-6">
            <nav className="-mb-px flex space-x-8">
              {tabs.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id as any)}
                  className={cn(
                    'group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors',
                    activeTab === id
                      ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:border-gray-300'
                  )}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {label}
                </button>
              ))}
            </nav>
          </div>
        )}
        
        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'overview' && (
            <ModalContent project={project} />
          )}
          
          {activeTab === 'architecture' && projectArchitecture && (
            <ArchitectureView 
              architecture={projectArchitecture}
              className="mt-4"
            />
          )}
        </div>
        
        <ModalFooter 
          project={project}
          onGithubClick={handleGithubClick}
          onLiveClick={handleLiveClick}
        />
      </div>
    </div>
  );
};

// Component del header
const ModalHeader: React.FC<{
  project: Project;
  statusConfig: typeof STATUS_CONFIG[keyof typeof STATUS_CONFIG];
  onClose: () => void;
}> = ({ project, statusConfig, onClose }) => {
  const StatusIcon = statusConfig.icon;

  return (
    <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 rounded-t-2xl">
      <div className="flex items-start justify-between">
        <div className="flex-1 pr-4">
          <div className="flex items-center space-x-3 mb-2">
            <h2 id="modal-title" className="text-2xl font-bold text-gray-900 dark:text-white">
              {project.title}
            </h2>
            <div className="flex items-center space-x-2">
              <StatusIcon size={16} className="text-gray-500 dark:text-gray-400" />
              <span className={cn('px-2 py-1 text-xs font-medium rounded-full', statusConfig.className)}>
                {statusConfig.label}
              </span>
            </div>
          </div>
          
          <ProjectMetadata project={project} />
        </div>
        
        <button
          onClick={onClose}
          className="flex-shrink-0 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 
                   hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          aria-label="Cerrar modal"
        >
          <X size={24} />
        </button>
      </div>
    </div>
  );
};

// Metadatos del proyecto
const ProjectMetadata: React.FC<{ project: Project }> = ({ project }) => (
  <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
    <span className="flex items-center">
      <Tag size={14} className="mr-1" />
      {project.category}
    </span>
    <span className="flex items-center">
      <Calendar size={14} className="mr-1" />
      {new Date(project.startDate).getFullYear()}
      {project.endDate && ` - ${new Date(project.endDate).getFullYear()}`}
    </span>
  </div>
);

// Contenido principal del modal (tab overview)
const ModalContent: React.FC<{ project: Project }> = ({ project }) => (
  <div className="space-y-6">
    <ProjectImage project={project} />
    <ProjectDescription project={project} />
    <ProjectTechnologies project={project} />
    {project.highlights && <ProjectHighlights highlights={project.highlights} />}
    {project.tags && <ProjectTags tags={project.tags} />}
  </div>
);

// Imagen del proyecto
const ProjectImage: React.FC<{ project: Project }> = ({ project }) => (
  <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700">
    <Image
      src={project.image}
      alt={`Preview del proyecto ${project.title}`}
      fill
      className="object-cover"
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
      priority
    />
  </div>
);

// Descripción del proyecto
const ProjectDescription: React.FC<{ project: Project }> = ({ project }) => (
  <div>
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
      Descripción del Proyecto
    </h3>
    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
      {project.longDescription || project.description}
    </p>
  </div>
);

// Tecnologías utilizadas
const ProjectTechnologies: React.FC<{ project: Project }> = ({ project }) => (
  <div>
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
      Tech Stack
    </h3>
    <div className="flex flex-wrap gap-2">
      {project.technologies.map((tech, index) => (
        <TechnologyBadge key={`${tech}-${index}`} technology={tech} />
      ))}
    </div>
  </div>
);

// Badge de tecnología
const TechnologyBadge: React.FC<{ technology: string }> = ({ technology }) => (
  <span className="px-3 py-1 text-sm font-medium bg-primary-100 text-primary-800 
                 dark:bg-primary-800 dark:text-primary-200 rounded-full">
    {technology}
  </span>
);

// Características destacadas
const ProjectHighlights: React.FC<{ highlights: string[] }> = ({ highlights }) => (
  <div>
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
      Características Destacadas
    </h3>
    <ul className="space-y-2">
      {highlights.map((highlight, index) => (
        <HighlightItem key={index} text={highlight} />
      ))}
    </ul>
  </div>
);

// Item de característica destacada
const HighlightItem: React.FC<{ text: string }> = ({ text }) => (
  <li className="flex items-start space-x-2">
    <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
    <span className="text-gray-600 dark:text-gray-300 text-sm">
      {text}
    </span>
  </li>
);

// Tags del proyecto
const ProjectTags: React.FC<{ tags: string[] }> = ({ tags }) => (
  <div>
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
      Tags
    </h3>
    <div className="flex flex-wrap gap-2">
      {tags.map((tag, index) => (
        <TagBadge key={`${tag}-${index}`} tag={tag} />
      ))}
    </div>
  </div>
);

// Badge de tag
const TagBadge: React.FC<{ tag: string }> = ({ tag }) => (
  <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 
                 dark:bg-gray-700 dark:text-gray-300 rounded-md">
    #{tag}
  </span>
);

// Footer con botones de acción
const ModalFooter: React.FC<{
  project: Project;
  onGithubClick: () => void;
  onLiveClick: () => void;
}> = ({ project, onGithubClick, onLiveClick }) => (
  <div className="sticky bottom-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-6 rounded-b-2xl">
    <div className="flex flex-col sm:flex-row gap-3 justify-end">
      {project.githubUrl && (
        <ActionButton
          onClick={onGithubClick}
          icon={Github}
          text="Ver Código"
          variant="secondary"
        />
      )}
      
      {project.liveUrl && (
        <ActionButton
          onClick={onLiveClick}
          icon={ExternalLink}
          text="Ver Demo"
          variant="primary"
        />
      )}
    </div>
  </div>
);

// Botón de acción reutilizable con tipado correcto
const ActionButton: React.FC<{
  onClick: () => void;
  icon: LucideIcon;
  text: string;
  variant: 'primary' | 'secondary';
}> = ({ onClick, icon: Icon, text, variant }) => (
  <button
    onClick={onClick}
    className={cn(
      'flex items-center space-x-2 px-4 py-2 sm:w-auto w-full',
      variant === 'primary' ? 'btn btn-primary' : 'btn btn-secondary'
    )}
  >
    <Icon size={18} />
    <span>{text}</span>
  </button>
);