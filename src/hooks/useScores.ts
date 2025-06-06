
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Score, Achievement, ScoreSubmission, ScoreApiResult } from './types/scoreTypes';
import { 
  fetchScoresFromDatabase, 
  submitScoreToDatabase, 
  getUserBestScore 
} from './api/scoresApi';
import { 
  fetchUserAchievements, 
  unlockAchievementInDatabase 
} from './api/achievementsApi';
import { 
  getScoresFromLocalStorage, 
  saveScoreToLocalStorage, 
  getBestScoreFromLocalStorage 
} from './utils/localStorageScores';

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
        try {
          // Try to fetch from database
          const scoresData = await fetchScoresFromDatabase(gameType);
          setScores(scoresData);
          
          // Get user's best score
          const bestScore = await getUserBestScore(gameType, user.id);
          setUserBestScore(bestScore);
          
          // Fetch achievements
          const achievementsData = await fetchUserAchievements(gameType, user.id);
          setAchievements(achievementsData);
          
          setLoading(false);
          return;
        } catch (dbError) {
          console.warn('Database fetch failed, using localStorage:', dbError);
          // Fall through to localStorage fallback
        }
      }

      // Fallback to localStorage
      console.log('Using fallback scores data for game type:', gameType);
      const fallbackScores = getScoresFromLocalStorage(gameType);
      setScores(fallbackScores);
      
      const bestScore = getBestScoreFromLocalStorage(gameType, user?.id);
      setUserBestScore(bestScore);
      
    } catch (err) {
      console.error('Error fetching scores:', err);
      setError('Failed to load scores');
      setScores([]);
      setUserBestScore(0);
    } finally {
      setLoading(false);
    }
  };

  const submitScore = async (
    score: number, 
    levelReached: number = 1, 
    pelletsEaten: number = 0, 
    ghostsEaten: number = 0
  ): Promise<ScoreApiResult> => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const submission: ScoreSubmission = {
        score,
        levelReached,
        pelletsEaten,
        ghostsEaten
      };

      if (user) {
        // Try to save to database
        const result = await submitScoreToDatabase(gameType, submission);
        
        if (result.success) {
          await fetchScores();
          return result;
        } else {
          console.warn('Database insert failed, using localStorage:', result.error);
        }
      }

      // Fallback to localStorage
      saveScoreToLocalStorage(
        gameType, 
        score, 
        user?.id || 'anonymous', 
        levelReached, 
        pelletsEaten, 
        ghostsEaten
      );

      if (score > userBestScore) {
        setUserBestScore(score);
      }

      await fetchScores();
      return { success: true };
    } catch (err) {
      console.error('Error submitting score:', err);
      return { 
        success: false, 
        error: err instanceof Error ? err.message : 'Failed to submit score' 
      };
    }
  };

  const unlockAchievement = async (
    achievementId: string, 
    data: any = {}
  ): Promise<ScoreApiResult> => {
    const result = await unlockAchievementInDatabase(gameType, achievementId, data);
    
    if (result.success) {
      await fetchScores(); // Refresh achievements
    }
    
    return result;
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
