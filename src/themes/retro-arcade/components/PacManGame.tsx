
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useArcade } from '../context/ArcadeContext';
import GameHUD from './GameHUD';
import GameOverScreen from './GameOverScreen';
import { useScores } from '../../../hooks/useScores';

interface PacManGameProps {
  onBackToSelect: () => void;
}

interface Position {
  x: number;
  y: number;
}

interface Ghost {
  x: number;
  y: number;
  color: string;
  direction: 'up' | 'down' | 'left' | 'right';
}

const PacManGame: React.FC<PacManGameProps> = ({ onBackToSelect }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { playSFX, settings } = useArcade();
  const { submitScore } = useScores('pacman');
  
  const [gameState, setGameState] = useState<'waiting' | 'playing' | 'paused' | 'gameover'>('waiting');
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [level, setLevel] = useState(1);
  const [showGameOver, setShowGameOver] = useState(false);

  // Game objects
  const [pacman, setPacman] = useState<Position>({ x: 13, y: 23 });
  const [pacmanDirection, setPacmanDirection] = useState<'up' | 'down' | 'left' | 'right'>('right');
  const [ghosts, setGhosts] = useState<Ghost[]>([
    { x: 13, y: 11, color: '#ff0000', direction: 'up' },
    { x: 13, y: 13, color: '#ffb8ff', direction: 'down' },
    { x: 12, y: 13, color: '#00ffff', direction: 'left' },
    { x: 14, y: 13, color: '#ffb852', direction: 'right' }
  ]);

  // Simple maze (1 = wall, 0 = dot, 2 = empty, 3 = power pellet)
  const maze = [
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

  const [currentMaze, setCurrentMaze] = useState(maze.map(row => [...row]));

  const CELL_SIZE = 20;
  const CANVAS_WIDTH = maze[0].length * CELL_SIZE;
  const CANVAS_HEIGHT = maze.length * CELL_SIZE;

  const drawGame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw maze
    currentMaze.forEach((row, y) => {
      row.forEach((cell, x) => {
        const pixelX = x * CELL_SIZE;
        const pixelY = y * CELL_SIZE;

        switch (cell) {
          case 1: // Wall
            ctx.fillStyle = '#0000ff';
            ctx.fillRect(pixelX, pixelY, CELL_SIZE, CELL_SIZE);
            // Add neon glow effect
            if (settings.enableGlow) {
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
            if (settings.enableGlow) {
              ctx.shadowBlur = 8;
              ctx.shadowColor = '#ffff00';
              ctx.fill();
              ctx.shadowBlur = 0;
            }
            break;
        }
      });
    });

    // Draw Pac-Man
    ctx.fillStyle = '#ffff00';
    ctx.beginPath();
    ctx.arc(
      pacman.x * CELL_SIZE + CELL_SIZE/2,
      pacman.y * CELL_SIZE + CELL_SIZE/2,
      CELL_SIZE/2 - 2,
      0,
      Math.PI * 2
    );
    ctx.fill();

    // Add mouth based on direction
    ctx.fillStyle = '#000';
    ctx.beginPath();
    const centerX = pacman.x * CELL_SIZE + CELL_SIZE/2;
    const centerY = pacman.y * CELL_SIZE + CELL_SIZE/2;
    const radius = CELL_SIZE/2 - 2;
    
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
    
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.lineTo(centerX, centerY);
    ctx.fill();

    // Draw ghosts
    ghosts.forEach(ghost => {
      ctx.fillStyle = ghost.color;
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

      // Ghost eyes
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(ghostX - 3, ghostY - 4, 2, 0, Math.PI * 2);
      ctx.arc(ghostX + 3, ghostY - 4, 2, 0, Math.PI * 2);
      ctx.fill();

      // Eye pupils
      ctx.fillStyle = '#000';
      ctx.beginPath();
      ctx.arc(ghostX - 3, ghostY - 4, 1, 0, Math.PI * 2);
      ctx.arc(ghostX + 3, ghostY - 4, 1, 0, Math.PI * 2);
      ctx.fill();

      // Add glow effect
      if (settings.enableGlow) {
        ctx.shadowBlur = 8;
        ctx.shadowColor = ghost.color;
        ctx.fillStyle = ghost.color;
        ctx.beginPath();
        ctx.arc(ghostX, ghostY - 4, 8, Math.PI, 0);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    });
  }, [pacman, ghosts, currentMaze, pacmanDirection, settings.enableGlow]);

  const moveGhosts = useCallback(() => {
    setGhosts(prevGhosts => 
      prevGhosts.map(ghost => {
        const directions = ['up', 'down', 'left', 'right'] as const;
        const possibleDirections = directions.filter(dir => {
          let newX = ghost.x;
          let newY = ghost.y;
          
          switch (dir) {
            case 'up': newY--; break;
            case 'down': newY++; break;
            case 'left': newX--; break;
            case 'right': newX++; break;
          }
          
          return newX >= 0 && newX < maze[0].length && 
                 newY >= 0 && newY < maze.length && 
                 maze[newY][newX] !== 1;
        });

        const direction = possibleDirections[Math.floor(Math.random() * possibleDirections.length)] || ghost.direction;
        
        let newX = ghost.x;
        let newY = ghost.y;
        
        switch (direction) {
          case 'up': newY--; break;
          case 'down': newY++; break;
          case 'left': newX--; break;
          case 'right': newX++; break;
        }
        
        // Boundary check
        if (newX < 0 || newX >= maze[0].length || newY < 0 || newY >= maze.length || maze[newY][newX] === 1) {
          return ghost;
        }
        
        return { ...ghost, x: newX, y: newY, direction };
      })
    );
  }, []);

  const checkCollisions = useCallback(() => {
    // Check ghost collision
    const ghostCollision = ghosts.some(ghost => 
      Math.abs(ghost.x - pacman.x) < 1 && Math.abs(ghost.y - pacman.y) < 1
    );
    
    if (ghostCollision) {
      playSFX('game-over');
      setLives(prev => {
        const newLives = prev - 1;
        if (newLives <= 0) {
          setGameState('gameover');
          setShowGameOver(true);
          submitScore(score);
        } else {
          // Reset positions
          setPacman({ x: 13, y: 23 });
          setGhosts([
            { x: 13, y: 11, color: '#ff0000', direction: 'up' },
            { x: 13, y: 13, color: '#ffb8ff', direction: 'down' },
            { x: 12, y: 13, color: '#00ffff', direction: 'left' },
            { x: 14, y: 13, color: '#ffb852', direction: 'right' }
          ]);
        }
        return newLives;
      });
    }

    // Check dot collection
    if (currentMaze[pacman.y] && currentMaze[pacman.y][pacman.x] === 0) {
      playSFX('success');
      setScore(prev => prev + 10);
      setCurrentMaze(prev => {
        const newMaze = prev.map(row => [...row]);
        newMaze[pacman.y][pacman.x] = 2;
        return newMaze;
      });
    }

    // Check power pellet collection
    if (currentMaze[pacman.y] && currentMaze[pacman.y][pacman.x] === 3) {
      playSFX('power-up');
      setScore(prev => prev + 50);
      setCurrentMaze(prev => {
        const newMaze = prev.map(row => [...row]);
        newMaze[pacman.y][pacman.x] = 2;
        return newMaze;
      });
    }
  }, [pacman, ghosts, currentMaze, score, playSFX, submitScore]);

  // Game loop
  useEffect(() => {
    if (gameState !== 'playing') return;

    const gameLoop = setInterval(() => {
      moveGhosts();
      checkCollisions();
      drawGame();
    }, 200);

    return () => clearInterval(gameLoop);
  }, [gameState, moveGhosts, checkCollisions, drawGame]);

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

      let newDirection = pacmanDirection;
      let newX = pacman.x;
      let newY = pacman.y;

      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          newDirection = 'up';
          newY--;
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          newDirection = 'down';
          newY++;
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          newDirection = 'left';
          newX--;
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          newDirection = 'right';
          newX++;
          break;
        case 'Escape':
          onBackToSelect();
          return;
      }

      // Check if move is valid
      if (newX >= 0 && newX < maze[0].length && newY >= 0 && newY < maze.length && maze[newY][newX] !== 1) {
        setPacman({ x: newX, y: newY });
        setPacmanDirection(newDirection);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, pacman, pacmanDirection, onBackToSelect, playSFX]);

  const handleRestart = () => {
    setGameState('waiting');
    setShowGameOver(false);
    setScore(0);
    setLives(3);
    setLevel(1);
    setPacman({ x: 13, y: 23 });
    setPacmanDirection('right');
    setCurrentMaze(maze.map(row => [...row]));
    setGhosts([
      { x: 13, y: 11, color: '#ff0000', direction: 'up' },
      { x: 13, y: 13, color: '#ffb8ff', direction: 'down' },
      { x: 12, y: 13, color: '#00ffff', direction: 'left' },
      { x: 14, y: 13, color: '#ffb852', direction: 'right' }
    ]);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Game HUD */}
      <GameHUD 
        score={score}
        lives={lives}
        level={level}
        gameName="PAC-MAN"
        onBackToSelect={onBackToSelect}
      />

      {/* Game Canvas */}
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
          
          {/* Waiting Overlay */}
          {gameState === 'waiting' && (
            <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
              <div className="text-center">
                <div className={`text-2xl font-pixel font-bold text-arcade-neon-yellow mb-4 ${settings.enableGlow ? 'animate-neon-pulse' : 'animate-pixel-blink'}`}>
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

export default PacManGame;
