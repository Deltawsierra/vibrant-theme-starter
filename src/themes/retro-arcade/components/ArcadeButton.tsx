
import React from 'react';
import { useArcade } from '../context/ArcadeContext';

interface ArcadeButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const ArcadeButton: React.FC<ArcadeButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  type = 'button'
}) => {
  const { playSFX, settings } = useArcade();

  const colorClasses = {
    primary: 'text-arcade-neon-cyan border-arcade-neon-cyan hover:bg-arcade-neon-cyan',
    secondary: 'text-arcade-neon-magenta border-arcade-neon-magenta hover:bg-arcade-neon-magenta',
    danger: 'text-arcade-neon-red border-arcade-neon-red hover:bg-arcade-neon-red',
    success: 'text-arcade-neon-green border-arcade-neon-green hover:bg-arcade-neon-green'
  };

  const sizeClasses = {
    sm: 'px-3 py-2 text-xs',
    md: 'px-4 py-3 text-sm',
    lg: 'px-6 py-4 text-base'
  };

  const handleClick = () => {
    if (!disabled) {
      playSFX('button-press');
      onClick?.();
    }
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled}
      className={`
        arcade-button
        ${colorClasses[variant]}
        ${sizeClasses[size]}
        ${settings.enableGlow ? 'arcade-neon-border' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:text-black'}
        font-pixel font-bold uppercase tracking-wider
        relative overflow-hidden
        transition-all duration-100
        ${className}
      `}
    >
      <span className="relative z-10">{children}</span>
      
      {/* Animated background on hover */}
      <div className="absolute inset-0 bg-current opacity-0 hover:opacity-20 transition-opacity duration-100" />
      
      {/* Glitch effect for active state */}
      {settings.enableGlow && (
        <div className="absolute inset-0 bg-current opacity-0 animate-pixel-blink" 
             style={{ animationDelay: '0.1s' }} />
      )}
    </button>
  );
};

export default ArcadeButton;
