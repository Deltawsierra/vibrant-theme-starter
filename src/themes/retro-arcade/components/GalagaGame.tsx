
import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useScores } from '@/hooks/useScores';

interface GameState {
  score: number;
  lives: number;
  gameOver: boolean;
  gameStarted: boolean;
  playerX: number;
  enemies: Array<{ id: number; x: number; y: number }>;
  bullets: Array<{ id: number; x: number; y: number }>;
}

const GalagaGame = () => {
  const { user } = useAuth();
  const { submitScore, userBestScore } = useScores('galaga');
  
  const [gameState, setGameState] = useState<GameState>({
    score: 0,
    lives: 3,
    gameOver: false,
    gameStarted: false,
    playerX: 50,
    enemies: [],
    bullets: []
  });

  const startGame = () => {
    setGameState({
      score: 0,
      lives: 3,
      gameOver: false,
      gameStarted: true,
      playerX: 50,
      enemies: [
        { id: 1, x: 10, y: 10 },
        { id: 2, x: 30, y: 10 },
        { id: 3, x: 50, y: 10 },
        { id: 4, x: 70, y: 10 },
        { id: 5, x: 90, y: 10 }
      ],
      bullets: []
    });
  };

  const endGame = useCallback(async () => {
    setGameState(prev => ({ ...prev, gameOver: true, gameStarted: false }));
    
    if (user && gameState.score > 0) {
      await submitScore(gameState.score);
    }
  }, [user, gameState.score, submitScore]);

  const shoot = () => {
    if (!gameState.gameStarted || gameState.gameOver) return;
    
    setGameState(prev => ({
      ...prev,
      bullets: [...prev.bullets, { id: Date.now(), x: prev.playerX, y: 90 }]
    }));
  };

  const movePlayer = (direction: 'left' | 'right') => {
    if (!gameState.gameStarted || gameState.gameOver) return;
    
    setGameState(prev => ({
      ...prev,
      playerX: Math.max(0, Math.min(100, prev.playerX + (direction === 'left' ? -5 : 5)))
    }));
  };

  // Game loop
  useEffect(() => {
    if (!gameState.gameStarted || gameState.gameOver) return;

    const gameLoop = setInterval(() => {
      setGameState(prev => {
        let newState = { ...prev };
        
        // Move bullets
        newState.bullets = newState.bullets
          .map(bullet => ({ ...bullet, y: bullet.y - 5 }))
          .filter(bullet => bullet.y > 0);
        
        // Move enemies
        newState.enemies = newState.enemies.map(enemy => ({
          ...enemy,
          y: enemy.y + 0.5
        }));
        
        // Check bullet-enemy collisions
        newState.bullets.forEach(bullet => {
          newState.enemies.forEach(enemy => {
            if (
              Math.abs(bullet.x - enemy.x) < 5 &&
              Math.abs(bullet.y - enemy.y) < 5
            ) {
              newState.score += 100;
              newState.bullets = newState.bullets.filter(b => b.id !== bullet.id);
              newState.enemies = newState.enemies.filter(e => e.id !== enemy.id);
            }
          });
        });
        
        // Check if enemies reached bottom
        if (newState.enemies.some(enemy => enemy.y > 95)) {
          newState.lives -= 1;
          newState.enemies = newState.enemies.filter(enemy => enemy.y <= 95);
        }
        
        // Check game over
        if (newState.lives <= 0) {
          newState.gameOver = true;
          newState.gameStarted = false;
        }
        
        // Spawn new enemies if all destroyed
        if (newState.enemies.length === 0) {
          newState.enemies = Array.from({ length: 5 }, (_, i) => ({
            id: Date.now() + i,
            x: 10 + i * 20,
            y: 10
          }));
        }
        
        return newState;
      });
    }, 100);

    return () => clearInterval(gameLoop);
  }, [gameState.gameStarted, gameState.gameOver]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          movePlayer('left');
          break;
        case 'ArrowRight':
          movePlayer('right');
          break;
        case ' ':
          e.preventDefault();
          shoot();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameState.gameStarted, gameState.gameOver]);

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <div className="bg-black text-green-400 font-mono rounded-lg overflow-hidden">
        {/* Game Stats */}
        <div className="p-4 bg-gray-900 flex justify-between items-center">
          <div>Score: {gameState.score}</div>
          <div>Lives: {gameState.lives}</div>
          <div>Best: {userBestScore}</div>
        </div>
        
        {/* Game Area */}
        <div className="relative w-full h-96 bg-black overflow-hidden">
          {!gameState.gameStarted && !gameState.gameOver && (
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={startGame}
                className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Start Game
              </button>
            </div>
          )}
          
          {gameState.gameOver && (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-center mb-4">
                <div className="text-2xl mb-2">Game Over!</div>
                <div className="mb-2">Final Score: {gameState.score}</div>
                {user ? (
                  <div className="text-sm text-gray-400">Score saved to leaderboard</div>
                ) : (
                  <div className="text-sm text-yellow-400">Login to save your score!</div>
                )}
              </div>
              <button
                onClick={startGame}
                className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Play Again
              </button>
            </div>
          )}
          
          {gameState.gameStarted && (
            <>
              {/* Player */}
              <div
                className="absolute w-4 h-4 bg-green-400"
                style={{
                  left: `${gameState.playerX}%`,
                  bottom: '20px',
                  transform: 'translateX(-50%)'
                }}
              />
              
              {/* Enemies */}
              {gameState.enemies.map(enemy => (
                <div
                  key={enemy.id}
                  className="absolute w-4 h-4 bg-red-400"
                  style={{
                    left: `${enemy.x}%`,
                    top: `${enemy.y}%`,
                    transform: 'translateX(-50%)'
                  }}
                />
              ))}
              
              {/* Bullets */}
              {gameState.bullets.map(bullet => (
                <div
                  key={bullet.id}
                  className="absolute w-1 h-3 bg-yellow-400"
                  style={{
                    left: `${bullet.x}%`,
                    top: `${bullet.y}%`,
                    transform: 'translateX(-50%)'
                  }}
                />
              ))}
            </>
          )}
        </div>
        
        {/* Controls */}
        <div className="p-4 bg-gray-900 text-center text-sm">
          <div className="mb-2">Controls: Arrow Keys to move, Space to shoot</div>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => movePlayer('left')}
              className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
              disabled={!gameState.gameStarted || gameState.gameOver}
            >
              ←
            </button>
            <button
              onClick={shoot}
              className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
              disabled={!gameState.gameStarted || gameState.gameOver}
            >
              Shoot
            </button>
            <button
              onClick={() => movePlayer('right')}
              className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
              disabled={!gameState.gameStarted || gameState.gameOver}
            >
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalagaGame;
