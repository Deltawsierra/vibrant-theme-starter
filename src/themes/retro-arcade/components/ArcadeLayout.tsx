
import React, { useEffect } from 'react';
import ArcadeNavigation from './ArcadeNavigation';
import MotionWarningModal from './MotionWarningModal';
import AudioControls from './AudioControls';
import ArcadeHUD from './ArcadeHUD';
import { useArcade } from '../context/ArcadeContext';
import { useArcadeAudio } from '../hooks/useArcadeAudio';

interface ArcadeLayoutProps {
  children: React.ReactNode;
}

const ArcadeLayout: React.FC<ArcadeLayoutProps> = ({ children }) => {
  const { settings, dismissMotionWarning } = useArcade();
  const { playSFX, userHasInteracted, playBackgroundMusic } = useArcadeAudio();

  // Auto-start background music after first interaction
  useEffect(() => {
    if (userHasInteracted) {
      const timer = setTimeout(() => {
        playBackgroundMusic();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [userHasInteracted, playBackgroundMusic]);

  const handleMotionAccept = () => {
    dismissMotionWarning();
    playSFX('coin-insert');
  };

  const handleMotionDecline = () => {
    dismissMotionWarning();
    playSFX('button-press');
  };

  return (
    <>
      {settings.showMotionWarning && (
        <MotionWarningModal 
          onAccept={handleMotionAccept}
          onDecline={handleMotionDecline}
        />
      )}
      
      <div className={`min-h-screen bg-black text-arcade-neon-green font-pixel overflow-hidden relative ${settings.enableScanlines ? 'animate-screen-flicker' : ''}`}>
        {/* CRT Scanlines Overlay */}
        {settings.enableScanlines && (
          <div className="fixed inset-0 pointer-events-none z-40 opacity-20">
            <div className="w-full h-full bg-repeat-y bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSI0IiB2aWV3Qm94PSIwIDAgMSA0IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSIjMDBmZjAwIiBmaWxsLW9wYWNpdHk9IjAuMSIvPgo8cmVjdCB5PSIyIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSIjMDBmZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPHN2Zz4K')]"></div>
          </div>
        )}

        {/* Parallax Star Field Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className={`absolute inset-0 ${settings.enableGlow ? 'animate-parallax-float' : ''}`}>
            {/* Layer 1 - Far stars */}
            <div className="absolute inset-0 opacity-30">
              {[...Array(50)].map((_, i) => (
                <div
                  key={`star-1-${i}`}
                  className="absolute w-1 h-1 bg-arcade-neon-cyan rounded-full animate-pixel-blink"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                  }}
                />
              ))}
            </div>
            {/* Layer 2 - Medium stars */}
            <div className={`absolute inset-0 opacity-50 ${settings.enableGlow ? 'animate-slide' : ''}`}>
              {[...Array(30)].map((_, i) => (
                <div
                  key={`star-2-${i}`}
                  className="absolute w-2 h-2 bg-arcade-neon-magenta rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                />
              ))}
            </div>
            {/* Layer 3 - Close stars */}
            <div className="absolute inset-0 opacity-70">
              {[...Array(20)].map((_, i) => (
                <div
                  key={`star-3-${i}`}
                  className={`absolute w-3 h-3 bg-arcade-neon-yellow rounded-full ${settings.enableGlow ? 'animate-neon-pulse' : ''}`}
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
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
          {/* Perspective Grid Floor */}
          <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-arcade-neon-cyan/20 to-transparent pointer-events-none">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTAgMEg0MFY0MEgwVjBaIiBzdHJva2U9IiMwMGZmZmYiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgb3BhY2l0eT0iMC4yIi8+Cjwvc3ZnPgo=')] opacity-30 animate-slide"></div>
          </div>

          {/* Content Container */}
          <div className="relative z-20 px-4">
            {children}
          </div>
        </main>

        {/* Arcade Cabinet Footer */}
        <footer className={`relative z-30 bg-gradient-to-r from-arcade-neon-magenta/20 via-arcade-neon-cyan/20 to-arcade-neon-yellow/20 border-t-4 border-arcade-neon-green ${settings.enableGlow ? 'animate-neon-pulse' : ''}`}>
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="text-center">
              <div className={`text-arcade-neon-yellow text-lg font-pixel font-bold mb-2 ${settings.enableGlow ? 'animate-pixel-blink' : ''}`}>
                ◆◇◆ GAME OVER - INSERT COIN TO CONTINUE ◆◇◆
              </div>
              <div className="text-arcade-neon-cyan text-sm font-pixel">
                CREDITS: ∞ | HIGH SCORE: 999999 | PLAYER: DEV
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default ArcadeLayout;
