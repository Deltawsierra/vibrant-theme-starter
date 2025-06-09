
import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const personality = getThemePersonality(currentTheme);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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

  const getThemeStyles = () => {
    const styles = {
      minimalist: {
        container: 'bg-white border-gray-300 text-gray-900',
        button: 'bg-gray-800 hover:bg-gray-700 text-white',
        userBubble: 'bg-gray-100 text-gray-900 border-gray-200',
        aiBubble: 'bg-gray-50 text-gray-800 border-gray-100',
        input: 'border-gray-300 focus:border-gray-500'
      },
      'retro-arcade': {
        container: 'bg-arcade-dark-300 border-arcade-neon-cyan text-arcade-neon-green',
        button: 'bg-arcade-neon-cyan hover:bg-arcade-neon-yellow text-arcade-dark-300',
        userBubble: 'bg-arcade-neon-cyan/20 text-arcade-neon-cyan border-arcade-neon-cyan',
        aiBubble: 'bg-arcade-neon-green/20 text-arcade-neon-green border-arcade-neon-green',
        input: 'bg-arcade-dark-200 border-arcade-neon-cyan text-arcade-neon-green'
      },
      storytelling: {
        container: 'bg-story-parchment border-story-warm-400 text-story-ink',
        button: 'bg-story-warm-600 hover:bg-story-warm-700 text-white',
        userBubble: 'bg-story-warm-100 text-story-ink border-story-warm-300',
        aiBubble: 'bg-story-warm-50 text-story-ink border-story-warm-200',
        input: 'border-story-warm-300 focus:border-story-warm-500'
      },
      '3d-interactive': {
        container: 'bg-threed-slate-900/95 border-threed-blue-500 text-white backdrop-blur-sm',
        button: 'bg-threed-blue-600 hover:bg-threed-blue-700 text-white',
        userBubble: 'bg-threed-blue-600/20 text-threed-blue-300 border-threed-blue-500',
        aiBubble: 'bg-threed-slate-800/80 text-white border-threed-slate-600',
        input: 'bg-threed-slate-800 border-threed-blue-500 text-white'
      },
      ecommerce: {
        container: 'bg-white border-ecommerce-primary-300 text-gray-900',
        button: 'bg-ecommerce-primary-600 hover:bg-ecommerce-primary-700 text-white',
        userBubble: 'bg-ecommerce-primary-50 text-ecommerce-primary-800 border-ecommerce-primary-200',
        aiBubble: 'bg-gray-50 text-gray-800 border-gray-200',
        input: 'border-ecommerce-primary-300 focus:border-ecommerce-primary-500'
      },
      videography: {
        container: 'bg-black/95 border-video-gold-500 text-white backdrop-blur-sm',
        button: 'bg-video-gold-500 hover:bg-video-gold-600 text-black',
        userBubble: 'bg-video-gold-500/20 text-video-gold-300 border-video-gold-400',
        aiBubble: 'bg-gray-900/80 text-white border-gray-700',
        input: 'bg-gray-900 border-video-gold-500 text-white'
      }
    };

    return styles[currentTheme] || styles.minimalist;
  };

  const themeStyles = getThemeStyles();

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${themeStyles.button}`}
          aria-label="Open AI Assistant"
        >
          <MessageCircle className="w-6 h-6 mx-auto" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className={`fixed bottom-6 right-6 z-50 w-80 h-96 rounded-lg shadow-2xl border-2 ${themeStyles.container} flex flex-col`}>
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center space-x-3">
              <AIAvatar theme={currentTheme} isTyping={isTyping} />
              <div>
                <h3 className="font-semibold text-sm">{personality.name}</h3>
                <p className="text-xs opacity-70">{personality.role}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 text-sm border ${
                      message.isUser ? themeStyles.userBubble : themeStyles.aiBubble
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className={`rounded-lg p-3 text-sm border ${themeStyles.aiBubble}`}>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div ref={messagesEndRef} />
          </ScrollArea>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={personality.inputPlaceholder}
                className={`flex-1 text-sm ${themeStyles.input}`}
                disabled={isTyping}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                className={`${themeStyles.button} px-3`}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIAssistant;
