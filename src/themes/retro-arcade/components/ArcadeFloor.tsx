
import React from 'react';

const ArcadeFloor: React.FC = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-80 pointer-events-none z-5">
      {/* Primary grid */}
      <div className="absolute inset-0 bg-gradient-to-t from-arcade-neon-cyan/10 via-arcade-neon-magenta/5 to-transparent">
        <div className="absolute inset-0 bg-arcade-grid opacity-20 animate-slide" 
             style={{ backgroundSize: '40px 40px' }} />
      </div>
      
      {/* Secondary perspective lines */}
      <div className="absolute bottom-0 left-0 right-0 h-full">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute bottom-0 left-1/2 w-1 bg-arcade-neon-cyan opacity-15"
            style={{
              height: `${20 + i * 8}%`,
              transform: `translateX(-50%) rotateZ(${(i - 4) * 2}deg)`,
              transformOrigin: 'bottom center'
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ArcadeFloor;
