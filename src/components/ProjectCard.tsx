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
  variant?: 'default' | 'featured' | 'compact';
  showCategory?: boolean;
  showStatus?: boolean;
  className?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  variant = 'default',
  showCategory = true,
  showStatus = true,
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
    variant === 'compact' && 'flex flex-row',
    className
  );

  const imageClasses = cn(
    'w-full object-cover transition-transform duration-300 group-hover:scale-105',
    variant === 'compact' ? 'w-32 h-32 flex-shrink-0' : 'h-48'
  );

  const contentClasses = cn(
    'p-6',
    variant === 'compact' && 'flex-1 p-4'
  );

  return (
    <article className={cardClasses}>
      <Link href={`/projects/${project.id}`} onClick={handleViewProject}>
        {/* Image */}
        <div className="relative overflow-hidden">
          <Image
            src={project.image}
            alt={`Preview del proyecto ${project.title}`}
            width={variant === 'compact' ? 128 : 400}
            height={variant === 'compact' ? 128 : 200}
            className={imageClasses}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          />

          {/* Status Badge */}
          {showStatus && (
            <div className="absolute top-4 left-4">
              <span className={cn(
                'px-2 py-1 text-xs font-medium rounded-full',
                statusColors[project.status]
              )}>
                {statusLabels[project.status]}
              </span>
            </div>
          )}

          {/* Featured Badge */}
          {project.featured && (
            <div className="absolute top-4 right-4">
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-primary-100 text-primary-800 dark:bg-primary-800 dark:text-primary-100">
                Destacado
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className={contentClasses}>
          {/* Category & Date */}
          {showCategory && (
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
          )}

          {/* Title */}
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
            {project.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.slice(0, variant === 'compact' ? 3 : 5).map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > (variant === 'compact' ? 3 : 5) && (
              <span className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-full">
                +{project.technologies.length - (variant === 'compact' ? 3 : 5)}
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleLiveClick}
                className="flex items-center space-x-1 text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
              >
                <ExternalLink size={16} />
                <span>Ver demo</span>
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleGithubClick}
                className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <Github size={16} />
                <span>Código</span>
              </a>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
};