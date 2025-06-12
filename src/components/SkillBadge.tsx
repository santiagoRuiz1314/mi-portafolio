import React from 'react';
import { cn } from '@/utils/cn';
import { LucideIcon } from 'lucide-react';

export interface Skill {
  id: string;
  name: string;
  level: number; // Mantenemos por compatibilidad, pero no lo usamos
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
  showLevel?: boolean; // Deprecated - se ignora
  showCategory?: boolean;
  showProgress?: boolean; // Deprecated - se ignora
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
    if (!skill.icon) return null;
    
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
    
    const IconComponent = skill.icon as LucideIcon;
    return (
      <IconComponent 
        size={variant === 'large' ? 32 : variant === 'compact' ? 18 : 24} 
        className={variant !== 'compact' ? 'mb-2' : ''}
      />
    );
  };

  const baseClasses = cn(
    'group transition-all duration-300',
    interactive && 'cursor-pointer hover:scale-105',
    className
  );

  // Variante compacta - badge horizontal
  if (variant === 'compact') {
    return (
      <div
        className={cn(
          baseClasses,
          'inline-flex items-center space-x-2 px-3 py-2 rounded-lg',
          'bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600',
          'hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:border-primary-300 dark:hover:border-primary-600',
          'transition-all duration-200'
        )}
        onClick={() => onClick?.(skill)}
      >
        {renderIcon()}
        <span className="font-medium text-gray-900 dark:text-white text-sm">
          {skill.name}
        </span>
        {skill.certified && (
          <span className="text-xs text-green-600 dark:text-green-400">✓</span>
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
          'bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700',
          'p-8 text-center hover:shadow-medium hover:border-primary-300 dark:hover:border-primary-600',
          'hover:transform hover:-translate-y-1'
        )}
        onClick={() => onClick?.(skill)}
      >
        <div className="flex flex-col items-center">
          {renderIcon()}
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {skill.name}
          </h3>
          {showCategory && (
            <span className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              {skill.category}
            </span>
          )}
          {skill.description && (
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center leading-relaxed mb-3">
              {skill.description}
            </p>
          )}
          
          <div className="flex flex-col items-center space-y-1">
            {skill.yearsOfExperience && (
              <div className="text-xs text-primary-600 dark:text-primary-400 font-medium">
                {skill.yearsOfExperience} año{skill.yearsOfExperience !== 1 ? 's' : ''} de experiencia
              </div>
            )}
            {skill.certified && (
              <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100 rounded-full">
                Certificado
              </span>
            )}
            {skill.projects && skill.projects.length > 0 && (
              <div className="text-xs text-gray-400 dark:text-gray-500">
                {skill.projects.length} proyecto{skill.projects.length !== 1 ? 's' : ''}
              </div>
            )}
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
        'p-6 text-center hover:shadow-medium hover:border-primary-300 dark:hover:border-primary-600',
        'hover:transform hover:-translate-y-1'
      )}
      onClick={() => onClick?.(skill)}
    >
      <div className="flex flex-col items-center">
        {renderIcon()}
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
          {skill.name}
        </h3>
        {showCategory && (
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {skill.category}
          </span>
        )}
        
        <div className="flex flex-wrap justify-center items-center gap-2 mt-3">
          {skill.certified && (
            <span className="text-xs text-green-600 dark:text-green-400 flex items-center">
              <span className="mr-1">✓</span>
              
            </span>
          )}
          {skill.projects && skill.projects.length > 0 && (
            <div className="text-xs text-gray-400 dark:text-gray-500">
              {skill.projects.length} proyect{skill.projects.length !== 1 ? 's' : ''}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};