
import React, { useEffect, useState } from 'react';
import { useArcade } from '../context/ArcadeContext';
import ArcadeButton from './ArcadeButton';

interface GameOverScreenProps {
  isVisible: boolean;
  onContinue?: () => void;
  onRestart?: () => void;
  finalScore?: number;
  message?: string;
}

const GameOverScreen: React.FC<GameOverScreenProps> = ({
  isVisible,
  onContinue,
  onRestart,
  finalScore = 0,
  message = "GAME OVER"
}) => {
  const { playSFX, settings, spendCredits } = useArcade();
  const [countdown, setCountdown] = useState(10);
  const [showContinue, setShowContinue] = useState(true);

  useEffect(() => {
    if (!isVisible) return;

    playSFX('game-over');
    setCountdown(10);
    setShowContinue(true);

    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          setShowContinue(false);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isVisible, playSFX]);

  const handleContinue = () => {
    if (spendCredits(1)) {
      playSFX('coin-insert');
      onContinue?.();
    } else {
      playSFX('error');
    }
  };

  const handleRestart = () => {
    playSFX('power-up');
    onRestart?.();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center arcade-crt-effect">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Red warning overlay */}
        <div className="absolute inset-0 bg-red-900 opacity-20 animate-pulse" />
        
        {/* Glitch lines */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-full h-1 bg-arcade-neon-red opacity-60 animate-glitch"
            style={{
              top: `${10 + i * 12}%`,
              animationDelay: `${i * 0.1}s`
            }}
          />
        ))}
      </div>

      <div className="text-center z-20 max-w-2xl mx-auto px-4">
        {/* Main Game Over Message */}
        <div className={`text-6xl md:text-8xl font-pixel font-bold text-arcade-neon-red mb-8 ${settings.enableGlow ? 'arcade-neon-text' : ''} arcade-glitch`}>
          {message}
        </div>

        {/* Final Score */}
        <div className="mb-8 space-y-4">
          <div className={`text-2xl font-pixel text-arcade-neon-yellow ${settings.enableGlow ? 'animate-neon-pulse' : 'animate-pixel-blink'}`}>
            FINAL SCORE
          </div>
          <div className="text-4xl font-pixel font-bold text-arcade-neon-cyan">
            {finalScore.toLocaleString()}
          </div>
        </div>

        {/* Continue Section */}
        {showContinue && (
          <div className="mb-8 space-y-6">
            <div className={`text-xl font-pixel text-arcade-neon-magenta ${settings.enableGlow ? 'animate-neon-pulse' : 'animate-pixel-blink'}`}>
              CONTINUE?
            </div>
            
            <div className="text-6xl font-pixel font-bold text-arcade-neon-yellow animate-pixel-blink">
              {countdown}
            </div>

            <div className="space-y-4">
              <ArcadeButton
                variant="success"
                size="lg"
                onClick={handleContinue}
                className="mr-4"
              >
                INSERT COIN TO CONTINUE
              </ArcadeButton>
              
              <div className="text-sm font-pixel text-arcade-neon-cyan opacity-80">
                COST: 1 CREDIT
              </div>
            </div>
          </div>
        )}

        {/* Game Over Options */}
        {!showContinue && (
          <div className="space-y-6">
            <div className={`text-2xl font-pixel text-arcade-neon-red ${settings.enableGlow ? 'animate-neon-pulse' : 'animate-pixel-blink'}`}>
              GAME OVER
            </div>
            
            <div className="space-x-4">
              <ArcadeButton
                variant="primary"
                size="lg"
                onClick={handleRestart}
              >
                NEW GAME
              </ArcadeButton>
            </div>
          </div>
        )}

        {/* Easter Egg Message */}
        <div className="mt-12 text-xs font-pixel text-arcade-neon-green opacity-40 animate-pixel-blink">
          THANK YOU FOR PLAYING • INSERT COIN FOR ANOTHER ROUND
        </div>
      </div>
    </div>
  );
};

export default GameOverScreen;
