
import React, { useState, useEffect, useCallback, memo } from 'react';
import { useTheme } from '@/context/ThemeContext';
import AIAvatar from './AIAvatar';
import AIAssistant from './AIAssistant';

const AIFloatingButton: React.FC = memo(() => {
  const { currentTheme } = useTheme();
  const [showHelpBubble, setShowHelpBubble] = useState(false);
  const [isAIOpen, setIsAIOpen] = useState(false);

  // Show help bubble after 3 seconds, hide after 5 seconds
  useEffect(() => {
    const showTimer = setTimeout(() => setShowHelpBubble(true), 3000);
    const hideTimer = setTimeout(() => setShowHelpBubble(false), 8000);
    
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  const handleOpen = useCallback(() => {
    setIsAIOpen(true);
    setShowHelpBubble(false);
  }, []);

  const handleClose = useCallback(() => {
    setIsAIOpen(false);
  }, []);

  if (currentTheme === 'retro-arcade') {
    return (
      <>
        <div className="fixed bottom-6 right-6 z-50">
          {/* Help Speech Bubble */}
          {showHelpBubble && (
            <div className="absolute bottom-20 right-0 bg-arcade-dark-200 border-2 border-arcade-neon-cyan rounded-lg p-3 shadow-[0_0_20px_rgba(0,255,255,0.5)] animate-fade-in pixelated">
              <div className="text-arcade-neon-cyan pixelated-font text-sm whitespace-nowrap">
                Here to assist!
              </div>
              {/* Speech bubble pointer */}
              <div className="absolute bottom-0 right-4 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-arcade-neon-cyan transform translate-y-2"></div>
            </div>
          )}
          
          {/* AI Icon Button */}
          <button
            onClick={handleOpen}
            className="w-16 h-16 bg-arcade-dark-300 border-4 border-arcade-neon-cyan rounded-lg shadow-[0_0_20px_rgba(0,255,255,0.5)] transition-all duration-300 hover:scale-110 hover:shadow-[0_0_30px_rgba(0,255,255,0.7)] animate-pulse-slow pixelated"
            aria-label="Open AI Assistant"
          >
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-8 h-8 bg-arcade-neon-yellow rounded-full border-2 border-arcade-neon-cyan pixelated">
                <div className="w-full h-full bg-gradient-to-br from-arcade-neon-yellow to-yellow-300 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-arcade-dark-300 pixelated-font">AI</span>
                </div>
              </div>
            </div>
          </button>
        </div>
        
        {/* AI Assistant Modal */}
        {isAIOpen && (
          <AIAssistant onClose={handleClose} />
        )}
      </>
    );
  }

  // Default layout for other themes
  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        {/* Help Speech Bubble */}
        {showHelpBubble && (
          <div className="absolute bottom-20 right-0 bg-background border border-border rounded-lg p-3 shadow-lg animate-fade-in">
            <div className="text-foreground text-sm whitespace-nowrap">
              Here to assist!
            </div>
            {/* Speech bubble pointer */}
            <div className="absolute bottom-0 right-4 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-border transform translate-y-2"></div>
          </div>
        )}
        
        <button
          onClick={handleOpen}
          className="w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center"
          aria-label="Open AI Assistant"
        >
          <AIAvatar theme={currentTheme} size="sm" />
        </button>
      </div>
      
      {/* AI Assistant Modal */}
      {isAIOpen && (
        <AIAssistant onClose={handleClose} />
      )}
    </>
  );
});

AIFloatingButton.displayName = 'AIFloatingButton';

export default AIFloatingButton;
