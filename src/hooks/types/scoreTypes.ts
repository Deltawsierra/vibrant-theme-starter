
export interface Score {
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

export interface Achievement {
  id: string;
  user_id: string;
  achievement_id: string;
  game_type: string;
  unlocked_at: string;
  data: any;
}

export interface ScoreSubmission {
  score: number;
  levelReached?: number;
  pelletsEaten?: number;
  ghostsEaten?: number;
}

export interface ScoreApiResult {
  success: boolean;
  error?: string;
}
