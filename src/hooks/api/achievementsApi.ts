
import { supabase } from '@/integrations/supabase/client';
import { Achievement, ScoreApiResult } from '../types/scoreTypes';

export const fetchUserAchievements = async (gameType: string, userId: string): Promise<Achievement[]> => {
  try {
    const { data } = await supabase
      .from('user_achievements')
      .select('*')
      .eq('user_id', userId)
      .eq('game_type', gameType);
    
    return data || [];
  } catch (err) {
    console.error('Error fetching achievements:', err);
    return [];
  }
};

export const unlockAchievementInDatabase = async (
  gameType: string,
  achievementId: string, 
  data: any = {}
): Promise<ScoreApiResult> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return { success: false, error: 'User not authenticated' };
    }

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

    return { success: true };
  } catch (err) {
    console.error('Error unlocking achievement:', err);
    return { 
      success: false, 
      error: err instanceof Error ? err.message : 'Failed to unlock achievement' 
    };
  }
};
