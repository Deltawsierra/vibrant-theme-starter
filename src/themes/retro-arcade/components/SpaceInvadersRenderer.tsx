
import React from 'react';
import { Position, Bullet, Invader } from '../types/gameTypes';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from '../constants/spaceInvadersConstants';

interface SpaceInvadersRendererProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  player: Position;
  bullets: Bullet[];
  invaders: Invader[];
  enableGlow: boolean;
}

export const useSpaceInvadersRenderer = ({
  canvasRef,
  player,
  bullets,
  invaders,
  enableGlow
}: SpaceInvadersRendererProps) => {
  const drawGame = React.useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw stars background
    for (let i = 0; i < 50; i++) {
      ctx.fillStyle = '#fff';
      ctx.fillRect(
        Math.random() * CANVAS_WIDTH,
        Math.random() * CANVAS_HEIGHT,
        1,
        1
      );
    }

    // Draw player
    ctx.fillStyle = '#00ff00';
    ctx.fillRect(player.x - 15, player.y - 5, 30, 10);
    ctx.fillRect(player.x - 5, player.y - 15, 10, 15);
    
    if (enableGlow) {
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#00ff00';
      ctx.fillRect(player.x - 15, player.y - 5, 30, 10);
      ctx.shadowBlur = 0;
    }

    // Draw invaders
    invaders.forEach(invader => {
      if (!invader.alive) return;
      
      let color = '#fff';
      switch (invader.type) {
        case 1: color = '#ff0000'; break;
        case 2: color = '#ffff00'; break;
        case 3: color = '#00ffff'; break;
      }
      
      ctx.fillStyle = color;
      
      // Simple invader shape
      ctx.fillRect(invader.x - 10, invader.y - 5, 20, 10);
      ctx.fillRect(invader.x - 5, invader.y - 10, 10, 5);
      ctx.fillRect(invader.x - 15, invader.y + 5, 5, 5);
      ctx.fillRect(invader.x + 10, invader.y + 5, 5, 5);
      
      if (enableGlow) {
        ctx.shadowBlur = 8;
        ctx.shadowColor = color;
        ctx.fillRect(invader.x - 10, invader.y - 5, 20, 10);
        ctx.shadowBlur = 0;
      }
    });

    // Draw bullets
    bullets.forEach(bullet => {
      ctx.fillStyle = bullet.direction === 'up' ? '#ffff00' : '#ff0000';
      ctx.fillRect(bullet.x - 1, bullet.y - 2, 2, 4);
      
      if (enableGlow) {
        ctx.shadowBlur = 5;
        ctx.shadowColor = bullet.direction === 'up' ? '#ffff00' : '#ff0000';
        ctx.fillRect(bullet.x - 1, bullet.y - 2, 2, 4);
        ctx.shadowBlur = 0;
      }
    });

    // Draw ground
    ctx.fillStyle = '#00ff00';
    ctx.fillRect(0, CANVAS_HEIGHT - 10, CANVAS_WIDTH, 10);

  }, [player, invaders, bullets, enableGlow]);

  return { drawGame };
};
