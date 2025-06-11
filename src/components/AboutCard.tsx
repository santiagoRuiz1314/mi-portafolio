import React from 'react';
import Image from 'next/image';
import { MapPin, Calendar, Mail, Phone, Globe, Award, Heart, Coffee } from 'lucide-react';
import { cn } from '@/utils/cn';

interface AboutInfo {
  name: string;
  title: string;
  bio: string;
  location: string;
  email: string;
  phone?: string;
  website?: string;
  birthDate?: string;
  yearsOfExperience: number;
  profileImage: string;
  interests: string[];
  values: string[];
  achievements?: Array<{
    title: string;
    description: string;
    date: string;
  }>;
}

interface AboutCardProps {
  info: AboutInfo;
  variant?: 'default' | 'detailed' | 'compact';
  showContact?: boolean;
  showInterests?: boolean;
  showAchievements?: boolean;
  className?: string;
}

export const AboutCard: React.FC<AboutCardProps> = ({
  info,
  variant = 'default',
  showContact = true,
  showInterests = true,
  showAchievements = false,
  className,
}) => {
  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  };

  const cardClasses = cn(
    'bg-white dark:bg-gray-800 rounded-xl shadow-soft border border-gray-200 dark:border-gray-700',
    'transition-all duration-300 hover:shadow-medium',
    {
      'p-6': variant === 'default',
      'p-8': variant === 'detailed',
      'p-4': variant === 'compact',
    },
    className
  );

  if (variant === 'compact') {
    return (
      <div className={cardClasses}>
        <div className="flex items-center space-x-4">
          <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
            <Image
              src={info.profileImage}
              alt={`Foto de ${info.name}`}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
              {info.name}
            </h3>
            <p className="text-sm text-primary-600 dark:text-primary-400">
              {info.title}
            </p>
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1">
              <MapPin size={12} className="mr-1" />
              {info.location}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cardClasses}>
      {/* Header with Image and Basic Info */}
      <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6 mb-6">
        <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden flex-shrink-0">
          <Image
            src={info.profileImage}
            alt={`Foto de ${info.name}`}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>

        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {info.name}
          </h2>
          <p className="text-lg text-primary-600 dark:text-primary-400 mb-3">
            {info.title}
          </p>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center justify-center md:justify-start space-x-2 text-gray-600 dark:text-gray-400">
              <MapPin size={16} />
              <span>{info.location}</span>
            </div>
            
            <div className="flex items-center justify-center md:justify-start space-x-2 text-gray-600 dark:text-gray-400">
              <Coffee size={16} />
              <span>{info.yearsOfExperience}+ Yrs. exp.</span>
            </div>
            
            {info.birthDate && (
              <div className="flex items-center justify-center md:justify-start space-x-2 text-gray-600 dark:text-gray-400">
                <Calendar size={16} />
                <span>{calculateAge(info.birthDate)} years</span>
              </div>
            )}
            
            {info.website && (
              <div className="flex items-center justify-center md:justify-start space-x-2 text-gray-600 dark:text-gray-400">
                <Globe size={16} />
                <a
                  href={info.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors truncate"
                >
                  Website
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bio */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          About me
        </h3>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          {info.bio}
        </p>
      </div>

      {/* Contact Information */}
      {showContact && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Contact
          </h3>
          <div className="space-y-2">
            <a
              href={`mailto:${info.email}`}
              className="flex items-center space-x-3 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              <Mail size={18} />
              <span>{info.email}</span>
            </a>
            
            {info.phone && (
              <a
                href={`tel:${info.phone}`}
                className="flex items-center space-x-3 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                <Phone size={18} />
                <span>{info.phone}</span>
              </a>
            )}
          </div>
        </div>
      )}

      {/* Interests & Hobbies */}
      {showInterests && info.interests.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Interests
          </h3>
          <div className="flex flex-wrap gap-2">
            {info.interests.map((interest, index) => (
              <span
                key={index}
                className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Values */}
      {info.values.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Values
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {info.values.map((value, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 text-gray-600 dark:text-gray-400"
              >
                <Heart size={16} className="text-red-500 flex-shrink-0" />
                <span className="text-sm">{value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Achievements */}
      {showAchievements && info.achievements && info.achievements.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Key Achievements
          </h3>
          <div className="space-y-3">
            {info.achievements.slice(0, 3).map((achievement, index) => (
              <div
                key={index}
                className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <Award size={18} className="text-primary-600 dark:text-primary-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {achievement.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {achievement.description}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    {achievement.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};