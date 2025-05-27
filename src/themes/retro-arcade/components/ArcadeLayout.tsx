
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface ArcadeLayoutProps {
  children: React.ReactNode;
}

const ArcadeLayout: React.FC<ArcadeLayoutProps> = ({ children }) => {
  const [isMuted, setIsMuted] = useState(false);
  const location = useLocation();

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono" style={{ fontFamily: '"Orbitron", monospace' }}>
      {/* Arcade HUD Navigation */}
      <nav className="w-full bg-gray-900 border-b-2 border-cyan-400 shadow-lg shadow-cyan-400/20">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            {/* Left Side - Navigation */}
            <div className="flex space-x-8">
              <Link 
                to="/about" 
                className={`px-4 py-2 border-2 ${isActive('/about') ? 'border-yellow-400 text-yellow-400 bg-yellow-400/10' : 'border-green-400 text-green-400'}`}
              >
                ABOUT
              </Link>
              <Link 
                to="/work" 
                className={`px-4 py-2 border-2 ${isActive('/work') ? 'border-yellow-400 text-yellow-400 bg-yellow-400/10' : 'border-green-400 text-green-400'}`}
              >
                WORK
              </Link>
              <Link 
                to="/contact" 
                className={`px-4 py-2 border-2 ${isActive('/contact') ? 'border-yellow-400 text-yellow-400 bg-yellow-400/10' : 'border-green-400 text-green-400'}`}
              >
                CONTACT
              </Link>
              <Link 
                to="/showcase" 
                className={`px-4 py-2 border-2 ${isActive('/showcase') ? 'border-yellow-400 text-yellow-400 bg-yellow-400/10' : 'border-green-400 text-green-400'}`}
              >
                SHOWCASE
              </Link>
            </div>

            {/* Center - Score/Coin Tracker Placeholder */}
            <div className="flex space-x-6 text-cyan-400">
              <div className="text-lg">SCORE: 999999</div>
              <div className="text-lg">COINS: 25</div>
            </div>

            {/* Right Side - Mute Button */}
            <button
              onClick={toggleMute}
              className={`px-4 py-2 border-2 ${isMuted ? 'border-red-400 text-red-400 bg-red-400/10' : 'border-magenta-400 text-magenta-400 bg-magenta-400/10'}`}
            >
              {isMuted ? 'UNMUTE' : 'MUTE'}
            </button>
          </div>
        </div>
      </nav>

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
