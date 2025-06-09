
import React from 'react';
import { type Theme } from '@/context/ThemeContext';
import AIAvatar from './AIAvatar';

interface AIAvatarDisplayProps {
  theme?: Theme;
  currentTheme?: Theme;
  isTyping: boolean;
  avatarClicked?: boolean;
  onAvatarClick?: () => void;
  isRecruiter?: boolean;
}

const AIAvatarDisplay: React.FC<AIAvatarDisplayProps> = ({
  theme,
  currentTheme,
  isTyping,
  avatarClicked = false,
  onAvatarClick,
  isRecruiter = false
}) => {
  const themeToUse = theme || currentTheme || 'minimalist';
  
  return (
    <div className="lg:w-1/3 flex items-center justify-center p-6 lg:p-8">
      <div 
        className={`transition-transform duration-300 ${onAvatarClick ? 'cursor-pointer' : ''} ${avatarClicked ? 'scale-110' : 'scale-100'}`}
        onClick={onAvatarClick}
      >
        <AIAvatar 
          theme={themeToUse} 
          size="lg" 
          isTyping={isTyping}
          isRecruiter={isRecruiter}
        />
      </div>
    </div>
  );
};

export default AIAvatarDisplay;
