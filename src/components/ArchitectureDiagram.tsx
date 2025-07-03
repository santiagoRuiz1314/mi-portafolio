import React, { useState } from 'react';
import { ArrowDown, Server, Database, Globe, Cog, Cloud } from 'lucide-react';
import { cn } from '@/utils/cn';
import type { ArchitectureLayer, ProjectArchitecture } from '@/types/architecture';

interface ArchitectureDiagramProps {
  architecture: ProjectArchitecture;
  className?: string;
}

export const ArchitectureDiagram: React.FC<ArchitectureDiagramProps> = ({
  architecture,
  className
}) => {
  const [hoveredLayer, setHoveredLayer] = useState<string | null>(null);
  const [selectedLayer, setSelectedLayer] = useState<string | null>(null);

  const getLayerIcon = (layer: ArchitectureLayer) => {
    // Map layer types to appropriate icons
    if (layer.name.toLowerCase().includes('presentation') || layer.name.toLowerCase().includes('ui')) {
      return Globe;
    }
    if (layer.name.toLowerCase().includes('data') || layer.name.toLowerCase().includes('database')) {
      return Database;
    }
    if (layer.name.toLowerCase().includes('api') || layer.name.toLowerCase().includes('gateway')) {
      return Server;
    }
    if (layer.name.toLowerCase().includes('infrastructure') || layer.name.toLowerCase().includes('container')) {
      return Cloud;
    }
    return Cog;
  };

  const getLayerColor = (index: number, isHovered: boolean, isSelected: boolean) => {
    const colors = [
      'from-blue-500 to-blue-600',
      'from-green-500 to-green-600', 
      'from-purple-500 to-purple-600',
      'from-orange-500 to-orange-600',
      'from-red-500 to-red-600',
      'from-indigo-500 to-indigo-600'
    ];
    
    const baseColor = colors[index % colors.length];
    
    if (isSelected) {
      return `${baseColor} ring-4 ring-primary-400 ring-opacity-50`;
    }
    if (isHovered) {
      return `${baseColor} scale-105 shadow-lg`;
    }
    return baseColor;
  };

  return (
    <div className={cn('space-y-6 sm:space-y-8 w-full min-w-0', className)}>
      {/* Architecture Type Header */}
      <div className="text-center">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Architecture Diagram
        </h3>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 break-words">
          {architecture.description}
        </p>
      </div>

      {/* Main Diagram - FIXED: Mejorado para móvil */}
      <div className="relative w-full min-w-0">
        {/* Layers */}
        <div className="space-y-4 sm:space-y-6">
          {architecture.layers.map((layer, index) => {
            const IconComponent = getLayerIcon(layer);
            const isHovered = hoveredLayer === layer.id;
            const isSelected = selectedLayer === layer.id;
            
            return (
              <div key={layer.id} className="relative">
                {/* Layer Card - FIXED: Mejor responsive y overflow control */}
                <div
                  className={cn(
                    'relative p-4 sm:p-6 rounded-xl border-2 border-gray-200 dark:border-gray-700',
                    'bg-gradient-to-r transition-all duration-300 cursor-pointer',
                    'hover:shadow-xl transform w-full min-w-0',
                    getLayerColor(index, isHovered, isSelected)
                  )}
                  onMouseEnter={() => setHoveredLayer(layer.id)}
                  onMouseLeave={() => setHoveredLayer(null)}
                  onClick={() => setSelectedLayer(selectedLayer === layer.id ? null : layer.id)}
                >
                  {/* Layer Header - FIXED: Mejorado para móvil */}
                  <div className="flex items-center space-x-3 sm:space-x-4 mb-4">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-lg flex items-center justify-center">
                      <span className="text-xl sm:text-2xl" role="img" aria-label={layer.name}>
                        {layer.icon}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-base sm:text-lg font-semibold text-white mb-1 break-words">
                        {layer.name}
                      </h4>
                      <p className="text-white/80 text-xs sm:text-sm break-words">
                        {layer.description}
                      </p>
                    </div>
                    <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-white/80 flex-shrink-0" />
                  </div>

                  {/* Technologies Preview - FIXED: Mejor manejo en móvil */}
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    {layer.technologies.slice(0, 3).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-white/20 text-white text-xs rounded-full break-all"
                      >
                        {tech}
                      </span>
                    ))}
                    {layer.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-white/20 text-white text-xs rounded-full">
                        +{layer.technologies.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Expanded Details - FIXED: Mejorado grid responsive */}
                  {isSelected && (
                    <div className="mt-4 pt-4 border-t border-white/20">
                      <div className="grid grid-cols-1 gap-4">
                        <div className="min-w-0">
                          <h5 className="text-white font-medium mb-2 text-sm sm:text-base">All Technologies</h5>
                          <div className="flex flex-wrap gap-1">
                            {layer.technologies.map((tech, techIndex) => (
                              <span
                                key={techIndex}
                                className="px-2 py-1 bg-white/30 text-white text-xs rounded break-all"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="min-w-0">
                          <h5 className="text-white font-medium mb-2 text-sm sm:text-base">Responsibilities</h5>
                          <ul className="space-y-1">
                            {layer.responsibilities.slice(0, 3).map((resp, respIndex) => (
                              <li key={respIndex} className="text-white/90 text-xs flex items-start min-w-0">
                                <span className="w-1 h-1 bg-white rounded-full mt-1.5 mr-2 flex-shrink-0" />
                                <span className="break-words">{resp}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Connection Arrow - FIXED: Responsive para móvil */}
                {index < architecture.layers.length - 1 && (
                  <div className="flex justify-center my-3 sm:my-4">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                      <ArrowDown className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 dark:text-gray-400" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Data Flow Indicator - FIXED: Responsive */}
        <div className="absolute left-2 sm:left-0 top-0 bottom-0 w-0.5 sm:w-1 bg-gradient-to-b from-primary-400 to-primary-600 rounded-full opacity-30" />
      </div>

      {/* Interactive Legend - FIXED: Mejorado para móvil */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 sm:p-6">
        <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4">
          💡 Interactive Guide
        </h4>
        <div className="grid grid-cols-1 gap-4 text-xs sm:text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary-500 rounded-full flex-shrink-0" />
            <span className="text-gray-600 dark:text-gray-400 break-words">
              Click on layers to see detailed information
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <ArrowDown className="w-4 h-4 text-gray-500 flex-shrink-0" />
            <span className="text-gray-600 dark:text-gray-400 break-words">
              Data flows from top to bottom
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};