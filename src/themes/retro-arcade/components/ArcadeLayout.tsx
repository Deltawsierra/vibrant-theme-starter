
import React, { useEffect, useState } from 'react';
import ArcadeNavigation from './ArcadeNavigation';
import MotionWarningModal from './MotionWarningModal';
import AudioControls from './AudioControls';
import ArcadeHUD from './ArcadeHUD';
import InsertCoinLoader from './InsertCoinLoader';
import { useArcade } from '../context/ArcadeContext';
import { useArcadeAudio } from '../hooks/useArcadeAudio';

interface ArcadeLayoutProps {
  children: React.ReactNode;
}

const ArcadeLayout: React.FC<ArcadeLayoutProps> = ({ children }) => {
  const { settings, dismissMotionWarning } = useArcade();
  const { playSFX, userHasInteracted, playBackgroundMusic } = useArcadeAudio();
  const [showBootSequence, setShowBootSequence] = useState(true);
  const [bootProgress, setBootProgress] = useState(0);

  // Boot sequence effect
  useEffect(() => {
    if (!showBootSequence) return;

    const bootTimer = setTimeout(() => {
      setShowBootSequence(false);
      if (userHasInteracted) {
        playBackgroundMusic();
      }
    }, 3000);

    const progressTimer = setInterval(() => {
      setBootProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => {
      clearTimeout(bootTimer);
      clearInterval(progressTimer);
    };
  }, [showBootSequence, userHasInteracted, playBackgroundMusic]);

  // Auto-start background music after first interaction
  useEffect(() => {
    if (userHasInteracted && !showBootSequence) {
      const timer = setTimeout(() => {
        playBackgroundMusic();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [userHasInteracted, playBackgroundMusic, showBootSequence]);

  const handleMotionAccept = () => {
    dismissMotionWarning();
    playSFX('coin-insert');
  };

  const handleMotionDecline = () => {
    dismissMotionWarning();
    playSFX('button-press');
  };

  const handleBootComplete = () => {
    setShowBootSequence(false);
    playSFX('power-up');
  };

  return (
    <>
      {/* Boot Sequence */}
      {showBootSequence && (
        <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center arcade-crt-effect">
          <div className="text-center space-y-8">
            {/* System Name */}
            <div className="text-4xl md:text-6xl font-pixel font-bold text-arcade-neon-green animate-arcade-boot">
              ARCADE OS v2.4
            </div>
            
            {/* Loading Text */}
            <div className="text-lg font-pixel text-arcade-neon-cyan animate-pixel-blink">
              INITIALIZING SYSTEMS...
            </div>
            
            {/* Progress Bar */}
            <div className="w-80 max-w-full mx-auto">
              <div className="w-full h-4 bg-gray-800 border-2 border-arcade-neon-yellow">
                <div 
                  className="h-full bg-arcade-neon-yellow transition-all duration-100 ease-linear"
                  style={{ width: `${bootProgress}%` }}
                />
              </div>
              <div className="text-sm font-pixel text-arcade-neon-yellow mt-2 text-center">
                {bootProgress}% COMPLETE
              </div>
            </div>

            {/* Boot Messages */}
            <div className="space-y-2 text-xs font-pixel text-arcade-neon-green opacity-80">
              <div>✓ GRAPHICS PROCESSOR INITIALIZED</div>
              <div>✓ SOUND SYSTEM LOADED</div>
              <div>✓ INPUT CONTROLLERS DETECTED</div>
              <div className="animate-pixel-blink">⟳ LOADING GAME DATA...</div>
            </div>
          </div>
        </div>
      )}

      {/* Motion Warning Modal */}
      {settings.showMotionWarning && (
        <MotionWarningModal 
          onAccept={handleMotionAccept}
          onDecline={handleMotionDecline}
        />
      )}
      
      <div className={`min-h-screen bg-black text-arcade-neon-green font-pixel overflow-hidden relative arcade-crt-effect ${settings.enableScanlines ? 'animate-screen-flicker' : ''}`}>
        {/* Multiple Layer CRT Effects */}
        {settings.enableScanlines && (
          <>
            {/* Primary scanlines */}
            <div className="fixed inset-0 pointer-events-none z-40 opacity-30">
              <div className="w-full h-full bg-crt-scanlines"></div>
            </div>
            
            {/* Secondary flicker effect */}
            <div className="fixed inset-0 pointer-events-none z-39 opacity-10">
              <div className="w-full h-full bg-repeat-y animate-screen-flicker bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSI4IiB2aWV3Qm94PSIwIDAgMSA4IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSIjMDBmZjAwIiBmaWxsLW9wYWNpdHk9IjAuMiIvPgo8cmVjdCB5PSI0IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSIjMDBmZmZmIiBmaWxsLW9wYWNpdHk9IjAuMSIvPgo8L3N2Zz4K')]"></div>
            </div>
          </>
        )}

        {/* Enhanced Parallax Star Field Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className={`absolute inset-0 ${settings.enableGlow ? 'animate-parallax-float' : ''}`}>
            {/* Layer 1 - Distant stars */}
            <div className="absolute inset-0 opacity-20">
              {[...Array(80)].map((_, i) => (
                <div
                  key={`star-1-${i}`}
                  className="absolute w-1 h-1 bg-arcade-neon-cyan rounded-full animate-pixel-blink"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 4}s`,
                  }}
                />
              ))}
            </div>
            
            {/* Layer 2 - Medium stars with colors */}
            <div className={`absolute inset-0 opacity-40 ${settings.enableGlow ? 'animate-slide' : ''}`}>
              {[...Array(50)].map((_, i) => {
                const colors = ['arcade-neon-magenta', 'arcade-neon-cyan', 'arcade-neon-yellow'];
                const color = colors[i % colors.length];
                return (
                  <div
                    key={`star-2-${i}`}
                    className={`absolute w-2 h-2 bg-${color} rounded-full`}
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                  />
                );
              })}
            </div>
            
            {/* Layer 3 - Bright pulsing stars */}
            <div className="absolute inset-0 opacity-60">
              {[...Array(30)].map((_, i) => (
                <div
                  key={`star-3-${i}`}
                  className={`absolute w-3 h-3 bg-arcade-neon-yellow rounded-full ${settings.enableGlow ? 'animate-neon-pulse' : ''}`}
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`
                  }}
                />
              ))}
            </div>

            {/* Layer 4 - Moving particles */}
            <div className="absolute inset-0">
              {[...Array(15)].map((_, i) => (
                <div
                  key={`particle-${i}`}
                  className="absolute w-1 h-8 bg-gradient-to-b from-arcade-neon-pink to-transparent opacity-60 animate-slide"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDuration: `${8 + Math.random() * 4}s`,
                    animationDelay: `${Math.random() * 8}s`
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Navigation HUD */}
        <ArcadeNavigation />

        {/* Audio Controls */}
        <AudioControls />

        {/* Arcade HUD */}
        <ArcadeHUD />

        {/* Main Arcade Floor */}
        <main className="min-h-[calc(100vh-80px)] relative z-10 pt-20">
          {/* Enhanced Perspective Grid Floor */}
          <div className="absolute bottom-0 left-0 right-0 h-80 pointer-events-none">
            {/* Primary grid */}
            <div className="absolute inset-0 bg-gradient-to-t from-arcade-neon-cyan/20 via-arcade-neon-magenta/10 to-transparent">
              <div className="absolute inset-0 bg-arcade-grid opacity-40 animate-slide" 
                   style={{ backgroundSize: '40px 40px' }} />
            </div>
            
            {/* Secondary perspective lines */}
            <div className="absolute bottom-0 left-0 right-0 h-full">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute bottom-0 left-1/2 w-1 bg-arcade-neon-cyan opacity-30"
                  style={{
                    height: `${20 + i * 8}%`,
                    transform: `translateX(-50%) rotateZ(${(i - 4) * 2}deg)`,
                    transformOrigin: 'bottom center'
                  }}
                />
              ))}
            </div>
          </div>

          {/* Content Container */}
          <div className="relative z-20 px-4">
            {children}
          </div>
        </main>

        {/* Enhanced Arcade Cabinet Footer */}
        <footer className={`relative z-30 bg-gradient-to-r from-arcade-neon-magenta/30 via-arcade-neon-cyan/30 to-arcade-neon-yellow/30 border-t-4 border-arcade-neon-green backdrop-blur-sm ${settings.enableGlow ? 'animate-neon-pulse' : ''}`}>
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="text-center space-y-4">
              {/* Main message */}
              <div className={`text-xl md:text-2xl font-pixel font-bold text-arcade-neon-yellow mb-2 ${settings.enableGlow ? 'arcade-neon-text animate-coin-insert' : 'animate-pixel-blink'}`}>
                ◆◇◆ THANK YOU FOR PLAYING ◆◇◆
              </div>
              
              {/* Stats display */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm font-pixel">
                <div className="text-arcade-neon-cyan">
                  CREDITS: ∞ | HIGH SCORE: 999999
                </div>
                <div className="text-arcade-neon-magenta">
                  PLAYER: PORTFOLIO_VISITOR
                </div>
                <div className="text-arcade-neon-yellow">
                  STATUS: ONLINE
                </div>
              </div>
              
              {/* Copyright */}
              <div className="text-xs font-pixel text-arcade-neon-green opacity-60">
                RETRO ARCADE PORTFOLIO © 2024 • BUILT WITH PASSION
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default ArcadeLayout;
