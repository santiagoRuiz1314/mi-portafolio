import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { BlogCard } from '@/components/BlogCard';
import { SAMPLE_BLOG_POSTS } from '@/utils/sample-data';
import { Search, Calendar, Tag } from 'lucide-react';

const BlogPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  // Obtener solo posts publicados
  const publishedPosts = SAMPLE_BLOG_POSTS.filter(post => post.published);

  // Filtrar posts
  const filteredPosts = publishedPosts.filter(post => {
    const matchesSearch = searchTerm === '' ||
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTag = selectedTag === '' ||
      post.tags.includes(selectedTag);

    return matchesSearch && matchesTag;
  });

  // Obtener posts destacados
  const featuredPosts = filteredPosts.filter(post => post.featured);
  const otherPosts = filteredPosts.filter(post => !post.featured);

  // Obtener todas las tags únicas
  const allTags = Array.from(
    new Set(publishedPosts.flatMap(post => post.tags))
  ).sort();

  // Obtener categorías únicas
  const categories = Array.from(
    new Set(publishedPosts.map(post => post.category))
  ).sort();

  return (
    <Layout
      seo={{
        title: 'Blog',
        description: 'Artículos sobre desarrollo web, tutoriales, mejores prácticas y reflexiones sobre tecnología.',
        keywords: ['blog', 'desarrollo web', 'tutoriales', 'react', 'typescript', 'javascript'],
      }}
    >
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Blog
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Comparto conocimientos, tutoriales y reflexiones sobre desarrollo web
            </p>

            {/* Search and Filters */}
            <div className="max-w-2xl mx-auto space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Buscar artículos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                           bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                           focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              {/* Tag Filter */}
              <div className="flex flex-wrap justify-center gap-2">
                <button
                  onClick={() => setSelectedTag('')}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    selectedTag === ''
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  Todos
                </button>
                {allTags.slice(0, 8).map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      selectedTag === tag
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    <Tag size={12} className="inline mr-1" />
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
                Artículos Destacados
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                {featuredPosts.map((post) => (
                  <BlogCard
                    key={post.slug}
                    post={post}
                    variant="featured"
                    showAuthor={false}
                    showReadingTime={true}
                    showExcerpt={true}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* All Posts */}
      <section className={`py-20 ${featuredPosts.length > 0 ? 'bg-gray-50 dark:bg-gray-900' : ''}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {featuredPosts.length > 0 && (
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
                Todos los Artículos
              </h2>
            )}
            
            {filteredPosts.length === 0 ? (
              <div className="text-center py-16">
                <Search size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  No se encontraron artículos
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Intenta cambiar los filtros o el término de búsqueda
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {(featuredPosts.length > 0 ? otherPosts : filteredPosts).map((post) => (
                  <BlogCard
                    key={post.slug}
                    post={post}
                    variant="default"
                    showAuthor={false}
                    showReadingTime={true}
                    showExcerpt={true}
                  />
                ))}
              </div>
            )}

            {/* Results Counter */}
            {filteredPosts.length > 0 && (
              <div className="text-center mt-12">
                <p className="text-gray-600 dark:text-gray-400">
                  Mostrando {filteredPosts.length} de {publishedPosts.length} artículos
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Categories Sidebar - Could be expanded in future */}
      <section className="py-16 bg-primary-50 dark:bg-primary-900/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
              Explora por categorías
            </h2>
            
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <div
                  key={category}
                  className="bg-white dark:bg-gray-800 px-6 py-3 rounded-lg shadow-soft border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-center space-x-2">
                    <Calendar size={16} className="text-primary-600 dark:text-primary-400" />
                    <span className="font-medium text-gray-900 dark:text-white">
                      {category}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      ({publishedPosts.filter(post => post.category === category).length})
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-primary-600 dark:bg-primary-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              ¿Te gusta el contenido?
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Suscríbete para recibir las últimas actualizaciones del blog
            </p>
            <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-3">
              <input
                type="email"
                placeholder="tu@email.com"
                className="flex-1 px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-primary-300"
              />
              <button className="px-6 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
                Suscribirse
              </button>
            </div>
            <p className="text-primary-200 text-sm mt-3">
              Sin spam. Solo contenido de calidad.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BlogPage;