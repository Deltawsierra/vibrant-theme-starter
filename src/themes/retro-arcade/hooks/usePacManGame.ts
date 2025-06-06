
import { useState, useCallback, useRef, useEffect } from 'react';
import { Position, Ghost, Direction, GameState, CellType } from '../types/pacmanTypes';
import { 
  MAZE, 
  INITIAL_PACMAN_POSITION, 
  INITIAL_PACMAN_DIRECTION, 
  INITIAL_GHOSTS, 
  INITIAL_LIVES, 
  INITIAL_LEVEL, 
  DOT_SCORE, 
  POWER_PELLET_SCORE, 
  GHOST_SCORE,
  POWER_PELLET_DURATION,
  GHOST_RESPAWN_DURATION,
  GHOST_SPAWN_POSITION
} from '../constants/pacmanConstants';
import { isValidMove, isGhostCollision, getNewPosition, getValidGhostDirections, getEatenGhost } from '../utils/pacmanUtils';

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
  
  const powerPelletTimerRef = useRef<NodeJS.Timeout | null>(null);

  const countRemainingPellets = useCallback((maze: CellType[][]) => {
    return maze.flat().filter(cell => cell === 0 || cell === 3).length;
  }, []);

  const makeGhostsVulnerable = useCallback(() => {
    console.log('Making ghosts vulnerable for', POWER_PELLET_DURATION / 1000, 'seconds');
    setGhosts(prev => prev.map(ghost => ({ ...ghost, isVulnerable: true })));
    
    // Clear existing timer if any
    if (powerPelletTimerRef.current) {
      clearTimeout(powerPelletTimerRef.current);
    }
    
    // Set timer to make ghosts normal again
    powerPelletTimerRef.current = setTimeout(() => {
      console.log('Power pellet effect ending - ghosts returning to normal');
      setGhosts(prev => prev.map(ghost => ({ ...ghost, isVulnerable: false })));
    }, POWER_PELLET_DURATION);
  }, []);

  const respawnGhost = useCallback((ghostIndex: number) => {
    console.log('Respawning ghost', ghostIndex);
    setGhosts(prev => prev.map((ghost, index) => 
      index === ghostIndex 
        ? { 
            ...ghost, 
            x: GHOST_SPAWN_POSITION.x, 
            y: GHOST_SPAWN_POSITION.y, 
            isRespawning: true, 
            respawnTimer: GHOST_RESPAWN_DURATION,
            isVulnerable: false
          }
        : ghost
    ));

    // Timer to allow ghost to move again
    setTimeout(() => {
      setGhosts(prev => prev.map((ghost, index) => 
        index === ghostIndex 
          ? { ...ghost, isRespawning: false, respawnTimer: 0 }
          : ghost
      ));
    }, GHOST_RESPAWN_DURATION);
  }, []);

  const nextLevel = useCallback(() => {
    console.log('Level completed! Moving to next level');
    playSFX('power-up');
    setLevel(prev => prev + 1);
    
    // Reset maze with all pellets
    setCurrentMaze(MAZE.map(row => [...row]) as CellType[][]);
    
    // Reset positions
    setPacman(INITIAL_PACMAN_POSITION);
    setPacmanDirection(INITIAL_PACMAN_DIRECTION);
    setGhosts(INITIAL_GHOSTS);
    
    // Clear power pellet timer
    if (powerPelletTimerRef.current) {
      clearTimeout(powerPelletTimerRef.current);
      powerPelletTimerRef.current = null;
    }
  }, [playSFX]);

  const moveGhosts = useCallback(() => {
    setGhosts(prevGhosts => 
      prevGhosts.map(ghost => {
        // Don't move if respawning
        if (ghost.isRespawning) {
          return ghost;
        }

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
    console.log('Checking collisions - Pac-Man:', pacman, 'Ghosts:', ghosts.map(g => ({x: g.x, y: g.y, vulnerable: g.isVulnerable, respawning: g.isRespawning})));
    
    // Check if Pac-Man can eat a vulnerable ghost
    const eatenGhost = getEatenGhost(pacman, ghosts);
    if (eatenGhost) {
      const ghostIndex = ghosts.findIndex(g => g === eatenGhost);
      console.log('Pac-Man ate ghost', ghostIndex);
      playSFX('power-up');
      setScore(prev => prev + GHOST_SCORE);
      respawnGhost(ghostIndex);
      return; // Don't check for death if we ate a ghost
    }
    
    // Check ghost collision (only with non-vulnerable, non-respawning ghosts)
    if (isGhostCollision(pacman, ghosts.filter(g => !g.isVulnerable))) {
      console.log('Ghost collision detected!');
      playSFX('game-over');
      setLives(prev => {
        const newLives = prev - 1;
        if (newLives <= 0) {
          setGameState('gameover');
          setShowGameOver(true);
          submitScore(score);
        } else {
          // Reset positions
          console.log('Resetting positions due to collision');
          setPacman(INITIAL_PACMAN_POSITION);
          setGhosts(INITIAL_GHOSTS);
          // Clear power pellet timer on death
          if (powerPelletTimerRef.current) {
            clearTimeout(powerPelletTimerRef.current);
            powerPelletTimerRef.current = null;
          }
        }
        return newLives;
      });
    }

    // Check dot collection
    if (currentMaze[pacman.y] && currentMaze[pacman.y][pacman.x] === 0) {
      console.log('Dot collected at:', pacman);
      playSFX('success');
      setScore(prev => prev + DOT_SCORE);
      setCurrentMaze(prev => {
        const newMaze = prev.map(row => [...row]);
        newMaze[pacman.y][pacman.x] = 2;
        
        // Check if level is complete
        if (countRemainingPellets(newMaze) === 0) {
          setTimeout(() => nextLevel(), 1000); // Brief delay before next level
        }
        
        return newMaze;
      });
    }

    // Check power pellet collection
    if (currentMaze[pacman.y] && currentMaze[pacman.y][pacman.x] === 3) {
      console.log('Power pellet collected at:', pacman);
      playSFX('power-up');
      setScore(prev => prev + POWER_PELLET_SCORE);
      makeGhostsVulnerable();
      setCurrentMaze(prev => {
        const newMaze = prev.map(row => [...row]);
        newMaze[pacman.y][pacman.x] = 2;
        
        // Check if level is complete
        if (countRemainingPellets(newMaze) === 0) {
          setTimeout(() => nextLevel(), 1000); // Brief delay before next level
        }
        
        return newMaze;
      });
    }
  }, [pacman, ghosts, currentMaze, score, playSFX, submitScore, makeGhostsVulnerable, respawnGhost, countRemainingPellets, nextLevel]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (powerPelletTimerRef.current) {
        clearTimeout(powerPelletTimerRef.current);
      }
    };
  }, []);

  const movePacman = useCallback((direction: Direction) => {
    const newPos = getNewPosition(pacman, direction);
    console.log('Attempting to move Pac-Man from:', pacman, 'to:', newPos, 'direction:', direction);
    
    if (isValidMove(newPos.x, newPos.y)) {
      console.log('Move is valid, updating position');
      setPacman(newPos);
      setPacmanDirection(direction);
    } else {
      console.log('Move is invalid - blocked by wall');
    }
  }, [pacman]);

  const handleRestart = useCallback(() => {
    console.log('Restarting game');
    // Clear power pellet timer
    if (powerPelletTimerRef.current) {
      clearTimeout(powerPelletTimerRef.current);
      powerPelletTimerRef.current = null;
    }
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
    console.log('Starting game with Pac-Man at:', INITIAL_PACMAN_POSITION);
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
