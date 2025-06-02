
import React from 'react';
import { useArcadeAudio } from '../hooks/useArcadeAudio';

const AudioControls: React.FC = () => {
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
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {/* SFX Controls */}
      <div className="bg-black/80 border-2 border-cyan-400 p-3 font-orbitron">
        <div className="text-cyan-400 text-xs mb-2 font-bold">SFX CONTROLS</div>
        <div className="space-y-2">
          <button
            onClick={handleSFXToggle}
            className={`w-full px-3 py-1 border-2 font-bold text-xs focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
              isSFXMuted 
                ? 'border-red-400 text-red-400 bg-red-400/10' 
                : 'border-green-400 text-green-400 bg-green-400/10'
            }`}
            aria-label={`SFX ${isSFXMuted ? 'muted' : 'enabled'}`}
          >
            SFX: {isSFXMuted ? 'OFF' : 'ON'}
          </button>
          
          <div className="flex items-center space-x-2">
            <span className="text-cyan-400 text-xs">VOL:</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={sfxVolume}
              onChange={(e) => setSFXVolume(parseFloat(e.target.value))}
              className="flex-1 h-1 bg-gray-700 accent-cyan-400"
              aria-label="SFX Volume"
            />
          </div>
        </div>
      </div>

      {/* Music Controls */}
      <div className="bg-black/80 border-2 border-magenta-400 p-3 font-orbitron">
        <div className="text-magenta-400 text-xs mb-2 font-bold">MUSIC CONTROLS</div>
        <div className="space-y-2">
          <button
            onClick={handlePlayToggle}
            className={`w-full px-3 py-1 border-2 font-bold text-xs focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
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
            className={`w-full px-3 py-1 border-2 font-bold text-xs focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
              isMusicMuted 
                ? 'border-red-400 text-red-400 bg-red-400/10' 
                : 'border-magenta-400 text-magenta-400 bg-magenta-400/10'
            }`}
            aria-label={`Music ${isMusicMuted ? 'muted' : 'enabled'}`}
          >
            MUSIC: {isMusicMuted ? 'OFF' : 'ON'}
          </button>
          
          <div className="flex items-center space-x-2">
            <span className="text-magenta-400 text-xs">VOL:</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={musicVolume}
              onChange={(e) => setMusicVolume(parseFloat(e.target.value))}
              className="flex-1 h-1 bg-gray-700 accent-magenta-400"
              aria-label="Music Volume"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioControls;
