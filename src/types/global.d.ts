// Global type definitions for the portfolio project

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // Site configuration
      NEXT_PUBLIC_SITE_NAME: string;
      NEXT_PUBLIC_SITE_URL: string;
      NEXT_PUBLIC_SITE_DESCRIPTION: string;
      
      // Email configuration
      SMTP_HOST: string;
      SMTP_PORT: string;
      SMTP_USER: string;
      SMTP_PASS: string;
      CONTACT_EMAIL: string;
      
      // Analytics
      NEXT_PUBLIC_GA_ID?: string;
      NEXT_PUBLIC_GTM_ID?: string;
      
      // Social Media
      NEXT_PUBLIC_GITHUB_URL?: string;
      NEXT_PUBLIC_LINKEDIN_URL?: string;
      NEXT_PUBLIC_TWITTER_URL?: string;
      
      // Content configuration
      BLOG_POSTS_PER_PAGE?: string;
      PROJECTS_PER_PAGE?: string;
      
      // Development
      NODE_ENV: 'development' | 'production' | 'test';
      ANALYZE?: string;
      
      // External services
      NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME?: string;
      NEXT_PUBLIC_CLOUDINARY_API_KEY?: string;
      CLOUDINARY_API_SECRET?: string;
      
      // Database
      DATABASE_URL?: string;
      
      // Authentication
      NEXTAUTH_URL?: string;
      NEXTAUTH_SECRET?: string;
      
      // API Keys
      OPENAI_API_KEY?: string;
      GITHUB_TOKEN?: string;
      
      // Cache
      REDIS_URL?: string;
      
      // Monitoring
      SENTRY_DSN?: string;
      VERCEL_ANALYTICS_ID?: string;
    }
  }
  
  // Window extensions
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

// Module declarations for files without types
declare module '*.md' {
  const content: string;
  export default content;
}

declare module '*.mdx' {
  import type { ComponentType } from 'react';
  const component: ComponentType;
  export default component;
}

declare module '*.svg' {
  import type { ComponentType, SVGProps } from 'react';
  const component: ComponentType<SVGProps<SVGSVGElement>>;
  export default component;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.webp' {
  const src: string;
  export default src;
}

declare module '*.avif' {
  const src: string;
  export default src;
}

declare module '*.gif' {
  const src: string;
  export default src;
}

declare module '*.ico' {
  const src: string;
  export default src;
}

// Utility types
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

export type ArrayElement<ArrayType extends readonly unknown[]> = 
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

// Common API response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Form types
export interface FormErrors {
  [key: string]: string | undefined;
}

export interface FormState<T> {
  values: T;
  errors: FormErrors;
  touched: Record<keyof T, boolean>;
  isValid: boolean;
  isSubmitting: boolean;
}

// Theme types
export type ThemeMode = 'light' | 'dark' | 'system';

export interface ThemeConfig {
  mode: ThemeMode;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
}

// Animation types
export type AnimationVariant = 
  | 'fadeIn'
  | 'fadeInUp'
  | 'fadeInDown'
  | 'slideInLeft'
  | 'slideInRight'
  | 'scaleIn'
  | 'bounceIn';

export interface AnimationConfig {
  variant: AnimationVariant;
  duration?: number;
  delay?: number;
  repeat?: number | boolean;
}

// SEO types
export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  type?: 'website' | 'article' | 'profile';
  locale?: string;
  siteName?: string;
}

// Social media types
export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
  label: string;
}

// Contact form types
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Newsletter types
export interface NewsletterData {
  email: string;
  name?: string;
}

// Search types
export interface SearchResult {
  id: string;
  title: string;
  excerpt: string;
  url: string;
  type: 'post' | 'project' | 'page';
  tags?: string[];
  date?: string;
}

export {};