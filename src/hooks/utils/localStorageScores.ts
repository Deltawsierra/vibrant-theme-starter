
import { Score } from '../types/scoreTypes';

export const getScoresFromLocalStorage = (gameType: string): Score[] => {
  const savedScores = localStorage.getItem(`scores_${gameType}`);
  return savedScores ? JSON.parse(savedScores) : [];
};

export const saveScoreToLocalStorage = (
  gameType: string, 
  score: number, 
  userId: string, 
  levelReached: number = 1,
  pelletsEaten: number = 0,
  ghostsEaten: number = 0
): void => {
  const newScore: Score = {
    id: Date.now().toString(),
    user_id: userId,
    score,
    game_type: gameType,
    created_at: new Date().toISOString(),
    level_reached: levelReached,
    pellets_eaten: pelletsEaten,
    ghosts_eaten: ghostsEaten,
    session_id: crypto.randomUUID(),
    profiles: null
  };

  const currentScores = getScoresFromLocalStorage(gameType);
  const updatedScores = [...currentScores, newScore]
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);
  
  localStorage.setItem(`scores_${gameType}`, JSON.stringify(updatedScores));
  
  // Also save to all scores
  const allSavedScores = localStorage.getItem('all_user_scores');
  const allScores = allSavedScores ? JSON.parse(allSavedScores) : [];
  allScores.push(newScore);
  localStorage.setItem('all_user_scores', JSON.stringify(allScores));
};

export const getBestScoreFromLocalStorage = (gameType: string, userId?: string): number => {
  if (userId) {
    const gameScores = getScoresFromLocalStorage(gameType);
    const userScores = gameScores.filter(score => score.user_id === userId);
    return userScores.length > 0 ? Math.max(...userScores.map(s => s.score)) : 0;
  }

  const allSavedScores = localStorage.getItem('all_user_scores');
  if (allSavedScores) {
    const allScores = JSON.parse(allSavedScores);
    const gameScores = allScores.filter((s: any) => s.game_type === gameType);
    return gameScores.length > 0 ? Math.max(...gameScores.map((s: any) => s.score)) : 0;
  }

  return 0;
};
