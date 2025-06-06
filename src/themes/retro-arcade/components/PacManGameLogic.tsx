
import { useEffect } from 'react';
import { GameState } from '../types/pacmanTypes';
import { GAME_LOOP_INTERVAL } from '../constants/pacmanConstants';

interface PacManGameLogicProps {
  gameState: GameState;
  moveGhosts: () => void;
  checkCollisions: () => void;
  drawGame: () => void;
}

const PacManGameLogic: React.FC<PacManGameLogicProps> = ({
  gameState,
  moveGhosts,
  checkCollisions,
  drawGame
}) => {
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

  return null; // This component only handles game logic
};

export default PacManGameLogic;
