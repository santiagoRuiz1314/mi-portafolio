
import { useMemo } from 'react';
import { SITE_CONFIG, PERSONAL_INFO, PREVIEW_LIMITS } from '@/utils/constants';
import { SAMPLE_PROJECTS, SAMPLE_SKILLS } from '@/utils/sample-data';
import { calculatePortfolioStats } from '@/utils/portfolio-stats';
import type { PortfolioData } from '@/types/portfolio';

export function usePortfolioData(): PortfolioData {
  
  const portfolioStats = useMemo(() => calculatePortfolioStats(), []);

  
  const featuredProjects = useMemo(() => 
    SAMPLE_PROJECTS.filter(project => project.featured).slice(0, PREVIEW_LIMITS.projects),
    []
  );

  
  const topSkills = useMemo(() => 
    SAMPLE_SKILLS.filter(skill => skill.level >= 4).slice(0, PREVIEW_LIMITS.skills),
    []
  );

  
  const statsConfig = useMemo(() => [
    {
      icon: 'Code',
      value: portfolioStats.projectsCompleted,
      label: 'Finished Projects',
      suffix: '+'
    },
    {
      icon: 'Users',
      value: portfolioStats.clientsSatisfied,
      label: 'Satisfied Clients',
      suffix: '+'
    },
    {
      icon: 'Coffee',
      value: portfolioStats.yearsOfExperience,
      label: 'Years of Experience',
      suffix: '+'
    },
    {
      icon: 'Award',
      value: portfolioStats.technologiesUsed,
      label: 'Tech Stack',
      suffix: '+'
    }
  ], [portfolioStats]);

  
  const heroData = useMemo(() => ({
    name: SITE_CONFIG.author,
    title: SITE_CONFIG.title,
    subtitle: SITE_CONFIG.subtitle,
    description: SITE_CONFIG.description,
    profileImage: SITE_CONFIG.profileImage,
    location: SITE_CONFIG.location,
    availableForWork: SITE_CONFIG.availableForWork,
    cvUrl: SITE_CONFIG.cvUrl,
  }), []);

  
  const aboutData = useMemo(() => ({
    bio: PERSONAL_INFO.bio,
    interests: PERSONAL_INFO.interests.slice(0, PREVIEW_LIMITS.interests),
    yearsOfExperience: SITE_CONFIG.yearsOfExperience,
  }), []);

  return {
    
    siteConfig: SITE_CONFIG,
    personalInfo: PERSONAL_INFO,
    
    
    portfolioStats,
    statsConfig,
    
    
    featuredProjects,
    topSkills,
    
    
    heroData,
    aboutData,
    
    
    seoData: {
      title: `${SITE_CONFIG.author} - ${SITE_CONFIG.title}`,
      description: SITE_CONFIG.description,
      keywords: ['developer', 'frontend', 'backend', 'React', 'Next.js', 'TypeScript'],
    }
  };
}