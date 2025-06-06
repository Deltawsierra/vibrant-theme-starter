
import { supabase } from '@/integrations/supabase/client';
import { Score, ScoreSubmission, ScoreApiResult } from '../types/scoreTypes';

export const fetchScoresFromDatabase = async (gameType: string): Promise<Score[]> => {
  const { data: scoresData, error: scoresError } = await supabase
    .from('user_scores')
    .select(`
      id,
      user_id,
      score,
      game_type,
      created_at,
      level_reached,
      pellets_eaten,
      ghosts_eaten,
      session_id
    `)
    .eq('game_type', gameType)
    .order('score', { ascending: false })
    .limit(10);

  if (scoresError) {
    throw scoresError;
  }

  // Transform the data to match our Score interface
  return (scoresData || []).map(score => ({
    ...score,
    profiles: null // We'll handle profile data separately if needed
  }));
};

export const submitScoreToDatabase = async (
  gameType: string, 
  submission: ScoreSubmission
): Promise<ScoreApiResult> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return { success: false, error: 'User not authenticated' };
    }

    const { error } = await supabase
      .from('user_scores')
      .insert({
        user_id: user.id,
        score: submission.score,
        game_type: gameType,
        level_reached: submission.levelReached || 1,
        pellets_eaten: submission.pelletsEaten || 0,
        ghosts_eaten: submission.ghostsEaten || 0,
        session_id: crypto.randomUUID()
      });

    if (error) {
      throw error;
    }

    return { success: true };
  } catch (err) {
    console.error('Error submitting score to database:', err);
    return { 
      success: false, 
      error: err instanceof Error ? err.message : 'Failed to submit score' 
    };
  }
};

export const getUserBestScore = async (gameType: string, userId: string): Promise<number> => {
  try {
    const { data } = await supabase
      .from('user_scores')
      .select('score')
      .eq('game_type', gameType)
      .eq('user_id', userId)
      .order('score', { ascending: false })
      .limit(1);

    return data && data.length > 0 ? data[0].score : 0;
  } catch (err) {
    console.error('Error fetching user best score:', err);
    return 0;
  }
};
