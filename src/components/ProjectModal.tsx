import React, { useEffect } from 'react';
import Image from 'next/image';
import { X, Github, ExternalLink, Calendar, Tag, CheckCircle, Clock, Lightbulb } from 'lucide-react';
import { cn } from '@/utils/cn';
import { useAnalytics } from '@/lib/analytics';
import type { Project } from '@/components/ProjectCard';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  isOpen,
  onClose,
}) => {
  const analytics = useAnalytics();

  // Cerrar modal con ESC
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  const handleGithubClick = () => {
    if (project?.githubUrl) {
      analytics.projects.clickGithub(project.id);
      window.open(project.githubUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleLiveClick = () => {
    if (project?.liveUrl) {
      analytics.projects.clickDemo(project.id);
      window.open(project.liveUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen || !project) return null;

  const statusColors = {
    completed: 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100',
    'in-progress': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100',
    planned: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100',
  };

  const statusLabels = {
    completed: 'Completado',
    'in-progress': 'En progreso',
    planned: 'Planeado',
  };

  const statusIcons = {
    completed: CheckCircle,
    'in-progress': Clock,
    planned: Lightbulb,
  };

  const StatusIcon = statusIcons[project.status];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div 
        className={cn(
          "relative w-full max-w-4xl max-h-[90vh] overflow-auto",
          "bg-white dark:bg-gray-800 rounded-2xl shadow-2xl",
          "transform transition-all duration-300",
          "animate-in zoom-in-95 duration-300"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 rounded-t-2xl">
          <div className="flex items-start justify-between">
            <div className="flex-1 pr-4">
              <div className="flex items-center space-x-3 mb-2">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {project.title}
                </h2>
                <div className="flex items-center space-x-2">
                  <StatusIcon size={16} className="text-gray-500 dark:text-gray-400" />
                  <span className={cn(
                    'px-2 py-1 text-xs font-medium rounded-full',
                    statusColors[project.status]
                  )}>
                    {statusLabels[project.status]}
                  </span>
                </div>
              </div>
              
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

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Project Image */}
          <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700">
            <Image
              src={project.image}
              alt={`Preview del proyecto ${project.title}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            />
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Descripción del Proyecto
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {project.longDescription || project.description}
            </p>
          </div>

          {/* Technologies */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-sm font-medium bg-primary-100 text-primary-800 
                           dark:bg-primary-800 dark:text-primary-200 rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Características Destacadas
              </h3>
              <ul className="space-y-2">
                {project.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600 dark:text-gray-300 text-sm">
                      {highlight}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs bg-gray-100 text-gray-700 
                             dark:bg-gray-700 dark:text-gray-300 rounded-md"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer with Action Buttons */}
        <div className="sticky bottom-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-6 rounded-b-2xl">
          <div className="flex flex-col sm:flex-row gap-3 justify-end">
            {project.githubUrl && (
              <button
                onClick={handleGithubClick}
                className="btn btn-secondary flex items-center space-x-2 px-4 py-2 sm:w-auto w-full"
              >
                <Github size={18} />
                <span>Ver Código</span>
              </button>
            )}
            
            {project.liveUrl && (
              <button
                onClick={handleLiveClick}
                className="btn btn-primary flex items-center space-x-2 px-4 py-2 sm:w-auto w-full"
              >
                <ExternalLink size={18} />
                <span>Ver Demo</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};