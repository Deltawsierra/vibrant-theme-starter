
import React, { useRef, useEffect } from 'react';
import { X, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AIAvatar from './AIAvatar';
import { type Theme } from '@/context/ThemeContext';
import { type ThemePersonality } from '@/utils/aiAssistantUtils';
import { getAIThemeStyles } from '@/utils/aiThemeStyles';
import AISpeechBubble from './AISpeechBubble';
import AIResumeTools from './AIResumeTools';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface AIFullDialogProps {
  currentTheme: Theme;
  messages: Message[];
  isTyping: boolean;
  personality: ThemePersonality;
  inputValue: string;
  setInputValue: (value: string) => void;
  handleSendMessage: () => void;
  handleKeyPress: (e: React.KeyboardEvent) => void;
  setIsOpen: (open: boolean) => void;
  isRecruiter?: boolean;
}

const AIFullDialog: React.FC<AIFullDialogProps> = ({
  currentTheme,
  messages,
  isTyping,
  personality,
  inputValue,
  setInputValue,
  handleSendMessage,
  handleKeyPress,
  setIsOpen,
  isRecruiter = false
}) => {
  const themeStyles = getAIThemeStyles(currentTheme);
  const dialogRef = useRef<HTMLDivElement>(null);

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [setIsOpen]);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div 
        ref={dialogRef}
        className={`relative w-full max-w-4xl h-full max-h-[90vh] rounded-xl shadow-2xl flex flex-col lg:flex-row overflow-hidden ${themeStyles.container}`}
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Close Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 z-10 w-8 h-8 p-0 hover:bg-white/20"
        >
          <X className="w-4 h-4" />
        </Button>

        {/* Avatar Section */}
        <div className={`lg:w-1/3 flex flex-col items-center justify-start p-6 lg:p-8 ${themeStyles.container}`}>
          <div className="mb-4 w-full text-center">
            <h3 className={themeStyles.characterName}>{personality.name}</h3>
            <p className={themeStyles.characterRole}>{personality.role}</p>
          </div>
          
          <AIAvatar 
            theme={currentTheme} 
            size="lg" 
            isTyping={isTyping}
            isRecruiter={isRecruiter}
          />
          
          {/* Recruiter Tools - Only show if isRecruiter is true */}
          {isRecruiter && (
            <div className="mt-6 w-full">
              <AIResumeTools theme={currentTheme} />
            </div>
          )}
        </div>

        {/* Speech Bubble */}
        <AISpeechBubble 
          messages={messages}
          isTyping={isTyping}
          personality={personality}
          themeStyles={themeStyles}
          currentTheme={currentTheme}
          inputValue={inputValue}
          setInputValue={setInputValue}
          onSendMessage={handleSendMessage}
          onKeyPress={handleKeyPress}
        />
      </div>
    </div>
  );
};

export default AIFullDialog;
