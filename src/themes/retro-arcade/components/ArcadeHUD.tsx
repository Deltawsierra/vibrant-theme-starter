
import React from 'react';
import { useArcade } from '../context/ArcadeContext';

const ArcadeHUD: React.FC = () => {
  const { settings } = useArcade();

  return (
    <div className="fixed top-20 left-4 right-4 z-30 pointer-events-none">
      <div className="flex justify-between items-start">
        {/* Left HUD Panel */}
        <div className="bg-black/80 border-2 border-arcade-neon-green p-3 font-pixel pointer-events-auto">
          <div className={`text-arcade-neon-green text-xs mb-2 font-bold ${settings.enableGlow ? 'animate-neon-pulse' : ''}`}>
            PLAYER 1
          </div>
          <div className="space-y-1 text-xs">
            <div className="text-arcade-neon-cyan">SCORE: 999999</div>
            <div className="text-arcade-neon-yellow">LEVEL: 42</div>
            <div className="text-arcade-neon-magenta">LIVES: ◆◆◆</div>
          </div>
        </div>

        {/* Right HUD Panel */}
        <div className="bg-black/80 border-2 border-arcade-neon-magenta p-3 font-pixel pointer-events-auto">
          <div className={`text-arcade-neon-magenta text-xs mb-2 font-bold ${settings.enableGlow ? 'animate-neon-pulse' : ''}`}>
            SYSTEM STATUS
          </div>
          <div className="space-y-1 text-xs">
            <div className="text-arcade-neon-green">
              PWR: <span className="animate-pixel-blink">ON</span>
            </div>
            <div className="text-arcade-neon-cyan">
              SFX: {settings.isSFXMuted ? 'OFF' : 'ON'}
            </div>
            <div className="text-arcade-neon-yellow">
              CREDITS: {settings.credits}
            </div>
          </div>
        </div>
      </div>

      {/* Center Progress Bar */}
      <div className="flex justify-center mt-4">
        <div className="bg-black/80 border-2 border-arcade-neon-cyan px-6 py-2 font-pixel pointer-events-auto">
          <div className="text-arcade-neon-cyan text-xs font-bold mb-1">LOADING NEXT LEVEL...</div>
          <div className="w-48 h-2 bg-gray-800 border border-arcade-neon-cyan">
            <div className={`h-full bg-gradient-to-r from-arcade-neon-cyan to-arcade-neon-magenta ${settings.enableGlow ? 'animate-neon-glow' : ''}`} style={{ width: '75%' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArcadeHUD;
