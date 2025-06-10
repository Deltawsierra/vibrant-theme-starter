
import React from 'react';
import AIAvatarDisplay from '../AIAvatarDisplay';
import AIResumeTools from '../AIResumeTools';
import { type ThemePersonality } from '@/utils/aiAssistantUtils';

interface ArcadeAdvisorAvatarProps {
  personality: ThemePersonality;
  isTyping: boolean;
  isRecruiter: boolean;
}

const ArcadeAdvisorAvatar: React.FC<ArcadeAdvisorAvatarProps> = ({
  personality,
  isTyping,
  isRecruiter
}) => {
  return (
    <div className="lg:w-1/3 flex flex-col items-center justify-start p-2 lg:p-4">
      <div className="mb-4 w-full text-center font-pixel">
        <h2 className="text-xl font-bold text-arcade-neon-yellow animate-neon-pulse">
          {personality.name}
        </h2>
        <p className="text-sm text-arcade-neon-cyan">
          {personality.role}
        </p>
      </div>
      
      <div className="bg-arcade-dark-300/60 border-4 border-arcade-neon-yellow p-2 w-full max-w-[240px] h-[240px] flex items-center justify-center">
        <AIAvatarDisplay 
          isTyping={isTyping} 
          theme="retro-arcade"
          isRecruiter={isRecruiter}
        />
      </div>

      {/* Recruiter Tools - Only show if isRecruiter is true */}
      {isRecruiter && (
        <div className="mt-6 w-full">
          <AIResumeTools theme="retro-arcade" />
        </div>
      )}

      <div className="mt-4 w-full bg-arcade-dark-300/60 border-2 border-arcade-neon-green p-3">
        <div className="text-xs font-pixel text-arcade-neon-green mb-2">SYSTEM STATUS:</div>
        <div className="text-xs space-y-1">
          <div className="flex justify-between">
            <span>MEMORY:</span>
            <span className="text-arcade-neon-yellow">87%</span>
          </div>
          <div className="flex justify-between">
            <span>POWER:</span>
            <span className="text-arcade-neon-yellow">OPTIMAL</span>
          </div>
          <div className="flex justify-between">
            <span>MODE:</span>
            <span className={isRecruiter ? "text-arcade-neon-red" : "text-arcade-neon-yellow"}>
              {isRecruiter ? "RECRUITER" : "STANDARD"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArcadeAdvisorAvatar;
