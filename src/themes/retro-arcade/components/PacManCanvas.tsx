
import React, { useRef, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Position, Ghost, Direction, CellType, GameState } from '../types/pacmanTypes';
import { usePacManRenderer } from './PacManRenderer';
import { CELL_SIZE, MAZE } from '../constants/pacmanConstants';

interface PacManCanvasProps {
  gameState: GameState;
  pacman: Position;
  pacmanDirection: Direction;
  ghosts: Ghost[];
  currentMaze: CellType[][];
  enableGlow: boolean;
  showAuthModal: boolean;
  setShowAuthModal: (show: boolean) => void;
}

const PacManCanvas: React.FC<PacManCanvasProps> = ({
  gameState,
  pacman,
  pacmanDirection,
  ghosts,
  currentMaze,
  enableGlow,
  showAuthModal,
  setShowAuthModal
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { user } = useAuth();
  
  const CANVAS_WIDTH = MAZE[0].length * CELL_SIZE;
  const CANVAS_HEIGHT = MAZE.length * CELL_SIZE;

  const { drawGame } = usePacManRenderer({
    canvasRef,
    pacman,
    pacmanDirection,
    ghosts,
    currentMaze,
    enableGlow,
    canvasWidth: CANVAS_WIDTH,
    canvasHeight: CANVAS_HEIGHT
  });

  // Initial draw
  useEffect(() => {
    drawGame();
  }, [drawGame]);

  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          className="border-2 border-arcade-neon-yellow bg-black"
          style={{
            imageRendering: 'pixelated',
            maxWidth: '100%',
            maxHeight: '400px'
          }}
        />
        
        {gameState === 'waiting' && (
          <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
            <div className="text-center">
              <div className={`text-2xl font-pixel font-bold text-arcade-neon-yellow mb-4 ${enableGlow ? 'animate-neon-pulse' : 'animate-pixel-blink'}`}>
                READY!
              </div>
              <div className="text-sm font-pixel text-arcade-neon-cyan">
                PRESS ENTER TO START
              </div>
              {!user && (
                <div className="mt-4">
                  <button
                    onClick={() => setShowAuthModal(true)}
                    className="text-xs font-pixel text-arcade-neon-magenta hover:text-arcade-neon-yellow transition-colors"
                  >
                    LOGIN TO SAVE SCORES
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PacManCanvas;
