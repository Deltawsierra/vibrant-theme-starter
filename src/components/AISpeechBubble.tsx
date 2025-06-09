
import React, { useRef, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { type Theme } from '@/context/ThemeContext';
import { type ThemePersonality } from '@/utils/aiAssistantUtils';
import AIInputSection from './AIInputSection';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface AISpeechBubbleProps {
  messages: Message[];
  isTyping: boolean;
  personality: ThemePersonality;
  themeStyles: any;
  currentTheme: Theme;
  inputValue: string;
  setInputValue: (value: string) => void;
  onSendMessage: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
}

const AISpeechBubble: React.FC<AISpeechBubbleProps> = ({
  messages,
  isTyping,
  personality,
  themeStyles,
  currentTheme,
  inputValue,
  setInputValue,
  onSendMessage,
  onKeyPress
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="lg:w-2/3 flex flex-col p-6 lg:p-8 relative">
      {/* Speech Bubble Pointer */}
      <div className={`absolute left-0 top-8 lg:top-1/3 w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[20px] ${themeStyles.bubblePointer} transform -translate-x-5`}></div>
      
      {/* Speech Bubble */}
      <div className={`flex-1 rounded-2xl p-6 ${themeStyles.speechBubble} flex flex-col`}>
        {/* Character Name */}
        <div className="mb-4">
          <h3 className="font-bold text-lg">{personality.name}</h3>
          <p className="text-sm opacity-70">{personality.role}</p>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 mb-4 max-h-64 lg:max-h-96">
          <div className="space-y-3 pr-2">
            {messages.map((message) => (
              <div key={message.id} className="text-sm leading-relaxed">
                {!message.isUser && (
                  <div className="mb-2">
                    <strong>{personality.name}:</strong>
                  </div>
                )}
                {message.isUser && (
                  <div className="mb-2 opacity-70">
                    <strong>You:</strong>
                  </div>
                )}
                <div className={`${message.isUser ? 'opacity-80 italic' : ''}`}>
                  {message.text}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="text-sm">
                <div className="mb-2">
                  <strong>{personality.name}:</strong>
                </div>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            )}
          </div>
          <div ref={messagesEndRef} />
        </ScrollArea>

        {/* Input Section */}
        <AIInputSection
          inputValue={inputValue}
          setInputValue={setInputValue}
          onSendMessage={onSendMessage}
          onKeyPress={onKeyPress}
          personality={personality}
          themeStyles={themeStyles}
          isTyping={isTyping}
        />
      </div>
    </div>
  );
};

export default AISpeechBubble;
