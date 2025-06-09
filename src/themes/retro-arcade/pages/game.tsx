
import React, { useState } from 'react';
import ArcadeCabinet from '../components/ArcadeCabinet';
import { useArcade } from '../context/ArcadeContext';
import { useAuth } from '@/context/AuthContext';

const ArcadeGamePage: React.FC = () => {
  const { settings, playSFX } = useArcade();
  const { user } = useAuth();
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
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="text-center mb-8">
        <div className={`text-4xl md:text-6xl font-pixel font-bold text-arcade-neon-yellow mb-4 ${settings.enableGlow ? 'animate-neon-pulse' : ''}`}>
          ◆ ARCADE ZONE ◆
        </div>
        <div className="text-lg font-pixel text-arcade-neon-cyan">
          CLASSIC GAMES • AUTHENTIC EXPERIENCE • HIGH SCORES
        </div>
        
        {/* Player Status */}
        {user && (
          <div className="mt-4">
            <div className="text-sm font-pixel text-arcade-neon-magenta">
              WELCOME BACK, {user.user_metadata?.username || user.email?.split('@')[0] || 'PLAYER'}!
            </div>
          </div>
        )}
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
  );
};

export default ArcadeGamePage;
