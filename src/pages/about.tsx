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
        title: 'About me',
        description: `Learn more about ${SITE_CONFIG.author}, ${SITE_CONFIG.title} with over ${SITE_CONFIG.yearsOfExperience}+ years of experience.`,
        keywords: ['about me', 'developer', 'experience', 'skills'],
      }}
    >
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              About Me
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Get to know my story, experience, and what drives me as a developer
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <AboutCard
              info={aboutInfo}
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
                Key Skills
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Technologies and tools I use to build amazing projects
              </p>
            </div>

            {/* Skills Grid*/}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topSkills.map((skill) => (
                <SkillBadge
                  key={skill.id}
                  skill={skill}
                  variant="default"
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
              My Journey
            </h2>
            
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300 dark:bg-gray-600"></div>
              
              <div className="space-y-8">
                {[                
                      {
                        year: '2025',
                        title: 'Expanding Horizons as a Junior Developer',
                        company: 'Freelance & Personal Projects',
                        description: 'Currently building diverse web applications while deepening my expertise in modern development practices and exploring new technologies.',
                        details: [
                          'Working on production-ready applications using React, Next.js, and TypeScript, focusing on creating scalable and maintainable codebases that solve real-world problems.',
                          'Developing a sophisticated AI-powered calculus solver using local LLMs (DeepSeek-R1) with Ollama, combining my programming skills with cutting-edge artificial intelligence to help students tackle complex mathematical problems.',
                          'Navigating the challenges of independent development: learning to balance multiple projects, manage client expectations, and deliver quality solutions within tight deadlines while maintaining high coding standards.',
                          'Growing through hands-on experience: each project teaches me something new about architecture decisions, user experience design, and the importance of writing clean, documented code that others can understand and maintain.',
                          'Building a professional network and learning the business side of development, from client communication and project scoping to deployment strategies and ongoing maintenance considerations.'
                        ]
                      },
                      {
                        year: '2024',
                        title: 'From Student to Builder',
                        company: 'Universidad Autónoma de Bucaramanga (UNAB)',
                        description: 'A transformative year where I transitioned from learning programming concepts to building real applications that people actually use.',
                        details: [
                          'Started my Systems Engineering degree at UNAB, diving deep into computer science fundamentals while maintaining a hands-on approach to learning through practical projects and real-world applications.',
                          'Completed intensive courses through Platzi covering the full development spectrum: from C# fundamentals and object-oriented programming to modern web technologies like HTML5, CSS3, and JavaScript ES6+.',
                          'Built my first mobile application: a voice-controlled calculator using MIT App Inventor. This project taught me about user interface design, accessibility considerations, and the challenges of working with voice recognition technology.',
                          'Developed the "Student Event Registration System" – a comprehensive web platform that allows university students to register for events and track their required free hours for graduation. This project marked my transition into full-stack development, using React, TypeScript, and PostgreSQL.',
                          'Faced the steep learning curve of modern web development: understanding component lifecycle, state management, API integration, and database design. Each challenge felt overwhelming at first, but breaking them down into smaller problems made them manageable.',
                          'Learned the importance of clean code and best practices through my C# and .NET courses, which shaped how I approach problem-solving and code organization in all my subsequent projects.'
                        ]
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
                      <p className="text-primary-600 dark:text-primary-400 mb-3">
                        {item.company}
                      </p>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {item.description}
                      </p>
                      
                      {/* Detailed timeline items */}
                      <div className="space-y-3">
                        {item.details.map((detail, detailIndex) => (
                          <div key={detailIndex} className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-primary-400 rounded-full mt-2 flex-shrink-0"></div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                              {detail}
                            </p>
                          </div>
                        ))}
                      </div>
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