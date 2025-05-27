
import React, { useState, useEffect } from 'react';

interface PageTransitionProps {
  children: React.ReactNode;
  triggerTransition?: boolean;
  onTransitionComplete?: () => void;
}

const PageTransition: React.FC<PageTransitionProps> = ({ 
  children, 
  triggerTransition = false, 
  onTransitionComplete 
}) => {
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (triggerTransition) {
      setIsTransitioning(true);
      
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        onTransitionComplete?.();
      }, 1200); // Duration of page-flip animation

      return () => clearTimeout(timer);
    }
  }, [triggerTransition, onTransitionComplete]);

  return (
    <div className="relative">
      {/* Page content */}
      <div className={`transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        {children}
      </div>
      
      {/* Page flip overlay */}
      {isTransitioning && (
        <div className="absolute inset-0 bg-story-parchment animate-page-flip z-50 border border-story-warm-300 shadow-2xl">
          <div className="w-full h-full bg-gradient-to-r from-story-warm-50 to-story-parchment opacity-90"></div>
        </div>
      )}
    </div>
  );
};

export default PageTransition;
