import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
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
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  variant = 'default',
  className,
}) => {
  const analytics = useAnalytics();

  const handleViewProject = () => {
    analytics.projects.view(project.id);
  };

  const handleGithubClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    analytics.projects.clickGithub(project.id);
  };

  const handleLiveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    analytics.projects.clickDemo(project.id);
  };

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

  const cardClasses = cn(
    'group bg-white dark:bg-gray-800 rounded-xl shadow-soft hover:shadow-medium transition-all duration-300',
    'border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600',
    'overflow-hidden hover:transform hover:-translate-y-1',
    variant === 'featured' && 'lg:col-span-2',
    className
  );

  const imageClasses = cn(
    'w-full object-cover transition-transform duration-300 group-hover:scale-105',
    'h-48'
  );

  return (
    <article className={cardClasses}>
      {/* Enlace principal a la página de detalle */}
      <Link href={`/projects/${project.id}`} onClick={handleViewProject} className="block">
        <div className="relative overflow-hidden">
          <Image
            src={project.image}
            alt={`Preview del proyecto ${project.title}`}
            width={400}
            height={200}
            className={imageClasses}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD..."
          />

          <div className="absolute top-4 left-4">
            <span className={cn(
              'px-2 py-1 text-xs font-medium rounded-full',
              statusColors[project.status]
            )}>
              {statusLabels[project.status]}
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

        <div className="p-6">
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

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {project.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {project.description}
          </p>
        </div>
      </Link>

      {/* Enlaces externos (GitHub / Demo) fuera del Link principal */}
      <div className="px-6 pb-6 flex space-x-4">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleGithubClick}
            className="flex items-center space-x-1 text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline"
          >
            <Github size={16} />
            <span>GitHub</span>
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleLiveClick}
            className="flex items-center space-x-1 text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline"
          >
            <ExternalLink size={16} />
            <span>Demo</span>
          </a>
        )}
      </div>
    </article>
  );
};
