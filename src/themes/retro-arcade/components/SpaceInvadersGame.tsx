
import React, { useRef, useEffect } from 'react';
import { useArcade } from '../context/ArcadeContext';
import GameHUD from './GameHUD';
import GameOverScreen from './GameOverScreen';
import { useScores } from '../../../hooks/useScores';
import { useSpaceInvadersGame } from '../hooks/useSpaceInvadersGame';
import { useSpaceInvadersRenderer } from './SpaceInvadersRenderer';
import { 
  CANVAS_WIDTH, 
  CANVAS_HEIGHT, 
  PLAYER_SPEED, 
  MAX_PLAYER_BULLETS,
  GAME_LOOP_INTERVAL
} from '../constants/spaceInvadersConstants';

interface SpaceInvadersGameProps {
  onBackToSelect: () => void;
}

const SpaceInvadersGame: React.FC<SpaceInvadersGameProps> = ({ onBackToSelect }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { playSFX, settings } = useArcade();
  const { submitScore } = useScores('space-invaders');
  
  const {
    gameState,
    setGameState,
    score,
    lives,
    level,
    showGameOver,
    player,
    setPlayer,
    bullets,
    setBullets,
    invaders,
    initializeGame,
    moveInvaders,
    moveBullets,
    checkCollisions,
    spawnInvaderBullets,
    handleRestart
  } = useSpaceInvadersGame(playSFX, submitScore);

  const { drawGame } = useSpaceInvadersRenderer({
    canvasRef,
    player,
    bullets,
    invaders,
    enableGlow: settings.enableGlow
  });

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  // Game loop
  useEffect(() => {
    if (gameState !== 'playing') return;

    const gameLoop = setInterval(() => {
      moveInvaders();
      moveBullets();
      spawnInvaderBullets();
      checkCollisions();
      drawGame();
    }, GAME_LOOP_INTERVAL);

    return () => clearInterval(gameLoop);
  }, [gameState, moveInvaders, moveBullets, spawnInvaderBullets, checkCollisions, drawGame]);

  // Initial draw
  useEffect(() => {
    drawGame();
  }, [drawGame]);

  // Controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState === 'waiting') {
        if (e.key === 'Enter' || e.key === ' ') {
          setGameState('playing');
          playSFX('coin-insert');
        }
        return;
      }

      if (gameState !== 'playing') return;

      switch (e.key) {
        case 'ArrowLeft':
        case 'a':
        case 'A':
          setPlayer(prev => ({ ...prev, x: Math.max(20, prev.x - PLAYER_SPEED) }));
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          setPlayer(prev => ({ ...prev, x: Math.min(CANVAS_WIDTH - 20, prev.x + PLAYER_SPEED) }));
          break;
        case ' ':
        case 'ArrowUp':
        case 'w':
        case 'W':
          e.preventDefault();
          setBullets(prev => {
            const playerBullets = prev.filter(b => b.direction === 'up');
            if (playerBullets.length < MAX_PLAYER_BULLETS) {
              playSFX('button-press');
              return [...prev, { x: player.x, y: player.y - 20, direction: 'up' }];
            }
            return prev;
          });
          break;
        case 'Escape':
          onBackToSelect();
          return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, player, onBackToSelect, playSFX, setGameState, setPlayer, setBullets]);

  return (
    <div className="h-full flex flex-col">
      {/* Game HUD */}
      <GameHUD 
        score={score}
        lives={lives}
        level={level}
        gameName="SPACE INVADERS"
        onBackToSelect={onBackToSelect}
      />

      {/* Game Canvas */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="relative">
          <canvas
            ref={canvasRef}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            className="border-2 border-arcade-neon-green bg-black"
            style={{
              imageRendering: 'pixelated',
              maxWidth: '100%',
              maxHeight: '400px'
            }}
          />
          
          {/* Waiting Overlay */}
          {gameState === 'waiting' && (
            <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
              <div className="text-center">
                <div className={`text-2xl font-pixel font-bold text-arcade-neon-green mb-4 ${settings.enableGlow ? 'animate-neon-pulse' : 'animate-pixel-blink'}`}>
                  READY!
                </div>
                <div className="text-sm font-pixel text-arcade-neon-cyan">
                  PRESS ENTER TO START
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Game Over Screen */}
      <GameOverScreen
        isVisible={showGameOver}
        onRestart={handleRestart}
        finalScore={score}
        message="GAME OVER"
      />
    </div>
  );
};

export default SpaceInvadersGame;
