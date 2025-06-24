import React from 'react';
import Image from 'next/image';
import { MapPin, Mail, Phone, Globe, Heart, Coffee } from 'lucide-react';
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
  // Removed achievements - will be replaced with drives
}

interface AboutCardProps {
  info: AboutInfo;
  className?: string;
}

export const AboutCard: React.FC<AboutCardProps> = ({
  info,
  className,
}) => {
  const cardClasses = cn(
    'bg-white dark:bg-gray-800 rounded-xl shadow-soft border border-gray-200 dark:border-gray-700',
    'transition-all duration-300 hover:shadow-medium p-8',
    className
  );

  // What drives Santiago as a developer - replacing achievements
  const drivingForces = [
    {
      icon: "💡",
      title: "Problem Solving",
      description: "I thrive on turning complex challenges into elegant, user-friendly solutions"
    },
    {
      icon: "🤝",
      title: "Collaborative Growth",
      description: "Building amazing products while learning from diverse, talented teammates"
    },
    {
      icon: "🎯",
      title: "Impact-Driven Development",
      description: "Creating tools and applications that genuinely improve people's daily experiences"
    },
    {
      icon: "🚀",
      title: "Continuous Innovation",
      description: "Exploring cutting-edge technologies and contributing to the developer community"
    }
  ];

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
            
            {info.website && (
              <div className="flex items-center justify-center md:justify-start space-x-2 text-gray-600 dark:text-gray-400 col-span-2">
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

      {/* Interests & Hobbies */}
      {info.interests.length > 0 && (
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

      {/* IMPROVED SECTION: What Drives Me - Replacing Key Achievements */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          What Drives Me
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {drivingForces.map((drive, index) => (
            <div
              key={index}
              className="flex items-start space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg 
                         hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200
                         hover:shadow-sm cursor-pointer group"
            >
              <span 
                className="text-2xl flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-200" 
                role="img" 
                aria-label={drive.title}
              >
                {drive.icon}
              </span>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 dark:text-white mb-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {drive.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {drive.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};