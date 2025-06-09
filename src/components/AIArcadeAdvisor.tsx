
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AIAvatar from './AIAvatar';
import { type ThemePersonality } from '@/utils/aiAssistantUtils';

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
  handleClose
}) => {
  return (
    <div className={`fixed inset-0 z-50 flex pointer-events-none bg-black/80 backdrop-blur-sm ${isAnimatingIn ? 'animate-fade-in' : ''} ${isAnimatingOut ? 'animate-fade-out' : ''}`}>
      {/* Avatar Panel - Left Side */}
      <div className={`w-80 h-full bg-arcade-dark-300/95 border-r-4 border-arcade-neon-cyan shadow-[0_0_40px_rgba(0,255,255,0.8)] flex flex-col justify-center items-center p-6 pointer-events-auto transform transition-transform duration-500 backdrop-blur-sm ${isAnimatingIn ? 'translate-x-0' : isAnimatingOut ? '-translate-x-full' : 'translate-x-0'}`}>
        
        {/* Character Portrait */}
        <div className="mb-8">
          <AIAvatar 
            theme="retro-arcade"
            size="lg" 
            isTyping={isTyping}
          />
        </div>

        {/* Character Info */}
        <div className="text-center mb-6">
          <h3 className="text-3xl font-bold text-arcade-neon-yellow pixelated-font mb-3 drop-shadow-lg">{personality.name}</h3>
          <p className="text-base text-arcade-neon-cyan pixelated-font drop-shadow-md">{personality.role}</p>
        </div>

        {/* Close Button */}
        <Button
          onClick={handleClose}
          className="mt-auto bg-arcade-neon-pink hover:bg-pink-400 text-arcade-dark-300 border-2 border-arcade-neon-pink pixelated-font font-bold px-8 py-4 text-base"
        >
          STEP AWAY
        </Button>
      </div>

      {/* Speech Bubble - Center */}
      <div className="flex-1 flex items-center justify-center p-8 pointer-events-none">
        <div className={`relative max-w-2xl w-full bg-arcade-dark-200/95 border-4 border-arcade-neon-green rounded-2xl p-8 shadow-[0_0_30px_rgba(0,255,0,0.5)] backdrop-blur-md pointer-events-auto transform transition-all duration-500 ${isAnimatingIn ? 'scale-100 opacity-100' : isAnimatingOut ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}>
          
          {/* Speech Bubble Pointer */}
          <div className="absolute left-0 top-1/3 w-0 h-0 border-r-[30px] border-r-arcade-neon-green border-t-[20px] border-t-transparent border-b-[20px] border-b-transparent transform -translate-x-7"></div>
          
          {/* Messages Area */}
          <div className="mb-8 max-h-80 overflow-y-auto pixel-scrollbar bg-arcade-dark-100/90 rounded-lg p-6 border-2 border-arcade-dark-300 backdrop-blur-sm">
            <div className="space-y-5">
              {messages.map((message) => (
                <div key={message.id} className={`text-base leading-relaxed p-3 rounded-lg ${message.isUser ? 'bg-arcade-dark-300/50 ml-4' : 'bg-arcade-dark-200/30'}`}>
                  {!message.isUser && (
                    <div className="mb-3">
                      <strong className="text-arcade-neon-yellow pixelated-font text-lg drop-shadow-md">{personality.name}:</strong>
                    </div>
                  )}
                  {message.isUser && (
                    <div className="mb-3">
                      <strong className="text-arcade-neon-pink pixelated-font text-lg drop-shadow-md">Player:</strong>
                    </div>
                  )}
                  <div className={`pixelated-font text-base ${message.isUser ? 'text-arcade-neon-pink/90' : 'text-arcade-neon-green'} drop-shadow-sm`}>
                    {message.text}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="text-base p-3 rounded-lg bg-arcade-dark-200/30">
                  <div className="mb-3">
                    <strong className="text-arcade-neon-yellow pixelated-font text-lg drop-shadow-md">{personality.name}:</strong>
                  </div>
                  <div className="flex space-x-2">
                    <div className="w-4 h-4 bg-arcade-neon-green rounded-sm animate-bounce pixelated drop-shadow-md"></div>
                    <div className="w-4 h-4 bg-arcade-neon-green rounded-sm animate-bounce pixelated drop-shadow-md" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-4 h-4 bg-arcade-neon-green rounded-sm animate-bounce pixelated drop-shadow-md" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Input Section */}
          <div className="flex space-x-4">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Insert coin to chat, player..."
              className="flex-1 bg-arcade-dark-100/90 border-2 border-arcade-neon-cyan text-arcade-neon-green placeholder-arcade-neon-cyan/70 pixelated-font text-base backdrop-blur-sm p-4"
              disabled={isTyping}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              className="bg-arcade-neon-cyan hover:bg-arcade-neon-yellow text-arcade-dark-300 border-2 border-arcade-neon-cyan hover:border-arcade-neon-yellow pixelated-font font-bold px-8 py-4 text-base"
            >
              SEND
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIArcadeAdvisor;
