import { SAMPLE_PROJECTS, SAMPLE_SKILLS } from './sample-data';
import { SITE_CONFIG } from './constants';

export interface PortfolioStats {
  projectsCompleted: number;
  projectsInProgress: number;
  totalProjects: number;
  featuredProjects: number;
  clientsSatisfied: number;
  yearsOfExperience: number;
  technologiesUsed: number;
  topSkillsCount: number;
  skillsPerCategory: Record<string, number>;
  projectsPerTechnology: Record<string, number>;
}

export function calculatePortfolioStats(): PortfolioStats {
  const completedProjects = SAMPLE_PROJECTS.filter(p => p.status === 'completed');
  const inProgressProjects = SAMPLE_PROJECTS.filter(p => p.status === 'in-progress');
  const featuredProjects = SAMPLE_PROJECTS.filter(p => p.featured);
  const topSkills = SAMPLE_SKILLS.filter(skill => skill.level >= 4);

  
  const skillsPerCategory = SAMPLE_SKILLS.reduce((acc, skill) => {
    acc[skill.category] = (acc[skill.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  
  const projectsPerTechnology = SAMPLE_PROJECTS.reduce((acc, project) => {
    project.technologies.forEach(tech => {
      acc[tech] = (acc[tech] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  return {
    projectsCompleted: completedProjects.length,
    projectsInProgress: inProgressProjects.length,
    totalProjects: SAMPLE_PROJECTS.length,
    featuredProjects: featuredProjects.length,
    clientsSatisfied: completedProjects.length, 
    yearsOfExperience: SITE_CONFIG.yearsOfExperience,
    technologiesUsed: SAMPLE_SKILLS.length,
    topSkillsCount: topSkills.length,
    skillsPerCategory,
    projectsPerTechnology,
  };
}

export function getMostUsedTechnologies(limit: number = 5): Array<{
  name: string;
  count: number;
  percentage: number;
}> {
  const stats = calculatePortfolioStats();
  const totalProjects = stats.totalProjects;
  
  return Object.entries(stats.projectsPerTechnology)
    .map(([tech, count]) => ({
      name: tech,
      count,
      percentage: Math.round((count / totalProjects) * 100),
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

export function calculateLearningProgress(): {
  averageSkillLevel: number;
  masteredSkills: number;
  skillsInProgress: number;
  totalSkillPoints: number;
  maxPossiblePoints: number;
  progressPercentage: number;
} {
  const totalSkillPoints = SAMPLE_SKILLS.reduce((sum, skill) => sum + skill.level, 0);
  const maxPossiblePoints = SAMPLE_SKILLS.length * 5; 
  const masteredSkills = SAMPLE_SKILLS.filter(skill => skill.level === 5).length;
  const skillsInProgress = SAMPLE_SKILLS.filter(skill => skill.level >= 3 && skill.level < 5).length;
  
  return {
    averageSkillLevel: Number((totalSkillPoints / SAMPLE_SKILLS.length).toFixed(1)),
    masteredSkills,
    skillsInProgress,
    totalSkillPoints,
    maxPossiblePoints,
    progressPercentage: Math.round((totalSkillPoints / maxPossiblePoints) * 100),
  };
}

export function getChartData() {
  const stats = calculatePortfolioStats();
  const learningProgress = calculateLearningProgress();
  
  return {
    skillsByCategory: Object.entries(stats.skillsPerCategory).map(([category, count]) => ({
      category,
      count,
      percentage: Math.round((count / stats.technologiesUsed) * 100),
    })),
    
    projectsByStatus: [
      { status: 'Completed', count: stats.projectsCompleted },
      { status: 'In Progress', count: stats.projectsInProgress },
      { status: 'Planned', count: SAMPLE_PROJECTS.filter(p => p.status === 'planned').length },
    ],
    
    skillLevelDistribution: [1, 2, 3, 4, 5].map(level => ({
      level,
      count: SAMPLE_SKILLS.filter(skill => skill.level === level).length,
    })),
    
    learningProgress,
  };
}

export function validateStats(): {
  isValid: boolean;
  warnings: string[];
  suggestions: string[];
} {
  const warnings: string[] = [];
  const suggestions: string[] = [];
  
  
  if (SAMPLE_PROJECTS.length === 0) {
    warnings.push('No projects found');
  }
  
  
  if (SAMPLE_SKILLS.length === 0) {
    warnings.push('No skills found');
  }
  
  
  if (SAMPLE_PROJECTS.filter(p => p.featured).length === 0) {
    suggestions.push('Consider marking some projects as featured');
  }
  
  
  const lowLevelSkills = SAMPLE_SKILLS.filter(skill => skill.level < 3).length;
  if (lowLevelSkills > SAMPLE_SKILLS.length * 0.5) {
    suggestions.push('Consider improving skill levels or removing beginner skills');
  }
  
  return {
    isValid: warnings.length === 0,
    warnings,
    suggestions,
  };
}