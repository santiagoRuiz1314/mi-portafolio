import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { ProjectCard } from '@/components/ProjectCard';
import { SAMPLE_PROJECTS, PROJECT_CATEGORIES } from '@/utils/sample-data';
import { Search, Filter } from 'lucide-react';

const ProjectsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Filtrar proyectos
  const filteredProjects = SAMPLE_PROJECTS.filter(project => {
    const matchesCategory = selectedCategory === 'all' || 
      project.category.toLowerCase() === selectedCategory;
    
    const matchesSearch = searchTerm === '' ||
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.technologies.some(tech => 
        tech.toLowerCase().includes(searchTerm.toLowerCase())
      );

    return matchesCategory && matchesSearch;
  });

  const featuredProjects = filteredProjects.filter(p => p.featured);
  const otherProjects = filteredProjects.filter(p => !p.featured);

  return (
    <Layout
      seo={{
        title: 'Proyectos',
        description: 'Explora mi portafolio de proyectos de desarrollo web, desde aplicaciones React hasta soluciones full-stack.',
        keywords: ['proyectos', 'portafolio', 'desarrollo web', 'react', 'nextjs'],
      }}
    >
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Mis Proyectos
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Una selección de proyectos que demuestran mis habilidades técnicas y creatividad
            </p>
            
            {/* Search and Filter */}
            <div className="max-w-2xl mx-auto space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Buscar proyectos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                           bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                           focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap justify-center gap-2">
                {PROJECT_CATEGORIES.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
                Proyectos Destacados
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                {featuredProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    variant="featured"
                    showCategory={true}
                    showStatus={true}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* All Projects */}
      <section className={`py-20 ${featuredProjects.length > 0 ? 'bg-gray-50 dark:bg-gray-900' : ''}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {featuredProjects.length > 0 && (
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
                Otros Proyectos
              </h2>
            )}
            
            {filteredProjects.length === 0 ? (
              <div className="text-center py-16">
                <Filter size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  No se encontraron proyectos
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Intenta cambiar los filtros o el término de búsqueda
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {(featuredProjects.length > 0 ? otherProjects : filteredProjects).map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    variant="default"
                    showCategory={true}
                    showStatus={true}
                  />
                ))}
              </div>
            )}

            {/* Results Counter */}
            {filteredProjects.length > 0 && (
              <div className="text-center mt-12">
                <p className="text-gray-600 dark:text-gray-400">
                  Mostrando {filteredProjects.length} de {SAMPLE_PROJECTS.length} proyectos
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600 dark:bg-primary-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              ¿Te gusta lo que ves?
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Si tienes un proyecto en mente, me encantaría trabajar contigo
            </p>
            <a
              href="/contact"
              className="inline-flex items-center px-8 py-3 bg-white text-primary-600 
                       font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Contáctame
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProjectsPage;