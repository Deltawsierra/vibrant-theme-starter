
import React, { useMemo } from 'react';
import { useArcade } from '@/themes/retro-arcade/context/ArcadeContext';
import { X, MessageCircle } from 'lucide-react';
import AIAvatarDisplay from './AIAvatarDisplay';
import { type ThemePersonality } from '@/utils/aiAssistantUtils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import AIResumeTools from './AIResumeTools';

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
  const { settings } = useArcade();

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
          <div className="absolute top-0 right-0 left-0 h-8 bg-arcade-dark-300 border-b-4 border-arcade-neon-green flex items-center justify-between px-2">
            <div className="flex space-x-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-3 h-3 bg-arcade-neon-green"></div>
              ))}
            </div>
            <div className="font-pixel text-xs text-arcade-neon-green animate-pulse">
              ARCADE AI V1.0
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="w-6 h-6 p-0 text-arcade-neon-green hover:text-arcade-neon-yellow hover:bg-transparent"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="pt-8 pb-4 px-4 h-full flex flex-col lg:flex-row">
            {/* Avatar Section */}
            <div className="lg:w-1/3 flex flex-col items-center justify-start p-2 lg:p-4">
              <div className="mb-4 w-full text-center font-pixel">
                <h2 className="text-xl font-bold text-arcade-neon-yellow animate-neon-pulse">
                  {personality.name}
                </h2>
                <p className="text-sm text-arcade-neon-cyan">
                  {personality.role}
                </p>
              </div>
              
              <div className="bg-arcade-dark-300/60 border-4 border-arcade-neon-yellow p-2 w-full max-w-[240px] h-[240px] flex items-center justify-center">
                <AIAvatarDisplay 
                  isTyping={isTyping} 
                  theme="retro-arcade"
                  isRecruiter={isRecruiter}
                />
              </div>

              {/* Recruiter Tools - Only show if isRecruiter is true */}
              {isRecruiter && (
                <div className="mt-6 w-full">
                  <AIResumeTools theme="retro-arcade" />
                </div>
              )}

              <div className="mt-4 w-full bg-arcade-dark-300/60 border-2 border-arcade-neon-green p-3">
                <div className="text-xs font-pixel text-arcade-neon-green mb-2">SYSTEM STATUS:</div>
                <div className="text-xs space-y-1">
                  <div className="flex justify-between">
                    <span>MEMORY:</span>
                    <span className="text-arcade-neon-yellow">87%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>POWER:</span>
                    <span className="text-arcade-neon-yellow">OPTIMAL</span>
                  </div>
                  <div className="flex justify-between">
                    <span>MODE:</span>
                    <span className={isRecruiter ? "text-arcade-neon-red" : "text-arcade-neon-yellow"}>
                      {isRecruiter ? "RECRUITER" : "STANDARD"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Section */}
            <div className="lg:w-2/3 flex flex-col mt-4 lg:mt-0">
              {/* Messages Area */}
              <ScrollArea className="flex-1 mb-4 h-[300px] lg:h-[500px] bg-arcade-dark-100/40 border-2 border-arcade-neon-cyan p-2">
                <div className="space-y-4 p-2">
                  {messages.map((message) => (
                    <div 
                      key={message.id} 
                      className={`p-3 font-pixel ${message.isUser ? 
                        'bg-arcade-dark-300/70 border-2 border-arcade-neon-yellow text-arcade-neon-yellow ml-8' : 
                        'bg-arcade-dark-300/40 border-2 border-arcade-neon-green text-arcade-neon-green mr-4'}`}
                    >
                      <div className="mb-1 text-xs">
                        {message.isUser ? (
                          <span className="text-arcade-neon-yellow">PLAYER:</span>
                        ) : (
                          <span className="text-arcade-neon-cyan">{personality.name}:</span>
                        )}
                      </div>
                      <div className={message.isUser ? 'text-arcade-neon-yellow' : 'text-arcade-neon-green'}>
                        {message.text}
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="p-3 font-pixel bg-arcade-dark-300/40 border-2 border-arcade-neon-green text-arcade-neon-green mr-4">
                      <div className="mb-1 text-xs text-arcade-neon-cyan">
                        {personality.name}:
                      </div>
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-arcade-neon-green animate-pulse-fast"></div>
                        <div className="w-2 h-2 bg-arcade-neon-green animate-pulse-fast" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-arcade-neon-green animate-pulse-fast" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
              
              {/* Input Area */}
              <div className="border-2 border-arcade-neon-cyan bg-arcade-dark-300/80 p-2 flex">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={personality.inputPlaceholder}
                  className="flex-1 bg-transparent border-0 text-arcade-neon-cyan font-pixel focus:ring-0 focus:outline-none"
                  disabled={isTyping}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="bg-arcade-neon-cyan hover:bg-arcade-neon-yellow text-black font-pixel border-2 border-black"
                >
                  <MessageCircle className="w-4 h-4" />
                </Button>
              </div>

              {/* Bottom console decoration */}
              <div className="mt-4 flex justify-between">
                <div className="flex space-x-3">
                  {["A", "B", "C", "D"].map(btn => (
                    <div key={btn} className="w-8 h-8 rounded-full bg-arcade-dark-300 border-2 border-arcade-neon-magenta flex items-center justify-center text-arcade-neon-magenta font-pixel">
                      {btn}
                    </div>
                  ))}
                </div>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className={`w-3 h-6 ${settings.enableGlow ? 'animate-neon-blink' : ''} bg-arcade-neon-cyan`}></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIArcadeAdvisor;
