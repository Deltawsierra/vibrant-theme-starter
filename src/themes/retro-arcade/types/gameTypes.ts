
export interface Position {
  x: number;
  y: number;
}

export interface Bullet {
  x: number;
  y: number;
  direction: 'up' | 'down';
}

export interface Invader {
  x: number;
  y: number;
  type: number;
  alive: boolean;
}

export type GameState = 'waiting' | 'playing' | 'paused' | 'gameover';
