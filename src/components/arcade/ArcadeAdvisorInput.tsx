
import React from 'react';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { type ThemePersonality } from '@/utils/aiAssistantUtils';

interface ArcadeAdvisorInputProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  handleSendMessage: () => void;
  handleKeyPress: (e: React.KeyboardEvent) => void;
  personality: ThemePersonality;
  isTyping: boolean;
}

const ArcadeAdvisorInput: React.FC<ArcadeAdvisorInputProps> = ({
  inputValue,
  setInputValue,
  handleSendMessage,
  handleKeyPress,
  personality,
  isTyping
}) => {
  return (
    <div className="border-2 border-arcade-neon-cyan bg-arcade-dark-300/80 p-2 flex">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder={personality.inputPlaceholder}
        className="flex-1 bg-transparent border-0 text-arcade-neon-cyan font-pixel focus:ring-0 focus:outline-none"
        disabled={isTyping}
      />
      <Button
        onClick={handleSendMessage}
        disabled={!inputValue.trim() || isTyping}
        className="bg-arcade-neon-cyan hover:bg-arcade-neon-yellow text-black font-pixel border-2 border-black"
      >
        <MessageCircle className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default ArcadeAdvisorInput;
