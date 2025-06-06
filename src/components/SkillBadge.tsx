import React from 'react';
import { cn } from '@/utils/cn';
import { LucideIcon } from 'lucide-react';

export interface Skill {
  id: string;
  name: string;
  level: number; // 1-5 or 1-100
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
  variant?: 'default' | 'detailed' | 'compact' | 'progress';
  showLevel?: boolean;
  showCategory?: boolean;
  showProgress?: boolean;
  interactive?: boolean;
  className?: string;
  onClick?: (skill: Skill) => void;
}

export const SkillBadge: React.FC<SkillBadgeProps> = ({
  skill,
  variant = 'default',
  showLevel = true,
  showCategory = false,
  showProgress = false,
  interactive = false,
  className,
  onClick,
}) => {
  const levelPercentage = skill.level <= 5 ? (skill.level / 5) * 100 : skill.level;
  
  const getLevelLabel = (level: number) => {
    if (level <= 5) {
      const labels = ['Principiante', 'Básico', 'Intermedio', 'Avanzado', 'Experto'];
      return labels[Math.max(0, level - 1)];
    }
    return `${level}%`;
  };

  const getLevelColor = (level: number) => {
    const percentage = level <= 5 ? (level / 5) * 100 : level;
    if (percentage >= 80) return 'text-green-600 dark:text-green-400';
    if (percentage >= 60) return 'text-blue-600 dark:text-blue-400';
    if (percentage >= 40) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-gray-600 dark:text-gray-400';
  };

  const getProgressBarColor = (level: number) => {
    const percentage = level <= 5 ? (level / 5) * 100 : level;
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 60) return 'bg-blue-500';
    if (percentage >= 40) return 'bg-yellow-500';
    return 'bg-gray-500';
  };

  const renderIcon = () => {
    if (!skill.icon) return null;
    
    if (typeof skill.icon === 'string') {
      return (
        <span 
          className="text-lg" 
          role="img" 
          aria-label={skill.name}
        >
          {skill.icon}
        </span>
      );
    }
    
    const IconComponent = skill.icon as LucideIcon;
    return <IconComponent size={18} />;
  };

  const baseClasses = cn(
    'inline-flex items-center transition-all duration-200',
    interactive && 'cursor-pointer hover:scale-105 hover:shadow-md',
    className
  );

  // Compact variant - minimal badge
  if (variant === 'compact') {
    return (
      <span
        className={cn(
          baseClasses,
          'px-2 py-1 text-xs font-medium rounded-full',
          'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300',
          interactive && 'hover:bg-primary-100 dark:hover:bg-primary-800 hover:text-primary-800 dark:hover:text-primary-200'
        )}
        onClick={() => onClick?.(skill)}
      >
        {renderIcon() && <span className="mr-1">{renderIcon()}</span>}
        {skill.name}
      </span>
    );
  }

  // Progress variant - with progress bar
  if (variant === 'progress') {
    return (
      <div
        className={cn(
          baseClasses,
          'flex-col w-full p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700',
          interactive && 'hover:border-primary-300 dark:hover:border-primary-600'
        )}
        onClick={() => onClick?.(skill)}
      >
        <div className="flex items-center justify-between w-full mb-2">
          <div className="flex items-center space-x-2">
            {renderIcon()}
            <span className="font-medium text-gray-900 dark:text-white">
              {skill.name}
            </span>
          </div>
          {showLevel && (
            <span className={cn('text-sm font-medium', getLevelColor(skill.level))}>
              {getLevelLabel(skill.level)}
            </span>
          )}
        </div>
        
        {showProgress && (
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className={cn('h-2 rounded-full transition-all duration-500', getProgressBarColor(skill.level))}
              style={{ width: `${levelPercentage}%` }}
            />
          </div>
        )}

        {showCategory && (
          <span className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            {skill.category}
          </span>
        )}
      </div>
    );
  }

  // Detailed variant - card-like with more info
  if (variant === 'detailed') {
    return (
      <div
        className={cn(
          baseClasses,
          'flex-col p-6 bg-white dark:bg-gray-800 rounded-xl shadow-soft',
          'border border-gray-200 dark:border-gray-700',
          interactive && 'hover:shadow-medium hover:border-primary-300 dark:hover:border-primary-600'
        )}
        onClick={() => onClick?.(skill)}
      >
        {/* Header */}
        <div className="flex items-center justify-between w-full mb-3">
          <div className="flex items-center space-x-3">
            {renderIcon() && (
              <div className="p-2 bg-primary-100 dark:bg-primary-800 rounded-lg">
                {renderIcon()}
              </div>
            )}
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {skill.name}
              </h3>
              {showCategory && (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {skill.category}
                </p>
              )}
            </div>
          </div>
          
          {skill.certified && (
            <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100 rounded-full">
              Certificado
            </span>
          )}
        </div>

        {/* Description */}
        {skill.description && (
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
            {skill.description}
          </p>
        )}

        {/* Level and Experience */}
        <div className="flex items-center justify-between w-full">
          {showLevel && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">Nivel:</span>
              <span className={cn('text-sm font-medium', getLevelColor(skill.level))}>
                {getLevelLabel(skill.level)}
              </span>
            </div>
          )}
          
          {skill.yearsOfExperience && (
            <div className="flex items-center space-x-1">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {skill.yearsOfExperience} año{skill.yearsOfExperience !== 1 ? 's' : ''}
              </span>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        {showProgress && (
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-3">
            <div
              className={cn('h-2 rounded-full transition-all duration-500', getProgressBarColor(skill.level))}
              style={{ width: `${levelPercentage}%` }}
            />
          </div>
        )}

        {/* Projects Count */}
        {skill.projects && skill.projects.length > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Usado en {skill.projects.length} proyecto{skill.projects.length !== 1 ? 's' : ''}
            </span>
          </div>
        )}
      </div>
    );
  }

  // Default variant - simple badge with level
  return (
    <span
      className={cn(
        baseClasses,
        'px-3 py-2 rounded-lg border',
        'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700',
        'text-gray-900 dark:text-white',
        interactive && 'hover:border-primary-300 dark:hover:border-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20'
      )}
      onClick={() => onClick?.(skill)}
    >
      {renderIcon() && <span className="mr-2">{renderIcon()}</span>}
      
      <span className="font-medium">{skill.name}</span>
      
      {showLevel && (
        <span className={cn('ml-2 text-sm', getLevelColor(skill.level))}>
          {skill.level <= 5 ? '★'.repeat(skill.level) : `${skill.level}%`}
        </span>
      )}
      
      {showCategory && (
        <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
          • {skill.category}
        </span>
      )}
      
      {skill.certified && (
        <span className="ml-2 text-xs text-green-600 dark:text-green-400">
          ✓
        </span>
      )}
    </span>
  );
};