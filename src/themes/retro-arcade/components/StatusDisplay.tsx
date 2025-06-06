
import React from 'react';
import { useArcade } from '../context/ArcadeContext';

const StatusDisplay = () => {
  const { settings } = useArcade();

  const statusItems = [
    { label: 'AVAILABILITY', status: 'ONLINE', color: 'arcade-neon-green' },
    { label: 'NEW PROJECTS', status: 'ACCEPTING', color: 'arcade-neon-cyan' },
    { label: 'CONSULTATION', status: 'AVAILABLE', color: 'arcade-neon-magenta' },
    { label: 'COLLABORATION', status: 'OPEN', color: 'arcade-neon-yellow' }
  ];

  return (
    <div className="bg-black/80 border-4 border-arcade-neon-yellow p-8">
      <div className={`text-2xl font-pixel font-bold text-arcade-neon-yellow mb-6 text-center ${settings.enableGlow ? 'animate-neon-pulse' : ''}`}>
        MISSION STATUS
      </div>
      
      <div className="space-y-3">
        {statusItems.map(({ label, status, color }) => (
          <div key={label} className="flex justify-between items-center font-pixel text-sm">
            <span className={`text-${color}`}>{label}:</span>
            <span className={`text-${color} font-bold ${settings.enableGlow ? 'animate-pixel-blink' : ''}`}>
              {status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatusDisplay;
