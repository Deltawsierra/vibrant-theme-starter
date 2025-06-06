
import { useState, useCallback } from 'react';
import { Position, Bullet, Invader, GameState } from '../types/gameTypes';
import { 
  CANVAS_WIDTH, 
  CANVAS_HEIGHT, 
  INITIAL_INVADER_SPEED, 
  BULLET_SPEED_UP, 
  BULLET_SPEED_DOWN,
  INITIAL_LIVES,
  INITIAL_LEVEL
} from '../constants/spaceInvadersConstants';
import { 
  initializeInvaders, 
  shouldInvadersMoveDown, 
  checkInvadersReachedGround, 
  allInvadersDestroyed 
} from '../utils/spaceInvadersUtils';

export const useSpaceInvadersGame = (
  playSFX: (sfxType: string) => void,
  submitScore: (score: number) => void
) => {
  const [gameState, setGameState] = useState<GameState>('waiting');
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(INITIAL_LIVES);
  const [level, setLevel] = useState(INITIAL_LEVEL);
  const [showGameOver, setShowGameOver] = useState(false);

  const [player, setPlayer] = useState<Position>({ x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT - 40 });
  const [bullets, setBullets] = useState<Bullet[]>([]);
  const [invaders, setInvaders] = useState<Invader[]>([]);
  const [invaderDirection, setInvaderDirection] = useState<'left' | 'right'>('right');
  const [invaderSpeed, setInvaderSpeed] = useState(INITIAL_INVADER_SPEED);

  const initializeGame = useCallback(() => {
    setInvaders(initializeInvaders());
  }, []);

  const moveInvaders = useCallback(() => {
    setInvaders(prevInvaders => {
      const aliveInvaders = prevInvaders.filter(inv => inv.alive);
      if (aliveInvaders.length === 0) return prevInvaders;

      const shouldMoveDown = shouldInvadersMoveDown(prevInvaders, invaderDirection);
      let newDirection = invaderDirection;

      if (shouldMoveDown) {
        newDirection = invaderDirection === 'right' ? 'left' : 'right';
        setInvaderDirection(newDirection);
      }

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
          y: bullet.direction === 'up' ? bullet.y - BULLET_SPEED_UP : bullet.y + BULLET_SPEED_DOWN
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

    if (allInvadersDestroyed(invaders)) {
      setLevel(prev => prev + 1);
      setInvaderSpeed(prev => prev + 0.5);
      setInvaders(initializeInvaders());
      playSFX('power-up');
    }

    if (checkInvadersReachedGround(invaders)) {
      setGameState('gameover');
      setShowGameOver(true);
      submitScore(score);
      playSFX('game-over');
    }
  }, [invaders, player, score, playSFX, submitScore]);

  const spawnInvaderBullets = useCallback(() => {
    const aliveInvaders = invaders.filter(inv => inv.alive);
    if (aliveInvaders.length === 0) return;

    if (Math.random() < 0.02) {
      const randomInvader = aliveInvaders[Math.floor(Math.random() * aliveInvaders.length)];
      setBullets(prev => [...prev, {
        x: randomInvader.x,
        y: randomInvader.y + 10,
        direction: 'down'
      }]);
    }
  }, [invaders]);

  const handleRestart = () => {
    setGameState('waiting');
    setShowGameOver(false);
    setScore(0);
    setLives(INITIAL_LIVES);
    setLevel(INITIAL_LEVEL);
    setPlayer({ x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT - 40 });
    setBullets([]);
    setInvaderDirection('right');
    setInvaderSpeed(INITIAL_INVADER_SPEED);
    setInvaders(initializeInvaders());
  };

  return {
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
    invaderDirection,
    invaderSpeed,
    initializeGame,
    moveInvaders,
    moveBullets,
    checkCollisions,
    spawnInvaderBullets,
    handleRestart
  };
};
