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
    <div className={cn('space-y-8', className)}>
      {/* Architecture Type Header */}
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Architecture Diagram
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          {architecture.description}
        </p>
      </div>

      {/* Main Diagram */}
      <div className="relative">
        {/* Layers */}
        <div className="space-y-6">
          {architecture.layers.map((layer, index) => {
            const IconComponent = getLayerIcon(layer);
            const isHovered = hoveredLayer === layer.id;
            const isSelected = selectedLayer === layer.id;
            
            return (
              <div key={layer.id} className="relative">
                {/* Layer Card */}
                <div
                  className={cn(
                    'relative p-6 rounded-xl border-2 border-gray-200 dark:border-gray-700',
                    'bg-gradient-to-r transition-all duration-300 cursor-pointer',
                    'hover:shadow-xl transform',
                    getLayerColor(index, isHovered, isSelected)
                  )}
                  onMouseEnter={() => setHoveredLayer(layer.id)}
                  onMouseLeave={() => setHoveredLayer(null)}
                  onClick={() => setSelectedLayer(selectedLayer === layer.id ? null : layer.id)}
                >
                  {/* Layer Header */}
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                      <span className="text-2xl" role="img" aria-label={layer.name}>
                        {layer.icon}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-white mb-1">
                        {layer.name}
                      </h4>
                      <p className="text-white/80 text-sm">
                        {layer.description}
                      </p>
                    </div>
                    <IconComponent className="w-6 h-6 text-white/80" />
                  </div>

                  {/* Technologies Preview */}
                  <div className="flex flex-wrap gap-2">
                    {layer.technologies.slice(0, 4).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-white/20 text-white text-xs rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                    {layer.technologies.length > 4 && (
                      <span className="px-2 py-1 bg-white/20 text-white text-xs rounded-full">
                        +{layer.technologies.length - 4} more
                      </span>
                    )}
                  </div>

                  {/* Expanded Details */}
                  {isSelected && (
                    <div className="mt-4 pt-4 border-t border-white/20">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="text-white font-medium mb-2">All Technologies</h5>
                          <div className="flex flex-wrap gap-1">
                            {layer.technologies.map((tech, techIndex) => (
                              <span
                                key={techIndex}
                                className="px-2 py-1 bg-white/30 text-white text-xs rounded"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h5 className="text-white font-medium mb-2">Responsibilities</h5>
                          <ul className="space-y-1">
                            {layer.responsibilities.slice(0, 3).map((resp, respIndex) => (
                              <li key={respIndex} className="text-white/90 text-xs flex items-start">
                                <span className="w-1 h-1 bg-white rounded-full mt-1.5 mr-2 flex-shrink-0" />
                                {resp}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Connection Arrow */}
                {index < architecture.layers.length - 1 && (
                  <div className="flex justify-center my-4">
                    <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                      <ArrowDown className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Data Flow Indicator */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-400 to-primary-600 rounded-full opacity-30" />
      </div>

      {/* Interactive Legend */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          💡 Interactive Guide
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary-500 rounded-full" />
            <span className="text-gray-600 dark:text-gray-400">
              Click on layers to see detailed information
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <ArrowDown className="w-4 h-4 text-gray-500" />
            <span className="text-gray-600 dark:text-gray-400">
              Data flows from top to bottom
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};