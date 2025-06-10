
import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ArcadeAdvisorHeaderProps {
  onClose: () => void;
}

const ArcadeAdvisorHeader: React.FC<ArcadeAdvisorHeaderProps> = ({ onClose }) => {
  return (
    <div className="absolute top-0 right-0 left-0 h-8 bg-arcade-dark-300 border-b-4 border-arcade-neon-green flex items-center justify-between px-2">
      <div className="flex space-x-2">
        {[1, 2, 3].map(i => (
          <div key={i} className="w-3 h-3 bg-arcade-neon-green"></div>
        ))}
      </div>
      <div className="font-pixel text-xs text-arcade-neon-green animate-pulse">
        ARCADE AI V1.0
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={onClose}
        className="w-6 h-6 p-0 text-arcade-neon-green hover:text-arcade-neon-yellow hover:bg-transparent"
      >
        <X className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default ArcadeAdvisorHeader;
