
import React, { useEffect } from 'react';
import ArcadeNavigation from './ArcadeNavigation';
import MotionWarningModal from './MotionWarningModal';
import AudioControls from './AudioControls';
import { ArcadeProvider, useArcade } from '../context/ArcadeContext';
import { useArcadeAudio } from '../hooks/useArcadeAudio';

interface ArcadeLayoutProps {
  children: React.ReactNode;
}

const ArcadeLayoutContent: React.FC<ArcadeLayoutProps> = ({ children }) => {
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
      
      <div className={`min-h-screen bg-black text-green-400 font-orbitron ${settings.enableScanlines ? 'animate-screen-flicker' : ''}`}>
        {/* Navigation */}
        <ArcadeNavigation />

        {/* Audio Controls */}
        <AudioControls />

        {/* Main Game Room Background */}
        <main className={`min-h-[calc(100vh-140px)] bg-gradient-to-b from-purple-900/20 to-blue-900/20 relative ${settings.enableGlow ? 'animate-parallax-float' : ''}`}>
          {/* Animated background patterns */}
          <div className={`absolute inset-0 opacity-10 ${settings.enableGlow ? 'animate-pulse' : ''}`}>
            <div className="w-full h-full bg-grid-pattern"></div>
          </div>
          
          {/* Content */}
          <div className="relative z-10">
            {children}
          </div>
        </main>

        {/* Arcade Carpet Footer */}
        <footer className={`w-full bg-gradient-to-r from-red-900 to-blue-900 border-t-2 border-yellow-400 ${settings.enableGlow ? 'animate-neon-pulse' : ''}`}>
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="text-center">
              <p className={`text-yellow-400 text-sm font-bold ${settings.enableGlow ? 'animate-pixel-blink' : ''}`}>
                ◆ ARCADE CARPET FOOTER PLACEHOLDER ◆ INSERT COIN TO CONTINUE ◆
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

const ArcadeLayout: React.FC<ArcadeLayoutProps> = ({ children }) => {
  return (
    <ArcadeProvider>
      <ArcadeLayoutContent>{children}</ArcadeLayoutContent>
    </ArcadeProvider>
  );
};

export default ArcadeLayout;
