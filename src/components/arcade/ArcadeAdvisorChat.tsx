
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { type ThemePersonality } from '@/utils/aiAssistantUtils';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ArcadeAdvisorChatProps {
  messages: Message[];
  isTyping: boolean;
  personality: ThemePersonality;
}

const ArcadeAdvisorChat: React.FC<ArcadeAdvisorChatProps> = ({
  messages,
  isTyping,
  personality
}) => {
  return (
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
  );
};

export default ArcadeAdvisorChat;
