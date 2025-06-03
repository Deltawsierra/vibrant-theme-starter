
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

interface Score {
  id: string;
  user_id: string;
  game_type: string;
  score: number;
  created_at: string;
  profiles?: {
    username: string;
  };
}

export const useScores = (gameType: string = 'galaga') => {
  const { user } = useAuth();
  const [scores, setScores] = useState<Score[]>([]);
  const [userBestScore, setUserBestScore] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('user_scores')
        .select(`
          *,
          profiles:user_id (username)
        `)
        .eq('game_type', gameType)
        .order('score', { ascending: false })
        .limit(10);

      if (error) throw error;
      setScores(data || []);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserBestScore = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_scores')
        .select('score')
        .eq('user_id', user.id)
        .eq('game_type', gameType)
        .order('score', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') throw error;
      setUserBestScore(data?.score || 0);
    } catch (error) {
      console.error('Error fetching user best score:', error);
    }
  };

  const submitScore = async (score: number) => {
    if (!user) {
      console.warn('User must be logged in to submit scores');
      return false;
    }

    try {
      const { error } = await supabase
        .from('user_scores')
        .insert([
          {
            user_id: user.id,
            game_type: gameType,
            score: score
          }
        ]);

      if (error) throw error;
      
      // Refresh leaderboard and user best score
      await fetchLeaderboard();
      await fetchUserBestScore();
      
      return true;
    } catch (error) {
      console.error('Error submitting score:', error);
      return false;
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, [gameType]);

  useEffect(() => {
    if (user) {
      fetchUserBestScore();
    }
  }, [user, gameType]);

  return {
    scores,
    userBestScore,
    loading,
    submitScore,
    refreshLeaderboard: fetchLeaderboard
  };
};
