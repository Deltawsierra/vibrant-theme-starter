
import { useCallback, useRef, useState, useEffect } from 'react';
import { useArcade } from '../context/ArcadeContext';

export const useArcadeAudio = () => {
  const { settings, playSFX, setSFXMuted, setSFXVolume } = useArcade();
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isMusicMuted, setIsMusicMuted] = useState(false);
  const [musicVolume, setMusicVolume] = useState(0.3);
  const [userHasInteracted, setUserHasInteracted] = useState(false);
  
  const musicRef = useRef<HTMLAudioElement | null>(null);

  // Initialize music on first user interaction
  useEffect(() => {
    const handleFirstInteraction = () => {
      setUserHasInteracted(true);
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
    };

    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('keydown', handleFirstInteraction);

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
    };
  }, []);

  const playBackgroundMusic = useCallback(() => {
    if (!userHasInteracted || isMusicMuted) return;
    
    // TODO: Replace with actual music file when available
    console.log('🎵 Playing background music');
    setIsMusicPlaying(true);
    
    // Placeholder - would initialize actual audio in production
    // if (!musicRef.current) {
    //   musicRef.current = new Audio('/src/themes/retro-arcade/assets/music/background.mp3');
    //   musicRef.current.loop = true;
    //   musicRef.current.volume = musicVolume;
    // }
    // musicRef.current.play().catch(console.error);
  }, [userHasInteracted, isMusicMuted, musicVolume]);

  const stopBackgroundMusic = useCallback(() => {
    console.log('🎵 Stopping background music');
    setIsMusicPlaying(false);
    
    // if (musicRef.current) {
    //   musicRef.current.pause();
    // }
  }, []);

  const toggleMusic = useCallback(() => {
    if (isMusicPlaying) {
      stopBackgroundMusic();
    } else {
      playBackgroundMusic();
    }
  }, [isMusicPlaying, playBackgroundMusic, stopBackgroundMusic]);

  const toggleMusicMute = useCallback(() => {
    setIsMusicMuted(!isMusicMuted);
    if (!isMusicMuted) {
      stopBackgroundMusic();
    } else if (isMusicPlaying) {
      playBackgroundMusic();
    }
  }, [isMusicMuted, isMusicPlaying, playBackgroundMusic, stopBackgroundMusic]);

  const setMusicVolumeLevel = useCallback((volume: number) => {
    setMusicVolume(volume);
    if (musicRef.current) {
      musicRef.current.volume = volume;
    }
  }, []);

  return {
    // SFX controls
    isSFXMuted: settings.isSFXMuted,
    sfxVolume: settings.sfxVolume,
    playSFX,
    setSFXMuted,
    setSFXVolume,
    
    // Music controls
    isMusicPlaying,
    isMusicMuted,
    musicVolume,
    playBackgroundMusic,
    stopBackgroundMusic,
    toggleMusic,
    toggleMusicMute,
    setMusicVolume: setMusicVolumeLevel,
    
    // User interaction state
    userHasInteracted
  };
};
