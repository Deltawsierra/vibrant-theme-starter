
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

export interface ArcadeSettings {
  isSFXMuted: boolean;
  sfxVolume: number;
  showMotionWarning: boolean;
  enableScanlines: boolean;
  enableGlow: boolean;
  credits: number;
}

interface ArcadeContextType {
  settings: ArcadeSettings;
  playSFX: (sfxType: SFXType) => void;
  setSFXMuted: (muted: boolean) => void;
  setSFXVolume: (volume: number) => void;
  dismissMotionWarning: () => void;
  toggleScanlines: () => void;
  toggleGlow: () => void;
  addCredits: (amount: number) => void;
  spendCredits: (amount: number) => boolean;
}

const ArcadeContext = createContext<ArcadeContextType | undefined>(undefined);

const DEFAULT_SETTINGS: ArcadeSettings = {
  isSFXMuted: false,
  sfxVolume: 0.7,
  showMotionWarning: true,
  enableScanlines: true,
  enableGlow: true,
  credits: 10
};

interface ArcadeProviderProps {
  children: React.ReactNode;
}

export const ArcadeProvider: React.FC<ArcadeProviderProps> = ({ children }) => {
  const [settings, setSettings] = useState<ArcadeSettings>(() => {
    const saved = localStorage.getItem('arcade-settings');
    return saved ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) } : DEFAULT_SETTINGS;
  });

  const saveSettings = useCallback((newSettings: Partial<ArcadeSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    localStorage.setItem('arcade-settings', JSON.stringify(updated));
  }, [settings]);

  const playSFX = useCallback((sfxType: SFXType) => {
    if (settings.isSFXMuted) return;

    // TODO: Implement actual audio playback when audio files are added
    console.log(`🔊 Playing SFX: ${sfxType} at volume ${settings.sfxVolume}`);
    
    // Placeholder - would play actual audio files in production
    // const audio = new Audio(`/src/themes/retro-arcade/assets/sfx/${sfxType}.wav`);
    // audio.volume = settings.sfxVolume;
    // audio.play().catch(console.error);
  }, [settings.isSFXMuted, settings.sfxVolume]);

  const setSFXMuted = useCallback((muted: boolean) => {
    saveSettings({ isSFXMuted: muted });
  }, [saveSettings]);

  const setSFXVolume = useCallback((volume: number) => {
    saveSettings({ sfxVolume: volume });
  }, [saveSettings]);

  const dismissMotionWarning = useCallback(() => {
    saveSettings({ showMotionWarning: false });
  }, [saveSettings]);

  const toggleScanlines = useCallback(() => {
    saveSettings({ enableScanlines: !settings.enableScanlines });
  }, [settings.enableScanlines, saveSettings]);

  const toggleGlow = useCallback(() => {
    saveSettings({ enableGlow: !settings.enableGlow });
  }, [settings.enableGlow, saveSettings]);

  const addCredits = useCallback((amount: number) => {
    saveSettings({ credits: Math.max(0, settings.credits + amount) });
  }, [settings.credits, saveSettings]);

  const spendCredits = useCallback((amount: number) => {
    if (settings.credits >= amount) {
      saveSettings({ credits: settings.credits - amount });
      return true;
    }
    return false;
  }, [settings.credits, saveSettings]);

  const contextValue: ArcadeContextType = {
    settings,
    playSFX,
    setSFXMuted,
    setSFXVolume,
    dismissMotionWarning,
    toggleScanlines,
    toggleGlow,
    addCredits,
    spendCredits
  };

  return (
    <ArcadeContext.Provider value={contextValue}>
      {children}
    </ArcadeContext.Provider>
  );
};

export const useArcade = (): ArcadeContextType => {
  const context = useContext(ArcadeContext);
  if (!context) {
    throw new Error('useArcade must be used within an ArcadeProvider');
  }
  return context;
};

// Legacy export for backward compatibility
export const useSFX = () => {
  const { playSFX, setSFXMuted, setSFXVolume, settings } = useArcade();
  return {
    playSFX,
    setMuted: setSFXMuted,
    setVolume: setSFXVolume,
    isMuted: settings.isSFXMuted,
    volume: settings.sfxVolume
  };
};

export const SFXProvider = ArcadeProvider;
