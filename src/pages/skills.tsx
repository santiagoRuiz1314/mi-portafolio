import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { SkillBadge } from '@/components/SkillBadge';
import { SAMPLE_SKILLS, SKILL_CATEGORIES } from '@/utils/sample-data';
import { Code, Database, Palette, Wrench, Smartphone, Cloud } from 'lucide-react';

const SkillsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Filtrar habilidades por categoría
  const filteredSkills = selectedCategory === 'all' 
    ? SAMPLE_SKILLS 
    : SAMPLE_SKILLS.filter(skill => skill.category.toLowerCase() === selectedCategory.toLowerCase());

  // Agrupar habilidades por categoría
  const skillsByCategory = SKILL_CATEGORIES.reduce((acc, category) => {
    acc[category.id] = SAMPLE_SKILLS.filter(skill => 
      skill.category.toLowerCase() === category.name.toLowerCase()
    );
    return acc;
  }, {} as Record<string, typeof SAMPLE_SKILLS>);

  const categoryIcons = {
    frontend: Palette,
    backend: Code,
    database: Database,
    devops: Cloud,
    mobile: Smartphone,
    tools: Wrench,
  };

  return (
    <Layout
      seo={{
        title: 'Habilidades',
        description: 'Conoce mis habilidades técnicas en desarrollo web, desde frontend hasta backend, bases de datos y herramientas.',
        keywords: ['habilidades', 'skills', 'tecnologías', 'frontend', 'backend', 'desarrollo'],
      }}
    >
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Mis Habilidades
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Tecnologías y herramientas que domino para crear soluciones digitales completas
            </p>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                Todas
              </button>
              {SKILL_CATEGORIES.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory.toLowerCase() === category.name.toLowerCase()
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {category.icon} {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills by Category */}
      {selectedCategory === 'all' ? (
        // Mostrar todas las categorías
        <div className="py-20">
          {SKILL_CATEGORIES.map((category, index) => {
            const skills = skillsByCategory[category.id] || [];
            if (skills.length === 0) return null;

            const IconComponent = categoryIcons[category.id as keyof typeof categoryIcons] || Code;

            return (
              <section 
                key={category.id} 
                className={`py-16 ${index % 2 === 1 ? 'bg-gray-50 dark:bg-gray-900' : ''}`}
              >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="max-w-6xl mx-auto">
                    <div className="flex items-center justify-center mb-12">
                      <div className="flex items-center space-x-3">
                        <div className="p-3 bg-primary-100 dark:bg-primary-800 rounded-lg">
                          <IconComponent size={24} className="text-primary-600 dark:text-primary-400" />
                        </div>
                        <div className="text-center">
                          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                            {category.name}
                          </h2>
                          <p className="text-gray-600 dark:text-gray-400">
                            {category.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {skills.map((skill) => (
                        <SkillBadge
                          key={skill.id}
                          skill={skill}
                          variant="detailed"
                          showLevel={true}
                          showCategory={false}
                          interactive={false}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      ) : (
        // Mostrar categoría específica
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSkills.map((skill) => (
                  <SkillBadge
                    key={skill.id}
                    skill={skill}
                    variant="detailed"
                    showLevel={true}
                    showCategory={false}
                    interactive={false}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Stats Section */}
      <section className="py-20 bg-primary-600 dark:bg-primary-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-12">
              Experiencia en números
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <div className="text-4xl font-bold text-white mb-2">
                  {SAMPLE_SKILLS.length}+
                </div>
                <p className="text-primary-100">Tecnologías</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-white mb-2">5+</div>
                <p className="text-primary-100">Años de experiencia</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-white mb-2">
                  {SAMPLE_SKILLS.filter(s => s.certified).length}
                </div>
                <p className="text-primary-100">Certificaciones</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-white mb-2">
                  {SKILL_CATEGORIES.length}
                </div>
                <p className="text-primary-100">Áreas de expertise</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Siempre aprendiendo
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              La tecnología evoluciona constantemente, y yo también. Estas son algunas de las 
              tecnologías que estoy explorando actualmente:
            </p>
            
            <div className="flex flex-wrap justify-center gap-3">
              {[
                'Astro',
                'Svelte',
                'Rust',
                'Go',
                'WebAssembly',
                'Three.js',
                'GraphQL',
                'Supabase'
              ].map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 
                           rounded-full text-sm border-2 border-dashed border-gray-300 dark:border-gray-600"
                >
                  🚀 {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default SkillsPage;