
import React, { useEffect, useState } from 'react';
import { useArcade } from '../context/ArcadeContext';

interface InsertCoinLoaderProps {
  isVisible: boolean;
  onCoinInserted?: () => void;
  message?: string;
  autoHide?: boolean;
  autoHideDelay?: number;
}

const InsertCoinLoader: React.FC<InsertCoinLoaderProps> = ({
  isVisible,
  onCoinInserted,
  message = "INSERT COIN TO CONTINUE",
  autoHide = false,
  autoHideDelay = 3000
}) => {
  const { playSFX, settings } = useArcade();
  const [coins, setCoins] = useState(0);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (!isVisible) {
      setIsClosing(false);
      setCoins(0);
      return;
    }

    // Auto-hide functionality
    if (autoHide) {
      const autoHideTimer = setTimeout(() => {
        handleClose();
      }, autoHideDelay);

      return () => clearTimeout(autoHideTimer);
    }

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        insertCoin();
      }
      if (e.code === 'Escape') {
        e.preventDefault();
        handleClose();
      }
    };

    const handleClick = () => {
      insertCoin();
    };

    const insertCoin = () => {
      if (isClosing) return;
      
      playSFX('coin-insert');
      setCoins(prev => prev + 1);
      
      setTimeout(() => {
        handleClose();
      }, 800);
    };

    const handleClose = () => {
      setIsClosing(true);
      setTimeout(() => {
        onCoinInserted?.();
      }, 300);
    };

    document.addEventListener('keydown', handleKeyPress);
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      document.removeEventListener('click', handleClick);
    };
  }, [isVisible, onCoinInserted, playSFX, autoHide, autoHideDelay, isClosing]);

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 z-50 bg-black flex items-center justify-center arcade-crt-effect transition-opacity duration-300 ${isClosing ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'}`}>
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
          {autoHide && (
            <div className="text-xs opacity-60">
              ESC TO SKIP
            </div>
          )}
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
