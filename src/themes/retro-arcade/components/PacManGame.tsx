
import React, { useRef, useEffect, useState } from 'react';
import { useArcade } from '../context/ArcadeContext';
import { useAuth } from '@/context/AuthContext';
import GameHUD from './GameHUD';
import GameOverScreen from './GameOverScreen';
import ArcadeAuthModal from './ArcadeAuthModal';
import { useScores } from '../../../hooks/useScores';
import { usePacManGame } from '../hooks/usePacManGame';
import { usePacManRenderer } from './PacManRenderer';
import { CELL_SIZE, MAZE, GAME_LOOP_INTERVAL } from '../constants/pacmanConstants';

interface PacManGameProps {
  onBackToSelect: () => void;
}

const PacManGame: React.FC<PacManGameProps> = ({ onBackToSelect }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { playSFX, settings } = useArcade();
  const { user } = useAuth();
  const { submitScore, unlockAchievement } = useScores('pacman');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [pelletsEaten, setPelletsEaten] = useState(0);
  const [ghostsEaten, setGhostsEaten] = useState(0);
  
  const CANVAS_WIDTH = MAZE[0].length * CELL_SIZE;
  const CANVAS_HEIGHT = MAZE.length * CELL_SIZE;

  const handleSubmitScore = async (finalScore: number) => {
    const result = await submitScore(finalScore, level, pelletsEaten, ghostsEaten);
    
    // Check for achievements
    if (level >= 5) {
      unlockAchievement('level_5_reached', { level, score: finalScore });
    }
    if (ghostsEaten >= 10) {
      unlockAchievement('ghost_hunter', { ghosts_eaten: ghostsEaten });
    }
    if (finalScore >= 10000) {
      unlockAchievement('high_scorer', { score: finalScore });
    }
    
    return result;
  };

  const {
    gameState,
    score,
    lives,
    level,
    showGameOver,
    pacman,
    pacmanDirection,
    ghosts,
    currentMaze,
    moveGhosts,
    checkCollisions,
    movePacman,
    handleRestart,
    startGame,
    setGameState
  } = usePacManGame(playSFX, handleSubmitScore);

  const { drawGame } = usePacManRenderer({
    canvasRef,
    pacman,
    pacmanDirection,
    ghosts,
    currentMaze,
    enableGlow: settings.enableGlow,
    canvasWidth: CANVAS_WIDTH,
    canvasHeight: CANVAS_HEIGHT
  });

  // Game loop
  useEffect(() => {
    if (gameState !== 'playing') return;

    const gameLoop = setInterval(() => {
      moveGhosts();
      checkCollisions();
      drawGame();
    }, GAME_LOOP_INTERVAL);

    return () => clearInterval(gameLoop);
  }, [gameState, moveGhosts, checkCollisions, drawGame]);

  // Initial draw
  useEffect(() => {
    drawGame();
  }, [drawGame]);

  // Track pellets and ghosts eaten for achievements
  useEffect(() => {
    // This would be better tracked in the game logic, but for now we can estimate
    // based on score increases
  }, [score]);

  // Controls with page scroll prevention
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState === 'waiting') {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          startGame();
        }
        return;
      }

      if (gameState !== 'playing') return;

      // Prevent page scrolling for game controls
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'W', 's', 'S', 'a', 'A', 'd', 'D'].includes(e.key)) {
        e.preventDefault();
      }

      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          movePacman('up');
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          movePacman('down');
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          movePacman('left');
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          movePacman('right');
          break;
        case 'Escape':
          onBackToSelect();
          return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, movePacman, onBackToSelect, startGame]);

  return (
    <div className="h-full flex flex-col">
      <GameHUD 
        score={score}
        lives={lives}
        level={level}
        gameName="PAC-MAN"
        onBackToSelect={onBackToSelect}
      />

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
                <div className={`text-2xl font-pixel font-bold text-arcade-neon-yellow mb-4 ${settings.enableGlow ? 'animate-neon-pulse' : 'animate-pixel-blink'}`}>
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

      {/* Auth Modal */}
      <ArcadeAuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />

      <GameOverScreen
        isVisible={showGameOver}
        onRestart={handleRestart}
        finalScore={score}
        message="GAME OVER"
      />
    </div>
  );
};

export default PacManGame;
