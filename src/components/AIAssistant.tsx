
import React, { useState, useEffect, useContext } from 'react';
import { useTheme } from '@/context/ThemeContext';
import AIArcadeAdvisor from './AIArcadeAdvisor';
import AIFullDialog from './AIFullDialog';
import { getThemePersonality, generateAIResponse } from '@/utils/aiAssistantUtils';
import { logAIConversation } from '@/utils/ai/recruiters';
import { AIRecruiterContext } from './AIRecruiterDetector';
import { recruiterMessages } from '@/utils/ai/personalities/recruiter-messages';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface AIAssistantProps {
  onClose: () => void;
}

// Check if arcade context is available
const useArcadeContextSafely = () => {
  try {
    // Try to import and use the arcade context
    const { useArcade } = require('@/themes/retro-arcade/context/ArcadeContext');
    return useArcade();
  } catch (error) {
    // If arcade context is not available, return null
    return null;
  }
};

const AIAssistant: React.FC<AIAssistantProps> = ({ onClose }) => {
  const { currentTheme } = useTheme();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isAnimatingIn, setIsAnimatingIn] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [sessionId, setSessionId] = useState<string>('');
  const { isRecruiter } = useContext(AIRecruiterContext);
  const { toast } = useToast();
  
  const personality = getThemePersonality(currentTheme);
  const arcadeContext = useArcadeContextSafely();

  // Generate a session ID when the component mounts
  useEffect(() => {
    setSessionId(Date.now().toString());
  }, []);

  // Add welcome message when component mounts
  useEffect(() => {
    if (messages.length === 0) {
      let welcomeText = personality.welcomeMessage;
      
      // If recruiter is detected, use a specialized welcome message
      if (isRecruiter) {
        const themeRecruiterMessages = recruiterMessages[currentTheme]?.welcome || 
                                      recruiterMessages.minimalist.welcome;
        welcomeText = themeRecruiterMessages[Math.floor(Math.random() * themeRecruiterMessages.length)];
      }
      
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        text: welcomeText,
        isUser: false,
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [currentTheme, personality.welcomeMessage, messages.length, isRecruiter]);

  const handleClose = () => {
    setIsAnimatingOut(true);
    setTimeout(() => {
      // Log the conversation when closing
      if (messages.length > 1) {
        const transcript = messages
          .map(msg => `${msg.isUser ? 'User' : 'AI'}: ${msg.text}`)
          .join('\n');
        
        logAIConversation(
          sessionId, 
          transcript, 
          isRecruiter ? 'recruiter' : 'general'
        ).then(result => {
          if (result) {
            console.log('Conversation logged:', result);
          }
        });
      }
      
      onClose();
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

  // Show the appropriate dialog based on theme and context availability
  // Only use arcade advisor if we're in retro-arcade theme AND arcade context is available
  const shouldUseArcadeAdvisor = currentTheme === 'retro-arcade' && arcadeContext !== null;

  return shouldUseArcadeAdvisor ? (
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
      isRecruiter={isRecruiter}
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
      setIsOpen={handleClose}
      isRecruiter={isRecruiter}
    />
  );
};

export default AIAssistant;
