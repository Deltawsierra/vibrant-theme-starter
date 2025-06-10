
import React from 'react';
import { useArcade } from '@/themes/retro-arcade/context/ArcadeContext';

const ArcadeAdvisorConsole: React.FC = () => {
  const { settings } = useArcade();

  return (
    <div className="mt-4 flex justify-between">
      <div className="flex space-x-3">
        {["A", "B", "C", "D"].map(btn => (
          <div key={btn} className="w-8 h-8 rounded-full bg-arcade-dark-300 border-2 border-arcade-neon-magenta flex items-center justify-center text-arcade-neon-magenta font-pixel">
            {btn}
          </div>
        ))}
      </div>
      <div className="flex space-x-2">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className={`w-3 h-6 ${settings.enableGlow ? 'animate-neon-blink' : ''} bg-arcade-neon-cyan`}></div>
        ))}
      </div>
    </div>
  );
};

export default ArcadeAdvisorConsole;
