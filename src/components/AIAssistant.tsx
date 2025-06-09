
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

  // Special layout for retro arcade theme
  if (currentTheme === 'retro-arcade') {
    return (
      <>
        {/* Floating Button */}
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-arcade-dark-300 border-2 border-arcade-neon-cyan rounded-lg shadow-[0_0_20px_rgba(0,255,255,0.5)] transition-all duration-300 hover:scale-110 hover:shadow-[0_0_30px_rgba(0,255,255,0.7)] animate-pulse-slow p-2"
            aria-label="Open AI Assistant"
            style={{ imageRendering: 'pixelated' }}
          >
            <AIAvatar theme={currentTheme} size="md" />
          </button>
        )}

        {/* Full Dialog Window - Retro Game Style */}
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
            {/* Game-style dialog container */}
            <div className="relative w-full max-w-5xl h-full max-h-[85vh] flex flex-col lg:flex-row bg-arcade-dark-300 border-4 border-arcade-neon-cyan rounded-lg shadow-[0_0_40px_rgba(0,255,255,0.8)] overflow-hidden"
                 style={{ imageRendering: 'pixelated' }}>
              
              {/* Close Button - Arcade Style */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 z-10 w-12 h-12 bg-arcade-dark-200 border-2 border-arcade-neon-pink hover:bg-arcade-neon-pink hover:text-arcade-dark-300 text-arcade-neon-pink transition-colors"
              >
                <X className="w-6 h-6" />
              </Button>

              {/* Avatar Section - Large Character Display */}
              <div className="lg:w-2/5 flex items-center justify-center p-8 bg-gradient-to-b from-arcade-dark-200 to-arcade-dark-300 border-r-4 border-arcade-neon-cyan lg:border-r-4 lg:border-b-0 border-b-4">
                <div 
                  className="transition-transform duration-300 cursor-pointer hover:scale-105"
                  onClick={handleAvatarClick}
                >
                  <div className="relative">
                    <AIAvatar 
                      theme={currentTheme} 
                      size="lg" 
                      isTyping={isTyping}
                    />
                    {/* Pixel glow effect */}
                    <div className="absolute inset-0 bg-arcade-neon-cyan/20 rounded-lg animate-pulse-slow pointer-events-none"></div>
                  </div>
                </div>
              </div>

              {/* Speech Bubble Section */}
              <div className="lg:w-3/5 flex flex-col p-6 relative">
                {/* Speech Bubble Pointer */}
                <div className="absolute left-0 top-1/3 w-0 h-0 border-l-[0px] border-r-[30px] border-r-transparent border-t-[20px] border-b-[20px] border-t-transparent border-b-transparent border-l-arcade-neon-green transform -translate-x-7"></div>
                
                {/* Main Speech Bubble */}
                <div className="flex-1 bg-arcade-dark-200 border-4 border-arcade-neon-green rounded-2xl p-6 shadow-[0_0_25px_rgba(0,255,0,0.5)] relative"
                     style={{ imageRendering: 'pixelated' }}>
                  
                  {/* Character Name Header */}
                  <div className="mb-4 pb-3 border-b-2 border-arcade-neon-cyan">
                    <h3 className="font-bold text-xl text-arcade-neon-yellow pixelated-font">{personality.name}</h3>
                    <p className="text-sm text-arcade-neon-cyan pixelated-font">{personality.role}</p>
                  </div>

                  {/* Messages Area */}
                  <div className="flex-1 mb-4 max-h-64 lg:max-h-80 overflow-y-auto pixel-scrollbar">
                    <div className="space-y-4 pr-2">
                      {messages.map((message) => (
                        <div key={message.id} className="text-sm leading-relaxed">
                          {!message.isUser && (
                            <div className="mb-2">
                              <strong className="text-arcade-neon-yellow pixelated-font">{personality.name}:</strong>
                            </div>
                          )}
                          {message.isUser && (
                            <div className="mb-2">
                              <strong className="text-arcade-neon-pink pixelated-font">Player:</strong>
                            </div>
                          )}
                          <div className={`pixelated-font ${message.isUser ? 'text-arcade-neon-pink/90' : 'text-arcade-neon-green'}`}>
                            {message.text}
                          </div>
                        </div>
                      ))}
                      
                      {isTyping && (
                        <div className="text-sm">
                          <div className="mb-2">
                            <strong className="text-arcade-neon-yellow pixelated-font">{personality.name}:</strong>
                          </div>
                          <div className="flex space-x-2">
                            <div className="w-3 h-3 bg-arcade-neon-green rounded-sm animate-bounce"></div>
                            <div className="w-3 h-3 bg-arcade-neon-green rounded-sm animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-3 h-3 bg-arcade-neon-green rounded-sm animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Input Section */}
                  <div className="flex space-x-3 pt-3 border-t-2 border-arcade-neon-cyan">
                    <input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder={personality.inputPlaceholder}
                      className="flex-1 bg-arcade-dark-100 border-2 border-arcade-neon-cyan text-arcade-neon-green placeholder-arcade-neon-cyan/70 rounded-lg px-4 py-3 focus:outline-none focus:border-arcade-neon-yellow transition-colors pixelated-font"
                      disabled={isTyping}
                      style={{ imageRendering: 'pixelated' }}
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim() || isTyping}
                      className="bg-arcade-neon-cyan hover:bg-arcade-neon-yellow text-arcade-dark-300 border-2 border-arcade-neon-cyan hover:border-arcade-neon-yellow px-6 py-3 rounded-lg transition-colors pixelated-font font-bold"
                      style={{ imageRendering: 'pixelated' }}
                    >
                      SEND
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  // Default layout for other themes
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
