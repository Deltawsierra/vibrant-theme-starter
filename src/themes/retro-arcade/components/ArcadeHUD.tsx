
import React from 'react';
import { useArcade } from '../context/ArcadeContext';

const ArcadeHUD: React.FC = () => {
  const { settings } = useArcade();

  return (
    <div className="fixed top-20 left-0 right-0 z-30 pointer-events-none">
      {/* Top HUD Bar - positioned below navigation */}
      <div className="flex justify-between items-start p-4">
        {/* Left HUD - Player Stats */}
        <div className={`bg-black/80 border-2 border-arcade-neon-green p-3 font-pixel text-sm pointer-events-auto ${settings.enableGlow ? 'animate-neon-pulse' : ''}`}>
          <div className="text-arcade-neon-green">
            <div>SCORE: 999999</div>
            <div>LEVEL: 42</div>
            <div className="text-arcade-neon-red">LIVES: ●●●</div>
          </div>
        </div>

        {/* Right HUD - System Status */}
        <div className={`bg-black/80 border-2 border-arcade-neon-cyan p-3 font-pixel text-xs pointer-events-auto ${settings.enableGlow ? 'animate-neon-pulse' : ''}`}>
          <div className="text-arcade-neon-cyan">
            <div>SYSTEM STATUS</div>
            <div className="text-arcade-neon-green">REPO: ON</div>
            <div className="text-arcade-neon-green">SFX: ON</div>
            <div className="text-arcade-neon-yellow">CREDITS: 10</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArcadeHUD;
