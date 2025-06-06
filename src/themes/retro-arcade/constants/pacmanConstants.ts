export const CELL_SIZE = 20;
export const GAME_LOOP_INTERVAL = 120;
export const INITIAL_LIVES = 3;
export const INITIAL_LEVEL = 1;
export const DOT_SCORE = 10;
export const POWER_PELLET_SCORE = 50;
export const GHOST_SCORE = 1000; // 100 times normal pellet score
export const POWER_PELLET_DURATION = 5000; // 5 seconds in milliseconds
export const GHOST_RESPAWN_DURATION = 3000; // 3 seconds in milliseconds

// Ghost spawn area center (the fenced area in the maze)
export const GHOST_SPAWN_POSITION = { x: 13, y: 11 };

// Changed to a safer starting position that's definitely an open cell
export const INITIAL_PACMAN_POSITION = { x: 1, y: 1 };
export const INITIAL_PACMAN_DIRECTION = 'right' as const;

// Moved ghosts to safer positions to avoid overlapping with Pac-Man
export const INITIAL_GHOSTS = [
  { x: 13, y: 11, color: '#ff0000', direction: 'up' as const, isVulnerable: false, isRespawning: false, respawnTimer: 0 },
  { x: 13, y: 13, color: '#ffb8ff', direction: 'down' as const, isVulnerable: false, isRespawning: false, respawnTimer: 0 },
  { x: 12, y: 13, color: '#00ffff', direction: 'left' as const, isVulnerable: false, isRespawning: false, respawnTimer: 0 },
  { x: 14, y: 13, color: '#ffb852', direction: 'right' as const, isVulnerable: false, isRespawning: false, respawnTimer: 0 }
];

export const MAZE = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,3,1,1,1,1,0,1,1,1,1,1,0,1,0,1,1,1,1,1,0,1,1,1,1,3,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,0,1],
  [1,0,0,0,0,0,0,1,1,0,0,0,0,1,0,0,0,0,1,1,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,0,1,1,1,1,1,2,1,2,1,1,1,1,1,0,1,1,1,1,1,1],
  [2,2,2,2,2,1,0,1,1,2,2,2,2,2,2,2,2,2,1,1,0,1,2,2,2,2,2],
  [1,1,1,1,1,1,0,1,1,2,1,1,2,2,2,1,1,2,1,1,0,1,1,1,1,1,1],
  [2,2,2,2,2,2,0,2,2,2,1,2,2,2,2,2,1,2,2,2,0,2,2,2,2,2,2],
  [1,1,1,1,1,1,0,1,1,2,1,2,2,2,2,2,1,2,1,1,0,1,1,1,1,1,1],
  [2,2,2,2,2,1,0,1,1,2,1,1,1,1,1,1,1,2,1,1,0,1,2,2,2,2,2],
  [1,1,1,1,1,1,0,1,1,2,2,2,2,2,2,2,2,2,1,1,0,1,1,1,1,1,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,1,1,1,1,0,1,1,1,1,1,0,1,0,1,1,1,1,1,0,1,1,1,1,0,1],
  [1,3,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,3,1],
  [1,1,1,0,0,1,0,1,1,0,1,1,1,1,1,1,1,0,1,1,0,1,0,0,1,1,1],
  [1,0,0,0,0,0,0,1,1,0,0,0,0,1,0,0,0,0,1,1,0,0,0,0,0,0,1],
  [1,0,1,1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1,1,1,1,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];
