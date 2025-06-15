// src/types/portfolio.ts - Tipos específicos para el portafolio
import type { Project } from '@/components/ProjectCard';
import type { Skill } from '@/components/SkillBadge';

export interface PortfolioStats {
  projectsCompleted: number;
  projectsInProgress: number;
  totalProjects: number;
  featuredProjects: number;
  clientsSatisfied: number;
  yearsOfExperience: number;
  technologiesUsed: number;
  topSkillsCount: number;
}

export interface StatConfig {
  icon: string;
  value: number;
  label: string;
  suffix: string;
}

export interface HeroData {
  name: string;
  title: string;
  subtitle: string;
  description: string;
  profileImage: string;
  location: string;
  availableForWork: boolean;
  cvUrl: string;
}

export interface AboutData {
  bio: string;
  interests: string[];
  yearsOfExperience: number;
}

export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
}

export interface PortfolioData {
  // Datos principales
  siteConfig: any;
  personalInfo: any;
  
  // Datos calculados
  portfolioStats: PortfolioStats;
  statsConfig: StatConfig[];
  
  // Datos filtrados
  featuredProjects: Project[];
  topSkills: Skill[];
  
  // Datos de secciones específicas
  heroData: HeroData;
  aboutData: AboutData;
  
  // Metadatos para SEO
  seoData: SEOData;
}

// Tipos para las utilidades de estadísticas
export interface TechnologyUsage {
  name: string;
  count: number;
  percentage: number;
}

export interface LearningProgress {
  averageSkillLevel: number;
  masteredSkills: number;
  skillsInProgress: number;
  totalSkillPoints: number;
  maxPossiblePoints: number;
  progressPercentage: number;
}

export interface ChartData {
  skillsByCategory: Array<{
    category: string;
    count: number;
    percentage: number;
  }>;
  projectsByStatus: Array<{
    status: string;
    count: number;
  }>;
  skillLevelDistribution: Array<{
    level: number;
    count: number;
  }>;
  learningProgress: LearningProgress;
}

export interface ValidationResult {
  isValid: boolean;
  warnings: string[];
  suggestions: string[];
}