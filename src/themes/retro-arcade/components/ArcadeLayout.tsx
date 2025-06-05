
import React, { useEffect, useState } from 'react';
import ArcadeNavigation from './ArcadeNavigation';
import MotionWarningModal from './MotionWarningModal';
import AudioControlsSidebar from './AudioControlsSidebar';
import ArcadeHUD from './ArcadeHUD';
import ArcadeBootSequence from './ArcadeBootSequence';
import ArcadeBackground from './ArcadeBackground';
import ArcadeFloor from './ArcadeFloor';
import ArcadeFooter from './ArcadeFooter';
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
  const [isInitialized, setIsInitialized] = useState(false);

  // Extended boot sequence effect - minimum 3 seconds
  useEffect(() => {
    if (isInitialized) return;

    const progressTimer = setInterval(() => {
      setBootProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return prev + 3; // Slower progress for better readability
      });
    }, 100);

    // Minimum 3 second boot time
    const bootTimer = setTimeout(() => {
      setShowBootSequence(false);
      setIsInitialized(true);
      if (userHasInteracted) {
        playBackgroundMusic();
      }
    }, 3000); // Extended to 3 seconds minimum

    return () => {
      clearTimeout(bootTimer);
      clearInterval(progressTimer);
    };
  }, [isInitialized, userHasInteracted, playBackgroundMusic]);

  // Auto-start background music after first interaction
  useEffect(() => {
    if (userHasInteracted && !showBootSequence && isInitialized) {
      const timer = setTimeout(() => {
        playBackgroundMusic();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [userHasInteracted, playBackgroundMusic, showBootSequence, isInitialized]);

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
      {/* Boot Sequence - only shows on initial load with extended timing */}
      {showBootSequence && !isInitialized && (
        <ArcadeBootSequence 
          isVisible={showBootSequence && !isInitialized}
          progress={bootProgress}
        />
      )}

      {/* Motion Warning Modal */}
      {settings.showMotionWarning && (
        <MotionWarningModal 
          onAccept={handleMotionAccept}
          onDecline={handleMotionDecline}
        />
      )}
      
      <div className="min-h-screen bg-black text-arcade-neon-green font-pixel overflow-hidden relative">
        {/* Background Elements */}
        <ArcadeBackground />

        {/* Navigation HUD */}
        <ArcadeNavigation />

        {/* Audio Controls Sidebar - Replaces old fixed controls */}
        <AudioControlsSidebar />

        {/* Arcade HUD */}
        <ArcadeHUD />

        {/* Main Arcade Floor */}
        <main className="min-h-[calc(100vh-80px)] relative z-20 pt-20">
          {/* Enhanced Perspective Grid Floor */}
          <ArcadeFloor />

          {/* Content Container - No overlays after boot */}
          <div className="relative z-30 px-4">
            {children}
          </div>
        </main>

        {/* Enhanced Arcade Cabinet Footer */}
        <ArcadeFooter />
      </div>
    </>
  );
};

export default ArcadeLayout;
