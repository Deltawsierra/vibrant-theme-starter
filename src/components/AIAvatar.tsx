import React from 'react';
import { type Theme } from '@/context/ThemeContext';

interface AIAvatarProps {
  theme: Theme;
  isTyping?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const AIAvatar: React.FC<AIAvatarProps> = ({ theme, isTyping = false, size = 'sm' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const getAvatarElement = () => {
    switch (theme) {
      case 'minimalist':
        return (
          <div className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-gray-200 to-gray-400 border-2 border-gray-300 flex items-center justify-center relative overflow-hidden`}>
            {/* Minimalist robot face */}
            <div className="w-full h-full relative">
              {/* Face */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                {/* Eyes */}
                <div className="flex space-x-1 mb-1">
                  <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                  <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                </div>
                {/* Mouth */}
                <div className="w-2 h-0.5 bg-gray-600 rounded-full"></div>
              </div>
              {/* Antenna */}
              <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-0.5 h-1 bg-gray-500"></div>
              <div className="absolute top-0.5 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-gray-500 rounded-full"></div>
            </div>
          </div>
        );

      case 'retro-arcade':
        return (
          <div className={`${sizeClasses[size]} relative`}>
            {/* Pixel art style female arcade owner */}
            <div className="w-full h-full bg-gradient-to-br from-amber-200 to-amber-300 rounded border-2 border-arcade-neon-cyan relative overflow-hidden">
              {/* Hair */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-800 to-amber-700"></div>
              {/* Face */}
              <div className="absolute top-1 left-1 right-1 bottom-2 bg-gradient-to-br from-amber-100 to-amber-200">
                {/* Glasses */}
                <div className="absolute top-1 left-1 right-1 h-2 flex items-center justify-center">
                  <div className="w-4 h-1 border border-gray-800 rounded bg-transparent flex">
                    <div className="w-1.5 h-1 bg-gray-800 rounded-full mx-0.5"></div>
                    <div className="w-1.5 h-1 bg-gray-800 rounded-full mx-0.5"></div>
                  </div>
                </div>
                {/* Smile */}
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-0.5 bg-pink-400 rounded-full"></div>
              </div>
              {/* Flannel pattern suggestion */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-700 to-blue-700"></div>
            </div>
            {isTyping && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-arcade-neon-yellow rounded-full animate-ping"></div>
            )}
          </div>
        );

      case 'storytelling':
        return (
          <div className={`${sizeClasses[size]} relative`}>
            {/* Medieval knight */}
            <div className="w-full h-full bg-gradient-to-br from-blue-300 to-blue-500 rounded-full border-2 border-yellow-400 relative overflow-hidden">
              {/* Helmet */}
              <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-b from-silver-300 to-silver-400 rounded-t-full"></div>
              {/* Face opening */}
              <div className="absolute top-2 left-1 right-1 h-3 bg-gradient-to-br from-amber-100 to-amber-200 rounded">
                {/* Eyes */}
                <div className="absolute top-1 left-1 right-1 flex justify-center space-x-1">
                  <div className="w-1 h-1 bg-blue-800 rounded-full"></div>
                  <div className="w-1 h-1 bg-blue-800 rounded-full"></div>
                </div>
              </div>
              {/* Cape */}
              <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-red-600 to-red-700 rounded-b-full"></div>
              {/* Crown/decoration */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-yellow-400 rounded-full"></div>
            </div>
            {isTyping && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
            )}
          </div>
        );

      case '3d-interactive':
        return (
          <div className={`${sizeClasses[size]} relative`}>
            {/* AI orb */}
            <div className="w-full h-full bg-gradient-to-br from-blue-400 via-purple-500 to-cyan-400 rounded-full relative overflow-hidden shadow-lg">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-full"></div>
              {/* Core */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full opacity-80"></div>
              {/* Wireframe lines */}
              <div className="absolute inset-0 border border-white/30 rounded-full"></div>
              <div className="absolute top-1 bottom-1 left-1/2 transform -translate-x-1/2 w-0 border-l border-white/20"></div>
              <div className="absolute left-1 right-1 top-1/2 transform -translate-y-1/2 h-0 border-t border-white/20"></div>
              
              {isTyping && (
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-300 to-blue-300 rounded-full animate-pulse opacity-50"></div>
              )}
            </div>
            {/* Floating particles */}
            <div className="absolute -top-1 -left-1 w-1 h-1 bg-cyan-400 rounded-full animate-bounce"></div>
            <div className="absolute -top-1 -right-1 w-1 h-1 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
          </div>
        );

      case 'ecommerce':
        return (
          <div className={`${sizeClasses[size]} relative`}>
            {/* Modern shopkeeper */}
            <div className="w-full h-full bg-gradient-to-br from-amber-200 to-amber-300 rounded-full border-2 border-blue-400 relative overflow-hidden">
              {/* Hair */}
              <div className="absolute top-0 left-1 right-1 h-2 bg-gradient-to-r from-brown-600 to-brown-700 rounded-t-full"></div>
              {/* Face */}
              <div className="absolute top-1.5 left-1 right-1 bottom-2 bg-gradient-to-br from-amber-100 to-amber-200">
                {/* Glasses */}
                <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-3 h-1 border border-gray-800 rounded bg-transparent"></div>
                {/* Eyes behind glasses */}
                <div className="absolute top-1 left-1/2 transform -translate-x-1/2 flex space-x-1">
                  <div className="w-0.5 h-0.5 bg-gray-800 rounded-full"></div>
                  <div className="w-0.5 h-0.5 bg-gray-800 rounded-full"></div>
                </div>
                {/* Smile */}
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-0.5 bg-pink-400 rounded-full"></div>
              </div>
              {/* Shirt/apron */}
              <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-600 to-blue-700 rounded-b-full"></div>
              {/* Tablet/device indicator */}
              <div className="absolute bottom-0 right-1 w-1 h-1.5 bg-gray-800 rounded-sm"></div>
            </div>
            {isTyping && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
            )}
          </div>
        );

      case 'videography':
        return (
          <div className={`${sizeClasses[size]} relative`}>
            {/* Film director */}
            <div className="w-full h-full bg-gradient-to-br from-amber-200 to-amber-300 rounded-full border-2 border-yellow-500 relative overflow-hidden">
              {/* Beret */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-br from-gray-800 to-gray-900 rounded-t-full"></div>
              {/* Face */}
              <div className="absolute top-1 left-1 right-1 bottom-2 bg-gradient-to-br from-amber-100 to-amber-200">
                {/* Sunglasses */}
                <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-3 h-1 bg-gray-900 rounded"></div>
                {/* Smile */}
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-0.5 bg-pink-400 rounded-full"></div>
              </div>
              {/* Suit/shirt */}
              <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-gray-700 to-gray-800 rounded-b-full"></div>
              {/* Megaphone indicator */}
              <div className="absolute bottom-1 left-0 w-1 h-1 bg-yellow-500 rounded-full"></div>
            </div>
            {isTyping && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            )}
            {/* Film camera */}
            <div className="absolute -top-1 -left-1 w-2 h-1 bg-gray-800 rounded-sm"></div>
          </div>
        );

      default:
        return (
          <div className={`${sizeClasses[size]} rounded-full bg-gray-300 flex items-center justify-center`}>
            <MessageCircle className="w-4 h-4 text-gray-600" />
          </div>
        );
    }
  };

  return getAvatarElement();
};

export default AIAvatar;
