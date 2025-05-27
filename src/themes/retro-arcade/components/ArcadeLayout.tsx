
import React, { useState } from 'react';
import ArcadeNavigation from './ArcadeNavigation';

interface ArcadeLayoutProps {
  children: React.ReactNode;
}

const ArcadeLayout: React.FC<ArcadeLayoutProps> = ({ children }) => {
  const [isMuted, setIsMuted] = useState(false);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono" style={{ fontFamily: '"Orbitron", monospace' }}>
      {/* Navigation */}
      <ArcadeNavigation />

      {/* Floating Mute Button */}
      <button
        onClick={toggleMute}
        className={`fixed top-4 right-4 z-50 px-4 py-2 border-2 font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
          isMuted ? 'border-red-400 text-red-400 bg-red-400/10' : 'border-magenta-400 text-magenta-400 bg-magenta-400/10'
        }`}
      >
        {isMuted ? 'UNMUTE' : 'MUTE'}
      </button>

      {/* Main Game Room Background */}
      <main className="min-h-[calc(100vh-140px)] bg-gradient-to-b from-purple-900/20 to-blue-900/20 relative">
        {/* Placeholder for animated background patterns */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full bg-grid-pattern"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
      </main>

      {/* Arcade Carpet Footer */}
      <footer className="w-full bg-gradient-to-r from-red-900 to-blue-900 border-t-2 border-yellow-400">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="text-center">
            <p className="text-yellow-400 text-sm font-bold">
              ◆ ARCADE CARPET FOOTER PLACEHOLDER ◆ INSERT COIN TO CONTINUE ◆
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ArcadeLayout;
