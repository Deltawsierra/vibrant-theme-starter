
import React, { createContext, useContext, useState, useCallback } from 'react';

export type SFXType = 
  | 'coin-insert'
  | 'button-press'
  | 'menu-navigate'
  | 'page-transition'
  | 'error'
  | 'success'
  | 'power-up'
  | 'game-over';

interface SFXContextType {
  isMuted: boolean;
  volume: number;
  playSFX: (sfxType: SFXType) => void;
  setMuted: (muted: boolean) => void;
  setVolume: (volume: number) => void;
}

const SFXContext = createContext<SFXContextType | undefined>(undefined);

interface SFXProviderProps {
  children: React.ReactNode;
}

export const SFXProvider: React.FC<SFXProviderProps> = ({ children }) => {
  const [isMuted, setIsMuted] = useState(() => {
    const saved = localStorage.getItem('arcade-sfx-muted');
    return saved ? JSON.parse(saved) : false;
  });

  const [volume, setVolumeState] = useState(() => {
    const saved = localStorage.getItem('arcade-sfx-volume');
    return saved ? parseFloat(saved) : 0.7;
  });

  const playSFX = useCallback((sfxType: SFXType) => {
    if (isMuted) return;

    // TODO: Implement actual audio playback when audio files are added
    console.log(`🔊 Playing SFX: ${sfxType} at volume ${volume}`);
    
    // Placeholder - would play actual audio files in production
    // const audio = new Audio(`/src/themes/retro-arcade/assets/sfx/${sfxType}.wav`);
    // audio.volume = volume;
    // audio.play().catch(console.error);
  }, [isMuted, volume]);

  const setMuted = useCallback((muted: boolean) => {
    setIsMuted(muted);
    localStorage.setItem('arcade-sfx-muted', JSON.stringify(muted));
  }, []);

  const setVolume = useCallback((newVolume: number) => {
    setVolumeState(newVolume);
    localStorage.setItem('arcade-sfx-volume', newVolume.toString());
  }, []);

  const contextValue: SFXContextType = {
    isMuted,
    volume,
    playSFX,
    setMuted,
    setVolume
  };

  return (
    <SFXContext.Provider value={contextValue}>
      {children}
    </SFXContext.Provider>
  );
};

export const useSFX = (): SFXContextType => {
  const context = useContext(SFXContext);
  if (!context) {
    throw new Error('useSFX must be used within an SFXProvider');
  }
  return context;
};
