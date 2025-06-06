
import React, { useState, useEffect } from 'react';
import { useArcade } from '../context/ArcadeContext';

interface GameSelectorProps {
  onGameSelect: (game: 'pacman' | 'space-invaders') => void;
}

const GameSelector: React.FC<GameSelectorProps> = ({ onGameSelect }) => {
  const { settings, playSFX } = useArcade();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showInsertCoin, setShowInsertCoin] = useState(true);

  const games = [
    {
      id: 'pacman' as const,
      name: 'PAC-MAN',
      description: 'CLASSIC MAZE CHASE',
      color: 'arcade-neon-yellow'
    },
    {
      id: 'space-invaders' as const,
      name: 'SPACE INVADERS',
      description: 'DEFEND EARTH!',
      color: 'arcade-neon-green'
    }
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showInsertCoin) {
        if (e.key === 'c' || e.key === 'C' || e.key === ' ') {
          setShowInsertCoin(false);
          playSFX('coin-insert');
        }
        return;
      }

      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          e.preventDefault();
          setSelectedIndex(prev => prev === 0 ? games.length - 1 : prev - 1);
          playSFX('menu-navigate');
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          e.preventDefault();
          setSelectedIndex(prev => prev === games.length - 1 ? 0 : prev + 1);
          playSFX('menu-navigate');
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          onGameSelect(games[selectedIndex].id);
          playSFX('coin-insert');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, showInsertCoin, onGameSelect, playSFX, games]);

  if (showInsertCoin) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className={`text-4xl md:text-6xl font-pixel font-bold text-arcade-neon-yellow mb-8 ${settings.enableGlow ? 'animate-coin-insert' : 'animate-pixel-blink'}`}>
            INSERT COIN
          </div>
          <div className="text-lg font-pixel text-arcade-neon-cyan animate-pixel-blink">
            PRESS C OR SPACE TO CONTINUE
          </div>
          <div className="mt-8">
            <div className="w-16 h-16 border-4 border-arcade-neon-yellow mx-auto flex items-center justify-center text-2xl text-arcade-neon-yellow">
              ¢
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col justify-center p-8">
      <div className={`text-3xl font-pixel font-bold text-arcade-neon-cyan text-center mb-8 ${settings.enableGlow ? 'animate-neon-pulse' : ''}`}>
        SELECT GAME
      </div>

      <div className="space-y-6">
        {games.map((game, index) => (
          <div
            key={game.id}
            className={`p-4 border-2 font-pixel cursor-pointer transition-all duration-200 ${
              selectedIndex === index
                ? `border-${game.color} text-${game.color} bg-${game.color}/20 ${settings.enableGlow ? 'animate-neon-glow' : ''}`
                : 'border-gray-600 text-gray-400 hover:border-gray-500'
            }`}
            onClick={() => {
              setSelectedIndex(index);
              playSFX('menu-navigate');
              setTimeout(() => {
                onGameSelect(game.id);
                playSFX('coin-insert');
              }, 100);
            }}
          >
            <div className="flex justify-between items-center">
              <div>
                <div className="text-lg font-bold">{game.name}</div>
                <div className="text-sm opacity-80">{game.description}</div>
              </div>
              {selectedIndex === index && (
                <div className="text-2xl animate-pixel-blink">▶</div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-8 text-sm font-pixel text-arcade-neon-magenta opacity-80">
        USE ↑↓ ARROWS OR W/S • ENTER TO SELECT
      </div>
    </div>
  );
};

export default GameSelector;
