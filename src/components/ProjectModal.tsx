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
      className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-2 sm:p-4 bg-black/50 backdrop-blur-sm overflow-y-auto"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        className={cn(
          "relative w-full max-w-4xl sm:max-w-6xl max-h-none sm:max-h-[90vh] my-4 sm:my-0",
          "bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-2xl",
          "transform transition-all duration-300 overflow-hidden",
          "animate-in zoom-in-95 duration-300"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* FIXED: Contenedor principal con scroll controlado */}
        <div className="flex flex-col max-h-[95vh] sm:max-h-[90vh]">
          <ModalHeader 
            project={project}
            statusConfig={statusConfig}
            onClose={onClose}
          />

          {/* Navigation Tabs - FIXED: Solo mostrar si hay arquitectura */}
          {tabs.length > 1 && (
            <div className="border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 flex-shrink-0">
              <nav className="flex overflow-x-auto scrollbar-hide -mb-px">
                <div className="flex space-x-4 sm:space-x-8 min-w-max">
                  {tabs.map(({ id, label, icon: Icon }) => (
                    <button
                      key={id}
                      onClick={() => setActiveTab(id as any)}
                      className={cn(
                        'group inline-flex items-center py-3 sm:py-4 px-1 border-b-2 font-medium text-sm transition-colors whitespace-nowrap',
                        activeTab === id
                          ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                          : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:border-gray-300'
                      )}
                    >
                      <Icon className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span className="hidden sm:inline">{label}</span>
                      <span className="sm:hidden">{id === 'overview' ? 'Overview' : 'Architecture'}</span>
                    </button>
                  ))}
                </div>
              </nav>
            </div>
          )}
          
          {/* Tab Content - FIXED: Scroll controlado */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 sm:p-6">
              {activeTab === 'overview' && (
                <ModalContent project={project} />
              )}
              
              {activeTab === 'architecture' && projectArchitecture && (
                <ArchitectureView 
                  architecture={projectArchitecture}
                  className="mt-0"
                />
              )}
            </div>
          </div>
          
          <ModalFooter 
            project={project}
            onGithubClick={handleGithubClick}
            onLiveClick={handleLiveClick}
          />
        </div>
      </div>
    </div>
  );
};

// Component del header - FIXED: Mejorado responsive
const ModalHeader: React.FC<{
  project: Project;
  statusConfig: typeof STATUS_CONFIG[keyof typeof STATUS_CONFIG];
  onClose: () => void;
}> = ({ project, statusConfig, onClose }) => {
  const StatusIcon = statusConfig.icon;

  return (
    <div className="flex-shrink-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 sm:p-6 rounded-t-xl sm:rounded-t-2xl">
      <div className="flex items-start justify-between">
        <div className="flex-1 pr-2 sm:pr-4 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 mb-2">
            <h2 id="modal-title" className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white break-words">
              {project.title}
            </h2>
            <div className="flex items-center space-x-2 flex-shrink-0">
              <StatusIcon size={14} className="text-gray-500 dark:text-gray-400" />
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
          <X size={20} className="sm:hidden" />
          <X size={24} className="hidden sm:block" />
        </button>
      </div>
    </div>
  );
};

// Metadatos del proyecto - FIXED: Responsive
const ProjectMetadata: React.FC<{ project: Project }> = ({ project }) => (
  <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4 text-sm text-gray-500 dark:text-gray-400">
    <span className="flex items-center">
      <Tag size={12} className="mr-1 flex-shrink-0" />
      <span className="break-words">{project.category}</span>
    </span>
    <span className="flex items-center">
      <Calendar size={12} className="mr-1 flex-shrink-0" />
      <span>{new Date(project.startDate).getFullYear()}</span>
      {project.endDate && <span> - {new Date(project.endDate).getFullYear()}</span>}
    </span>
  </div>
);

