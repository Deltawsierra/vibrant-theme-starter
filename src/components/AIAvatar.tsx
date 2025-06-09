import React from 'react';
import { MessageCircle } from 'lucide-react';
import { type Theme } from '@/context/ThemeContext';

interface AIAvatarProps {
  theme: Theme;
  isTyping?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const AIAvatar: React.FC<AIAvatarProps> = ({ theme, isTyping = false, size = 'sm' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-16 h-16',
    lg: 'w-48 h-56' // Much larger for the advisor layout
  };

  const getAvatarElement = () => {
    const isLarge = size === 'lg';
    
    switch (theme) {
      case 'minimalist':
        return (
          <div className={`${sizeClasses[size]} rounded-lg bg-gradient-to-br from-gray-200 to-gray-400 border-2 border-gray-300 flex items-center justify-center relative overflow-hidden ${isLarge ? 'shadow-lg animate-pulse-gentle' : ''}`}>
            {/* Minimalist robot face */}
            <div className="w-full h-full relative animate-subtle-breathing">
              {/* Face */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                {/* Eyes with blinking animation */}
                <div className={`flex ${isLarge ? 'space-x-2 mb-2' : 'space-x-1 mb-1'}`}>
                  <div className={`${isLarge ? 'w-2 h-2' : 'w-1 h-1'} bg-gray-600 rounded-full animate-blink`}></div>
                  <div className={`${isLarge ? 'w-2 h-2' : 'w-1 h-1'} bg-gray-600 rounded-full animate-blink`} style={{ animationDelay: '0.1s' }}></div>
                </div>
                {/* Mouth with talking animation */}
                <div className={`${isLarge ? 'w-4 h-1' : 'w-2 h-0.5'} bg-gray-600 rounded-full transition-all duration-200 ${isTyping ? 'animate-mouth-talk' : ''}`}></div>
              </div>
              {/* Antenna with gentle sway */}
              <div className={`absolute ${isLarge ? 'top-2' : 'top-1'} left-1/2 transform -translate-x-1/2 ${isLarge ? 'w-1 h-2' : 'w-0.5 h-1'} bg-gray-500 animate-antenna-sway`}></div>
              <div className={`absolute ${isLarge ? 'top-1' : 'top-0.5'} left-1/2 transform -translate-x-1/2 ${isLarge ? 'w-2 h-2' : 'w-1 h-1'} bg-gray-500 rounded-full animate-antenna-glow`}></div>
            </div>
          </div>
        );

      case 'retro-arcade':
        if (isLarge) {
          // Use the new pixel art image for large size with animations
          return (
            <div className={`${sizeClasses[size]} relative ${isLarge ? 'shadow-2xl' : ''}`}>
              <div className="animate-subtle-breathing">
                <img 
                  src="/lovable-uploads/3d058cc3-0b77-4158-8d16-51a542051a19.png"
                  alt="Pixel AI Assistant"
                  className="w-full h-full object-cover pixelated"
                  style={{ imageRendering: 'pixelated' }}
                />
                
                {/* Animated overlay effects */}
                <div className="absolute inset-0 pointer-events-none">
                  {/* Breathing glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-arcade-neon-cyan/10 to-transparent animate-breathing-glow"></div>
                  
                  {/* Talking mouth overlay */}
                  {isTyping && (
                    <div className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2 w-4 h-2 bg-arcade-neon-pink/80 rounded-full animate-mouth-talk-pixel"></div>
                  )}
                  
                  {/* Eye blink overlay */}
                  <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1 flex space-x-1">
                    <div className="w-1 h-0.5 bg-black/60 rounded-full animate-blink-pixel"></div>
                    <div className="w-1 h-0.5 bg-black/60 rounded-full animate-blink-pixel" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  
                  {/* Glasses glint effect */}
                  <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-8 h-3 animate-glasses-glint">
                    <div className="w-1 h-full bg-white/40 rounded-full animate-glint-sweep"></div>
                  </div>
                </div>
              </div>
              
              {/* Typing indicator */}
              {isTyping && (
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-arcade-neon-yellow rounded-full animate-ping"></div>
              )}
              
              {/* Idle particles */}
              <div className="absolute -top-1 -left-1 w-1 h-1 bg-arcade-neon-cyan rounded-full animate-particle-float"></div>
              <div className="absolute -bottom-1 -right-1 w-1 h-1 bg-arcade-neon-pink rounded-full animate-particle-float" style={{ animationDelay: '1s' }}></div>
            </div>
          );
        } else {
          // For small sizes, use a simplified animated version
          return (
            <div className={`${sizeClasses[size]} relative ${isLarge ? 'shadow-lg' : ''}`}>
              <div className={`w-full h-full bg-gradient-to-br from-amber-200 to-amber-300 ${isLarge ? 'rounded-lg' : 'rounded'} border-2 border-arcade-neon-cyan relative overflow-hidden animate-subtle-breathing`}>
                {/* Hair */}
                <div className={`absolute top-0 left-0 right-0 ${isLarge ? 'h-6' : 'h-2'} bg-gradient-to-r from-amber-800 to-amber-700`}></div>
                {/* Face */}
                <div className={`absolute ${isLarge ? 'top-4 left-2 right-2 bottom-6' : 'top-1 left-1 right-1 bottom-2'} bg-gradient-to-br from-amber-100 to-amber-200`}>
                  {/* Glasses with glint */}
                  <div className={`absolute ${isLarge ? 'top-4 left-2 right-2 h-6' : 'top-1 left-1 right-1 h-2'} flex items-center justify-center`}>
                    <div className={`${isLarge ? 'w-16 h-4 border-2' : 'w-4 h-1 border'} border-gray-800 rounded bg-transparent flex animate-glasses-shine`}>
                      <div className={`${isLarge ? 'w-6 h-4 mx-2' : 'w-1.5 h-1 mx-0.5'} bg-gray-800 rounded-full animate-blink`}></div>
                      <div className={`${isLarge ? 'w-6 h-4 mx-2' : 'w-1.5 h-1 mx-0.5'} bg-gray-800 rounded-full animate-blink`} style={{ animationDelay: '0.3s' }}></div>
                    </div>
                  </div>
                  {/* Smile with talking animation */}
                  <div className={`absolute ${isLarge ? 'bottom-4' : 'bottom-1'} left-1/2 transform -translate-x-1/2 ${isLarge ? 'w-8 h-2' : 'w-2 h-0.5'} bg-pink-400 rounded-full transition-all duration-200 ${isTyping ? 'animate-mouth-talk' : 'animate-gentle-smile'}`}></div>
                </div>
                {/* Flannel pattern */}
                <div className={`absolute bottom-0 left-0 right-0 ${isLarge ? 'h-4' : 'h-1'} bg-gradient-to-r from-red-700 to-blue-700`}></div>
              </div>
              {isTyping && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-arcade-neon-yellow rounded-full animate-ping"></div>
              )}
            </div>
          );
        }

      case 'storytelling':
        return (
          <div className={`${sizeClasses[size]} relative ${isLarge ? 'shadow-lg' : ''}`}>
            {/* Medieval knight */}
            <div className={`w-full h-full bg-gradient-to-br from-blue-300 to-blue-500 ${isLarge ? 'rounded-lg' : 'rounded-full'} border-2 border-yellow-400 relative overflow-hidden animate-subtle-breathing`}>
              {/* Helmet */}
              <div className={`absolute top-0 left-0 right-0 ${isLarge ? 'h-8' : 'h-3'} bg-gradient-to-b from-gray-300 to-gray-400 ${isLarge ? 'rounded-t-lg' : 'rounded-t-full'}`}></div>
              {/* Face opening */}
              <div className={`absolute ${isLarge ? 'top-6 left-2 right-2 h-12' : 'top-2 left-1 right-1 h-3'} bg-gradient-to-br from-amber-100 to-amber-200 rounded`}>
                {/* Eyes */}
                <div className={`absolute ${isLarge ? 'top-4 left-2 right-2' : 'top-1 left-1 right-1'} flex justify-center space-x-1`}>
                  <div className={`${isLarge ? 'w-2 h-2' : 'w-1 h-1'} bg-blue-800 rounded-full animate-blink`}></div>
                  <div className={`${isLarge ? 'w-2 h-2' : 'w-1 h-1'} bg-blue-800 rounded-full animate-blink`} style={{ animationDelay: '0.5s' }}></div>
                </div>
                {/* Mouth for large size */}
                {isLarge && (
                  <div className={`absolute bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-1 bg-pink-400 rounded-full transition-all duration-200 ${isTyping ? 'animate-mouth-talk' : ''}`}></div>
                )}
              </div>
              {/* Cape */}
              <div className={`absolute bottom-0 left-0 right-0 ${isLarge ? 'h-8' : 'h-2'} bg-gradient-to-r from-red-600 to-red-700 ${isLarge ? 'rounded-b-lg' : 'rounded-b-full'} animate-cape-flutter`}></div>
              {/* Crown/decoration */}
              <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 ${isLarge ? 'w-2 h-2' : 'w-1 h-1'} bg-yellow-400 rounded-full animate-crown-shine`}></div>
              {/* Sword for large size */}
              {isLarge && (
                <div className="absolute right-1 top-8 w-1 h-12 bg-gray-600 rounded animate-sword-gleam"></div>
              )}
            </div>
            {isTyping && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
            )}
          </div>
        );

      case '3d-interactive':
        return (
          <div className={`${sizeClasses[size]} relative ${isLarge ? 'shadow-2xl' : ''}`}>
            {/* AI orb */}
            <div className={`w-full h-full bg-gradient-to-br from-blue-400 via-purple-500 to-cyan-400 ${isLarge ? 'rounded-2xl' : 'rounded-full'} relative overflow-hidden shadow-lg animate-orb-pulse`}>
              {/* Glow effect */}
              <div className={`absolute inset-0 bg-gradient-to-br from-white/30 to-transparent ${isLarge ? 'rounded-2xl' : 'rounded-full'} animate-energy-flow`}></div>
              {/* Core */}
              <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${isLarge ? 'w-6 h-6' : 'w-2 h-2'} bg-white rounded-full opacity-80 animate-core-pulse`}></div>
              {/* Wireframe lines */}
              <div className={`absolute inset-0 border border-white/30 ${isLarge ? 'rounded-2xl' : 'rounded-full'}`}></div>
              <div className={`absolute ${isLarge ? 'top-2 bottom-2' : 'top-1 bottom-1'} left-1/2 transform -translate-x-1/2 w-0 border-l border-white/20 animate-scan-line`}></div>
              <div className={`absolute ${isLarge ? 'left-2 right-2' : 'left-1 right-1'} top-1/2 transform -translate-y-1/2 h-0 border-t border-white/20 animate-scan-line`} style={{ animationDelay: '1s' }}></div>
              
              {/* Additional wireframe for large size */}
              {isLarge && (
                <>
                  <div className="absolute top-4 bottom-4 left-1/4 w-0 border-l border-white/10 animate-data-stream"></div>
                  <div className="absolute top-4 bottom-4 right-1/4 w-0 border-l border-white/10 animate-data-stream" style={{ animationDelay: '0.5s' }}></div>
                  <div className="absolute left-4 right-4 top-1/4 h-0 border-t border-white/10 animate-data-stream" style={{ animationDelay: '1.5s' }}></div>
                  <div className="absolute left-4 right-4 bottom-1/4 h-0 border-t border-white/10 animate-data-stream" style={{ animationDelay: '2s' }}></div>
                </>
              )}
              
              {isTyping && (
                <div className={`absolute inset-0 bg-gradient-to-br from-cyan-300 to-blue-300 ${isLarge ? 'rounded-2xl' : 'rounded-full'} animate-pulse opacity-50`}></div>
              )}
            </div>
            {/* Floating particles */}
            <div className="absolute -top-1 -left-1 w-1 h-1 bg-cyan-400 rounded-full animate-particle-orbit"></div>
            <div className="absolute -top-1 -right-1 w-1 h-1 bg-purple-400 rounded-full animate-particle-orbit" style={{ animationDelay: '0.5s' }}></div>
            {isLarge && (
              <>
                <div className="absolute -bottom-1 -left-1 w-1 h-1 bg-blue-400 rounded-full animate-particle-orbit" style={{ animationDelay: '1s' }}></div>
                <div className="absolute -bottom-1 -right-1 w-1 h-1 bg-purple-400 rounded-full animate-particle-orbit" style={{ animationDelay: '1.5s' }}></div>
              </>
            )}
          </div>
        );

      case 'ecommerce':
        return (
          <div className={`${sizeClasses[size]} relative ${isLarge ? 'shadow-lg' : ''}`}>
            {/* Modern shopkeeper */}
            <div className={`w-full h-full bg-gradient-to-br from-amber-200 to-amber-300 ${isLarge ? 'rounded-lg' : 'rounded-full'} border-2 border-blue-400 relative overflow-hidden animate-subtle-breathing`}>
              {/* Hair */}
              <div className={`absolute top-0 ${isLarge ? 'left-2 right-2 h-6' : 'left-1 right-1 h-2'} bg-gradient-to-r from-amber-800 to-amber-700 ${isLarge ? 'rounded-t-lg' : 'rounded-t-full'}`}></div>
              {/* Face */}
              <div className={`absolute ${isLarge ? 'top-4 left-2 right-2 bottom-8' : 'top-1.5 left-1 right-1 bottom-2'} bg-gradient-to-br from-amber-100 to-amber-200`}>
                {/* Glasses */}
                <div className={`absolute ${isLarge ? 'top-4' : 'top-1'} left-1/2 transform -translate-x-1/2 ${isLarge ? 'w-12 h-3 border-2' : 'w-3 h-1 border'} border-gray-800 rounded bg-transparent animate-glasses-shine`}></div>
                {/* Eyes behind glasses */}
                <div className={`absolute ${isLarge ? 'top-5' : 'top-1'} left-1/2 transform -translate-x-1/2 flex ${isLarge ? 'space-x-2' : 'space-x-1'}`}>
                  <div className={`${isLarge ? 'w-1 h-1' : 'w-0.5 h-0.5'} bg-gray-800 rounded-full animate-blink`}></div>
                  <div className={`${isLarge ? 'w-1 h-1' : 'w-0.5 h-0.5'} bg-gray-800 rounded-full animate-blink`} style={{ animationDelay: '0.7s' }}></div>
                </div>
                {/* Smile */}
                <div className={`absolute ${isLarge ? 'bottom-4' : 'bottom-1'} left-1/2 transform -translate-x-1/2 ${isLarge ? 'w-6 h-1' : 'w-2 h-0.5'} bg-pink-400 rounded-full transition-all duration-200 ${isTyping ? 'animate-mouth-talk' : 'animate-gentle-smile'}`}></div>
              </div>
              {/* Shirt/apron */}
              <div className={`absolute bottom-0 left-0 right-0 ${isLarge ? 'h-6' : 'h-2'} bg-gradient-to-r from-blue-600 to-blue-700 ${isLarge ? 'rounded-b-lg' : 'rounded-b-full'}`}></div>
              {/* Tablet/device indicator */}
              <div className={`absolute bottom-0 right-1 ${isLarge ? 'w-3 h-4' : 'w-1 h-1.5'} bg-gray-800 rounded-sm animate-device-glow`}></div>
              {/* Shopping bag for large size */}
              {isLarge && (
                <div className="absolute bottom-2 left-1 w-2 h-3 bg-green-600 rounded-sm animate-bag-sway"></div>
              )}
            </div>
            {isTyping && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
            )}
          </div>
        );

      case 'videography':
        return (
          <div className={`${sizeClasses[size]} relative ${isLarge ? 'shadow-lg' : ''}`}>
            {/* Film director */}
            <div className={`w-full h-full bg-gradient-to-br from-amber-200 to-amber-300 ${isLarge ? 'rounded-lg' : 'rounded-full'} border-2 border-yellow-500 relative overflow-hidden animate-subtle-breathing`}>
              {/* Beret */}
              <div className={`absolute top-0 left-0 right-0 ${isLarge ? 'h-6' : 'h-2'} bg-gradient-to-br from-gray-800 to-gray-900 ${isLarge ? 'rounded-t-lg' : 'rounded-t-full'} animate-beret-tilt`}></div>
              {/* Face */}
              <div className={`absolute ${isLarge ? 'top-4 left-2 right-2 bottom-8' : 'top-1 left-1 right-1 bottom-2'} bg-gradient-to-br from-amber-100 to-amber-200`}>
                {/* Sunglasses */}
                <div className={`absolute ${isLarge ? 'top-4' : 'top-1'} left-1/2 transform -translate-x-1/2 ${isLarge ? 'w-12 h-3' : 'w-3 h-1'} bg-gray-900 rounded animate-sunglasses-cool`}></div>
                {/* Smile */}
                <div className={`absolute ${isLarge ? 'bottom-4' : 'bottom-1'} left-1/2 transform -translate-x-1/2 ${isLarge ? 'w-6 h-1' : 'w-2 h-0.5'} bg-pink-400 rounded-full transition-all duration-200 ${isTyping ? 'animate-mouth-talk' : 'animate-gentle-smile'}`}></div>
              </div>
              {/* Suit/shirt */}
              <div className={`absolute bottom-0 left-0 right-0 ${isLarge ? 'h-6' : 'h-2'} bg-gradient-to-r from-gray-700 to-gray-800 ${isLarge ? 'rounded-b-lg' : 'rounded-b-full'}`}></div>
              {/* Megaphone indicator */}
              <div className={`absolute ${isLarge ? 'bottom-4 left-0 w-3 h-2' : 'bottom-1 left-0 w-1 h-1'} bg-yellow-500 rounded-full animate-megaphone-glow`}></div>
              {/* Director's clapperboard for large size */}
              {isLarge && (
                <div className="absolute bottom-2 right-1 w-3 h-2 bg-gray-900 rounded-sm border border-yellow-500 animate-clapper-snap"></div>
              )}
            </div>
            {isTyping && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            )}
            {/* Film camera */}
            <div className={`absolute -top-1 -left-1 ${isLarge ? 'w-4 h-2' : 'w-2 h-1'} bg-gray-800 rounded-sm animate-camera-record`}></div>
          </div>
        );

      default:
        return (
          <div className={`${sizeClasses[size]} rounded-full bg-gray-300 flex items-center justify-center animate-subtle-breathing`}>
            <MessageCircle className="w-4 h-4 text-gray-600" />
          </div>
        );
    }
  };

  return getAvatarElement();
};

export default AIAvatar;
