
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Score {
  id: string;
  user_id: string;
  score: number;
  game_type: string;
  created_at: string;
  level_reached?: number;
  pellets_eaten?: number;
  ghosts_eaten?: number;
  session_id?: string;
  profiles?: {
    username: string | null;
  } | null;
}

interface Achievement {
  id: string;
  user_id: string;
  achievement_id: string;
  game_type: string;
  unlocked_at: string;
  data: any;
}

export const useScores = (gameType: string = 'galaga') => {
  const [scores, setScores] = useState<Score[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userBestScore, setUserBestScore] = useState<number>(0);
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  const fetchScores = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        // Try to fetch from database
        const { data: scoresData, error: scoresError } = await supabase
          .from('user_scores')
          .select(`
            *,
            profiles:user_id (username)
          `)
          .eq('game_type', gameType)
          .order('score', { ascending: false })
          .limit(10);

        if (scoresError) {
          console.warn('Database fetch failed, using localStorage:', scoresError);
          throw scoresError;
        }

        if (scoresData) {
          setScores(scoresData as Score[]);
          
          // Get user's best score
          const userScores = scoresData.filter(score => score.user_id === user.id);
          const bestScore = userScores.length > 0 ? Math.max(...userScores.map(s => s.score)) : 0;
          setUserBestScore(bestScore);
          
          // Fetch achievements
          const { data: achievementsData } = await supabase
            .from('user_achievements')
            .select('*')
            .eq('user_id', user.id)
            .eq('game_type', gameType);
          
          if (achievementsData) {
            setAchievements(achievementsData);
          }
          
          setLoading(false);
          return;
        }
      }

      // Fallback to localStorage
      console.log('Using fallback scores data for game type:', gameType);
      const savedScores = localStorage.getItem(`scores_${gameType}`);
      const fallbackScores = savedScores ? JSON.parse(savedScores) : [];
      setScores(fallbackScores);
      
      if (user && fallbackScores.length > 0) {
        const userScores = fallbackScores.filter((score: Score) => score.user_id === user.id);
        const bestScore = userScores.length > 0 ? Math.max(...userScores.map((s: Score) => s.score)) : 0;
        setUserBestScore(bestScore);
      } else {
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

  const submitScore = async (score: number, levelReached: number = 1, pelletsEaten: number = 0, ghostsEaten: number = 0) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        // Try to save to database
        const { error } = await supabase
          .from('user_scores')
          .insert({
            user_id: user.id,
            score,
            game_type: gameType,
            level_reached: levelReached,
            pellets_eaten: pelletsEaten,
            ghosts_eaten: ghostsEaten,
            session_id: crypto.randomUUID()
          });

        if (!error) {
          await fetchScores();
          return { success: true };
        } else {
          console.warn('Database insert failed, using localStorage:', error);
        }
      }

      // Fallback to localStorage
      const newScore: Score = {
        id: Date.now().toString(),
        user_id: user?.id || 'anonymous',
        score,
        game_type: gameType,
        created_at: new Date().toISOString(),
        level_reached: levelReached,
        pellets_eaten: pelletsEaten,
        ghosts_eaten: ghostsEaten,
        session_id: crypto.randomUUID(),
        profiles: null
      };

      const savedScores = localStorage.getItem(`scores_${gameType}`);
      const currentScores = savedScores ? JSON.parse(savedScores) : [];
      const updatedScores = [...currentScores, newScore].sort((a, b) => b.score - a.score).slice(0, 10);
      
      localStorage.setItem(`scores_${gameType}`, JSON.stringify(updatedScores));
      
      const allSavedScores = localStorage.getItem('all_user_scores');
      const allScores = allSavedScores ? JSON.parse(allSavedScores) : [];
      allScores.push(newScore);
      localStorage.setItem('all_user_scores', JSON.stringify(allScores));

      if (score > userBestScore) {
        setUserBestScore(score);
      }

      await fetchScores();
      return { success: true };
    } catch (err) {
      console.error('Error submitting score:', err);
      return { success: false, error: err instanceof Error ? err.message : 'Failed to submit score' };
    }
  };

  const unlockAchievement = async (achievementId: string, data: any = {}) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) return { success: false, error: 'User not authenticated' };

      const { error } = await supabase
        .from('user_achievements')
        .insert({
          user_id: user.id,
          achievement_id: achievementId,
          game_type: gameType,
          data
        });

      if (error && !error.message.includes('duplicate')) {
        console.error('Error unlocking achievement:', error);
        return { success: false, error: error.message };
      }

      await fetchScores(); // Refresh achievements
      return { success: true };
    } catch (err) {
      console.error('Error unlocking achievement:', err);
      return { success: false, error: err instanceof Error ? err.message : 'Failed to unlock achievement' };
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
    unlockAchievement,
    refetch: fetchScores,
    userBestScore,
    achievements
  };
};
