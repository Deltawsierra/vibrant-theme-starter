
import React from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { type ThemePersonality } from '@/utils/aiAssistantUtils';

interface AIInputSectionProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  onSendMessage: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  personality: ThemePersonality;
  themeStyles: any;
  isTyping: boolean;
}

const AIInputSection: React.FC<AIInputSectionProps> = ({
  inputValue,
  setInputValue,
  onSendMessage,
  onKeyPress,
  personality,
  themeStyles,
  isTyping
}) => {
  return (
    <div className="flex space-x-2">
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={onKeyPress}
        placeholder={personality.inputPlaceholder}
        className={`flex-1 ${themeStyles.input}`}
        disabled={isTyping}
      />
      <Button
        onClick={onSendMessage}
        disabled={!inputValue.trim() || isTyping}
        className={`${themeStyles.button} px-4`}
      >
        <Send className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default AIInputSection;
