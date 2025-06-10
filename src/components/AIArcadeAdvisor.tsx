
import React, { useMemo } from 'react';
import { type ThemePersonality } from '@/utils/aiAssistantUtils';
import ArcadeAdvisorHeader from './arcade/ArcadeAdvisorHeader';
import ArcadeAdvisorAvatar from './arcade/ArcadeAdvisorAvatar';
import ArcadeAdvisorChat from './arcade/ArcadeAdvisorChat';
import ArcadeAdvisorInput from './arcade/ArcadeAdvisorInput';
import ArcadeAdvisorConsole from './arcade/ArcadeAdvisorConsole';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface AIArcadeAdvisorProps {
  isAnimatingIn: boolean;
  isAnimatingOut: boolean;
  messages: Message[];
  isTyping: boolean;
  personality: ThemePersonality;
  inputValue: string;
  setInputValue: (value: string) => void;
  handleSendMessage: () => void;
  handleKeyPress: (e: React.KeyboardEvent) => void;
  handleClose: () => void;
  isRecruiter?: boolean;
}

const AIArcadeAdvisor: React.FC<AIArcadeAdvisorProps> = ({
  isAnimatingIn,
  isAnimatingOut,
  messages,
  isTyping,
  personality,
  inputValue,
  setInputValue,
  handleSendMessage,
  handleKeyPress,
  handleClose,
  isRecruiter = false
}) => {
  const animationClass = useMemo(() => {
    if (isAnimatingIn) return 'animate-arcade-ai-in';
    if (isAnimatingOut) return 'animate-arcade-ai-out';
    return '';
  }, [isAnimatingIn, isAnimatingOut]);

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm ${animationClass}`}
      style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
    >
      <div className="w-full max-w-4xl h-full max-h-[90vh] relative">
        {/* AI Advisor Container */}
        <div className="relative w-full h-full border-4 bg-arcade-dark-200/95 border-arcade-neon-green text-arcade-neon-green shadow-[0_0_20px_rgba(0,255,0,0.5)] pixel-border">
          <ArcadeAdvisorHeader onClose={handleClose} />

          <div className="pt-8 pb-4 px-4 h-full flex flex-col lg:flex-row">
            {/* Avatar Section */}
            <ArcadeAdvisorAvatar 
              personality={personality}
              isTyping={isTyping}
              isRecruiter={isRecruiter}
            />

            {/* Chat Section */}
            <div className="lg:w-2/3 flex flex-col mt-4 lg:mt-0">
              {/* Messages Area */}
              <ArcadeAdvisorChat 
                messages={messages}
                isTyping={isTyping}
                personality={personality}
              />
              
              {/* Input Area */}
              <ArcadeAdvisorInput 
                inputValue={inputValue}
                setInputValue={setInputValue}
                handleSendMessage={handleSendMessage}
                handleKeyPress={handleKeyPress}
                personality={personality}
                isTyping={isTyping}
              />

              {/* Bottom console decoration */}
              <ArcadeAdvisorConsole />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIArcadeAdvisor;
