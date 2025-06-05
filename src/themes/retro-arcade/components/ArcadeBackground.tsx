
import React from 'react';
import { useArcade } from '../context/ArcadeContext';

const ArcadeBackground: React.FC = () => {
  const { settings } = useArcade();

  return (
    <>
      {/* Enhanced Parallax Star Field Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-5">
        <div className={`absolute inset-0 ${settings.enableGlow ? 'animate-parallax-float' : ''}`}>
          {/* Layer 1 - Distant stars */}
          <div className="absolute inset-0 opacity-15">
            {[...Array(40)].map((_, i) => (
              <div
                key={`star-1-${i}`}
                className="absolute w-1 h-1 bg-arcade-neon-cyan rounded-full animate-pixel-blink"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 4}s`,
                }}
              />
            ))}
          </div>
          
          {/* Layer 2 - Medium stars with colors */}
          <div className={`absolute inset-0 opacity-20 ${settings.enableGlow ? 'animate-slide' : ''}`}>
            {[...Array(25)].map((_, i) => {
              const colors = ['arcade-neon-magenta', 'arcade-neon-cyan', 'arcade-neon-yellow'];
              const color = colors[i % colors.length];
              return (
                <div
                  key={`star-2-${i}`}
                  className={`absolute w-2 h-2 bg-${color} rounded-full`}
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                />
              );
            })}
          </div>
          
          {/* Layer 3 - Bright pulsing stars */}
          <div className="absolute inset-0 opacity-30">
            {[...Array(15)].map((_, i) => (
              <div
                key={`star-3-${i}`}
                className={`absolute w-3 h-3 bg-arcade-neon-yellow rounded-full ${settings.enableGlow ? 'animate-neon-pulse' : ''}`}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              />
            ))}
          </div>

          {/* Layer 4 - Moving particles */}
          <div className="absolute inset-0 opacity-25">
            {[...Array(8)].map((_, i) => (
              <div
                key={`particle-${i}`}
                className="absolute w-1 h-8 bg-gradient-to-b from-arcade-neon-pink to-transparent animate-slide"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDuration: `${8 + Math.random() * 4}s`,
                  animationDelay: `${Math.random() * 8}s`
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ArcadeBackground;
