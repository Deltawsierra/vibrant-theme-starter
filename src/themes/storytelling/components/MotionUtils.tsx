
import React from 'react';

interface StoryFadeInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export const StoryFadeIn: React.FC<StoryFadeInProps> = ({ 
  children, 
  delay = 0, 
  className = '' 
}) => {
  return (
    <div 
      className={`animate-story-fade-in ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

interface DramaticSlideProps {
  children: React.ReactNode;
  direction?: 'left' | 'right';
  delay?: number;
  className?: string;
}

export const DramaticSlide: React.FC<DramaticSlideProps> = ({ 
  children, 
  direction = 'left', 
  delay = 0, 
  className = '' 
}) => {
  const slideClass = direction === 'left' ? 'animate-dramatic-slide' : 'animate-dramatic-slide-right';
  
  return (
    <div 
      className={`${slideClass} ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

interface SectionTransitionProps {
  children: React.ReactNode;
  isVisible: boolean;
  variant?: 'fade' | 'slide' | 'dramatic';
}

export const SectionTransition: React.FC<SectionTransitionProps> = ({ 
  children, 
  isVisible, 
  variant = 'fade' 
}) => {
  const getAnimationClass = () => {
    if (!isVisible) return 'opacity-0 translate-y-8';
    
    switch (variant) {
      case 'slide':
        return 'opacity-100 translate-y-0 animate-dramatic-slide';
      case 'dramatic':
        return 'opacity-100 translate-y-0 animate-story-fade-in';
      default:
        return 'opacity-100 translate-y-0 transition-all duration-800 ease-out';
    }
  };

  return (
    <div className={`transform transition-all duration-800 ease-out ${getAnimationClass()}`}>
      {children}
    </div>
  );
};
