
import React from 'react';
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

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center pointer-events-auto">
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
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-sm font-pixel text-arcade-neon-yellow mt-2 text-center">
            {progress}% COMPLETE
          </div>
        </div>

        {/* Boot Messages */}
        <div className="space-y-2 text-xs font-pixel text-arcade-neon-green opacity-80">
          <div>✓ GRAPHICS PROCESSOR INITIALIZED</div>
          <div>✓ SOUND SYSTEM LOADED</div>
          <div>✓ INPUT CONTROLLERS DETECTED</div>
          <div className={progress < 100 ? 'animate-pixel-blink' : ''}>
            {progress < 100 ? '⟳ LOADING GAME DATA...' : '✓ SYSTEM READY'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArcadeBootSequence;
