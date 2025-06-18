// src/pages/index.tsx - Versión refactorizada y limpia con Modal
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Code, Users, Coffee, Award } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { HeroSection } from '@/components/HeroSection';
import { ProjectCard, type Project } from '@/components/ProjectCard';
import { ProjectModal } from '@/components/ProjectModal'; // Nuevo import
import { SkillBadge } from '@/components/SkillBadge';
import { useAnalytics } from '@/lib/analytics';
import { usePortfolioData } from '@/hooks/usePortfolioData';

// Mapeo de iconos para las estadísticas
const STATS_ICONS = {
  Code,
  Users,
  Coffee,
  Award,
} as const;

const HomePage: React.FC = () => {
  const analytics = useAnalytics();
  
  // Estado para el modal
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Obtener todos los datos del hook centralizado
  const {
    heroData,
    aboutData,
    statsConfig,
    featuredProjects,
    topSkills,
    seoData,
  } = usePortfolioData();

  // Event handlers
  const handleViewAllProjects = () => {
    analytics.navigation.menuClick('projects');
  };

  const handleViewAllSkills = () => {
    analytics.navigation.menuClick('skills');
  };

  const handleContactClick = () => {
    analytics.navigation.menuClick('contact');
  };

  // Nuevos handlers para el modal
  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <Layout seo={seoData}>
      {/* Hero Section */}
      <HeroSection {...heroData} />

      {/* About Preview Section */}
      <AboutPreviewSection 
        aboutData={aboutData}
        statsConfig={statsConfig}
      />

      {/* Skills Section */}
      <SkillsPreviewSection 
        topSkills={topSkills}
        onViewAll={handleViewAllSkills}
      />

      {/* Featured Projects Section */}
      <ProjectsPreviewSection 
        featuredProjects={featuredProjects}
        onViewAll={handleViewAllProjects}
        onProjectClick={handleProjectClick} // Pasar el handler
      />

      {/* CTA Section */}
      <CTASection onContactClick={handleContactClick} />

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </Layout>
  );
};

// Componente de sección About
interface AboutPreviewSectionProps {
  aboutData: {
    bio: string;
    interests: string[];
    yearsOfExperience: number;
  };
  statsConfig: Array<{
    icon: string;
    value: number;
    label: string;
    suffix: string;
  }>;
}

const AboutPreviewSection: React.FC<AboutPreviewSectionProps> = ({ 
  aboutData, 
  statsConfig 
}) => (
  <section id="about" className="py-20 bg-gray-50 dark:bg-gray-900">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            About me
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Passionate developer with {aboutData.yearsOfExperience}+ years of experience 
            creating innovative digital solutions.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {aboutData.bio}
            </p>
            
            <div className="flex flex-wrap gap-2">
              {aboutData.interests.map((interest) => (
                <span
                  key={interest}
                  className="px-3 py-1 text-sm bg-primary-100 dark:bg-primary-800 text-primary-800 dark:text-primary-200 rounded-full"
                >
                  {interest}
                </span>
              ))}
            </div>

            <Link
              href="/about"
              className="inline-flex items-center space-x-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors font-medium"
            >
              <span>Learn more</span>
              <ArrowRight size={18} />
            </Link>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-6">
            {statsConfig.map((stat, index) => {
              const IconComponent = STATS_ICONS[stat.icon as keyof typeof STATS_ICONS];
              return (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-soft border border-gray-200 dark:border-gray-700 text-center"
                >
                  <div className="flex justify-center mb-3">
                    <IconComponent size={32} className="text-primary-600 dark:text-primary-400" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                    {stat.value}{stat.suffix}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  </section>
);

// Componente de sección Skills
interface SkillsPreviewSectionProps {
  topSkills: any[];
  onViewAll: () => void;
}

const SkillsPreviewSection: React.FC<SkillsPreviewSectionProps> = ({ 
  topSkills, 
  onViewAll 
}) => (
  <section className="py-20">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Technologies
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Modern tech stack for building scalable and high-performance web applications.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {topSkills.map((skill) => (
          <SkillBadge
            key={skill.id}
            skill={skill}
            variant="compact"
            className="hover:scale-105 transition-transform"
          />
        ))}
      </div>

      <div className="text-center">
        <Link
          href="/skills"
          onClick={onViewAll}
          className="btn btn-secondary inline-flex items-center space-x-2"
        >
          <span>View all skills</span>
          <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  </section>
);

// Componente de sección Projects - ACTUALIZADO
interface ProjectsPreviewSectionProps {
  featuredProjects: any[];
  onViewAll: () => void;
  onProjectClick: (project: Project) => void; // Nueva prop
}

const ProjectsPreviewSection: React.FC<ProjectsPreviewSectionProps> = ({ 
  featuredProjects, 
  onViewAll,
  onProjectClick // Nueva prop
}) => (
  <section className="py-20 bg-gray-50 dark:bg-gray-900">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Featured projects
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          A selection of my most recent and representative work
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {featuredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            variant="default"
            onProjectClick={onProjectClick} // Pasar el handler
          />
        ))}
      </div>

      <div className="text-center">
        <Link
          href="/projects"
          onClick={onViewAll}
          className="btn btn-primary inline-flex items-center space-x-2"
        >
          <span>View all projects</span>
          <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  </section>
);

// Componente CTA Section
interface CTASectionProps {
  onContactClick: () => void;
}

const CTASection: React.FC<CTASectionProps> = ({ onContactClick }) => (
  <section className="py-20 bg-primary-600 dark:bg-primary-800">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Do you have a project in mind?
        </h2>
        <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
          I'm available for new projects and collaborations.
          Let's talk about how I can help bring your idea to life!
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/contact"
            onClick={onContactClick}
            className="btn bg-white text-primary-600 hover:bg-gray-100 inline-flex items-center space-x-2 px-8 py-3 rounded-lg font-medium transition-all"
          >
            <span>Contact now</span>
            <ArrowRight size={18} />
          </Link>
          
          <Link
            href="/projects"
            className="btn border-2 border-white text-white hover:bg-white hover:text-primary-600 inline-flex items-center space-x-2 px-8 py-3 rounded-lg font-medium transition-all"
          >
            <span>View my work</span>
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default HomePage;