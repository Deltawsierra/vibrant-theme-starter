
import React from 'react';
import { useArcade } from '../context/ArcadeContext';

interface GameHUDProps {
  score: number;
  lives: number;
  level: number;
  gameName: string;
  onBackToSelect: () => void;
}

const GameHUD: React.FC<GameHUDProps> = ({
  score,
  lives,
  level,
  gameName,
  onBackToSelect
}) => {
  const { settings, playSFX } = useArcade();

  const handleBackClick = () => {
    playSFX('button-press');
    onBackToSelect();
  };

  return (
    <div className="bg-black/90 border-b-2 border-arcade-neon-cyan p-2">
      <div className="flex justify-between items-center font-pixel text-sm">
        {/* Left: Game Info */}
        <div className="flex space-x-6">
          <div className={`text-arcade-neon-yellow ${settings.enableGlow ? 'animate-neon-pulse' : ''}`}>
            {gameName}
          </div>
          <div className="text-arcade-neon-green">
            SCORE: {score.toLocaleString()}
          </div>
          <div className="text-arcade-neon-cyan">
            LEVEL: {level}
          </div>
        </div>

        {/* Center: Lives */}
        <div className="text-arcade-neon-red">
          LIVES: {Array.from({ length: lives }, (_, i) => '●').join('')}
        </div>

        {/* Right: Back Button */}
        <button
          onClick={handleBackClick}
          className="text-arcade-neon-magenta border border-arcade-neon-magenta px-2 py-1 hover:bg-arcade-neon-magenta hover:text-black transition-colors text-xs"
        >
          BACK
        </button>
      </div>
    </div>
  );
};

export default GameHUD;
