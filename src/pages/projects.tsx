import React, { useState, useMemo, useCallback } from 'react';
import { Layout } from '@/components/Layout';
import { ProjectCard, type Project } from '@/components/ProjectCard';
import { ProjectModal } from '@/components/ProjectModal';
import { SAMPLE_PROJECTS, PROJECT_CATEGORIES } from '@/utils/sample-data';
import { Search, Filter } from 'lucide-react';


const useProjectFilters = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProjects = useMemo(() => {
    return SAMPLE_PROJECTS.filter(project => {
      const matchesCategory = selectedCategory === 'all' || 
        project.category.toLowerCase() === selectedCategory;
      
      if (!matchesCategory) return false;
      
      if (!searchTerm) return true;
      
      const searchLower = searchTerm.toLowerCase();
      return (
        project.title.toLowerCase().includes(searchLower) ||
        project.description.toLowerCase().includes(searchLower) ||
        project.technologies.some(tech => 
          tech.toLowerCase().includes(searchLower)
        )
      );
    });
  }, [selectedCategory, searchTerm]);

  const groupedProjects = useMemo(() => {
    const featured = filteredProjects.filter(p => p.featured);
    const others = filteredProjects.filter(p => !p.featured);
    return { featured, others };
  }, [filteredProjects]);

  return {
    selectedCategory,
    setSelectedCategory,
    searchTerm,
    setSearchTerm,
    filteredProjects,
    groupedProjects
  };
};

const ProjectsPage: React.FC = () => {
  const {
    selectedCategory,
    setSelectedCategory,
    searchTerm,
    setSearchTerm,
    filteredProjects,
    groupedProjects
  } = useProjectFilters();
  
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProjectClick = useCallback((project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedProject(null);
  }, []);

  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
  }, [setSelectedCategory]);

  return (
    <Layout
      seo={{
        title: 'Proyectos',
        description: 'Explora mi portafolio de proyectos de desarrollo web, desde aplicaciones React hasta soluciones full-stack.',
        keywords: ['proyectos', 'portafolio', 'desarrollo web', 'react', 'nextjs'],
      }}
    >
      <HeroSection 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />

      {groupedProjects.featured.length > 0 && (
        <FeaturedProjectsSection 
          projects={groupedProjects.featured}
          onProjectClick={handleProjectClick}
        />
      )}

      <AllProjectsSection 
        projects={groupedProjects.others}
        hasFeatured={groupedProjects.featured.length > 0}
        filteredCount={filteredProjects.length}
        totalCount={SAMPLE_PROJECTS.length}
        onProjectClick={handleProjectClick}
      />

      <CTASection />

      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </Layout>
  );
};


const HeroSection: React.FC<{
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}> = ({ searchTerm, onSearchChange, selectedCategory, onCategoryChange }) => (
  <section className="py-20 bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          My Projects
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          A selection of projects that showcase my technical skills and creativity
        </p>
        
        <div className="max-w-2xl mx-auto space-y-4">
          <SearchInput value={searchTerm} onChange={onSearchChange} />
          <CategoryFilter 
            selected={selectedCategory} 
            onChange={onCategoryChange}
          />
        </div>
      </div>
    </div>
  </section>
);

const SearchInput: React.FC<{
  value: string;
  onChange: (value: string) => void;
}> = ({ value, onChange }) => (
  <div className="relative">
    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
    <input
      type="text"
      placeholder="Search Projects..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg 
               bg-white dark:bg-gray-800 text-gray-900 dark:text-white
               focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
    />
  </div>
);

const CategoryFilter: React.FC<{
  selected: string;
  onChange: (category: string) => void;
}> = ({ selected, onChange }) => (
  <div className="flex flex-wrap justify-center gap-2">
    {PROJECT_CATEGORIES.map((category) => (
      <button
        key={category.id}
        onClick={() => onChange(category.id)}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          selected === category.id
            ? 'bg-primary-600 text-white'
            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
        }`}
      >
        {category.name}
      </button>
    ))}
  </div>
);

const FeaturedProjectsSection: React.FC<{
  projects: Project[];
  onProjectClick: (project: Project) => void;
}> = ({ projects, onProjectClick }) => (
  <section className="py-20">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
          Featured Projects
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              variant="featured"
              onProjectClick={onProjectClick}
            />
          ))}
        </div>
      </div>
    </div>
  </section>
);

const AllProjectsSection: React.FC<{
  projects: Project[];
  hasFeatured: boolean;
  filteredCount: number;
  totalCount: number;
  onProjectClick: (project: Project) => void;
}> = ({ projects, hasFeatured, filteredCount, totalCount, onProjectClick }) => (
  <section className={`py-20 ${hasFeatured ? 'bg-gray-50 dark:bg-gray-900' : ''}`}>
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {hasFeatured && (
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
            Other Projects
          </h2>
        )}
        
        {filteredCount === 0 ? (
          <EmptyState />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  variant="default"
                  onProjectClick={onProjectClick}
                />
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="text-gray-600 dark:text-gray-400">
                Showing {filteredCount} of {totalCount} projects
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  </section>
);

const EmptyState: React.FC = () => (
  <div className="text-center py-16">
    <Filter size={48} className="mx-auto text-gray-400 mb-4" />
    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
      No se encontraron proyectos
    </h3>
    <p className="text-gray-600 dark:text-gray-400">
      Intenta cambiar los filtros o el término de búsqueda
    </p>
  </div>
);

const CTASection: React.FC = () => (
  <section className="py-20 bg-primary-600 dark:bg-primary-800">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Like what you see?
        </h2>
        <p className="text-xl text-primary-100 mb-8">
          If you're planning a project, I'd be happy to collaborate with you.
        </p>
        <a
          href="/contact"
          className="inline-flex items-center px-8 py-3 bg-white text-primary-600 
                   font-semibold rounded-lg hover:bg-gray-100 transition-colors"
        >
          Contact Me
        </a>
      </div>
    </div>
  </section>
);

export default ProjectsPage;