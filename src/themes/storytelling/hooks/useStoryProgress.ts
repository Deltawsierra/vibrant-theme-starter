
import { useContext } from 'react';
import { StoryProgressContext } from '../context/StoryProgressContext';

export const useStoryProgress = () => {
  const context = useContext(StoryProgressContext);
  if (!context) {
    throw new Error('useStoryProgress must be used within a StoryProgressProvider');
  }
  return context;
};
