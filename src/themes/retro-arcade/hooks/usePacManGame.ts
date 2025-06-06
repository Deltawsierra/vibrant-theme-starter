
import { useState, useCallback } from 'react';
import { Position, Ghost, Direction, GameState, CellType } from '../types/pacmanTypes';
import { MAZE, INITIAL_PACMAN_POSITION, INITIAL_PACMAN_DIRECTION, INITIAL_GHOSTS, INITIAL_LIVES, INITIAL_LEVEL, DOT_SCORE, POWER_PELLET_SCORE } from '../constants/pacmanConstants';
import { isValidMove, isGhostCollision, getNewPosition, getValidGhostDirections } from '../utils/pacmanUtils';

export const usePacManGame = (playSFX: (type: string) => void, submitScore: (score: number) => void) => {
  const [gameState, setGameState] = useState<GameState>('waiting');
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(INITIAL_LIVES);
  const [level, setLevel] = useState(INITIAL_LEVEL);
  const [showGameOver, setShowGameOver] = useState(false);

  const [pacman, setPacman] = useState<Position>(INITIAL_PACMAN_POSITION);
  const [pacmanDirection, setPacmanDirection] = useState<Direction>(INITIAL_PACMAN_DIRECTION);
  const [ghosts, setGhosts] = useState<Ghost[]>(INITIAL_GHOSTS);
  const [currentMaze, setCurrentMaze] = useState<CellType[][]>(MAZE.map(row => [...row]) as CellType[][]);

  const moveGhosts = useCallback(() => {
    setGhosts(prevGhosts => 
      prevGhosts.map(ghost => {
        const possibleDirections = getValidGhostDirections(ghost);
        const direction = possibleDirections[Math.floor(Math.random() * possibleDirections.length)] || ghost.direction;
        const newPos = getNewPosition(ghost, direction);
        
        if (!isValidMove(newPos.x, newPos.y)) {
          return ghost;
        }
        
        return { ...ghost, x: newPos.x, y: newPos.y, direction };
      })
    );
  }, []);

  const checkCollisions = useCallback(() => {
    // Check ghost collision
    if (isGhostCollision(pacman, ghosts)) {
      playSFX('game-over');
      setLives(prev => {
        const newLives = prev - 1;
        if (newLives <= 0) {
          setGameState('gameover');
          setShowGameOver(true);
          submitScore(score);
        } else {
          // Reset positions
          setPacman(INITIAL_PACMAN_POSITION);
          setGhosts(INITIAL_GHOSTS);
        }
        return newLives;
      });
    }

    // Check dot collection
    if (currentMaze[pacman.y] && currentMaze[pacman.y][pacman.x] === 0) {
      playSFX('success');
      setScore(prev => prev + DOT_SCORE);
      setCurrentMaze(prev => {
        const newMaze = prev.map(row => [...row]);
        newMaze[pacman.y][pacman.x] = 2;
        return newMaze;
      });
    }

    // Check power pellet collection
    if (currentMaze[pacman.y] && currentMaze[pacman.y][pacman.x] === 3) {
      playSFX('power-up');
      setScore(prev => prev + POWER_PELLET_SCORE);
      setCurrentMaze(prev => {
        const newMaze = prev.map(row => [...row]);
        newMaze[pacman.y][pacman.x] = 2;
        return newMaze;
      });
    }
  }, [pacman, ghosts, currentMaze, score, playSFX, submitScore]);

  const movePacman = useCallback((direction: Direction) => {
    const newPos = getNewPosition(pacman, direction);
    
    if (isValidMove(newPos.x, newPos.y)) {
      setPacman(newPos);
      setPacmanDirection(direction);
    }
  }, [pacman]);

  const handleRestart = useCallback(() => {
    setGameState('waiting');
    setShowGameOver(false);
    setScore(0);
    setLives(INITIAL_LIVES);
    setLevel(INITIAL_LEVEL);
    setPacman(INITIAL_PACMAN_POSITION);
    setPacmanDirection(INITIAL_PACMAN_DIRECTION);
    setCurrentMaze(MAZE.map(row => [...row]) as CellType[][]);
    setGhosts(INITIAL_GHOSTS);
  }, []);

  const startGame = useCallback(() => {
    setGameState('playing');
    playSFX('coin-insert');
  }, [playSFX]);

  return {
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
  };
};
