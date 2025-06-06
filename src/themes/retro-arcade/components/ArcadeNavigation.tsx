
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useArcade } from '../context/ArcadeContext';

const ArcadeNavigation: React.FC = () => {
  const location = useLocation();
  const { settings, playSFX } = useArcade();

  const isActive = (path: string) => location.pathname === path;

  const handleNavClick = () => {
    playSFX('menu-navigate');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-black/90 border-b-4 border-arcade-neon-cyan backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Left Side - Arcade Logo */}
          <div className={`text-2xl font-pixel font-bold text-arcade-neon-yellow ${settings.enableGlow ? 'animate-neon-pulse' : ''}`}>
            ◆ ARCADE ◆
          </div>

          {/* Center - Navigation Buttons */}
          <div className="flex space-x-2">
            {[
              { path: '/about', label: 'ABOUT', color: 'arcade-neon-green' },
              { path: '/work', label: 'WORK', color: 'arcade-neon-cyan' },
              { path: '/contact', label: 'CONTACT', color: 'arcade-neon-magenta' },
              { path: '/showcase', label: 'SHOWCASE', color: 'arcade-neon-yellow' },
              { path: '/game', label: 'GAME!', color: 'arcade-neon-red' }
            ].map(({ path, label, color }) => (
              <Link 
                key={path}
                to={path} 
                onClick={handleNavClick}
                className={`px-4 py-2 border-2 font-pixel font-bold text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-arcade-neon-yellow ${
                  isActive(path) 
                    ? `border-${color} text-${color} bg-${color}/20 ${settings.enableGlow ? 'animate-neon-glow' : ''}` 
                    : `border-gray-600 text-gray-400 hover:border-${color} hover:text-${color} hover:bg-${color}/10`
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Right Side - Coin Counter */}
          <div className="flex items-center space-x-4 font-pixel text-sm">
            <div className={`text-arcade-neon-cyan ${settings.enableGlow ? 'animate-pixel-blink' : ''}`}>
              COINS: {settings.credits}
            </div>
            <div className="w-8 h-8 border-2 border-arcade-neon-yellow bg-arcade-neon-yellow/20 flex items-center justify-center text-arcade-neon-yellow font-bold">
              ¢
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default ArcadeNavigation;
