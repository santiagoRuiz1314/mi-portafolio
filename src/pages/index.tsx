import React from 'react';
import Link from 'next/link';
import { ArrowRight, Code, Users, Coffee, Award } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { HeroSection } from '@/components/HeroSection';
import { ProjectCard } from '@/components/ProjectCard';
import { SkillBadge } from '@/components/SkillBadge';
import { useAnalytics } from '@/lib/analytics';

// Datos temporales hasta que crees los archivos de datos centralizados
const SITE_CONFIG = {
  author: 'Santiago Ruiz ',
  title: 'Full Stack Developer',
  subtitle: 'Creating exceptional digital experiences',
  description: 'I’m a university student training to become a developer. I’ve built projects with HTML, CSS, and JavaScript, and I’m always looking to learn more. Passionate about tech, teamwork, and continuous growth, I enjoy turning ideas into real solutions.',
  profileImage: '/images/foto-perfil.jpg',
  location: 'Bucaramanga, Colombia',
  availableForWork: true,
  cvUrl: '/cv.pdf',
  yearsOfExperience: 1,
};

const PERSONAL_INFO = {
  bio: 'I’m a full-stack developer seeking to learn and innovate by building modern, scalable web applications.',
  interests: ['Web Development', 'Learning Programming Languages', 'Photography', 'Teamwork', 'Traveling', 'Music']
};

const PORTFOLIO_STATS = {
  projectsCompleted: 3,
  clientsSatisfied: 3,
  yearsOfExperience: 1,
  technologiesUsed: 10,
};

// Datos de ejemplo temporales
const SAMPLE_PROJECTS = [
  {
    id: 'Webpage_Unab',
    title: 'Student Webpage',
    description: 'It is a website created so that students can register for events, as well as view their free hours and other personal information.',
    image: '/images/proyectos/proyecto-a-desktop.png',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'React Router', 'Headless UI', 'Vite', "Docker"],
    githubUrl: 'https://github.com/santiagoRuiz1314/Webpage_Unab',
    liveUrl: 'https://ecommerce-demo.vercel.app',
    featured: true,
    status: 'completed' as const,
    startDate: '2025-04-04',
    endDate: '2025-05-20',
    category: 'Webpage',
    tags: ['Full Stack', 'Webpage', 'productivity'],
  },
  {
    id: 'task-manager',
    title: 'Gestor de Tareas',
    description: 'Aplicación de gestión de tareas con colaboración en tiempo real.',
    image: '/images/proyectos/proyecto-b-hero.png',
    technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
    githubUrl: 'https://github.com/santiagoRuiz1314',
    featured: true,
    status: 'completed' as const,
    startDate: '2023-11-01',
    category: 'Productividad',
    tags: ['Real-time'],
  }
];

const SAMPLE_SKILLS = [
  {
    id: 'react',
    name: 'React',
    level: 5,
    category: 'Frontend',
    icon: '⚛️',
    description: 'Biblioteca para construir interfaces de usuario',
    yearsOfExperience: 4,
    certified: true,
    projects: ['ecommerce-app']
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    level: 5,
    category: 'Frontend',
    icon: '▲',
    description: 'Framework de React para aplicaciones web',
    yearsOfExperience: 3,
    certified: true,
    projects: ['ecommerce-app']
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    level: 4,
    category: 'Lenguajes',
    icon: '🔷',
    description: 'JavaScript con tipado estático',
    yearsOfExperience: 3,
    certified: false,
    projects: ['ecommerce-app']
  },
  {
    id: 'tailwindcss',
    name: 'Tailwind CSS',
    level: 5,
    category: 'Frontend',
    icon: '🎨',
    description: 'Framework CSS utility-first',
    yearsOfExperience: 2,
    certified: false,
    projects: ['ecommerce-app']
  }
];

const HomePage: React.FC = () => {
  const analytics = useAnalytics();

  const featuredProjects = SAMPLE_PROJECTS.filter(project => project.featured).slice(0, 3);
  const topSkills = SAMPLE_SKILLS.filter(skill => skill.level >= 4).slice(0, 8);

  const handleViewAllProjects = () => {
    analytics.navigation.menuClick('projects');
  };

  const stats = [
    {
      icon: Code,
      value: PORTFOLIO_STATS.projectsCompleted,
      label: 'Finished Projects',
      suffix: '+'
    },
    {
      icon: Users,
      value: PORTFOLIO_STATS.clientsSatisfied,
      label: 'Satisfied Clients',
      suffix: '+'
    },
    {
      icon: Coffee,
      value: PORTFOLIO_STATS.yearsOfExperience,
      label: 'Years of Experience ',
      suffix: '+'
    },
    {
      icon: Award,
      value: PORTFOLIO_STATS.technologiesUsed,
      label: 'Tech Stack',
      suffix: '+'
    }
  ];

  return (
    <Layout
      seo={{
        title: `${SITE_CONFIG.author} - ${SITE_CONFIG.title}`,
        description: SITE_CONFIG.description,
        keywords: ['developer', 'frontend', 'backend', 'React', 'Next.js', 'TypeScript'],
      }}
    >
      {/* Hero Section */}
      <HeroSection
        name={SITE_CONFIG.author}
        title={SITE_CONFIG.title}
        subtitle={SITE_CONFIG.subtitle}
        description={SITE_CONFIG.description}
        profileImage={SITE_CONFIG.profileImage}
        location={SITE_CONFIG.location}
        availableForWork={SITE_CONFIG.availableForWork}
        cvUrl={SITE_CONFIG.cvUrl}
      />

      {/* About Preview Section */}
      <section id="about" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                About me
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Passionate developer with {SITE_CONFIG.yearsOfExperience}+ years of experience 
                creating innovative digital solutions.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {PERSONAL_INFO.bio}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {PERSONAL_INFO.interests.slice(0, 6).map((interest) => (
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
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-soft border border-gray-200 dark:border-gray-700 text-center"
                  >
                    <div className="flex justify-center mb-3">
                      <stat.icon size={32} className="text-primary-600 dark:text-primary-400" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                      {stat.value}{stat.suffix}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
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
                variant="default"
                showLevel={true}
                showCategory={false}
              />
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/skills"
              className="btn btn-secondary inline-flex items-center space-x-2"
            >
              <span>View all skills</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
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
                showCategory={true}
                showStatus={true}
              />
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/projects"
              onClick={handleViewAllProjects}
              className="btn btn-primary inline-flex items-center space-x-2"
            >
              <span>View all projects</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
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
    </Layout>
  );
};

export default HomePage;