
import React, { createContext, useContext, useState, useCallback } from 'react';

export interface StoryProgress {
  currentChapter: number;
  totalChapters: number;
  sectionsCompleted: string[];
  isAudioPlaying: boolean;
  bookmarkPages: number[];
}

interface StoryProgressContextType {
  progress: StoryProgress;
  setCurrentChapter: (chapter: number) => void;
  toggleAudio: () => void;
  markSectionCompleted: (sectionId: string) => void;
  addBookmark: (page: number) => void;
  removeBookmark: (page: number) => void;
  getProgressPercentage: () => number;
}

const StoryProgressContext = createContext<StoryProgressContextType | undefined>(undefined);

interface StoryProgressProviderProps {
  children: React.ReactNode;
  totalChapters?: number;
}

export const StoryProgressProvider: React.FC<StoryProgressProviderProps> = ({ 
  children, 
  totalChapters = 5 
}) => {
  const [progress, setProgress] = useState<StoryProgress>(() => {
    const saved = localStorage.getItem('storytelling-progress');
    return saved ? JSON.parse(saved) : {
      currentChapter: 1,
      totalChapters,
      sectionsCompleted: [],
      isAudioPlaying: false,
      bookmarkPages: []
    };
  });

  const saveProgress = useCallback((newProgress: StoryProgress) => {
    setProgress(newProgress);
    localStorage.setItem('storytelling-progress', JSON.stringify(newProgress));
  }, []);

  const setCurrentChapter = useCallback((chapter: number) => {
    saveProgress({ ...progress, currentChapter: chapter });
  }, [progress, saveProgress]);

  const toggleAudio = useCallback(() => {
    saveProgress({ ...progress, isAudioPlaying: !progress.isAudioPlaying });
  }, [progress, saveProgress]);

  const markSectionCompleted = useCallback((sectionId: string) => {
    if (!progress.sectionsCompleted.includes(sectionId)) {
      saveProgress({ 
        ...progress, 
        sectionsCompleted: [...progress.sectionsCompleted, sectionId] 
      });
    }
  }, [progress, saveProgress]);

  const addBookmark = useCallback((page: number) => {
    if (!progress.bookmarkPages.includes(page)) {
      saveProgress({ 
        ...progress, 
        bookmarkPages: [...progress.bookmarkPages, page] 
      });
    }
  }, [progress, saveProgress]);

  const removeBookmark = useCallback((page: number) => {
    saveProgress({ 
      ...progress, 
      bookmarkPages: progress.bookmarkPages.filter(p => p !== page) 
    });
  }, [progress, saveProgress]);

  const getProgressPercentage = useCallback(() => {
    return (progress.currentChapter / progress.totalChapters) * 100;
  }, [progress]);

  const contextValue: StoryProgressContextType = {
    progress,
    setCurrentChapter,
    toggleAudio,
    markSectionCompleted,
    addBookmark,
    removeBookmark,
    getProgressPercentage
  };

  return (
    <StoryProgressContext.Provider value={contextValue}>
      {children}
    </StoryProgressContext.Provider>
  );
};

export const useStoryProgress = (): StoryProgressContextType => {
  const context = useContext(StoryProgressContext);
  if (!context) {
    throw new Error('useStoryProgress must be used within a StoryProgressProvider');
  }
  return context;
};
