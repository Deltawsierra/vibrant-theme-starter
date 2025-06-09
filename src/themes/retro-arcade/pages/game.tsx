
import React, { useState } from 'react';
import ArcadeCabinet from '../components/ArcadeCabinet';
import ArcadeAuthModal from '../components/ArcadeAuthModal';
import { useArcade } from '../context/ArcadeContext';
import { useAuth } from '@/context/AuthContext';

const ArcadeGamePage: React.FC = () => {
  const { settings, playSFX } = useArcade();
  const { user } = useAuth();
  const [selectedGame, setSelectedGame] = useState<'select' | 'pacman' | 'space-invaders'>('select');
  const [showAuthModal, setShowAuthModal] = useState(false);

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
        
        {/* Auth Status */}
        <div className="mt-4 flex justify-center">
          <button
            onClick={() => setShowAuthModal(true)}
            className="text-sm font-pixel text-arcade-neon-magenta hover:text-arcade-neon-yellow transition-colors border border-arcade-neon-magenta hover:border-arcade-neon-yellow px-4 py-2"
          >
            {user ? `PLAYER: ${user.user_metadata?.username || user.email}` : 'LOGIN / SIGN UP'}
          </button>
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

      {/* Auth Modal */}
      <ArcadeAuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </div>
  );
};

export default ArcadeGamePage;
