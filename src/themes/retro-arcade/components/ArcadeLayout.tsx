
import React, { useState, useEffect } from 'react';
import ArcadeNavigation from './ArcadeNavigation';
import MotionWarningModal from './MotionWarningModal';
import { SFXProvider } from './SFXContext';

interface ArcadeLayoutProps {
  children: React.ReactNode;
}

const ArcadeLayoutInner: React.FC<ArcadeLayoutProps> = ({ children }) => {
  const [showMotionWarning, setShowMotionWarning] = useState(true);
  const [motionEnabled, setMotionEnabled] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  const handleMotionAccept = () => {
    setShowMotionWarning(false);
    setMotionEnabled(true);
  };

  const handleMotionDecline = () => {
    setShowMotionWarning(false);
    setMotionEnabled(false);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  useEffect(() => {
    const hasSeenWarning = localStorage.getItem('arcade-motion-warning-seen');
    if (hasSeenWarning) {
      setShowMotionWarning(false);
      setMotionEnabled(hasSeenWarning === 'true');
    }
  }, []);

  return (
    <>
      {showMotionWarning && (
        <MotionWarningModal 
          onAccept={handleMotionAccept}
          onDecline={handleMotionDecline}
        />
      )}
      
      <div className={`min-h-screen bg-black text-green-400 font-orbitron ${motionEnabled ? 'animate-screen-flicker' : ''}`}>
        {/* Navigation */}
        <ArcadeNavigation />

        {/* Floating Mute Button */}
        <button
          onClick={toggleMute}
          className={`fixed top-4 right-4 z-50 px-4 py-2 border-2 font-bold focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
            motionEnabled ? 'transition-colors' : ''
          } ${
            isMuted ? 'border-red-400 text-red-400 bg-red-400/10' : 'border-magenta-400 text-magenta-400 bg-magenta-400/10'
          } ${motionEnabled ? 'hover:animate-neon-glow' : ''}`}
        >
          {isMuted ? 'UNMUTE' : 'MUTE'}
        </button>

        {/* Main Game Room Background */}
        <main className={`min-h-[calc(100vh-140px)] bg-gradient-to-b from-purple-900/20 to-blue-900/20 relative ${motionEnabled ? 'animate-parallax-float' : ''}`}>
          {/* Animated background patterns */}
          <div className={`absolute inset-0 opacity-10 ${motionEnabled ? 'animate-pulse' : ''}`}>
            <div className="w-full h-full bg-grid-pattern"></div>
          </div>
          
          {/* Content */}
          <div className="relative z-10">
            {children}
          </div>
        </main>

        {/* Arcade Carpet Footer */}
        <footer className={`w-full bg-gradient-to-r from-red-900 to-blue-900 border-t-2 border-yellow-400 ${motionEnabled ? 'animate-neon-pulse' : ''}`}>
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="text-center">
              <p className={`text-yellow-400 text-sm font-bold ${motionEnabled ? 'animate-pixel-blink' : ''}`}>
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
    <SFXProvider>
      <ArcadeLayoutInner>{children}</ArcadeLayoutInner>
    </SFXProvider>
  );
};

export default ArcadeLayout;
