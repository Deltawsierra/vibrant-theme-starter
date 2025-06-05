
import React, { useEffect, useState } from 'react';
import { useArcade } from '../context/ArcadeContext';

interface ArcadeBootSequenceProps {
  isVisible: boolean;
  progress: number;
}

const ArcadeBootSequence: React.FC<ArcadeBootSequenceProps> = ({
  isVisible,
  progress
}) => {
  const { settings } = useArcade();
  const [currentMessage, setCurrentMessage] = useState(0);

  const bootMessages = [
    "INITIALIZING ARCADE SYSTEMS...",
    "LOADING DEVELOPER PROFILE...",
    "SCANNING SKILL TREE...",
    "CHECKING POWER-UP INVENTORY...",
    "AUTHENTICATING PLAYER CREDENTIALS...",
    "CALIBRATING RETRO DISPLAY...",
    "SYNCHRONIZING HIGH SCORES...",
    "PREPARING MISSION BRIEFINGS...",
    "SYSTEM READY - WELCOME PLAYER!"
  ];

  useEffect(() => {
    if (!isVisible) return;

    const messageInterval = setInterval(() => {
      setCurrentMessage(prev => {
        if (prev < bootMessages.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 300);

    return () => clearInterval(messageInterval);
  }, [isVisible, bootMessages.length]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center pointer-events-auto">
      <div className="text-center space-y-8 max-w-2xl">
        {/* System Name */}
        <div className="text-4xl md:text-6xl font-pixel font-bold text-arcade-neon-green animate-arcade-boot">
          PORTFOLIO OS v3.1
        </div>
        
        {/* Subtitle */}
        <div className="text-lg font-pixel text-arcade-neon-cyan">
          DAVID SMITH - SENIOR DEVELOPER PROFILE
        </div>
        
        {/* Loading Text */}
        <div className="text-lg font-pixel text-arcade-neon-yellow animate-pixel-blink min-h-[1.5rem]">
          {bootMessages[currentMessage]}
        </div>
        
        {/* Progress Bar */}
        <div className="w-96 max-w-full mx-auto">
          <div className="w-full h-6 bg-gray-800 border-2 border-arcade-neon-yellow">
            <div 
              className="h-full bg-arcade-neon-yellow transition-all duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-sm font-pixel text-arcade-neon-yellow mt-2 text-center">
            LOADING... {progress}% COMPLETE
          </div>
        </div>

        {/* System Check Messages */}
        <div className="space-y-2 text-xs font-pixel text-arcade-neon-green opacity-80">
          <div>✓ REACT/TYPESCRIPT MASTERY LOADED</div>
          <div>✓ AWS CLOUD ARCHITECT CERTIFIED</div>
          <div>✓ 9+ YEARS EXPERIENCE VERIFIED</div>
          <div>✓ FULL-STACK CAPABILITIES ONLINE</div>
          <div className={progress < 100 ? 'animate-pixel-blink' : ''}>
            {progress < 100 ? '⟳ FINALIZING BOOT SEQUENCE...' : '✓ ALL SYSTEMS OPERATIONAL'}
          </div>
        </div>

        {/* Fun Stats */}
        <div className="grid grid-cols-2 gap-4 text-xs font-pixel">
          <div className="text-arcade-neon-cyan">
            PROJECTS COMPLETED: 50+
          </div>
          <div className="text-arcade-neon-magenta">
            COFFEE CONSUMED: ∞
          </div>
          <div className="text-arcade-neon-yellow">
            BUGS DEFEATED: 99.9%
          </div>
          <div className="text-arcade-neon-green">
            CLIENT SATISFACTION: 100%
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArcadeBootSequence;
