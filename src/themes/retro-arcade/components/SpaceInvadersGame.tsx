
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useArcade } from '../context/ArcadeContext';
import GameHUD from './GameHUD';
import GameOverScreen from './GameOverScreen';
import { useScores } from '../../../hooks/useScores';

interface SpaceInvadersGameProps {
  onBackToSelect: () => void;
}

interface Position {
  x: number;
  y: number;
}

interface Bullet {
  x: number;
  y: number;
  direction: 'up' | 'down';
}

interface Invader {
  x: number;
  y: number;
  type: number;
  alive: boolean;
}

const SpaceInvadersGame: React.FC<SpaceInvadersGameProps> = ({ onBackToSelect }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { playSFX, settings } = useArcade();
  const { submitScore } = useScores('space-invaders');
  
  const [gameState, setGameState] = useState<'waiting' | 'playing' | 'paused' | 'gameover'>('waiting');
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [level, setLevel] = useState(1);
  const [showGameOver, setShowGameOver] = useState(false);

  const CANVAS_WIDTH = 600;
  const CANVAS_HEIGHT = 400;

  // Game objects
  const [player, setPlayer] = useState<Position>({ x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT - 40 });
  const [bullets, setBullets] = useState<Bullet[]>([]);
  const [invaders, setInvaders] = useState<Invader[]>([]);
  const [invaderDirection, setInvaderDirection] = useState<'left' | 'right'>('right');
  const [invaderSpeed, setInvaderSpeed] = useState(1.5); // Increased from 1

  // Initialize invaders
  const initializeInvaders = useCallback(() => {
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
    setInvaders(newInvaders);
  }, []);

  useEffect(() => {
    initializeInvaders();
  }, [initializeInvaders]);

  const drawGame = useCallback(() => {
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
    
    if (settings.enableGlow) {
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
      
      if (settings.enableGlow) {
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
      
      if (settings.enableGlow) {
        ctx.shadowBlur = 5;
        ctx.shadowColor = bullet.direction === 'up' ? '#ffff00' : '#ff0000';
        ctx.fillRect(bullet.x - 1, bullet.y - 2, 2, 4);
        ctx.shadowBlur = 0;
      }
    });

    // Draw ground
    ctx.fillStyle = '#00ff00';
    ctx.fillRect(0, CANVAS_HEIGHT - 10, CANVAS_WIDTH, 10);

  }, [player, invaders, bullets, settings.enableGlow]);

  const moveInvaders = useCallback(() => {
    setInvaders(prevInvaders => {
      const aliveInvaders = prevInvaders.filter(inv => inv.alive);
      if (aliveInvaders.length === 0) return prevInvaders;

      const leftmost = Math.min(...aliveInvaders.map(inv => inv.x));
      const rightmost = Math.max(...aliveInvaders.map(inv => inv.x));

      let shouldMoveDown = false;
      let newDirection = invaderDirection;

      if (invaderDirection === 'right' && rightmost >= CANVAS_WIDTH - 30) {
        shouldMoveDown = true;
        newDirection = 'left';
      } else if (invaderDirection === 'left' && leftmost <= 30) {
        shouldMoveDown = true;
        newDirection = 'right';
      }

      setInvaderDirection(newDirection);

      return prevInvaders.map(invader => {
        if (!invader.alive) return invader;
        
        return {
          ...invader,
          x: shouldMoveDown ? invader.x : invader.x + (invaderDirection === 'right' ? invaderSpeed : -invaderSpeed),
          y: shouldMoveDown ? invader.y + 20 : invader.y
        };
      });
    });
  }, [invaderDirection, invaderSpeed]);

  const moveBullets = useCallback(() => {
    setBullets(prevBullets => 
      prevBullets
        .map(bullet => ({
          ...bullet,
          y: bullet.direction === 'up' ? bullet.y - 8 : bullet.y + 5 // Increased speed from 5/3 to 8/5
        }))
        .filter(bullet => bullet.y > 0 && bullet.y < CANVAS_HEIGHT)
    );
  }, []);

  const checkCollisions = useCallback(() => {
    setBullets(prevBullets => {
      const remainingBullets: Bullet[] = [];
      
      prevBullets.forEach(bullet => {
        let bulletHit = false;
        
        if (bullet.direction === 'up') {
          // Player bullet hitting invaders
          setInvaders(prevInvaders => 
            prevInvaders.map(invader => {
              if (invader.alive && 
                  bullet.x >= invader.x - 10 && bullet.x <= invader.x + 10 &&
                  bullet.y >= invader.y - 10 && bullet.y <= invader.y + 10) {
                bulletHit = true;
                playSFX('success');
                setScore(prev => prev + (invader.type * 10));
                return { ...invader, alive: false };
              }
              return invader;
            })
          );
        } else {
          // Invader bullet hitting player
          if (bullet.x >= player.x - 15 && bullet.x <= player.x + 15 &&
              bullet.y >= player.y - 15 && bullet.y <= player.y + 5) {
            bulletHit = true;
            playSFX('game-over');
            setLives(prev => {
              const newLives = prev - 1;
              if (newLives <= 0) {
                setGameState('gameover');
                setShowGameOver(true);
                submitScore(score);
              }
              return newLives;
            });
          }
        }
        
        if (!bulletHit) {
          remainingBullets.push(bullet);
        }
      });
      
      return remainingBullets;
    });

    // Check if all invaders are destroyed
    const aliveInvaders = invaders.filter(inv => inv.alive);
    if (aliveInvaders.length === 0) {
      setLevel(prev => prev + 1);
      setInvaderSpeed(prev => prev + 0.5);
      initializeInvaders();
      playSFX('power-up');
    }

    // Check if invaders reached the ground
    const lowestInvader = Math.max(...invaders.filter(inv => inv.alive).map(inv => inv.y));
    if (lowestInvader >= CANVAS_HEIGHT - 50) {
      setGameState('gameover');
      setShowGameOver(true);
      submitScore(score);
      playSFX('game-over');
    }
  }, [invaders, player, score, playSFX, submitScore, initializeInvaders]);

  const spawnInvaderBullets = useCallback(() => {
    const aliveInvaders = invaders.filter(inv => inv.alive);
    if (aliveInvaders.length === 0) return;

    // Random chance for invaders to shoot
    if (Math.random() < 0.02) {
      const randomInvader = aliveInvaders[Math.floor(Math.random() * aliveInvaders.length)];
      setBullets(prev => [...prev, {
        x: randomInvader.x,
        y: randomInvader.y + 10,
        direction: 'down'
      }]);
    }
  }, [invaders]);

  // Game loop - increased speed from 100ms to 80ms
  useEffect(() => {
    if (gameState !== 'playing') return;

    const gameLoop = setInterval(() => {
      moveInvaders();
      moveBullets();
      spawnInvaderBullets();
      checkCollisions();
      drawGame();
    }, 80);

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
          setPlayer(prev => ({ ...prev, x: Math.max(20, prev.x - 15) })); // Increased speed from 10 to 15
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          setPlayer(prev => ({ ...prev, x: Math.min(CANVAS_WIDTH - 20, prev.x + 15) })); // Increased speed from 10 to 15
          break;
        case ' ':
        case 'ArrowUp':
        case 'w':
        case 'W':
          e.preventDefault();
          setBullets(prev => {
            // Increased limit from 3 to 30 player bullets
            const playerBullets = prev.filter(b => b.direction === 'up');
            if (playerBullets.length < 30) {
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
  }, [gameState, player, onBackToSelect, playSFX]);

  const handleRestart = () => {
    setGameState('waiting');
    setShowGameOver(false);
    setScore(0);
    setLives(3);
    setLevel(1);
    setPlayer({ x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT - 40 });
    setBullets([]);
    setInvaderDirection('right');
    setInvaderSpeed(1.5); // Reset to new faster speed
    initializeInvaders();
  };

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
