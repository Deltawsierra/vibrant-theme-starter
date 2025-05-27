
import React, { createContext, useContext, useState, useCallback } from 'react';

export interface VideoProject {
  id: string;
  title: string;
  description: string;
  duration: string;
  category: string;
  thumbnailUrl: string;
  videoUrl: string;
  tags: string[];
  isFeatureed: boolean;
}

export interface PlaybackState {
  currentVideoId: string | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  isFullscreen: boolean;
}

interface VideoContextType {
  projects: VideoProject[];
  playbackState: PlaybackState;
  mode: 'cinematic' | 'editorial';
  isLeftDrawerOpen: boolean;
  isRightDrawerOpen: boolean;
  setMode: (mode: 'cinematic' | 'editorial') => void;
  toggleLeftDrawer: () => void;
  toggleRightDrawer: () => void;
  playVideo: (videoId: string) => void;
  pauseVideo: () => void;
  setCurrentTime: (time: number) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  toggleFullscreen: () => void;
  addProject: (project: Omit<VideoProject, 'id'>) => void;
  removeProject: (projectId: string) => void;
  getProjectById: (id: string) => VideoProject | undefined;
}

const VideoContext = createContext<VideoContextType | undefined>(undefined);

const DEFAULT_PLAYBACK_STATE: PlaybackState = {
  currentVideoId: null,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 0.8,
  isMuted: false,
  isFullscreen: false
};

interface VideoProviderProps {
  children: React.ReactNode;
}

export const VideoProvider: React.FC<VideoProviderProps> = ({ children }) => {
  const [projects, setProjects] = useState<VideoProject[]>([]);
  const [playbackState, setPlaybackState] = useState<PlaybackState>(DEFAULT_PLAYBACK_STATE);
  const [mode, setModeState] = useState<'cinematic' | 'editorial'>(() => {
    const saved = localStorage.getItem('videography-mode');
    return (saved as 'cinematic' | 'editorial') || 'cinematic';
  });
  const [isLeftDrawerOpen, setIsLeftDrawerOpen] = useState(false);
  const [isRightDrawerOpen, setIsRightDrawerOpen] = useState(false);

  const setMode = useCallback((newMode: 'cinematic' | 'editorial') => {
    setModeState(newMode);
    localStorage.setItem('videography-mode', newMode);
  }, []);

  const toggleLeftDrawer = useCallback(() => {
    setIsLeftDrawerOpen(prev => !prev);
  }, []);

  const toggleRightDrawer = useCallback(() => {
    setIsRightDrawerOpen(prev => !prev);
  }, []);

  const playVideo = useCallback((videoId: string) => {
    setPlaybackState(prev => ({
      ...prev,
      currentVideoId: videoId,
      isPlaying: true,
      currentTime: 0
    }));
  }, []);

  const pauseVideo = useCallback(() => {
    setPlaybackState(prev => ({ ...prev, isPlaying: false }));
  }, []);

  const setCurrentTime = useCallback((time: number) => {
    setPlaybackState(prev => ({ ...prev, currentTime: time }));
  }, []);

  const setVolume = useCallback((volume: number) => {
    setPlaybackState(prev => ({ ...prev, volume, isMuted: volume === 0 }));
  }, []);

  const toggleMute = useCallback(() => {
    setPlaybackState(prev => ({ ...prev, isMuted: !prev.isMuted }));
  }, []);

  const toggleFullscreen = useCallback(() => {
    setPlaybackState(prev => ({ ...prev, isFullscreen: !prev.isFullscreen }));
  }, []);

  const addProject = useCallback((project: Omit<VideoProject, 'id'>) => {
    const newProject: VideoProject = {
      ...project,
      id: Date.now().toString()
    };
    setProjects(prev => [...prev, newProject]);
  }, []);

  const removeProject = useCallback((projectId: string) => {
    setProjects(prev => prev.filter(project => project.id !== projectId));
  }, []);

  const getProjectById = useCallback((id: string) => {
    return projects.find(project => project.id === id);
  }, [projects]);

  const contextValue: VideoContextType = {
    projects,
    playbackState,
    mode,
    isLeftDrawerOpen,
    isRightDrawerOpen,
    setMode,
    toggleLeftDrawer,
    toggleRightDrawer,
    playVideo,
    pauseVideo,
    setCurrentTime,
    setVolume,
    toggleMute,
    toggleFullscreen,
    addProject,
    removeProject,
    getProjectById
  };

  return (
    <VideoContext.Provider value={contextValue}>
      {children}
    </VideoContext.Provider>
  );
};

export const useVideo = (): VideoContextType => {
  const context = useContext(VideoContext);
  if (!context) {
    throw new Error('useVideo must be used within a VideoProvider');
  }
  return context;
};
