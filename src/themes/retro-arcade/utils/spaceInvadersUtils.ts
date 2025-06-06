
import { Invader } from '../types/gameTypes';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from '../constants/spaceInvadersConstants';

export const initializeInvaders = (): Invader[] => {
  const newInvaders: Invader[] = [];
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 11; col++) {
      newInvaders.push({
        x: 50 + col * 40,
        y: 50 + row * 30,
        type: row < 2 ? 3 : row < 4 ? 2 : 1,
        alive: true
      });
    }
  }
  return newInvaders;
};

export const shouldInvadersMoveDown = (
  invaders: Invader[], 
  direction: 'left' | 'right'
): boolean => {
  const aliveInvaders = invaders.filter(inv => inv.alive);
  if (aliveInvaders.length === 0) return false;

  const leftmost = Math.min(...aliveInvaders.map(inv => inv.x));
  const rightmost = Math.max(...aliveInvaders.map(inv => inv.x));

  return (direction === 'right' && rightmost >= CANVAS_WIDTH - 30) ||
         (direction === 'left' && leftmost <= 30);
};

export const checkInvadersReachedGround = (invaders: Invader[]): boolean => {
  const aliveInvaders = invaders.filter(inv => inv.alive);
  if (aliveInvaders.length === 0) return false;
  
  const lowestInvader = Math.max(...aliveInvaders.map(inv => inv.y));
  return lowestInvader >= CANVAS_HEIGHT - 50;
};

export const allInvadersDestroyed = (invaders: Invader[]): boolean => {
  return invaders.filter(inv => inv.alive).length === 0;
};
