
import React from 'react';
import ArcadeNavigation from './ArcadeNavigation';
import ArcadeBackground from './ArcadeBackground';
import ArcadeHUD from './ArcadeHUD';
import AudioControlsSidebar from './AudioControlsSidebar';
import { useArcade } from '../context/ArcadeContext';

interface ArcadeLayoutProps {
  children: React.ReactNode;
}

const ArcadeLayout: React.FC<ArcadeLayoutProps> = ({ children }) => {
  const { settings } = useArcade();

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background */}
      <ArcadeBackground />
      
      {/* CRT Scanlines Base Effect */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-crt-scanlines opacity-10"></div>
      
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
      
      {/* Enhanced Scanlines Effect */}
      {settings.enableScanlines && (
        <div className="fixed inset-0 pointer-events-none z-50 opacity-30">
          <div className="h-full w-full bg-gradient-to-b from-transparent via-arcade-neon-cyan/10 to-transparent animate-screen-flicker"></div>
        </div>
      )}
      
      {/* Grid Floor Effect */}
      <div className="fixed bottom-0 left-0 right-0 h-32 pointer-events-none z-5">
        <div className="absolute inset-0 bg-arcade-grid opacity-20 animate-slide" 
             style={{ backgroundSize: '40px 40px' }} />
      </div>
    </div>
  );
};

export default ArcadeLayout;
