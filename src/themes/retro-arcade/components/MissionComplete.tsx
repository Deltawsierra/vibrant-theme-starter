
import React from 'react';
import { useArcade } from '../context/ArcadeContext';

const MissionComplete = () => {
  const { settings } = useArcade();

  return (
    <div className="text-center mt-16">
      <div className={`inline-block bg-arcade-neon-green/20 border-4 border-arcade-neon-green px-8 py-6 ${settings.enableGlow ? 'animate-neon-pulse' : ''}`}>
        <div className="text-arcade-neon-green font-pixel font-bold text-xl mb-2">
          MISSION OBJECTIVE: COMPLETE
        </div>
        <div className="text-arcade-neon-green font-pixel text-sm">
          CONTACT FORM DEPLOYED | STANDING BY FOR TRANSMISSION
        </div>
        <div className={`text-arcade-neon-yellow font-pixel text-xs mt-2 ${settings.enableGlow ? 'animate-pixel-blink' : ''}`}>
          PRESS START TO CONTINUE
        </div>
      </div>
    </div>
  );
};

export default MissionComplete;
