
import React, { useState, useEffect, useRef } from 'react';
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation';
import FocusManager from '@/components/FocusManager';

interface AccessibleMotionWarningProps {
  onAccept: () => void;
  onDecline: () => void;
}

const AccessibleMotionWarning: React.FC<AccessibleMotionWarningProps> = ({ onAccept, onDecline }) => {
  const [isVisible, setIsVisible] = useState(true);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if user has already seen this warning
    const hasSeenWarning = localStorage.getItem('arcade-motion-warning-seen');
    if (hasSeenWarning) {
      setIsVisible(false);
      onAccept();
    }
  }, [onAccept]);

  useKeyboardNavigation({
    onEscape: () => {
      handleDecline();
    },
    trapFocus: true,
    containerRef: dialogRef
  });

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
    <div 
      className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50 font-orbitron"
      role="dialog"
      aria-modal="true"
      aria-labelledby="motion-warning-title"
      aria-describedby="motion-warning-description"
    >
      <FocusManager autoFocus trapFocus>
        <div 
          ref={dialogRef}
          className="bg-arcade-dark-100 border-4 border-arcade-neon-cyan p-8 max-w-md mx-4 text-center"
          role="alertdialog"
        >
          <h2 
            id="motion-warning-title"
            className="text-2xl font-bold text-arcade-neon-yellow mb-4"
          >
            ⚠️ MOTION WARNING ⚠️
          </h2>
          <div id="motion-warning-description" className="text-arcade-neon-green mb-6 text-sm leading-relaxed">
            <p className="mb-4">
              This theme contains intense visual effects including:
            </p>
            <ul className="text-left space-y-1 mb-4">
              <li>• Flashing lights and neon animations</li>
              <li>• Screen flicker effects</li>
              <li>• Rapid color changes</li>
              <li>• Pulsing and blinking elements</li>
            </ul>
            <p className="text-arcade-neon-cyan text-xs">
              These effects may trigger seizures in individuals with photosensitive epilepsy.
            </p>
          </div>
          <div className="flex gap-4 justify-center">
            <button
              onClick={handleAccept}
              className="px-6 py-3 border-2 border-arcade-neon-green text-arcade-neon-green bg-arcade-neon-green/10 hover:bg-arcade-neon-green hover:text-black font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-arcade-neon-yellow focus:ring-offset-2 focus:ring-offset-black"
              aria-describedby="accept-description"
            >
              ENTER ARCADE
            </button>
            <button
              onClick={handleDecline}
              className="px-6 py-3 border-2 border-arcade-neon-red text-arcade-neon-red bg-arcade-neon-red/10 hover:bg-arcade-neon-red hover:text-black font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-arcade-neon-yellow focus:ring-offset-2 focus:ring-offset-black"
              aria-describedby="decline-description"
            >
              EXIT TO LOBBY
            </button>
          </div>
          <p className="text-xs text-arcade-neon-magenta mt-4">
            You can change motion preferences in settings later.
          </p>
          <div className="sr-only">
            <div id="accept-description">
              Proceed to the arcade theme with motion effects enabled
            </div>
            <div id="decline-description">
              Return to the main theme selector to choose a different theme
            </div>
          </div>
        </div>
      </FocusManager>
    </div>
  );
};

export default AccessibleMotionWarning;
