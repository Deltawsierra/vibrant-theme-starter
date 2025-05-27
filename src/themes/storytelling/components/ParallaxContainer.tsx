
import React, { useEffect, useRef, useState } from 'react';

interface ParallaxContainerProps {
  children: React.ReactNode;
  backgroundImage?: string;
  speed?: number;
  className?: string;
}

const ParallaxContainer: React.FC<ParallaxContainerProps> = ({ 
  children, 
  backgroundImage, 
  speed = 0.5,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (!prefersReducedMotion.matches) {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const parallaxStyle = {
    transform: `translateY(${scrollY * speed}px)`,
  };

  return (
    <div 
      ref={containerRef}
      className={`relative min-h-screen overflow-hidden ${className}`}
    >
      {/* Parallax Background */}
      {backgroundImage && (
        <div 
          className="absolute inset-0 w-full h-[120%] bg-cover bg-center bg-no-repeat animate-parallax-float"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            ...parallaxStyle
          }}
        />
      )}
      
      {/* Parallax Overlay for texture */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-story-warm-50/30 to-story-parchment/60"
        style={{
          transform: `translateY(${scrollY * (speed * 0.3)}px)`,
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default ParallaxContainer;
