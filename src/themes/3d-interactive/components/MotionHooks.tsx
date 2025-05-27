
import React, { useState, useEffect } from 'react';

interface FloatingCardProps {
  children: React.ReactNode;
  index?: number;
  fallbackMode?: boolean;
  className?: string;
}

export const FloatingCard: React.FC<FloatingCardProps> = ({ 
  children, 
  index = 0, 
  fallbackMode = false,
  className = '' 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const floatDelay = index * 0.5;
  const hoverTransform = fallbackMode 
    ? 'hover:shadow-lg' 
    : 'hover:scale-105 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/25';

  return (
    <div 
      className={`relative transition-all duration-500 ${hoverTransform} ${className} ${
        !fallbackMode ? 'animate-[float_6s_ease-in-out_infinite]' : ''
      }`}
      style={{ 
        animationDelay: `${floatDelay}s`,
        transformStyle: 'preserve-3d'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      
      {/* Glow effect for interactive objects */}
      {!fallbackMode && isHovered && (
        <div className="absolute inset-0 bg-blue-400/10 rounded-lg blur-xl -z-10 animate-pulse" />
      )}
    </div>
  );
};

interface CameraTransitionProps {
  children: React.ReactNode;
  isActive: boolean;
  direction?: 'left' | 'right' | 'up' | 'down';
  fallbackMode?: boolean;
}

export const CameraTransition: React.FC<CameraTransitionProps> = ({ 
  children, 
  isActive, 
  direction = 'left',
  fallbackMode = false 
}) => {
  const getTransitionClass = () => {
    if (fallbackMode) {
      return isActive 
        ? 'opacity-100 transform translate-x-0' 
        : 'opacity-0 transform translate-x-4';
    }

    const directionClasses = {
      left: isActive ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0',
      right: isActive ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0',
      up: isActive ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0',
      down: isActive ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
    };

    return directionClasses[direction];
  };

  return (
    <div className={`transition-all duration-1000 ease-out transform perspective-1000 ${getTransitionClass()}`}>
      {children}
    </div>
  );
};

interface InteractiveHighlightProps {
  children: React.ReactNode;
  isHighlighted: boolean;
  fallbackMode?: boolean;
}

export const InteractiveHighlight: React.FC<InteractiveHighlightProps> = ({ 
  children, 
  isHighlighted,
  fallbackMode = false 
}) => {
  return (
    <div className={`relative transition-all duration-300 ${
      isHighlighted 
        ? fallbackMode 
          ? 'ring-2 ring-blue-400' 
          : 'ring-2 ring-blue-400 shadow-lg shadow-blue-400/50 scale-105'
        : ''
    }`}>
      {children}
      
      {/* Scanning line effect */}
      {!fallbackMode && isHighlighted && (
        <div className="absolute inset-0 overflow-hidden rounded-lg pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-[scan_2s_ease-in-out_infinite]" />
        </div>
      )}
    </div>
  );
};

export const useDeviceCapabilities = () => {
  const [fallbackMode, setFallbackMode] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    // Check device capabilities
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isLowEnd = navigator.hardwareConcurrency < 4;
    
    setFallbackMode(prefersReducedMotion.matches || isMobile || isLowEnd);
  }, []);

  return { fallbackMode };
};
