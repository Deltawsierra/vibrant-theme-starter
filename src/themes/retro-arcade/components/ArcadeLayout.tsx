
import React from 'react';
import ArcadeNavigation from './ArcadeNavigation';
import ArcadeBackground from './ArcadeBackground';
import ArcadeHUD from './ArcadeHUD';
import AudioControlsSidebar from './AudioControlsSidebar';
import { useArcade } from '../context/ArcadeContext';
import AIFloatingButton from '@/components/AIFloatingButton';

interface ArcadeLayoutProps {
  children: React.ReactNode;
}

const ArcadeLayout: React.FC<ArcadeLayoutProps> = ({ children }) => {
  const { settings } = useArcade();

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background */}
      <ArcadeBackground />
      
      {/* Navigation */}
      <ArcadeNavigation />
      
      {/* Main Content */}
      <main className="relative z-10 pt-20">
        {children}
      </main>
      
      {/* HUD Overlay */}
      <ArcadeHUD />
      
      {/* Audio Controls */}
      <AudioControlsSidebar />
      
      {/* AI Assistant */}
      <AIFloatingButton />
      
      {/* Scanlines Effect */}
      {settings.enableScanlines && (
        <div className="fixed inset-0 pointer-events-none z-50 opacity-20">
          <div className="h-full w-full bg-gradient-to-b from-transparent via-arcade-neon-cyan to-transparent animate-scanlines"></div>
        </div>
      )}
    </div>
  );
};

export default ArcadeLayout;
