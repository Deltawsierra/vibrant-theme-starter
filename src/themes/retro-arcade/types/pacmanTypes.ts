
export interface Position {
  x: number;
  y: number;
}

export interface Ghost {
  x: number;
  y: number;
  color: string;
  direction: 'up' | 'down' | 'left' | 'right';
  isVulnerable: boolean;
  isRespawning: boolean;
  respawnTimer: number;
}

export type Direction = 'up' | 'down' | 'left' | 'right';
export type GameState = 'waiting' | 'playing' | 'paused' | 'gameover';
export type CellType = 0 | 1 | 2 | 3; // dot, wall, empty, power pellet
