
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

interface Collectible {
  id: string;
  collectible_id: string;
  theme: string;
  found_at: string;
}

const COLLECTIBLE_IDS = [
  'easter-egg-1',
  'easter-egg-2', 
  'easter-egg-3',
  'easter-egg-4',
  'easter-egg-5'
];

export const useCollectibles = (theme: string) => {
  const { user } = useAuth();
  const [foundCollectibles, setFoundCollectibles] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);

  const loadCollectibles = async () => {
    if (!user) {
      // Load from localStorage for guests
      const saved = localStorage.getItem(`collectibles-${theme}`);
      if (saved) {
        setFoundCollectibles(new Set(JSON.parse(saved)));
      }
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('user_collectibles')
        .select('collectible_id')
        .eq('user_id', user.id)
        .eq('theme', theme);

      if (error) throw error;
      
      const found = new Set(data?.map(item => item.collectible_id) || []);
      setFoundCollectibles(found);
    } catch (error) {
      console.error('Error loading collectibles:', error);
    } finally {
      setLoading(false);
    }
  };

  const findCollectible = async (collectibleId: string) => {
    if (foundCollectibles.has(collectibleId)) return;

    const newFound = new Set([...foundCollectibles, collectibleId]);
    setFoundCollectibles(newFound);

    if (user) {
      try {
        const { error } = await supabase
          .from('user_collectibles')
          .insert([
            {
              user_id: user.id,
              collectible_id: collectibleId,
              theme: theme
            }
          ]);

        if (error) throw error;
      } catch (error) {
        console.error('Error saving collectible:', error);
        // Revert on error
        setFoundCollectibles(foundCollectibles);
      }
    } else {
      // Save to localStorage for guests
      localStorage.setItem(`collectibles-${theme}`, JSON.stringify([...newFound]));
    }
  };

  const resetCollectibles = async () => {
    if (user) {
      try {
        const { error } = await supabase
          .from('user_collectibles')
          .delete()
          .eq('user_id', user.id)
          .eq('theme', theme);

        if (error) throw error;
      } catch (error) {
        console.error('Error resetting collectibles:', error);
        return;
      }
    } else {
      localStorage.removeItem(`collectibles-${theme}`);
    }
    
    setFoundCollectibles(new Set());
  };

  useEffect(() => {
    loadCollectibles();
  }, [user, theme]);

  const progress = foundCollectibles.size / COLLECTIBLE_IDS.length;
  const isComplete = progress === 1;

  return {
    foundCollectibles,
    findCollectible,
    resetCollectibles,
    progress,
    isComplete,
    totalCollectibles: COLLECTIBLE_IDS.length,
    loading
  };
};
