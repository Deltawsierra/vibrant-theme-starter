
import React, { useState } from 'react';
import { useArcadeAudio } from '../hooks/useArcadeAudio';
import { useArcade } from '../context/ArcadeContext';

const AudioControlsSidebar: React.FC = () => {
  const {
    isSFXMuted,
    sfxVolume,
    setSFXMuted,
    setSFXVolume,
    isMusicPlaying,
    isMusicMuted,
    musicVolume,
    toggleMusic,
    toggleMusicMute,
    setMusicVolume,
    playSFX
  } = useArcadeAudio();

  const { settings } = useArcade();
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    playSFX('button-press');
  };

  const handleSFXToggle = () => {
    setSFXMuted(!isSFXMuted);
    if (!isSFXMuted) {
      playSFX('button-press');
    }
  };

  const handleMusicToggle = () => {
    toggleMusicMute();
    playSFX('button-press');
  };

  const handlePlayToggle = () => {
    toggleMusic();
    playSFX('button-press');
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={handleToggle}
        className={`fixed top-4 right-4 z-50 w-12 h-12 bg-black/90 border-2 border-arcade-neon-cyan text-arcade-neon-cyan font-pixel text-xs font-bold hover:bg-arcade-neon-cyan hover:text-black transition-all duration-200 ${settings.enableGlow ? 'animate-neon-pulse' : ''}`}
        aria-label="Toggle Audio Controls"
      >
        🎵
      </button>

      {/* Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-black/95 border-l-4 border-arcade-neon-cyan backdrop-blur-sm z-40 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 pt-20">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div className={`text-arcade-neon-cyan font-pixel font-bold text-lg ${settings.enableGlow ? 'animate-neon-pulse' : ''}`}>
              AUDIO CONTROLS
            </div>
            <button
              onClick={handleToggle}
              className="text-arcade-neon-red font-pixel text-lg hover:text-red-400"
              aria-label="Close Audio Controls"
            >
              ✕
            </button>
          </div>

          {/* SFX Controls */}
          <div className="bg-black/80 border-2 border-cyan-400 p-4 mb-4 font-pixel">
            <div className="text-cyan-400 text-sm mb-3 font-bold">SFX CONTROLS</div>
            <div className="space-y-3">
              <button
                onClick={handleSFXToggle}
                className={`w-full px-3 py-2 border-2 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors ${
                  isSFXMuted 
                    ? 'border-red-400 text-red-400 bg-red-400/10' 
                    : 'border-green-400 text-green-400 bg-green-400/10'
                }`}
                aria-label={`SFX ${isSFXMuted ? 'muted' : 'enabled'}`}
              >
                SFX: {isSFXMuted ? 'OFF' : 'ON'}
              </button>
              
              <div className="space-y-2">
                <label className="text-cyan-400 text-xs">VOLUME:</label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={sfxVolume}
                  onChange={(e) => setSFXVolume(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-700 accent-cyan-400"
                  aria-label="SFX Volume"
                />
                <div className="text-cyan-400 text-xs">{Math.round(sfxVolume * 100)}%</div>
              </div>
            </div>
          </div>

          {/* Music Controls */}
          <div className="bg-black/80 border-2 border-magenta-400 p-4 font-pixel">
            <div className="text-magenta-400 text-sm mb-3 font-bold">MUSIC CONTROLS</div>
            <div className="space-y-3">
              <button
                onClick={handlePlayToggle}
                className={`w-full px-3 py-2 border-2 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors ${
                  isMusicPlaying 
                    ? 'border-green-400 text-green-400 bg-green-400/10' 
                    : 'border-gray-400 text-gray-400 bg-gray-400/10'
                }`}
                aria-label={`Music ${isMusicPlaying ? 'playing' : 'stopped'}`}
              >
                {isMusicPlaying ? 'PLAYING' : 'STOPPED'}
              </button>
              
              <button
                onClick={handleMusicToggle}
                className={`w-full px-3 py-2 border-2 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors ${
                  isMusicMuted 
                    ? 'border-red-400 text-red-400 bg-red-400/10' 
                    : 'border-magenta-400 text-magenta-400 bg-magenta-400/10'
                }`}
                aria-label={`Music ${isMusicMuted ? 'muted' : 'enabled'}`}
              >
                MUSIC: {isMusicMuted ? 'OFF' : 'ON'}
              </button>
              
              <div className="space-y-2">
                <label className="text-magenta-400 text-xs">VOLUME:</label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={musicVolume}
                  onChange={(e) => setMusicVolume(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-700 accent-magenta-400"
                  aria-label="Music Volume"
                />
                <div className="text-magenta-400 text-xs">{Math.round(musicVolume * 100)}%</div>
              </div>
            </div>
          </div>

          {/* Keyboard Shortcuts */}
          <div className="mt-6 text-xs font-pixel text-arcade-neon-green opacity-80">
            <div className="mb-2 font-bold">KEYBOARD SHORTCUTS:</div>
            <div>ESC - Close Panel</div>
            <div>SPACE - Toggle Music</div>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30"
          onClick={handleToggle}
        />
      )}
    </>
  );
};

export default AudioControlsSidebar;
