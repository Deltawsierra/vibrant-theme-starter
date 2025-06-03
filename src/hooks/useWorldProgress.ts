
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

interface WorldProgress {
  unlocked_objects: string[];
  discovered_locations: string[];
  progress_nodes: Record<string, any>;
}

export const useWorldProgress = () => {
  const { user } = useAuth();
  const [progress, setProgress] = useState<WorldProgress>({
    unlocked_objects: [],
    discovered_locations: [],
    progress_nodes: {}
  });
  const [loading, setLoading] = useState(false);

  const loadProgress = async () => {
    if (!user) {
      // Load from localStorage for guests
      const saved = localStorage.getItem('world-progress');
      if (saved) {
        setProgress(JSON.parse(saved));
      }
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('world_progress')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') throw error;
      
      if (data) {
        setProgress({
          unlocked_objects: data.unlocked_objects || [],
          discovered_locations: data.discovered_locations || [],
          progress_nodes: (data.progress_nodes as Record<string, any>) || {}
        });
      }
    } catch (error) {
      console.error('Error loading world progress:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateProgress = async (newProgress: Partial<WorldProgress>) => {
    const updatedProgress = { ...progress, ...newProgress };
    setProgress(updatedProgress);

    if (user) {
      try {
        const { error } = await supabase
          .from('world_progress')
          .upsert([
            {
              user_id: user.id,
              unlocked_objects: updatedProgress.unlocked_objects,
              discovered_locations: updatedProgress.discovered_locations,
              progress_nodes: updatedProgress.progress_nodes
            }
          ]);

        if (error) throw error;
      } catch (error) {
        console.error('Error saving world progress:', error);
      }
    } else {
      localStorage.setItem('world-progress', JSON.stringify(updatedProgress));
    }
  };

  const resetProgress = async () => {
    const resetData = {
      unlocked_objects: [],
      discovered_locations: [],
      progress_nodes: {}
    };

    setProgress(resetData);

    if (user) {
      try {
        const { error } = await supabase
          .from('world_progress')
          .delete()
          .eq('user_id', user.id);

        if (error) throw error;
      } catch (error) {
        console.error('Error resetting world progress:', error);
      }
    } else {
      localStorage.removeItem('world-progress');
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
