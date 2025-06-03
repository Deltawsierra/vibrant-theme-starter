
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

interface StoryProgress {
  current_chapter: number;
  completed_chapters: number[];
  completion_percentage: number;
}

export const useStoryProgress = () => {
  const { user } = useAuth();
  const [progress, setProgress] = useState<StoryProgress>({
    current_chapter: 1,
    completed_chapters: [],
    completion_percentage: 0
  });
  const [loading, setLoading] = useState(false);

  const loadProgress = async () => {
    if (!user) {
      // Load from localStorage for guests
      const saved = localStorage.getItem('story-progress');
      if (saved) {
        setProgress(JSON.parse(saved));
      }
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('story_progress')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') throw error;
      
      if (data) {
        setProgress({
          current_chapter: data.current_chapter,
          completed_chapters: data.completed_chapters || [],
          completion_percentage: data.completion_percentage || 0
        });
      }
    } catch (error) {
      console.error('Error loading story progress:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateProgress = async (newProgress: Partial<StoryProgress>) => {
    const updatedProgress = { ...progress, ...newProgress };
    setProgress(updatedProgress);

    if (user) {
      try {
        const { error } = await supabase
          .from('story_progress')
          .upsert([
            {
              user_id: user.id,
              current_chapter: updatedProgress.current_chapter,
              completed_chapters: updatedProgress.completed_chapters,
              completion_percentage: updatedProgress.completion_percentage
            }
          ]);

        if (error) throw error;
      } catch (error) {
        console.error('Error saving story progress:', error);
      }
    } else {
      localStorage.setItem('story-progress', JSON.stringify(updatedProgress));
    }
  };

  const resetProgress = async () => {
    const resetData = {
      current_chapter: 1,
      completed_chapters: [],
      completion_percentage: 0
    };

    setProgress(resetData);

    if (user) {
      try {
        const { error } = await supabase
          .from('story_progress')
          .delete()
          .eq('user_id', user.id);

        if (error) throw error;
      } catch (error) {
        console.error('Error resetting story progress:', error);
      }
    } else {
      localStorage.removeItem('story-progress');
    }
  };

  useEffect(() => {
    loadProgress();
  }, [user]);

  return {
    progress,
    updateProgress,
    resetProgress,
    loading
  };
};
