
import React, { useState, useEffect } from 'react';

interface MotionWarningModalProps {
  onAccept: () => void;
  onDecline: () => void;
}

const MotionWarningModal: React.FC<MotionWarningModalProps> = ({ onAccept, onDecline }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check if user has already seen this warning
    const hasSeenWarning = localStorage.getItem('arcade-motion-warning-seen');
    if (hasSeenWarning) {
      setIsVisible(false);
      onAccept();
    }
  }, [onAccept]);

  const handleAccept = () => {
    localStorage.setItem('arcade-motion-warning-seen', 'true');
    setIsVisible(false);
    onAccept();
  };

  const handleDecline = () => {
    localStorage.setItem('arcade-motion-warning-seen', 'false');
    setIsVisible(false);
    onDecline();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50 font-orbitron">
      <div className="bg-arcade-dark-100 border-4 border-arcade-neon-cyan p-8 max-w-md mx-4 text-center">
        <h2 className="text-2xl font-bold text-arcade-neon-yellow mb-4 animate-pixel-blink">
          ⚠️ MOTION WARNING ⚠️
        </h2>
        <p className="text-arcade-neon-green mb-6 text-sm leading-relaxed">
          This theme contains intense visual effects including:
          <br />
          • Flashing lights and neon animations
          <br />
          • Screen flicker effects
          <br />
          • Rapid color changes
          <br />
          • Pulsing and blinking elements
        </p>
        <p className="text-arcade-neon-cyan mb-6 text-xs">
          These effects may trigger seizures in individuals with photosensitive epilepsy.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={handleAccept}
            className="px-6 py-3 border-2 border-arcade-neon-green text-arcade-neon-green bg-arcade-neon-green/10 hover:bg-arcade-neon-green hover:text-black font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-arcade-neon-yellow"
          >
            ENTER ARCADE
          </button>
          <button
            onClick={handleDecline}
            className="px-6 py-3 border-2 border-arcade-neon-red text-arcade-neon-red bg-arcade-neon-red/10 hover:bg-arcade-neon-red hover:text-black font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-arcade-neon-yellow"
          >
            EXIT
          </button>
        </div>
        <p className="text-xs text-arcade-neon-magenta mt-4">
          You can change motion preferences in settings later.
        </p>
      </div>
    </div>
  );
};

export default MotionWarningModal;
