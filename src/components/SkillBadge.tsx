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
  color?: string;
  description?: string;
  yearsOfExperience?: number;
  certified?: boolean;
  projects?: string[];
}

interface SkillBadgeProps {
  skill: Skill;
  variant?: 'default' | 'compact' | 'large';
  showCategory?: boolean;
  interactive?: boolean;
  className?: string;
  onClick?: (skill: Skill) => void;
}

export const SkillBadge: React.FC<SkillBadgeProps> = ({
  skill,
  variant = 'default',
  showCategory = true,
  interactive = false,
  className,
  onClick,
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
            variant === 'large' ? 'w-8 h-8' : variant === 'compact' ? 'w-5 h-5' : 'w-6 h-6',
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
            variant === 'large' ? 'text-3xl' : variant === 'compact' ? 'text-lg' : 'text-2xl',
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
          size={variant === 'large' ? 32 : variant === 'compact' ? 18 : 24} 
          className={cn(
            'text-gray-600 dark:text-gray-400',
            variant !== 'compact' && 'mb-2'
          )}
        />
      );
    }
    
    return null;
  };

  const baseClasses = cn(
    'group transition-all duration-300',
    interactive && 'cursor-pointer hover:scale-105 hover:shadow-lg',
    className
  );

  // Variante compacta - badge horizontal
  if (variant === 'compact') {
    return (
      <div
        className={cn(
          baseClasses,
          'inline-flex items-center space-x-3 px-4 py-3 rounded-xl',
          'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700',
          'hover:bg-gray-50 dark:hover:bg-gray-750 hover:border-gray-300 dark:hover:border-gray-600',
          'shadow-sm hover:shadow-md transition-all duration-200'
        )}
        onClick={() => onClick?.(skill)}
      >
        <div className="flex-shrink-0">
          {renderIcon()}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-gray-900 dark:text-white text-sm">
            {skill.name}
          </div>
          {showCategory && (
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              {skill.category}
            </div>
          )}
        </div>
        {skill.certified && (
          <div className="flex-shrink-0">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
              ✓
            </span>
          </div>
        )}
      </div>
    );
  }

  // Variante grande - tarjeta destacada
  if (variant === 'large') {
    return (
      <div
        className={cn(
          baseClasses,
          'bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700',
          'p-8 text-center hover:shadow-xl hover:border-gray-300 dark:hover:border-gray-600',
          'hover:transform hover:-translate-y-2 transition-all duration-300'
        )}
        onClick={() => onClick?.(skill)}
      >
        <div className="flex flex-col items-center">
          <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-2xl">
            {renderIcon()}
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {skill.name}
          </h3>
          
          {showCategory && (
            <span className="inline-block px-3 py-1 text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 rounded-full mb-3">
              {skill.category}
            </span>
          )}
          
          {skill.description && (
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center leading-relaxed mb-4">
              {skill.description}
            </p>
          )}
          
          <div className="flex flex-col items-center space-y-2">
            {skill.yearsOfExperience && (
              <div className="text-sm font-medium text-primary-600 dark:text-primary-400">
                {skill.yearsOfExperience} year{skill.yearsOfExperience !== 1 ? 's' : ''} exp.
              </div>
            )}
            
            <div className="flex items-center space-x-3 text-xs text-gray-500 dark:text-gray-400">
              {skill.certified && (
                <span className="flex items-center space-x-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>Certified</span>
                </span>
              )}
              
              {skill.projects && skill.projects.length > 0 && (
                <span>
                  {skill.projects.length} project{skill.projects.length !== 1 ? 's' : ''}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Variante por defecto - tarjeta estándar
  return (
    <div
      className={cn(
        baseClasses,
        'bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700',
        'p-6 text-center hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-600',
        'hover:transform hover:-translate-y-1 transition-all duration-300'
      )}
      onClick={() => onClick?.(skill)}
    >
      <div className="flex flex-col items-center">
        <div className="mb-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
          {renderIcon()}
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
          {skill.name}
        </h3>
        
        {showCategory && (
          <span className="text-sm text-gray-500 dark:text-gray-400 mb-3">
            {skill.category}
          </span>
        )}
        
        <div className="flex flex-wrap justify-center items-center gap-2">
          {skill.certified && (
            <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100 rounded-full">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1"></span>
              Certified
            </span>
          )}
          
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