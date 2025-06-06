
import React from 'react';
import { useArcade } from '../context/ArcadeContext';

const SpecialAbilities = () => {
  const { settings } = useArcade();

  const abilities = [
    'Rapid Response Protocol',
    'Cross-Platform Compatibility',
    'Agile Development Boost',
    '24/7 Support Mode'
  ];

  return (
    <div className="bg-black/60 border-2 border-arcade-neon-magenta p-6">
      <div className={`text-lg font-pixel font-bold text-arcade-neon-magenta mb-4 ${settings.enableGlow ? 'animate-neon-pulse' : ''}`}>
        SPECIAL ABILITIES
      </div>
      <div className="space-y-2 text-sm font-pixel text-arcade-neon-magenta">
        {abilities.map((ability) => (
          <div key={ability}>◆ {ability}</div>
        ))}
      </div>
    </div>
  );
};

export default SpecialAbilities;
