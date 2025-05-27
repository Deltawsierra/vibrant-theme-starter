
import React, { useState, useEffect } from 'react';

interface VideoLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  mode?: 'cinematic' | 'editorial';
}

export const VideoLightbox: React.FC<VideoLightboxProps> = ({ 
  isOpen, 
  onClose, 
  children,
  mode = 'cinematic' 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setIsLoaded(true), 100);
    } else {
      setIsLoaded(false);
    }
  }, [isOpen]);

  const backgroundClass = mode === 'cinematic' 
    ? 'bg-black/95' 
    : 'bg-white/95 backdrop-blur-sm';

  return (
    <div className={`fixed inset-0 z-50 transition-all duration-500 ease-out ${
      isOpen 
        ? 'opacity-100 pointer-events-auto' 
        : 'opacity-0 pointer-events-none'
    }`}>
      {/* Backdrop with cinematic bars */}
      <div 
        className={`absolute inset-0 ${backgroundClass} transition-all duration-500`}
        onClick={onClose}
      >
        {mode === 'cinematic' && (
          <>
            <div className={`absolute top-0 left-0 right-0 h-16 bg-black transition-transform duration-700 ${
              isLoaded ? 'translate-y-0' : '-translate-y-full'
            }`} />
            <div className={`absolute bottom-0 left-0 right-0 h-16 bg-black transition-transform duration-700 ${
              isLoaded ? 'translate-y-0' : 'translate-y-full'
            }`} />
          </>
        )}
      </div>
      
      {/* Video container */}
      <div className="relative flex items-center justify-center min-h-screen p-8">
        <div className={`relative w-full max-w-6xl transform transition-all duration-700 ease-out ${
          isLoaded 
            ? 'scale-100 opacity-100' 
            : 'scale-90 opacity-0'
        }`}>
          {children}
          
          {/* Close button */}
          <button
            onClick={onClose}
            className={`absolute -top-4 -right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
              mode === 'cinematic'
                ? 'bg-white/10 text-white hover:bg-white/20'
                : 'bg-black/10 text-black hover:bg-black/20'
            } backdrop-blur-sm`}
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
};

interface SpotlightAreaProps {
  children: React.ReactNode;
  mode?: 'cinematic' | 'editorial';
  isActive?: boolean;
}

export const SpotlightArea: React.FC<SpotlightAreaProps> = ({ 
  children, 
  mode = 'cinematic',
  isActive = true 
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = document.querySelector('.spotlight-container')?.getBoundingClientRect();
      if (rect) {
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className={`spotlight-container relative overflow-hidden transition-all duration-1000 ease-out ${
      isActive ? 'opacity-100' : 'opacity-50'
    }`}>
      {/* Parallax background */}
      <div 
        className={`absolute inset-0 transition-transform duration-500 ease-out ${
          mode === 'cinematic' 
            ? 'bg-gradient-to-br from-gray-900 via-black to-gray-800' 
            : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
        }`}
        style={{
          transform: `translate(${mousePosition.x * 0.05}px, ${mousePosition.y * 0.05}px) scale(1.1)`
        }}
      />
      
      {/* Spotlight effect */}
      {mode === 'cinematic' && (
        <div 
          className="absolute inset-0 opacity-30 transition-all duration-300"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, transparent 0%, rgba(0,0,0,0.8) 60%)`
          }}
        />
      )}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

interface TestimonialRevealProps {
  children: React.ReactNode;
  isVisible: boolean;
  delay?: number;
  mode?: 'cinematic' | 'editorial';
}

export const TestimonialReveal: React.FC<TestimonialRevealProps> = ({ 
  children, 
  isVisible, 
  delay = 0,
  mode = 'cinematic' 
}) => {
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => setShouldAnimate(true), delay);
      return () => clearTimeout(timer);
    } else {
      setShouldAnimate(false);
    }
  }, [isVisible, delay]);

  return (
    <div className={`transform transition-all duration-1000 ease-out ${
      shouldAnimate 
        ? 'translate-y-0 opacity-100' 
        : 'translate-y-8 opacity-0'
    }`}>
      <div className={`relative overflow-hidden transition-all duration-700 ${
        shouldAnimate ? 'max-h-screen' : 'max-h-0'
      }`}>
        {/* Reveal curtain effect */}
        <div className={`absolute inset-0 transform transition-transform duration-800 ease-out ${
          shouldAnimate ? '-translate-x-full' : 'translate-x-0'
        } ${
          mode === 'cinematic' 
            ? 'bg-black' 
            : 'bg-white'
        }`} />
        
        {/* Content */}
        <div className={`transform transition-all duration-500 delay-300 ${
          shouldAnimate ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
        }`}>
          {children}
        </div>
      </div>
    </div>
  );
};

interface DownloadDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  mode?: 'cinematic' | 'editorial';
}

export const DownloadDrawer: React.FC<DownloadDrawerProps> = ({ 
  isOpen, 
  onClose, 
  children,
  mode = 'cinematic' 
}) => {
  return (
    <div className={`fixed inset-y-0 right-0 z-50 w-80 transform transition-all duration-500 ease-out ${
      isOpen ? 'translate-x-0' : 'translate-x-full'
    }`}>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        } ${
          mode === 'cinematic' 
            ? 'bg-black/70' 
            : 'bg-gray-900/20'
        } backdrop-blur-sm`}
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className={`relative h-full shadow-2xl ${
        mode === 'cinematic' 
          ? 'bg-gray-900 border-l border-gray-700' 
          : 'bg-white border-l border-gray-200'
      }`}>
        {/* Slide indicator */}
        <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-16 rounded-r transition-all duration-300 ${
          mode === 'cinematic' 
            ? 'bg-yellow-400' 
            : 'bg-blue-500'
        }`} />
        
        {children}
      </div>
    </div>
  );
};

interface CinematicModeToggleProps {
  mode: 'cinematic' | 'editorial';
  onToggle: () => void;
}

export const CinematicModeToggle: React.FC<CinematicModeToggleProps> = ({ 
  mode, 
  onToggle 
}) => {
  return (
    <div className="fixed top-4 right-20 z-40">
      <button
        onClick={onToggle}
        className={`relative overflow-hidden px-4 py-2 rounded-lg font-medium transition-all duration-500 ease-out ${
          mode === 'cinematic'
            ? 'bg-black text-yellow-400 border border-gray-700'
            : 'bg-white text-gray-900 border border-gray-300 shadow-sm'
        }`}
      >
        {/* Mode transition overlay */}
        <div className={`absolute inset-0 transform transition-transform duration-700 ease-out ${
          mode === 'cinematic' 
            ? 'translate-x-full bg-white' 
            : '-translate-x-full bg-black'
        }`} />
        
        <span className="relative z-10 flex items-center space-x-2">
          <span>{mode === 'cinematic' ? '🎬' : '📝'}</span>
          <span>{mode === 'cinematic' ? 'Cinematic' : 'Editorial'}</span>
        </span>
      </button>
    </div>
  );
};
