
import React from 'react';
import { X, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AIAvatar from './AIAvatar';
import { type Theme } from '@/context/ThemeContext';
import { type ThemePersonality } from '@/utils/aiAssistantUtils';
import { getAIThemeStyles } from '@/utils/aiThemeStyles';

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
  setIsOpen
}) => {
  const themeStyles = getAIThemeStyles(currentTheme);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className={`relative w-full max-w-4xl h-full max-h-[90vh] rounded-xl shadow-2xl flex flex-col lg:flex-row overflow-hidden ${themeStyles.container}`}>
        
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
        <div className={`lg:w-1/3 flex items-center justify-center p-6 lg:p-8 ${themeStyles.container}`}>
          <AIAvatar 
            theme={currentTheme} 
            size="lg" 
            isTyping={isTyping}
          />
        </div>

        {/* Speech Bubble Section */}
        <div className="lg:w-2/3 flex flex-col p-6 lg:p-8 relative">
          {/* Speech Bubble Pointer */}
          <div className={`absolute left-0 top-8 lg:top-1/3 w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[20px] ${themeStyles.bubblePointer} transform -translate-x-5`}></div>
          
          {/* Speech Bubble */}
          <div className={`flex-1 rounded-2xl p-8 ${themeStyles.speechBubble} flex flex-col`}>
            {/* Character Name */}
            <div className="mb-6">
              <h3 className={themeStyles.characterName}>{personality.name}</h3>
              <p className={themeStyles.characterRole}>{personality.role}</p>
            </div>

            {/* Messages */}
            <div className="flex-1 mb-6 max-h-64 lg:max-h-96 overflow-y-auto bg-black/5 rounded-lg p-4">
              <div className="space-y-4 pr-2">
                {messages.map((message) => (
                  <div key={message.id} className={`${themeStyles.messageText} p-3 rounded-lg ${message.isUser ? 'bg-black/10 ml-4' : 'bg-white/5'}`}>
                    {!message.isUser && (
                      <div className="mb-2">
                        <strong className={themeStyles.characterName.replace('text-xl', 'text-sm')}>{personality.name}:</strong>
                      </div>
                    )}
                    {message.isUser && (
                      <div className="mb-2">
                        <strong className={`${themeStyles.characterRole} opacity-80`}>You:</strong>
                      </div>
                    )}
                    <div className={`${message.isUser ? 'opacity-90 italic' : ''}`}>
                      {message.text}
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className={`${themeStyles.messageText} p-3 rounded-lg bg-white/5`}>
                    <div className="mb-2">
                      <strong className={themeStyles.characterName.replace('text-xl', 'text-sm')}>{personality.name}:</strong>
                    </div>
                    <div className="flex space-x-1">
                      <div className="w-3 h-3 bg-current rounded-full animate-bounce"></div>
                      <div className="w-3 h-3 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-3 h-3 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Input Section */}
            <div className="flex space-x-3">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={personality.inputPlaceholder}
                className={`flex-1 ${themeStyles.input}`}
                disabled={isTyping}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                className={`px-6 ${themeStyles.button}`}
              >
                <MessageCircle className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIFullDialog;
