
import React from 'react';
import { Position, Ghost, Direction, CellType } from '../types/pacmanTypes';
import { CELL_SIZE } from '../constants/pacmanConstants';

interface PacManRendererProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  pacman: Position;
  pacmanDirection: Direction;
  ghosts: Ghost[];
  currentMaze: CellType[][];
  enableGlow: boolean;
  canvasWidth: number;
  canvasHeight: number;
}

export const usePacManRenderer = ({
  canvasRef,
  pacman,
  pacmanDirection,
  ghosts,
  currentMaze,
  enableGlow,
  canvasWidth,
  canvasHeight
}: PacManRendererProps) => {
  const drawGame = React.useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Debug: Log Pac-Man's position and game state
    console.log('Pac-Man Debug:', {
      position: { x: pacman.x, y: pacman.y },
      mazeCell: currentMaze[pacman.y] ? currentMaze[pacman.y][pacman.x] : 'OUT_OF_BOUNDS',
      canvasSize: { width: canvasWidth, height: canvasHeight },
      direction: pacmanDirection
    });

    // Clear canvas
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Draw maze
    currentMaze.forEach((row, y) => {
      row.forEach((cell, x) => {
        const pixelX = x * CELL_SIZE;
        const pixelY = y * CELL_SIZE;

        switch (cell) {
          case 1: // Wall
            ctx.fillStyle = '#0000ff';
            ctx.fillRect(pixelX, pixelY, CELL_SIZE, CELL_SIZE);
            if (enableGlow) {
              ctx.shadowBlur = 10;
              ctx.shadowColor = '#00ffff';
              ctx.strokeStyle = '#00ffff';
              ctx.lineWidth = 1;
              ctx.strokeRect(pixelX, pixelY, CELL_SIZE, CELL_SIZE);
              ctx.shadowBlur = 0;
            }
            break;
          case 0: // Dot
            ctx.fillStyle = '#ffff00';
            ctx.beginPath();
            ctx.arc(pixelX + CELL_SIZE/2, pixelY + CELL_SIZE/2, 2, 0, Math.PI * 2);
            ctx.fill();
            break;
          case 3: // Power pellet
            ctx.fillStyle = '#ffff00';
            ctx.beginPath();
            ctx.arc(pixelX + CELL_SIZE/2, pixelY + CELL_SIZE/2, 6, 0, Math.PI * 2);
            ctx.fill();
            if (enableGlow) {
              ctx.shadowBlur = 8;
              ctx.shadowColor = '#ffff00';
              ctx.fill();
              ctx.shadowBlur = 0;
            }
            break;
        }
      });
    });

    // Draw Pac-Man (with enhanced visibility for debugging)
    const pacmanPixelX = pacman.x * CELL_SIZE + CELL_SIZE/2;
    const pacmanPixelY = pacman.y * CELL_SIZE + CELL_SIZE/2;
    const radius = CELL_SIZE/2 - 2;

    console.log('Drawing Pac-Man at pixel coordinates:', { pacmanPixelX, pacmanPixelY, radius });

    // Draw a bright red circle first for debugging
    ctx.fillStyle = '#ff0000';
    ctx.beginPath();
    ctx.arc(pacmanPixelX, pacmanPixelY, radius + 2, 0, Math.PI * 2);
    ctx.fill();

    // Draw the actual Pac-Man on top
    ctx.fillStyle = '#ffff00';
    ctx.beginPath();
    ctx.arc(pacmanPixelX, pacmanPixelY, radius, 0, Math.PI * 2);
    ctx.fill();

    // Add mouth based on direction
    ctx.fillStyle = '#000';
    ctx.beginPath();
    
    let startAngle, endAngle;
    switch (pacmanDirection) {
      case 'right':
        startAngle = Math.PI * 0.2;
        endAngle = Math.PI * 1.8;
        break;
      case 'left':
        startAngle = Math.PI * 1.2;
        endAngle = Math.PI * 0.8;
        break;
      case 'up':
        startAngle = Math.PI * 1.7;
        endAngle = Math.PI * 1.3;
        break;
      case 'down':
        startAngle = Math.PI * 0.7;
        endAngle = Math.PI * 0.3;
        break;
    }
    
    ctx.arc(pacmanPixelX, pacmanPixelY, radius, startAngle, endAngle);
    ctx.lineTo(pacmanPixelX, pacmanPixelY);
    ctx.fill();

    if (enableGlow) {
      ctx.shadowBlur = 8;
      ctx.shadowColor = '#ffff00';
      ctx.fillStyle = '#ffff00';
      ctx.beginPath();
      ctx.arc(pacmanPixelX, pacmanPixelY, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    // Draw ghosts
    ghosts.forEach((ghost, index) => {
      console.log(`Drawing Ghost ${index}:`, { x: ghost.x, y: ghost.y, color: ghost.color, vulnerable: ghost.isVulnerable, respawning: ghost.isRespawning });
      
      // Use blue color for vulnerable ghosts, original color otherwise
      const ghostColor = ghost.isVulnerable ? '#0000ff' : ghost.color;
      const opacity = ghost.isRespawning ? 0.5 : 1.0;
      
      ctx.globalAlpha = opacity;
      ctx.fillStyle = ghostColor;
      const ghostX = ghost.x * CELL_SIZE + CELL_SIZE/2;
      const ghostY = ghost.y * CELL_SIZE + CELL_SIZE/2;
      
      // Ghost body
      ctx.beginPath();
      ctx.arc(ghostX, ghostY - 4, 8, Math.PI, 0);
      ctx.lineTo(ghostX + 8, ghostY + 6);
      ctx.lineTo(ghostX + 4, ghostY + 2);
      ctx.lineTo(ghostX, ghostY + 6);
      ctx.lineTo(ghostX - 4, ghostY + 2);
      ctx.lineTo(ghostX - 8, ghostY + 6);
      ctx.closePath();
      ctx.fill();

      // Ghost eyes - white for vulnerable, normal for others
      ctx.fillStyle = ghost.isVulnerable ? '#ff0000' : '#fff';
      ctx.beginPath();
      ctx.arc(ghostX - 3, ghostY - 4, 2, 0, Math.PI * 2);
      ctx.arc(ghostX + 3, ghostY - 4, 2, 0, Math.PI * 2);
      ctx.fill();

      // Eye pupils - different for vulnerable ghosts
      ctx.fillStyle = ghost.isVulnerable ? '#fff' : '#000';
      ctx.beginPath();
      ctx.arc(ghostX - 3, ghostY - 4, 1, 0, Math.PI * 2);
      ctx.arc(ghostX + 3, ghostY - 4, 1, 0, Math.PI * 2);
      ctx.fill();

      if (enableGlow) {
        ctx.shadowBlur = 8;
        ctx.shadowColor = ghostColor;
        ctx.fillStyle = ghostColor;
        ctx.beginPath();
        ctx.arc(ghostX, ghostY - 4, 8, Math.PI, 0);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      
      ctx.globalAlpha = 1.0; // Reset opacity
    });
  }, [pacman, ghosts, currentMaze, pacmanDirection, enableGlow, canvasWidth, canvasHeight]);

  return { drawGame };
};
