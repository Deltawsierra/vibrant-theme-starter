
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
  const [userBestScore, setUserBestScore] = useState<number>(0);

  const fetchScores = async () => {
    try {
      setLoading(true);
      setError(null);

      // Using fallback data since database table doesn't exist yet
      console.log('Using fallback scores data for game type:', gameType);
      
      // Get scores from localStorage as fallback
      const savedScores = localStorage.getItem(`scores_${gameType}`);
      const fallbackScores = savedScores ? JSON.parse(savedScores) : [];
      
      setScores(fallbackScores);
      
      // Calculate user's best score from localStorage
      const { data: { user } } = await supabase.auth.getUser();
      if (user && fallbackScores.length > 0) {
        const userScores = fallbackScores.filter((score: Score) => score.user_id === user.id);
        const bestScore = userScores.length > 0 ? Math.max(...userScores.map((s: Score) => s.score)) : 0;
        setUserBestScore(bestScore);
      } else {
        // Get best score from all saved scores for anonymous users
        const allSavedScores = localStorage.getItem('all_user_scores');
        if (allSavedScores) {
          const allScores = JSON.parse(allSavedScores);
          const gameScores = allScores.filter((s: any) => s.game_type === gameType);
          const bestScore = gameScores.length > 0 ? Math.max(...gameScores.map((s: any) => s.score)) : 0;
          setUserBestScore(bestScore);
        }
      }
    } catch (err) {
      console.error('Error fetching scores:', err);
      setError('Failed to load scores');
      setScores([]);
      setUserBestScore(0);
    } finally {
      setLoading(false);
    }
  };

  const submitScore = async (score: number) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const newScore: Score = {
        id: Date.now().toString(),
        user_id: user?.id || 'anonymous',
        score,
        game_type: gameType,
        created_at: new Date().toISOString(),
        profiles: null
      };

      // Save to localStorage as fallback
      const savedScores = localStorage.getItem(`scores_${gameType}`);
      const currentScores = savedScores ? JSON.parse(savedScores) : [];
      const updatedScores = [...currentScores, newScore].sort((a, b) => b.score - a.score).slice(0, 10);
      
      localStorage.setItem(`scores_${gameType}`, JSON.stringify(updatedScores));
      
      // Also save to a general scores collection
      const allSavedScores = localStorage.getItem('all_user_scores');
      const allScores = allSavedScores ? JSON.parse(allSavedScores) : [];
      allScores.push(newScore);
      localStorage.setItem('all_user_scores', JSON.stringify(allScores));

      // Update user's best score if this is better
      if (score > userBestScore) {
        setUserBestScore(score);
      }

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
    error: error || '',
    submitScore,
    refetch: fetchScores,
    userBestScore
  };
};
