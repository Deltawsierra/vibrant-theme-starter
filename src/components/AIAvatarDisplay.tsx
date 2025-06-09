
import React from 'react';
import { type Theme } from '@/context/ThemeContext';
import AIAvatar from './AIAvatar';

interface AIAvatarDisplayProps {
  currentTheme: Theme;
  isTyping: boolean;
  avatarClicked: boolean;
  onAvatarClick: () => void;
}

const AIAvatarDisplay: React.FC<AIAvatarDisplayProps> = ({
  currentTheme,
  isTyping,
  avatarClicked,
  onAvatarClick
}) => {
  return (
    <div className="lg:w-1/3 flex items-center justify-center p-6 lg:p-8">
      <div 
        className={`transition-transform duration-300 cursor-pointer ${avatarClicked ? 'scale-110' : 'scale-100'}`}
        onClick={onAvatarClick}
      >
        <AIAvatar 
          theme={currentTheme} 
          size="lg" 
          isTyping={isTyping}
        />
      </div>
    </div>
  );
};

export default AIAvatarDisplay;
