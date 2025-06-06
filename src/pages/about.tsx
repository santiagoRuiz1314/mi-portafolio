import React from 'react';
import { Layout } from '@/components/Layout';
import { AboutCard } from '@/components/AboutCard';
import { SkillBadge } from '@/components/SkillBadge';
import { SITE_CONFIG, PERSONAL_INFO } from '@/utils/constants';
import { SAMPLE_SKILLS } from '@/utils/sample-data';

const AboutPage: React.FC = () => {
  const aboutInfo = {
    name: SITE_CONFIG.author,
    title: SITE_CONFIG.title,
    bio: PERSONAL_INFO.bio,
    location: SITE_CONFIG.location,
    email: SITE_CONFIG.email,
    phone: SITE_CONFIG.phone,
    birthDate: SITE_CONFIG.birthDate,
    yearsOfExperience: SITE_CONFIG.yearsOfExperience,
    profileImage: SITE_CONFIG.profileImage,
    interests: PERSONAL_INFO.interests,
    values: PERSONAL_INFO.values,
    achievements: PERSONAL_INFO.achievements,
  };

  const topSkills = SAMPLE_SKILLS.filter(skill => skill.level >= 4).slice(0, 12);

  return (
    <Layout
      seo={{
        title: 'Sobre mí',
        description: `Conoce más sobre ${SITE_CONFIG.author}, ${SITE_CONFIG.title} con ${SITE_CONFIG.yearsOfExperience}+ años de experiencia.`,
        keywords: ['sobre mi', 'desarrollador', 'experiencia', 'habilidades'],
      }}
    >
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Sobre mí
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Conoce mi historia, experiencia y lo que me motiva como desarrollador
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <AboutCard
              info={aboutInfo}
              variant="detailed"
              showContact={true}
              showInterests={true}
              showAchievements={true}
            />
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Habilidades principales
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Tecnologías y herramientas que utilizo diariamente
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topSkills.map((skill) => (
                <SkillBadge
                  key={skill.id}
                  skill={skill}
                  variant="progress"
                  showLevel={true}
                  showProgress={true}
                  showCategory={true}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
              Mi trayectoria
            </h2>
            
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300 dark:bg-gray-600"></div>
              
              <div className="space-y-8">
                {[
                  {
                    year: '2024',
                    title: 'Desarrollador Full Stack Senior',
                    company: 'Freelance',
                    description: 'Trabajando en proyectos diversos usando React, Next.js, Node.js y Python.'
                  },
                  {
                    year: '2023',
                    title: 'Líder Técnico Frontend',
                    company: 'TechCorp',
                    description: 'Lideré un equipo de 5 desarrolladores en la migración de una aplicación legacy a React.'
                  },
                  {
                    year: '2022',
                    title: 'Desarrollador Frontend',
                    company: 'StartupXYZ',
                    description: 'Desarrollé la interfaz de usuario de una aplicación SaaS usando React y TypeScript.'
                  },
                  {
                    year: '2020',
                    title: 'Desarrollador Junior',
                    company: 'WebStudio',
                    description: 'Comencé mi carrera profesional trabajando en sitios web con HTML, CSS y JavaScript.'
                  }
                ].map((item, index) => (
                  <div key={index} className="relative flex items-start">
                    <div className="absolute left-6 w-4 h-4 bg-primary-600 rounded-full border-4 border-white dark:border-gray-900"></div>
                    <div className="ml-16 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-soft border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {item.title}
                        </h3>
                        <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                          {item.year}
                        </span>
                      </div>
                      <p className="text-primary-600 dark:text-primary-400 mb-2">
                        {item.company}
                      </p>
                      <p className="text-gray-600 dark:text-gray-300">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;