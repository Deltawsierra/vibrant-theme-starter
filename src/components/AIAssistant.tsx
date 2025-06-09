
import React, { useState, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import AIFloatingButton from './AIFloatingButton';
import AIArcadeAdvisor from './AIArcadeAdvisor';
import AIFullDialog from './AIFullDialog';
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

  const handleOpen = () => {
    setIsAnimatingIn(true);
    setIsOpen(true);
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

  return (
    <>
      {/* Floating Button - Bottom Right */}
      {!isOpen && (
        <AIFloatingButton
          currentTheme={currentTheme}
          showHelpBubble={true}
          onOpen={handleOpen}
        />
      )}

      {/* Full Dialog/Advisor Window */}
      {isOpen && (
        currentTheme === 'retro-arcade' ? (
          <AIArcadeAdvisor
            isAnimatingIn={isAnimatingIn}
            isAnimatingOut={isAnimatingOut}
            messages={messages}
            isTyping={isTyping}
            personality={personality}
            inputValue={inputValue}
            setInputValue={setInputValue}
            handleSendMessage={handleSendMessage}
            handleKeyPress={handleKeyPress}
            handleClose={handleClose}
          />
        ) : (
          <AIFullDialog
            currentTheme={currentTheme}
            messages={messages}
            isTyping={isTyping}
            personality={personality}
            inputValue={inputValue}
            setInputValue={setInputValue}
            handleSendMessage={handleSendMessage}
            handleKeyPress={handleKeyPress}
            setIsOpen={setIsOpen}
          />
        )
      )}
    </>
  );
};

export default AIAssistant;
