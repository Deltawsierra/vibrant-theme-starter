
import React from 'react';
import { useArcade } from '../context/ArcadeContext';

const ContactInfo = () => {
  const { settings } = useArcade();

  return (
    <div className="bg-black/80 border-4 border-arcade-neon-cyan p-8">
      <div className={`text-2xl font-pixel font-bold text-arcade-neon-cyan mb-6 text-center ${settings.enableGlow ? 'animate-neon-pulse' : ''}`}>
        DIRECT CONNECTION
      </div>
      
      <div className="space-y-4">
        <div className="bg-gray-900 border-2 border-arcade-neon-cyan p-4">
          <div className="text-arcade-neon-cyan font-pixel text-sm mb-1">EMAIL PROTOCOL:</div>
          <div className="text-arcade-neon-yellow font-pixel">hello@portfolio.dev</div>
        </div>
        
        <div className="bg-gray-900 border-2 border-arcade-neon-cyan p-4">
          <div className="text-arcade-neon-cyan font-pixel text-sm mb-1">VOICE CHANNEL:</div>
          <div className="text-arcade-neon-yellow font-pixel">+1 555 123 4567</div>
        </div>
        
        <div className="bg-gray-900 border-2 border-arcade-neon-cyan p-4">
          <div className="text-arcade-neon-cyan font-pixel text-sm mb-1">RESPONSE TIME:</div>
          <div className={`text-arcade-neon-green font-pixel ${settings.enableGlow ? 'animate-pixel-blink' : ''}`}>
            &lt; 24 HOURS
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
