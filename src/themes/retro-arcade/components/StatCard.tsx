
import React from 'react';
import { useArcade } from '../context/ArcadeContext';

interface StatCardProps {
  title: string;
  value: number | string;
  maxValue?: number;
  icon?: string;
  color?: 'cyan' | 'magenta' | 'yellow' | 'green' | 'red';
  animated?: boolean;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  maxValue,
  icon = '◆',
  color = 'cyan',
  animated = true,
  className = ''
}) => {
  const { settings } = useArcade();

  const colorClasses = {
    cyan: 'text-arcade-neon-cyan border-arcade-neon-cyan',
    magenta: 'text-arcade-neon-magenta border-arcade-neon-magenta',
    yellow: 'text-arcade-neon-yellow border-arcade-neon-yellow',
    green: 'text-arcade-neon-green border-arcade-neon-green',
    red: 'text-arcade-neon-red border-arcade-neon-red'
  };

  const percentage = maxValue ? Math.min((Number(value) / maxValue) * 100, 100) : 0;

  return (
    <div className={`
      bg-black/80 border-2 p-4 font-pixel relative overflow-hidden
      ${colorClasses[color]}
      ${settings.enableGlow ? 'arcade-neon-border' : ''}
      ${animated ? 'hover:scale-105 transition-transform duration-200' : ''}
      ${className}
    `}>
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-arcade-grid opacity-10" 
           style={{ backgroundSize: '10px 10px' }} />
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className={`text-xs font-bold ${colorClasses[color].split(' ')[0]} uppercase tracking-wider`}>
            {title}
          </div>
          <div className={`text-lg ${colorClasses[color].split(' ')[0]} ${settings.enableGlow ? 'animate-neon-pulse' : 'animate-pixel-blink'}`}>
            {icon}
          </div>
        </div>

        {/* Value Display */}
        <div className={`text-2xl font-bold mb-3 ${colorClasses[color].split(' ')[0]} ${settings.enableGlow ? 'arcade-neon-text' : ''}`}>
          {typeof value === 'number' ? value.toLocaleString() : value}
          {maxValue && (
            <span className="text-sm opacity-60 ml-2">
              / {maxValue.toLocaleString()}
            </span>
          )}
        </div>

        {/* Progress Bar (if maxValue provided) */}
        {maxValue && (
          <div className="space-y-2">
            <div className={`w-full h-3 bg-gray-800 border border-gray-600 overflow-hidden`}>
              <div 
                className={`h-full transition-all duration-1000 ease-out ${colorClasses[color].split(' ')[0].replace('text-', 'bg-')} ${settings.enableGlow ? 'animate-neon-glow' : ''}`}
                style={{ width: `${percentage}%` }}
              />
            </div>
            <div className={`text-xs ${colorClasses[color].split(' ')[0]} opacity-80 text-center`}>
              {percentage.toFixed(0)}% COMPLETE
            </div>
          </div>
        )}

        {/* Decorative Elements */}
        <div className="absolute top-1 right-1 w-2 h-2 bg-current opacity-60 animate-pixel-blink" />
        <div className="absolute bottom-1 left-1 w-1 h-1 bg-current opacity-40" 
             style={{ animationDelay: '0.5s' }} />
      </div>
    </div>
  );
};

export default StatCard;
