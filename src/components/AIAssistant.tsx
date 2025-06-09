
import React, { useState, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AIAvatar from './AIAvatar';
import AISpeechBubble from './AISpeechBubble';
import AIAvatarDisplay from './AIAvatarDisplay';
import { getThemePersonality, generateAIResponse } from '@/utils/aiAssistantUtils';
import { getAIThemeStyles } from '@/utils/aiThemeStyles';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const AIAssistant: React.FC = () => {
  const { currentTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [avatarClicked, setAvatarClicked] = useState(false);
  const personality = getThemePersonality(currentTheme);
  const themeStyles = getAIThemeStyles(currentTheme);

  // Add welcome message when theme changes or first opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        text: personality.welcomeMessage,
        isUser: false,
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, currentTheme, personality.welcomeMessage, messages.length]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(async () => {
      const aiResponse = await generateAIResponse(inputValue, currentTheme);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleAvatarClick = () => {
    setAvatarClicked(true);
    setTimeout(() => setAvatarClicked(false), 500);
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${themeStyles.button}`}
          aria-label="Open AI Assistant"
        >
          <AIAvatar theme={currentTheme} size="sm" />
        </button>
      )}

      {/* Full Dialog Window */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className={`relative w-full max-w-4xl h-full max-h-[90vh] rounded-xl ${themeStyles.container} flex flex-col lg:flex-row overflow-hidden`}>
            
            {/* Close Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 z-10 w-8 h-8 p-0 text-current hover:bg-white/10"
            >
              <X className="w-4 h-4" />
            </Button>

            {/* Avatar Section */}
            <AIAvatarDisplay
              currentTheme={currentTheme}
              isTyping={isTyping}
              avatarClicked={avatarClicked}
              onAvatarClick={handleAvatarClick}
            />

            {/* Speech Bubble Section */}
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
      )}
    </>
  );
};

export default AIAssistant;
