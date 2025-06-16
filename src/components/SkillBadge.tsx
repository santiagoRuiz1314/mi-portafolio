import React from 'react';
import { cn } from '@/utils/cn';
import { LucideIcon } from 'lucide-react';
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiVuedotjs,
  SiNodedotjs,
  SiPython,
  SiExpress,
  SiFastapi,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiDocker,
  SiGit,
  SiAmazon,
  SiVercel,
  SiHtml5,
  SiCss3,
} from 'react-icons/si';

// Mapeo de iconos de tecnologías
const techIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  react: SiReact,
  nextjs: SiNextdotjs,
  typescript: SiTypescript,
  javascript: SiJavascript,
  tailwindcss: SiTailwindcss,
  vuejs: SiVuedotjs,
  nodejs: SiNodedotjs,
  python: SiPython,
  express: SiExpress,
  fastapi: SiFastapi,
  postgresql: SiPostgresql,
  mongodb: SiMongodb,
  redis: SiRedis,
  docker: SiDocker,
  git: SiGit,
  aws: SiAmazon,
  vercel: SiVercel,
  html5: SiHtml5,
  css3: SiCss3,
};

// Colores específicos para cada tecnología
const techColors: Record<string, string> = {
  react: 'text-[#61DAFB]',
  nextjs: 'text-black dark:text-white',
  typescript: 'text-[#3178C6]',
  javascript: 'text-[#F7DF1E]',
  tailwindcss: 'text-[#06B6D4]',
  vuejs: 'text-[#4FC08D]',
  nodejs: 'text-[#339933]',
  python: 'text-[#3776AB]',
  express: 'text-[#000000] dark:text-white',
  fastapi: 'text-[#009688]',
  postgresql: 'text-[#4169E1]',
  mongodb: 'text-[#47A248]',
  redis: 'text-[#DC382D]',
  docker: 'text-[#2496ED]',
  git: 'text-[#F05032]',
  aws: 'text-[#FF9900]',
  vercel: 'text-black dark:text-white',
  html5: 'text-[#E34F26]',
  css3: 'text-[#1572B6]',
};

export interface Skill {
  id: string;
  name: string;
  level: number;
  category: string;
  icon?: LucideIcon | string;
  description?: string;
  projects?: string[];
}

interface SkillBadgeProps {
  skill: Skill;
  variant?: 'default' | 'compact';
  className?: string;
  showCategory?: boolean;
  interactive?: boolean;
}

export const SkillBadge: React.FC<SkillBadgeProps> = ({
  skill,
  variant = 'default',
  className,
}) => {
  const renderIcon = () => {
    // Buscar icono de tecnología por ID
    const TechIcon = techIcons[skill.id.toLowerCase()];
    const iconColor = techColors[skill.id.toLowerCase()];
    
    if (TechIcon) {
      return (
        <TechIcon 
          className={cn(
            iconColor || 'text-gray-600 dark:text-gray-400',
            variant === 'compact' ? 'w-5 h-5' : 'w-6 h-6',
            variant !== 'compact' && 'mb-2',
            'transition-colors duration-200'
          )}
        />
      );
    }
    
    // Fallback a emoji o icono de Lucide
    if (typeof skill.icon === 'string') {
      return (
        <span 
          className={cn(
            variant === 'compact' ? 'text-lg' : 'text-2xl',
            variant !== 'compact' && 'mb-2'
          )}
          role="img" 
          aria-label={skill.name}
        >
          {skill.icon}
        </span>
      );
    }
    
    if (skill.icon && typeof skill.icon !== 'string') {
      const IconComponent = skill.icon as LucideIcon;
      return (
        <IconComponent 
          size={variant === 'compact' ? 18 : 24} 
          className={cn(
            'text-gray-600 dark:text-gray-400',
            variant !== 'compact' && 'mb-2'
          )}
        />
      );
    }
    
    return null;
  };

  // Variante compacta - badge horizontal
  if (variant === 'compact') {
    return (
      <div
        className={cn(
          'inline-flex items-center space-x-3 px-4 py-3 rounded-xl',
          'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700',
          'hover:bg-gray-50 dark:hover:bg-gray-750 hover:border-gray-300 dark:hover:border-gray-600',
          'shadow-sm hover:shadow-md transition-all duration-200',
          className
        )}
      >
        <div className="flex-shrink-0">
          {renderIcon()}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-gray-900 dark:text-white text-sm">
            {skill.name}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            {skill.category}
          </div>
        </div>
        {skill.projects && skill.projects.length > 0 && (
          <div className="flex-shrink-0">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-800 dark:text-primary-100">
              {skill.projects.length}
            </span>
          </div>
        )}
      </div>
    );
  }

  // Variante por defecto - tarjeta estándar
  return (
    <div
      className={cn(
        'bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700',
        'p-6 text-center hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-600',
        'hover:transform hover:-translate-y-1 transition-all duration-300',
        className
      )}
    >
      <div className="flex flex-col items-center">
        <div className="mb-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
          {renderIcon()}
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
          {skill.name}
        </h3>
        
        <span className="text-sm text-gray-500 dark:text-gray-400 mb-3">
          {skill.category}
        </span>
        
        <div className="flex flex-wrap justify-center items-center gap-2">
          {skill.projects && skill.projects.length > 0 && (
            <span className="text-xs text-gray-400 dark:text-gray-500">
              {skill.projects.length} project{skill.projects.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};