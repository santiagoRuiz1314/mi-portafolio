import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { SkillBadge } from '@/components/SkillBadge';
import { SAMPLE_SKILLS, SKILL_CATEGORIES } from '@/utils/sample-data';
import { Code, Database, Palette, Wrench, Smartphone, Cloud, Filter, Search } from 'lucide-react';

const SkillsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'compact'>('grid');

  // Filtrar habilidades por categoría y búsqueda
  const filteredSkills = SAMPLE_SKILLS.filter(skill => {
    const matchesCategory = selectedCategory === 'all' || 
      skill.category.toLowerCase() === selectedCategory.toLowerCase();
    
    const matchesSearch = searchTerm === '' ||
      skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      skill.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

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
    databases: Database,
    devops: Cloud,
    tools: Wrench,
    cloud: Cloud,
  };

  const getStatsForCategory = (categoryName: string) => {
    const skills = SAMPLE_SKILLS.filter(skill => 
      skill.category.toLowerCase() === categoryName.toLowerCase()
    );
    const projectCount = skills.reduce((sum, skill) => 
      sum + (skill.projects?.length || 0), 0);
    
    return {
      total: skills.length,
      totalProjects: projectCount
    };
  };

  return (
    <Layout
      seo={{
        title: 'Skills & Technologies',
        description: 'Explore my technical skills and expertise across frontend, backend, databases, and development tools.',
        keywords: ['skills', 'technologies', 'frontend', 'backend', 'development', 'programming'],
      }}
    >
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Skills & Technologies
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Technologies and tools I use to create exceptional digital experiences
            </p>

            {/* Search and Filters */}
            <div className="max-w-2xl mx-auto space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search technologies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl 
                           bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                           focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
                           shadow-sm"
                />
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap justify-center gap-2">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedCategory === 'all'
                      ? 'bg-primary-600 text-white shadow-md transform scale-105'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  All Technologies
                </button>
                {SKILL_CATEGORIES.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      selectedCategory.toLowerCase() === category.name.toLowerCase()
                        ? 'bg-primary-600 text-white shadow-md transform scale-105'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <span>{category.icon}</span>
                    <span>{category.name}</span>
                  </button>
                ))}
              </div>

              {/* View Mode Toggle */}
              <div className="flex justify-center">
                <div className="inline-flex rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                      viewMode === 'grid'
                        ? 'bg-primary-600 text-white'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    Grid View
                  </button>
                  <button
                    onClick={() => setViewMode('compact')}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                      viewMode === 'compact'
                        ? 'bg-primary-600 text-white'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    Compact View
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Display */}
      {selectedCategory === 'all' ? (
        // Mostrar todas las categorías organizadas
        <div className="py-20">
          {SKILL_CATEGORIES.map((category, index) => {
            const skills = skillsByCategory[category.id] || [];
            if (skills.filter(skill => 
              searchTerm === '' || 
              skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              skill.description?.toLowerCase().includes(searchTerm.toLowerCase())
            ).length === 0) return null;

            const IconComponent = categoryIcons[category.id as keyof typeof categoryIcons] || Code;
            const stats = getStatsForCategory(category.name);

            return (
              <section 
                key={category.id} 
                className={`py-16 ${index % 2 === 1 ? 'bg-gray-50 dark:bg-gray-900' : ''}`}
              >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="max-w-6xl mx-auto">
                    {/* Category Header */}
                    <div className="text-center mb-12">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-800 rounded-2xl mb-4">
                        <IconComponent size={32} className="text-primary-600 dark:text-primary-400" />
                      </div>
                      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        {category.name}
                      </h2>
                      <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                        {category.description}
                      </p>
                      
                      {/* Category Stats */}
                      <div className="flex justify-center space-x-6 text-sm">
                        <div className="text-center">
                          <span className="block text-2xl font-bold text-primary-600 dark:text-primary-400">
                            {stats.total}
                          </span>
                          <span className="text-gray-500 dark:text-gray-400">Technologies</span>
                        </div>
                        <div className="text-center">
                          <span className="block text-2xl font-bold text-primary-600 dark:text-primary-400">
                            {stats.totalProjects}
                          </span>
                          <span className="text-gray-500 dark:text-gray-400">Total Projects</span>
                        </div>
                      </div>
                    </div>

                    {/* Skills Grid */}
                    <div className={
                      viewMode === 'compact' 
                        ? 'grid grid-cols-1 md:grid-cols-2 gap-4'
                        : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                    }>
                      {skills
                        .filter(skill => 
                          searchTerm === '' || 
                          skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          skill.description?.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .map((skill) => (
                          <SkillBadge
                            key={skill.id}
                            skill={skill}
                            variant={viewMode === 'compact' ? 'compact' : 'large'}
                            showCategory={false}
                            interactive={true}
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
              {filteredSkills.length === 0 ? (
                <div className="text-center py-16">
                  <Filter size={48} className="mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    No technologies found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Try adjusting your search terms or selecting a different category.
                  </p>
                </div>
              ) : (
                <div className={
                  viewMode === 'compact' 
                    ? 'grid grid-cols-1 md:grid-cols-2 gap-4'
                    : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                }>
                  {filteredSkills.map((skill) => (
                    <SkillBadge
                      key={skill.id}
                      skill={skill}
                      variant={viewMode === 'compact' ? 'compact' : 'large'}
                      showCategory={selectedCategory === 'all'}
                      interactive={true}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Overall Stats Section */}
      <section className="py-20 bg-primary-600 dark:bg-primary-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-12">
              Technical Expertise
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">
                  {SAMPLE_SKILLS.length}+
                </div>
                <p className="text-primary-100">Technologies</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">
                  {SKILL_CATEGORIES.length}
                </div>
                <p className="text-primary-100">Specialization Areas</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">
                  {SAMPLE_SKILLS.reduce((sum, skill) => sum + (skill.projects?.length || 0), 0)}
                </div>
                <p className="text-primary-100">Project Applications</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">
                  {Math.max(...SAMPLE_SKILLS.map(s => s.level || 0))}
                </div>
                <p className="text-primary-100">Max Proficiency</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning & Growth Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Continuous Learning
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                Technology evolves rapidly, and I stay ahead of the curve. 
                Here are some technologies I'm currently exploring and learning.
              </p>
            </div>
            
            {/* Learning Technologies */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {[
                { name: 'Astro', category: 'Frontend' },
                { name: 'Svelte', category: 'Frontend' },
                { name: 'Rust', category: 'Systems' },
                { name: 'Go', category: 'Backend' },
                { name: 'WebAssembly', category: 'Performance' },
                { name: 'Three.js', category: '3D Graphics' },
                { name: 'GraphQL', category: 'API' },
                { name: 'Supabase', category: 'Backend' }
              ].map((tech, index) => (
                <div
                  key={index}
                  className="group p-4 bg-white dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl text-center hover:border-primary-400 dark:hover:border-primary-500 transition-all duration-200 hover:shadow-md"
                >
                  <div className="text-2xl mb-2">🚀</div>
                  <div className="font-medium text-gray-900 dark:text-white text-sm mb-1">
                    {tech.name}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {tech.category}
                  </div>
                </div>
              ))}
            </div>

            {/* Learning Philosophy */}
            <div className="bg-gradient-to-r from-primary-50 to-accent-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                My Learning Philosophy
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                I believe in staying curious and continuously expanding my technical toolkit. 
                Every project is an opportunity to learn something new, whether it's a cutting-edge framework, 
                a better development practice, or a more efficient way to solve problems. 
                This mindset keeps me adaptable and ready for the ever-evolving landscape of technology.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Work Together?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Let's discuss how my skills can help bring your project to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="btn btn-primary px-8 py-3 text-lg rounded-xl"
              >
                Start a Project
              </a>
              <a
                href="/projects"
                className="btn btn-secondary px-8 py-3 text-lg rounded-xl"
              >
                View My Work
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default SkillsPage;