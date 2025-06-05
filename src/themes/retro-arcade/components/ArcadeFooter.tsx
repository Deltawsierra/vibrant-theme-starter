
import React from 'react';
import { useArcade } from '../context/ArcadeContext';

const ArcadeFooter: React.FC = () => {
  const { settings } = useArcade();

  return (
    <footer className={`relative z-30 bg-gradient-to-r from-arcade-neon-magenta/20 via-arcade-neon-cyan/20 to-arcade-neon-yellow/20 border-t-4 border-arcade-neon-green backdrop-blur-sm ${settings.enableGlow ? 'animate-neon-pulse' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="text-center space-y-4">
          {/* Main message */}
          <div className={`text-xl md:text-2xl font-pixel font-bold text-arcade-neon-yellow mb-2 ${settings.enableGlow ? 'arcade-neon-text animate-coin-insert' : 'animate-pixel-blink'}`}>
            ◆◇◆ THANK YOU FOR PLAYING ◆◇◆
          </div>
          
          {/* Stats display */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm font-pixel">
            <div className="text-arcade-neon-cyan">
              CREDITS: ∞ | HIGH SCORE: 999999
            </div>
            <div className="text-arcade-neon-magenta">
              PLAYER: PORTFOLIO_VISITOR
            </div>
            <div className="text-arcade-neon-yellow">
              STATUS: ONLINE
            </div>
          </div>
          
          {/* Copyright */}
          <div className="text-xs font-pixel text-arcade-neon-green opacity-60">
            RETRO ARCADE PORTFOLIO © 2024 • BUILT WITH PASSION
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ArcadeFooter;
