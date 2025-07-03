import React, { useState } from 'react';
import { 
  Layers, 
  ArrowDown, 
  CheckCircle, 
  AlertTriangle, 
  Info,
  ChevronDown,
  ChevronRight,
  Eye
} from 'lucide-react';
import { cn } from '@/utils/cn';
import { ArchitectureDiagram } from './ArchitectureDiagram';
import type { ProjectArchitecture, ArchitectureLayer } from '@/types/architecture';

interface ArchitectureViewProps {
  architecture: ProjectArchitecture;
  className?: string;
}

export const ArchitectureView: React.FC<ArchitectureViewProps> = ({
  architecture,
  className
}) => {
  const [expandedLayers, setExpandedLayers] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'diagram' | 'layers' | 'flow' | 'analysis'>('overview');

  const toggleLayer = (layerId: string) => {
    setExpandedLayers(prev => 
      prev.includes(layerId) 
        ? prev.filter(id => id !== layerId)
        : [...prev, layerId]
    );
  };

  const getArchitectureTypeInfo = (type: string) => {
    const types = {
      'component-based': {
        name: 'Component-Based Architecture',
        description: 'Modular architecture focused on reusable UI components',
        color: 'blue'
      },
      'microservices': {
        name: 'Microservices Architecture', 
        description: 'Distributed architecture with independent, loosely coupled services',
        color: 'green'
      },
      'monolithic': {
        name: 'Monolithic Architecture',
        description: 'Single deployable unit containing all functionality',
        color: 'purple'
      },
      'serverless': {
        name: 'Serverless Architecture',
        description: 'Event-driven architecture using cloud functions',
        color: 'orange'
      },
      'jamstack': {
        name: 'JAMstack Architecture',
        description: 'Modern web architecture based on JavaScript, APIs, and Markup',
        color: 'pink'
      },
      'layered': {
        name: 'Layered Architecture',
        description: 'Hierarchical organization with clear separation of concerns',
        color: 'indigo'
      },
      'mvc': {
        name: 'MVC Architecture',
        description: 'Model-View-Controller pattern for separation of concerns',
        color: 'red'
      }
    };
    return types[type as keyof typeof types] || types.layered;
  };

  const typeInfo = getArchitectureTypeInfo(architecture.type);

  return (
    <div className={cn('space-y-6 w-full min-w-0', className)}>
      {/* Header with Architecture Type - FIXED: Añadido min-w-0 y mejor responsive */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-600">
        <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4">
          <div className={`p-3 rounded-lg bg-${typeInfo.color}-100 dark:bg-${typeInfo.color}-800 flex-shrink-0`}>
            <Layers className={`w-6 h-6 text-${typeInfo.color}-600 dark:text-${typeInfo.color}-400`} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 break-words">
              {typeInfo.name}
            </h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-3 break-words">
              {typeInfo.description}
            </p>
            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-200 leading-relaxed break-words">
              {architecture.description}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs - FIXED: Agregado scroll horizontal y mejor responsive */}
      <div className="border-b border-gray-200 dark:border-gray-700 overflow-hidden">
        <nav className="flex overflow-x-auto scrollbar-hide -mb-px">
          <div className="flex space-x-4 sm:space-x-8 px-1 min-w-max">
            {[
              { id: 'overview', label: 'Overview', icon: Info },
              { id: 'diagram', label: 'Visual Diagram', icon: Eye },
              { id: 'layers', label: 'Architecture Layers', icon: Layers },
              { id: 'flow', label: 'Data Flow', icon: ArrowDown },
              { id: 'analysis', label: 'Analysis', icon: CheckCircle }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={cn(
                  'group inline-flex items-center py-2 px-1 border-b-2 font-medium text-sm transition-colors whitespace-nowrap',
                  activeTab === id
                    ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:border-gray-300'
                )}
              >
                <Icon className="w-4 h-4 mr-2 flex-shrink-0" />
                <span className="hidden sm:inline">{label}</span>
                <span className="sm:hidden">{label.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </nav>
      </div>

      {/* Tab Content - FIXED: Mejorado contenedor */}
      <div className="mt-6 w-full min-w-0 overflow-hidden">
        {activeTab === 'overview' && (
          <ArchitectureOverview architecture={architecture} />
        )}
        
        {activeTab === 'diagram' && (
          <ArchitectureDiagram architecture={architecture} />
        )}
        
        {activeTab === 'layers' && (
          <ArchitectureLayers 
            layers={architecture.layers}
            expandedLayers={expandedLayers}
            onToggleLayer={toggleLayer}
          />
        )}
        
        {activeTab === 'flow' && (
          <DataFlowView dataFlow={architecture.dataFlow} />
        )}
        
        {activeTab === 'analysis' && (
          <ArchitectureAnalysis 
            advantages={architecture.advantages}
            considerations={architecture.considerations}
          />
        )}
      </div>
    </div>
  );
};

// Sub-components for each tab

const ArchitectureOverview: React.FC<{ architecture: ProjectArchitecture }> = ({ architecture }) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
    <div className="space-y-4 min-w-0">
      <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white flex items-center break-words">
        <Layers className="w-5 h-5 mr-2 text-primary-500 flex-shrink-0" />
        <span>Architecture Layers ({architecture.layers.length})</span>
      </h4>
      <div className="space-y-3">
        {architecture.layers.map((layer) => (
          <div key={layer.id} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg min-w-0">
            <span className="text-xl sm:text-2xl flex-shrink-0">{layer.icon}</span>
            <div className="min-w-0 flex-1">
              <div className="font-medium text-gray-900 dark:text-white text-sm sm:text-base break-words">{layer.name}</div>
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 break-words">
                {layer.technologies.slice(0, 2).join(', ')}
                {layer.technologies.length > 2 && ` +${layer.technologies.length - 2} more`}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    
    <div className="space-y-4 min-w-0">
      <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white flex items-center break-words">
        <CheckCircle className="w-5 h-5 mr-2 text-green-500 flex-shrink-0" />
        <span>Key Benefits</span>
      </h4>
      <ul className="space-y-2">
        {architecture.advantages.slice(0, 4).map((advantage, index) => (
          <li key={index} className="flex items-start space-x-2 min-w-0">
            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
            <span className="text-gray-700 dark:text-gray-300 text-xs sm:text-sm break-words">{advantage}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const ArchitectureLayers: React.FC<{
  layers: ArchitectureLayer[];
  expandedLayers: string[];
  onToggleLayer: (layerId: string) => void;
}> = ({ layers, expandedLayers, onToggleLayer }) => (
  <div className="space-y-4">
    {layers.map((layer) => {
      const isExpanded = expandedLayers.includes(layer.id);
      
      return (
        <div key={layer.id} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
          <button
            onClick={() => onToggleLayer(layer.id)}
            className="w-full p-4 text-left bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center justify-between min-w-0"
          >
            <div className="flex items-center space-x-3 min-w-0 flex-1">
              <span className="text-xl sm:text-2xl flex-shrink-0">{layer.icon}</span>
              <div className="min-w-0 flex-1">
                <h4 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base break-words">{layer.name}</h4>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 break-words">{layer.description}</p>
              </div>
            </div>
            <div className="flex-shrink-0 ml-2">
              {isExpanded ? (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronRight className="w-5 h-5 text-gray-400" />
              )}
            </div>
          </button>
          
          {isExpanded && (
            <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-1 gap-6">
                <div className="min-w-0">
                  <h5 className="font-medium text-gray-900 dark:text-white mb-2 text-sm sm:text-base">Technologies</h5>
                  <div className="flex flex-wrap gap-2">
                    {layer.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 text-xs bg-primary-100 dark:bg-primary-800 text-primary-800 dark:text-primary-200 rounded-full break-all"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="min-w-0">
                  <h5 className="font-medium text-gray-900 dark:text-white mb-2 text-sm sm:text-base">Responsibilities</h5>
                  <ul className="space-y-1">
                    {layer.responsibilities.map((responsibility, respIndex) => (
                      <li key={respIndex} className="flex items-start space-x-2 min-w-0">
                        <CheckCircle className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-xs text-gray-600 dark:text-gray-400 break-words">{responsibility}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    })}
  </div>
);

const DataFlowView: React.FC<{ dataFlow: string[] }> = ({ dataFlow }) => (
  <div className="space-y-4">
    <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white flex items-center break-words">
      <ArrowDown className="w-5 h-5 mr-2 text-primary-500 flex-shrink-0" />
      <span>Data Flow Process</span>
    </h4>
    <div className="space-y-3">
      {dataFlow.map((step, index) => (
        <div key={index} className="flex items-start space-x-4">
          <div className="flex-shrink-0 w-8 h-8 bg-primary-100 dark:bg-primary-800 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-primary-600 dark:text-primary-400">{index + 1}</span>
          </div>
          <div className="flex-1 pt-1 min-w-0">
            <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base break-words">{step}</p>
          </div>
          {index < dataFlow.length - 1 && (
            <div className="flex-shrink-0 ml-4 hidden sm:block">
              <ArrowDown className="w-4 h-4 text-gray-400" />
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
);

const ArchitectureAnalysis: React.FC<{
  advantages: string[];
  considerations: string[];
}> = ({ advantages, considerations }) => (
  <div className="grid grid-cols-1 gap-6">
    <div className="space-y-4 min-w-0">
      <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white flex items-center break-words">
        <CheckCircle className="w-5 h-5 mr-2 text-green-500 flex-shrink-0" />
        <span>Advantages & Benefits</span>
      </h4>
      <ul className="space-y-3">
        {advantages.map((advantage, index) => (
          <li key={index} className="flex items-start space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg min-w-0">
            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
            <span className="text-gray-700 dark:text-gray-300 text-sm sm:text-base break-words">{advantage}</span>
          </li>
        ))}
      </ul>
    </div>
    
    <div className="space-y-4 min-w-0">
      <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white flex items-center break-words">
        <AlertTriangle className="w-5 h-5 mr-2 text-yellow-500 flex-shrink-0" />
        <span>Considerations & Trade-offs</span>
      </h4>
      <ul className="space-y-3">
        {considerations.map((consideration, index) => (
          <li key={index} className="flex items-start space-x-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg min-w-0">
            <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
            <span className="text-gray-700 dark:text-gray-300 text-sm sm:text-base break-words">{consideration}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);