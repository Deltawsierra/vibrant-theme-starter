
import React, { useState } from 'react';
import ArcadeCabinet from '../components/ArcadeCabinet';
import { useArcade } from '../context/ArcadeContext';

const ArcadeGamePage: React.FC = () => {
  const { settings, playSFX } = useArcade();
  const [selectedGame, setSelectedGame] = useState<'select' | 'pacman' | 'space-invaders'>('select');

  const handleGameSelect = (game: 'pacman' | 'space-invaders') => {
    playSFX('coin-insert');
    setSelectedGame(game);
  };

  const handleBackToSelect = () => {
    playSFX('button-press');
    setSelectedGame('select');
  };

  return (
    <div className="min-h-screen bg-black text-arcade-neon-green font-pixel relative overflow-hidden">
      {/* Arcade Floor Grid */}
      <div className="absolute inset-0 bg-arcade-grid opacity-20" 
           style={{ backgroundSize: '30px 30px' }} />
      
      {/* CRT Scanlines */}
      {settings.enableScanlines && (
        <div className="absolute inset-0 bg-crt-scanlines opacity-30 pointer-events-none" />
      )}

      <div className="relative z-20 container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <div className={`text-4xl md:text-6xl font-pixel font-bold text-arcade-neon-yellow mb-4 ${settings.enableGlow ? 'animate-neon-pulse' : ''}`}>
            ◆ ARCADE ZONE ◆
          </div>
          <div className="text-lg font-pixel text-arcade-neon-cyan">
            CLASSIC GAMES • AUTHENTIC EXPERIENCE • HIGH SCORES
          </div>
        </div>

        {/* Arcade Cabinet */}
        <ArcadeCabinet 
          selectedGame={selectedGame}
          onGameSelect={handleGameSelect}
          onBackToSelect={handleBackToSelect}
        />

        {/* Controls Legend */}
        <div className="mt-8 text-center">
          <div className="bg-black/80 border-2 border-arcade-neon-magenta p-4 inline-block font-pixel">
            <div className="text-arcade-neon-magenta text-sm mb-2 font-bold">CONTROLS</div>
            <div className="text-xs space-y-1">
              <div className="text-arcade-neon-cyan">MOVEMENT: ↑↓←→ or WASD</div>
              <div className="text-arcade-neon-yellow">FIRE: SPACE (Space Invaders)</div>
              <div className="text-arcade-neon-green">START: ENTER • COIN: C</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArcadeGamePage;
