
import { Position, Ghost, Direction } from '../types/pacmanTypes';
import { MAZE } from '../constants/pacmanConstants';

export const isValidMove = (x: number, y: number): boolean => {
  return x >= 0 && x < MAZE[0].length && y >= 0 && y < MAZE.length && MAZE[y][x] !== 1;
};

export const isGhostCollision = (pacman: Position, ghosts: Ghost[]): boolean => {
  return ghosts.some(ghost => 
    !ghost.isRespawning && Math.abs(ghost.x - pacman.x) < 1 && Math.abs(ghost.y - pacman.y) < 1
  );
};

export const getEatenGhost = (pacman: Position, ghosts: Ghost[]): Ghost | null => {
  return ghosts.find(ghost => 
    ghost.isVulnerable && !ghost.isRespawning && 
    Math.abs(ghost.x - pacman.x) < 1 && Math.abs(ghost.y - pacman.y) < 1
  ) || null;
};

export const getNewPosition = (position: Position, direction: Direction): Position => {
  let newX = position.x;
  let newY = position.y;

  switch (direction) {
    case 'up': newY--; break;
    case 'down': newY++; break;
    case 'left': newX--; break;
    case 'right': newX++; break;
  }

  return { x: newX, y: newY };
};

export const getValidGhostDirections = (ghost: Ghost): Direction[] => {
  const directions: Direction[] = ['up', 'down', 'left', 'right'];
  return directions.filter(dir => {
    const newPos = getNewPosition(ghost, dir);
    return isValidMove(newPos.x, newPos.y);
  });
};
