
import React, { useEffect, useState } from 'react';
import { useArcade } from '../context/ArcadeContext';

interface InsertCoinLoaderProps {
  isVisible: boolean;
  onCoinInserted?: () => void;
  message?: string;
}

const InsertCoinLoader: React.FC<InsertCoinLoaderProps> = ({
  isVisible,
  onCoinInserted,
  message = "INSERT COIN TO CONTINUE"
}) => {
  const { playSFX, settings } = useArcade();
  const [coins, setCoins] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        insertCoin();
      }
    };

    const handleClick = () => {
      insertCoin();
    };

    const insertCoin = () => {
      playSFX('coin-insert');
      setCoins(prev => prev + 1);
      
      setTimeout(() => {
        onCoinInserted?.();
      }, 800);
    };

    document.addEventListener('keydown', handleKeyPress);
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      document.removeEventListener('click', handleClick);
    };
  }, [isVisible, onCoinInserted, playSFX]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center arcade-crt-effect">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-arcade-grid opacity-20" 
           style={{ backgroundSize: '30px 30px' }} />
      
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-arcade-neon-yellow rounded-full animate-parallax-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`
            }}
          />
        ))}
      </div>

      <div className="text-center z-20">
        {/* Main Message */}
        <div className={`text-4xl md:text-6xl font-pixel font-bold text-arcade-neon-yellow mb-8 ${settings.enableGlow ? 'arcade-neon-text animate-coin-insert' : 'animate-pixel-blink'}`}>
          {message}
        </div>

        {/* Coin Slot */}
        <div className="flex justify-center mb-8">
          <div className="arcade-coin-slot w-20 h-20 text-2xl">
            ¢
          </div>
        </div>

        {/* Instructions */}
        <div className="space-y-4 text-arcade-neon-cyan font-pixel">
          <div className={`text-lg ${settings.enableGlow ? 'animate-neon-pulse' : 'animate-pixel-blink'}`}>
            PRESS SPACE OR CLICK TO INSERT COIN
          </div>
          <div className="text-sm opacity-80">
            COINS INSERTED: {coins}
          </div>
        </div>

        {/* Progress Indicators */}
        <div className="mt-8 flex justify-center space-x-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`w-4 h-4 border-2 border-arcade-neon-green ${
                i < coins ? 'bg-arcade-neon-green' : 'bg-transparent'
              } ${settings.enableGlow ? 'animate-neon-pulse' : ''}`}
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 text-xs font-pixel text-arcade-neon-magenta opacity-60">
          RETRO ARCADE EXPERIENCE © 2024
        </div>
      </div>
    </div>
  );
};

export default InsertCoinLoader;
