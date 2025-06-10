
import React, { useState, useEffect, useContext, useMemo, useCallback } from 'react';
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

const AIAssistant: React.FC<AIAssistantProps> = ({ onClose }) => {
  const { currentTheme } = useTheme();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId] = useState<string>(() => Date.now().toString());
  const { isRecruiter } = useContext(AIRecruiterContext);
  const { toast } = useToast();
  
  // Memoize personality to prevent recalculation
  const personality = useMemo(() => getThemePersonality(currentTheme), [currentTheme]);
  
  // Safely check for arcade context only when needed
  const arcadeContext = useMemo(() => {
    if (currentTheme !== 'retro-arcade') return null;
    
    try {
      const { useArcade } = require('@/themes/retro-arcade/context/ArcadeContext');
      return useArcade();
    } catch (error) {
      console.warn('Arcade context not available:', error);
      return null;
    }
  }, [currentTheme]);

  // Memoize welcome message generation
  const welcomeMessage = useMemo(() => {
    let welcomeText = personality.welcomeMessage;
    
    if (isRecruiter) {
      const themeRecruiterMessages = recruiterMessages[currentTheme]?.welcome || 
                                    recruiterMessages.minimalist.welcome;
      welcomeText = themeRecruiterMessages[Math.floor(Math.random() * themeRecruiterMessages.length)];
    }
    
    return {
      id: 'welcome',
      text: welcomeText,
      isUser: false,
      timestamp: new Date()
    };
  }, [currentTheme, personality.welcomeMessage, isRecruiter]);

  // Initialize welcome message only once
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([welcomeMessage]);
    }
  }, [welcomeMessage, messages.length]);

  const handleClose = useCallback(() => {
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
  }, [messages, sessionId, isRecruiter, onClose]);

  const handleSendMessage = useCallback(async () => {
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
  }, [inputValue, currentTheme]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  }, [handleSendMessage]);

  // Only use arcade advisor if we're in retro-arcade theme AND arcade context is available
  const shouldUseArcadeAdvisor = currentTheme === 'retro-arcade' && arcadeContext !== null;

  return shouldUseArcadeAdvisor ? (
    <AIArcadeAdvisor
      isAnimatingIn={false}
      isAnimatingOut={false}
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

export default React.memo(AIAssistant);
