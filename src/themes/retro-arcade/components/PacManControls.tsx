
import { useEffect } from 'react';
import { Direction, GameState } from '../types/pacmanTypes';

interface PacManControlsProps {
  gameState: GameState;
  movePacman: (direction: Direction) => void;
  startGame: () => void;
  onBackToSelect: () => void;
}

const PacManControls: React.FC<PacManControlsProps> = ({
  gameState,
  movePacman,
  startGame,
  onBackToSelect
}) => {
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

  return null; // This component only handles event listeners
};

export default PacManControls;
