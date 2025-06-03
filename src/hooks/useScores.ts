
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Score {
  id: string;
  user_id: string;
  score: number;
  game_type: string;
  created_at: string;
  profiles?: {
    username: string | null;
  } | null;
}

export const useScores = (gameType: string = 'galaga') => {
  const [scores, setScores] = useState<Score[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchScores = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('user_scores')
        .select(`
          id,
          user_id,
          score,
          game_type,
          created_at,
          profiles (
            username
          )
        `)
        .eq('game_type', gameType)
        .order('score', { ascending: false })
        .limit(10);

      if (fetchError) {
        throw fetchError;
      }

      setScores(data || []);
    } catch (err) {
      console.error('Error fetching scores:', err);
      setError('Failed to load scores');
      setScores([]);
    } finally {
      setLoading(false);
    }
  };

  const submitScore = async (score: number) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User must be logged in to submit scores');
      }

      const { error } = await supabase
        .from('user_scores')
        .insert([
          {
            user_id: user.id,
            score,
            game_type: gameType
          }
        ]);

      if (error) throw error;

      // Refresh scores after successful submission
      await fetchScores();
      
      return { success: true };
    } catch (err) {
      console.error('Error submitting score:', err);
      return { success: false, error: err instanceof Error ? err.message : 'Failed to submit score' };
    }
  };

  useEffect(() => {
    fetchScores();
  }, [gameType]);

  return {
    scores,
    loading,
    error,
    submitScore,
    refetch: fetchScores
  };
};
