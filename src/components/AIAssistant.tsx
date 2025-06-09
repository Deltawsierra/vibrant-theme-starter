
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
  const [avatarClicked, setAvatarClicked] = useState(false);
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

  const handleAvatarClick = () => {
    setAvatarClicked(true);
    setTimeout(() => setAvatarClicked(false), 500);
  };

  const getThemeStyles = () => {
    const styles = {
      minimalist: {
        container: 'bg-white border-gray-300 text-gray-900 shadow-xl',
        speechBubble: 'bg-white border-2 border-gray-300 text-gray-900',
        bubblePointer: 'border-t-gray-300',
        button: 'bg-gray-800 hover:bg-gray-700 text-white',
        input: 'border-gray-300 focus:border-gray-500 bg-white',
        avatar: 'bg-gradient-to-br from-gray-100 to-gray-200'
      },
      'retro-arcade': {
        container: 'bg-arcade-dark-300 border-2 border-arcade-neon-cyan shadow-[0_0_20px_rgba(0,255,255,0.5)]',
        speechBubble: 'bg-arcade-dark-200 border-2 border-arcade-neon-green text-arcade-neon-green shadow-[0_0_10px_rgba(0,255,0,0.3)]',
        bubblePointer: 'border-t-arcade-neon-green',
        button: 'bg-arcade-neon-cyan hover:bg-arcade-neon-yellow text-arcade-dark-300',
        input: 'bg-arcade-dark-100 border-arcade-neon-cyan text-arcade-neon-green placeholder-arcade-neon-cyan/50',
        avatar: 'bg-gradient-to-br from-amber-200 to-amber-300'
      },
      storytelling: {
        container: 'bg-story-parchment border-2 border-story-warm-400 shadow-xl',
        speechBubble: 'bg-story-parchment border-2 border-story-warm-300 text-story-ink shadow-lg',
        bubblePointer: 'border-t-story-warm-300',
        button: 'bg-story-warm-600 hover:bg-story-warm-700 text-white',
        input: 'border-story-warm-300 focus:border-story-warm-500 bg-story-warm-50',
        avatar: 'bg-gradient-to-br from-blue-300 to-blue-500'
      },
      '3d-interactive': {
        container: 'bg-threed-slate-900/95 border-2 border-threed-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.5)] backdrop-blur-sm',
        speechBubble: 'bg-threed-slate-800/90 border-2 border-threed-blue-400 text-white shadow-[0_0_15px_rgba(59,130,246,0.3)] backdrop-blur-sm',
        bubblePointer: 'border-t-threed-blue-400',
        button: 'bg-threed-blue-600 hover:bg-threed-blue-700 text-white',
        input: 'bg-threed-slate-700 border-threed-blue-500 text-white placeholder-white/50',
        avatar: 'bg-gradient-to-br from-blue-400 via-purple-500 to-cyan-400'
      },
      ecommerce: {
        container: 'bg-white border-2 border-ecommerce-primary-300 shadow-xl',
        speechBubble: 'bg-white border-2 border-ecommerce-primary-200 text-gray-900 shadow-lg',
        bubblePointer: 'border-t-ecommerce-primary-200',
        button: 'bg-ecommerce-primary-600 hover:bg-ecommerce-primary-700 text-white',
        input: 'border-ecommerce-primary-300 focus:border-ecommerce-primary-500 bg-white',
        avatar: 'bg-gradient-to-br from-amber-200 to-amber-300'
      },
      videography: {
        container: 'bg-black/95 border-2 border-video-gold-500 shadow-[0_0_25px_rgba(251,191,36,0.4)] backdrop-blur-sm',
        speechBubble: 'bg-gray-900/90 border-2 border-video-gold-400 text-white shadow-[0_0_15px_rgba(251,191,36,0.2)] backdrop-blur-sm',
        bubblePointer: 'border-t-video-gold-400',
        button: 'bg-video-gold-500 hover:bg-video-gold-600 text-black',
        input: 'bg-gray-800 border-video-gold-500 text-white placeholder-white/50',
        avatar: 'bg-gradient-to-br from-amber-200 to-amber-300'
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
            <div className="lg:w-1/3 flex items-center justify-center p-6 lg:p-8">
              <div 
                className={`transition-transform duration-300 cursor-pointer ${avatarClicked ? 'scale-110' : 'scale-100'}`}
                onClick={handleAvatarClick}
              >
                <AIAvatar 
                  theme={currentTheme} 
                  size="lg" 
                  isTyping={isTyping}
                />
              </div>
            </div>

            {/* Speech Bubble Section */}
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

                {/* Input */}
                <div className="flex space-x-2">
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
                    className={`${themeStyles.button} px-4`}
                  >
                    <Send className="w-4 h-4" />
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
