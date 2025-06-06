import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, User, Tag, ArrowRight } from 'lucide-react';
import { cn } from '@/utils/cn';
import { useAnalytics } from '@/lib/analytics';

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content?: string;
  coverImage?: string;
  date: string;
  readingTime?: number;
  author?: {
    name: string;
    avatar?: string;
    bio?: string;
  };
  tags: string[];
  featured?: boolean;
  published?: boolean;
  category?: string;
}

interface BlogCardProps {
  post: BlogPost;
  variant?: 'default' | 'featured' | 'compact' | 'minimal';
  showAuthor?: boolean;
  showReadingTime?: boolean;
  showExcerpt?: boolean;
  className?: string;
}

export const BlogCard: React.FC<BlogCardProps> = ({
  post,
  variant = 'default',
  showAuthor = true,
  showReadingTime = true,
  showExcerpt = true,
  className,
}) => {
  const analytics = useAnalytics();

  const handleReadPost = () => {
    analytics.blog.readPost(post.slug);
  };

  const handleTagClick = (tag: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Aquí podrías navegar a una página de filtros por tag
    analytics.projects.filter(tag);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const cardClasses = cn(
    'group bg-white dark:bg-gray-800 rounded-xl shadow-soft hover:shadow-medium transition-all duration-300',
    'border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600',
    'overflow-hidden hover:transform hover:-translate-y-1',
    {
      'lg:col-span-2': variant === 'featured',
      'flex flex-row': variant === 'compact',
      'border-none shadow-none hover:shadow-none hover:transform-none': variant === 'minimal',
    },
    className
  );

  const imageClasses = cn(
    'w-full object-cover transition-transform duration-300 group-hover:scale-105',
    {
      'h-48': variant === 'default',
      'h-64': variant === 'featured',
      'w-32 h-32 flex-shrink-0': variant === 'compact',
      'h-40': variant === 'minimal',
    }
  );

  const contentClasses = cn(
    'p-6',
    {
      'flex-1 p-4': variant === 'compact',
      'p-4': variant === 'minimal',
    }
  );

  return (
    <article className={cardClasses}>
      <Link href={`/blog/${post.slug}`} onClick={handleReadPost}>
        {/* Image */}
        {post.coverImage && (
          <div className="relative overflow-hidden">
            <Image
              src={post.coverImage}
              alt={`Imagen de portada del artículo: ${post.title}`}
              width={variant === 'compact' ? 128 : 400}
              height={variant === 'compact' ? 128 : variant === 'featured' ? 256 : 192}
              className={imageClasses}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            />

            {/* Featured Badge */}
            {post.featured && (
              <div className="absolute top-4 left-4">
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-primary-100 text-primary-800 dark:bg-primary-800 dark:text-primary-100">
                  Destacado
                </span>
              </div>
            )}

            {/* Category Badge */}
            {post.category && variant !== 'compact' && (
              <div className="absolute top-4 right-4">
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-white/90 dark:bg-gray-900/90 text-gray-800 dark:text-gray-200">
                  {post.category}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Content */}
        <div className={contentClasses}>
          {/* Meta Information */}
          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-3">
            <div className="flex items-center space-x-4">
              <span className="flex items-center">
                <Calendar size={14} className="mr-1" />
                {formatDate(post.date)}
              </span>
              
              {showReadingTime && post.readingTime && (
                <span className="flex items-center">
                  <Clock size={14} className="mr-1" />
                  {post.readingTime} min
                </span>
              )}
            </div>

            {showAuthor && post.author && variant !== 'compact' && (
              <div className="flex items-center">
                <User size={14} className="mr-1" />
                <span>{post.author.name}</span>
              </div>
            )}
          </div>

          {/* Title */}
          <h3 className={cn(
            'font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors',
            {
              'text-2xl': variant === 'featured',
              'text-xl': variant === 'default',
              'text-lg': variant === 'compact' || variant === 'minimal',
            }
          )}>
            {post.title}
          </h3>

          {/* Excerpt */}
          {showExcerpt && post.excerpt && (
            <p className={cn(
              'text-gray-600 dark:text-gray-300 mb-4',
              {
                'line-clamp-3': variant === 'featured',
                'line-clamp-2': variant === 'default' || variant === 'minimal',
                'line-clamp-1': variant === 'compact',
              }
            )}>
              {post.excerpt}
            </p>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.slice(0, variant === 'compact' ? 2 : 4).map((tag) => (
              <button
                key={tag}
                onClick={(e) => handleTagClick(tag, e)}
                className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-primary-100 dark:hover:bg-primary-800 hover:text-primary-800 dark:hover:text-primary-200 transition-colors"
              >
                <Tag size={10} className="inline mr-1" />
                {tag}
              </button>
            ))}
            {post.tags.length > (variant === 'compact' ? 2 : 4) && (
              <span className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-full">
                +{post.tags.length - (variant === 'compact' ? 2 : 4)}
              </span>
            )}
          </div>

          {/* Read More Link */}
          {variant !== 'minimal' && (
            <div className="flex items-center justify-between">
              <span className="flex items-center text-sm text-primary-600 dark:text-primary-400 group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors">
                Leer artículo
                <ArrowRight size={16} className="ml-1 transform group-hover:translate-x-1 transition-transform" />
              </span>

              {/* Author Avatar for compact variant */}
              {showAuthor && post.author && variant === 'compact' && post.author.avatar && (
                <div className="flex items-center">
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </Link>
    </article>
  );
};