// Contenido principal del modal - FIXED: Mejor spacing móvil
const ModalContent: React.FC<{ project: Project }> = ({ project }) => (
  <div className="space-y-4 sm:space-y-6">
    <ProjectImage project={project} />
    <ProjectDescription project={project} />
    <ProjectTechnologies project={project} />
    {project.highlights && <ProjectHighlights highlights={project.highlights} />}
    {project.tags && <ProjectTags tags={project.tags} />}
  </div>
);

// Imagen del proyecto - FIXED: Responsive heights
const ProjectImage: React.FC<{ project: Project }> = ({ project }) => (
  <div className="relative w-full h-48 sm:h-64 md:h-80 rounded-lg sm:rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700">
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

// Descripción del proyecto - FIXED: Títulos responsive
const ProjectDescription: React.FC<{ project: Project }> = ({ project }) => (
  <div>
    <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3">
      Descripción del Proyecto
    </h3>
    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed break-words">
      {project.longDescription || project.description}
    </p>
  </div>
);

// Tecnologías utilizadas - FIXED: Grid responsive
const ProjectTechnologies: React.FC<{ project: Project }> = ({ project }) => (
  <div>
    <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3">
      Tech Stack
    </h3>
    <div className="flex flex-wrap gap-2">
      {project.technologies.map((tech, index) => (
        <TechnologyBadge key={`${tech}-${index}`} technology={tech} />
      ))}
    </div>
  </div>
);

// Badge de tecnología - FIXED: Text responsive
const TechnologyBadge: React.FC<{ technology: string }> = ({ technology }) => (
  <span className="px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium bg-primary-100 text-primary-800 
                 dark:bg-primary-800 dark:text-primary-200 rounded-full break-all">
    {technology}
  </span>
);

// Características destacadas - FIXED: Spacing responsive
const ProjectHighlights: React.FC<{ highlights: string[] }> = ({ highlights }) => (
  <div>
    <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3">
      Características Destacadas
    </h3>
    <ul className="space-y-2">
      {highlights.map((highlight, index) => (
        <HighlightItem key={index} text={highlight} />
      ))}
    </ul>
  </div>
);

// Item de característica destacada - FIXED: Text responsive
const HighlightItem: React.FC<{ text: string }> = ({ text }) => (
  <li className="flex items-start space-x-2">
    <CheckCircle size={14} className="text-green-500 mt-0.5 flex-shrink-0" />
    <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 break-words">
      {text}
    </span>
  </li>
);

// Tags del proyecto - FIXED: Responsive
const ProjectTags: React.FC<{ tags: string[] }> = ({ tags }) => (
  <div>
    <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3">
      Tags
    </h3>
    <div className="flex flex-wrap gap-2">
      {tags.map((tag, index) => (
        <TagBadge key={`${tag}-${index}`} tag={tag} />
      ))}
    </div>
  </div>
);

// Badge de tag - FIXED: Text size responsive
const TagBadge: React.FC<{ tag: string }> = ({ tag }) => (
  <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 
                 dark:bg-gray-700 dark:text-gray-300 rounded-md break-all">
    #{tag}
  </span>
);

// Footer con botones de acción - FIXED: Responsive y sticky
const ModalFooter: React.FC<{
  project: Project;
  onGithubClick: () => void;
  onLiveClick: () => void;
}> = ({ project, onGithubClick, onLiveClick }) => (
  <div className="flex-shrink-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4 sm:p-6 rounded-b-xl sm:rounded-b-2xl">
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-end">
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

// Botón de acción reutilizable - FIXED: Responsive
const ActionButton: React.FC<{
  onClick: () => void;
  icon: LucideIcon;
  text: string;
  variant: 'primary' | 'secondary';
}> = ({ onClick, icon: Icon, text, variant }) => (
  <button
    onClick={onClick}
    className={cn(
      'flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 sm:py-2 w-full sm:w-auto text-sm sm:text-base',
      variant === 'primary' ? 'btn btn-primary' : 'btn btn-secondary'
    )}
  >
    <Icon size={16} className="sm:hidden" />
    <Icon size={18} className="hidden sm:block" />
    <span>{text}</span>
  </button>
);