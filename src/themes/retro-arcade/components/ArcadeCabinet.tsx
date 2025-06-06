
import React, { useState } from 'react';
import GameSelector from './GameSelector';
import PacManGame from './PacManGame';
import SpaceInvadersGame from './SpaceInvadersGame';
import { useArcade } from '../context/ArcadeContext';

interface ArcadeCabinetProps {
  selectedGame: 'select' | 'pacman' | 'space-invaders';
  onGameSelect: (game: 'pacman' | 'space-invaders') => void;
  onBackToSelect: () => void;
}

const ArcadeCabinet: React.FC<ArcadeCabinetProps> = ({
  selectedGame,
  onGameSelect,
  onBackToSelect
}) => {
  const { settings } = useArcade();

  return (
    <div className="flex justify-center">
      <div className="relative">
        {/* Arcade Cabinet Frame */}
        <div className="bg-gradient-to-b from-gray-800 to-gray-900 p-8 rounded-lg border-4 border-arcade-neon-cyan shadow-2xl">
          {/* Cabinet Top */}
          <div className="bg-black border-2 border-arcade-neon-yellow p-2 mb-4 text-center">
            <div className={`text-2xl font-pixel font-bold text-arcade-neon-yellow ${settings.enableGlow ? 'animate-neon-pulse' : ''}`}>
              RETRO ARCADE
            </div>
          </div>

          {/* TV Screen */}
          <div className="relative bg-black border-4 border-gray-600 rounded-lg p-4">
            {/* CRT Screen Effect */}
            <div className="relative w-full h-96 md:w-[600px] md:h-[600px] bg-black border-2 border-arcade-neon-green rounded overflow-hidden">
              {/* CRT Curve Effect */}
              <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/20 pointer-events-none" />
              
              {/* Scanlines */}
              {settings.enableScanlines && (
                <div className="absolute inset-0 bg-crt-scanlines opacity-20 pointer-events-none" />
              )}
              
              {/* Screen Content */}
              <div className="absolute inset-0 p-4">
                {selectedGame === 'select' && (
                  <GameSelector onGameSelect={onGameSelect} />
                )}
                {selectedGame === 'pacman' && (
                  <PacManGame onBackToSelect={onBackToSelect} />
                )}
                {selectedGame === 'space-invaders' && (
                  <SpaceInvadersGame onBackToSelect={onBackToSelect} />
                )}
              </div>
              
              {/* Screen Glow */}
              {settings.enableGlow && (
                <div className="absolute inset-0 border border-arcade-neon-green animate-neon-glow pointer-events-none" />
              )}
            </div>
          </div>

          {/* Control Panel */}
          <div className="mt-4 bg-gray-700 border-2 border-gray-500 p-4 rounded">
            <div className="flex justify-center space-x-8">
              {/* Joystick */}
              <div className="w-12 h-12 bg-black border-2 border-arcade-neon-red rounded-full relative">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-arcade-neon-red rounded-full" />
              </div>
              
              {/* Buttons */}
              <div className="flex space-x-2">
                <div className="w-10 h-10 bg-arcade-neon-yellow border-2 border-yellow-600 rounded-full flex items-center justify-center font-pixel text-xs font-bold text-black">
                  A
                </div>
                <div className="w-10 h-10 bg-arcade-neon-red border-2 border-red-600 rounded-full flex items-center justify-center font-pixel text-xs font-bold text-white">
                  B
                </div>
              </div>
            </div>
          </div>

          {/* Coin Slot */}
          <div className="mt-4 text-center">
            <div className="inline-block bg-black border-2 border-arcade-neon-yellow p-2 rounded">
              <div className="text-arcade-neon-yellow font-pixel text-xs">INSERT COIN</div>
              <div className="w-8 h-2 bg-gray-800 border border-gray-600 mx-auto mt-1" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArcadeCabinet;
