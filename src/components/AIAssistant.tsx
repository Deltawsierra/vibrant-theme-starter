
import React, { useState, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { X, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AIAvatar from './AIAvatar';
import { getThemePersonality, generateAIResponse } from '@/utils/aiAssistantUtils';

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
  const [isAnimatingIn, setIsAnimatingIn] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [showHelpBubble, setShowHelpBubble] = useState(true);
  const personality = getThemePersonality(currentTheme);

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

  // Hide help bubble after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHelpBubble(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleOpen = () => {
    setIsAnimatingIn(true);
    setIsOpen(true);
    setShowHelpBubble(false);
    setTimeout(() => setIsAnimatingIn(false), 500);
  };

  const handleClose = () => {
    setIsAnimatingOut(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsAnimatingOut(false);
    }, 500);
  };

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

  // Special arcade advisor layout
  if (currentTheme === 'retro-arcade') {
    return (
      <>
        {/* Minimized Button - Bottom Right with Speech Bubble */}
        {!isOpen && (
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
        )}

        {/* Full Advisor Panel */}
        {isOpen && (
          <div className={`fixed inset-0 z-50 flex pointer-events-none bg-black/70 backdrop-blur-sm ${isAnimatingIn ? 'animate-fade-in' : ''} ${isAnimatingOut ? 'animate-fade-out' : ''}`}>
            {/* Avatar Panel - Left Side */}
            <div className={`w-80 h-full bg-arcade-dark-300 border-r-4 border-arcade-neon-cyan shadow-[0_0_40px_rgba(0,255,255,0.8)] flex flex-col justify-center items-center p-6 pointer-events-auto transform transition-transform duration-500 ${isAnimatingIn ? 'translate-x-0' : isAnimatingOut ? '-translate-x-full' : 'translate-x-0'}`}>
              
              {/* Character Portrait */}
              <div className="mb-6">
                <AIAvatar 
                  theme={currentTheme} 
                  size="lg" 
                  isTyping={isTyping}
                />
              </div>

              {/* Character Info */}
              <div className="text-center mb-4">
                <h3 className="text-2xl font-bold text-arcade-neon-yellow pixelated-font mb-2">{personality.name}</h3>
                <p className="text-sm text-arcade-neon-cyan pixelated-font">{personality.role}</p>
              </div>

              {/* Close Button */}
              <Button
                onClick={handleClose}
                className="mt-auto bg-arcade-neon-pink hover:bg-pink-400 text-arcade-dark-300 border-2 border-arcade-neon-pink pixelated-font font-bold px-6 py-3"
              >
                STEP AWAY
              </Button>
            </div>

            {/* Speech Bubble - Center */}
            <div className="flex-1 flex items-center justify-center p-8 pointer-events-none">
              <div className={`relative max-w-2xl w-full bg-arcade-dark-200 border-4 border-arcade-neon-green rounded-2xl p-8 shadow-[0_0_30px_rgba(0,255,0,0.5)] pointer-events-auto transform transition-all duration-500 ${isAnimatingIn ? 'scale-100 opacity-100' : isAnimatingOut ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}>
                
                {/* Speech Bubble Pointer */}
                <div className="absolute left-0 top-1/3 w-0 h-0 border-r-[30px] border-r-arcade-neon-green border-t-[20px] border-t-transparent border-b-[20px] border-b-transparent transform -translate-x-7"></div>
                
                {/* Messages Area */}
                <div className="mb-6 max-h-80 overflow-y-auto pixel-scrollbar bg-arcade-dark-100 rounded p-4 border-2 border-arcade-dark-300">
                  <div className="space-y-4">
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
                          <div className="w-3 h-3 bg-arcade-neon-green rounded-sm animate-bounce pixelated"></div>
                          <div className="w-3 h-3 bg-arcade-neon-green rounded-sm animate-bounce pixelated" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-3 h-3 bg-arcade-neon-green rounded-sm animate-bounce pixelated" style={{ animationDelay: '0.2s' }}></div>
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
                    placeholder="Insert coin to chat, player..."
                    className="flex-1 bg-arcade-dark-100 border-2 border-arcade-neon-cyan text-arcade-neon-green placeholder-arcade-neon-cyan/70 pixelated-font"
                    disabled={isTyping}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isTyping}
                    className="bg-arcade-neon-cyan hover:bg-arcade-neon-yellow text-arcade-dark-300 border-2 border-arcade-neon-cyan hover:border-arcade-neon-yellow pixelated-font font-bold px-6"
                  >
                    SEND
                  </Button>
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
      {/* Floating Button - Bottom Right */}
      {!isOpen && (
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
            onClick={() => setIsOpen(true)}
            className="w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center"
            aria-label="Open AI Assistant"
          >
            <AIAvatar theme={currentTheme} size="sm" />
          </button>
        </div>
      )}

      {/* Full Dialog Window */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl h-full max-h-[90vh] rounded-xl bg-background border shadow-lg flex flex-col lg:flex-row overflow-hidden">
            
            {/* Close Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 z-10 w-8 h-8 p-0"
            >
              <X className="w-4 h-4" />
            </Button>

            {/* Avatar Section */}
            <div className="lg:w-1/3 flex items-center justify-center p-6 lg:p-8 bg-card">
              <AIAvatar 
                theme={currentTheme} 
                size="lg" 
                isTyping={isTyping}
              />
            </div>

            {/* Speech Bubble Section */}
            <div className="lg:w-2/3 flex flex-col p-6 lg:p-8 relative bg-background">
              {/* Speech Bubble Pointer */}
              <div className="absolute left-0 top-8 lg:top-1/3 w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[20px] border-t-border transform -translate-x-5"></div>
              
              {/* Speech Bubble */}
              <div className="flex-1 rounded-2xl p-6 border bg-card text-card-foreground shadow-lg flex flex-col">
                {/* Character Name */}
                <div className="mb-4">
                  <h3 className="font-bold text-lg">{personality.name}</h3>
                  <p className="text-sm text-muted-foreground">{personality.role}</p>
                </div>

                {/* Messages */}
                <div className="flex-1 mb-4 max-h-64 lg:max-h-96 overflow-y-auto bg-muted/30 rounded p-4">
                  <div className="space-y-3 pr-2">
                    {messages.map((message) => (
                      <div key={message.id} className="text-sm leading-relaxed">
                        {!message.isUser && (
                          <div className="mb-2">
                            <strong>{personality.name}:</strong>
                          </div>
                        )}
                        {message.isUser && (
                          <div className="mb-2 text-muted-foreground">
                            <strong>You:</strong>
                          </div>
                        )}
                        <div className={`${message.isUser ? 'text-muted-foreground italic' : ''}`}>
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
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Input Section */}
                <div className="flex space-x-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={personality.inputPlaceholder}
                    className="flex-1 bg-background"
                    disabled={isTyping}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isTyping}
                    className="px-4"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIAssistant;
