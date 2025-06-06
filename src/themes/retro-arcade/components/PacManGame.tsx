
import React, { useState } from 'react';
import { useArcade } from '../context/ArcadeContext';
import { useAuth } from '@/context/AuthContext';
import GameHUD from './GameHUD';
import GameOverScreen from './GameOverScreen';
import ArcadeAuthModal from './ArcadeAuthModal';
import PacManControls from './PacManControls';
import PacManCanvas from './PacManCanvas';
import PacManGameLogic from './PacManGameLogic';
import { useScores } from '../../../hooks/useScores';
import { usePacManGame } from '../hooks/usePacManGame';
import { usePacManRenderer } from './PacManRenderer';
import { CELL_SIZE, MAZE } from '../constants/pacmanConstants';

interface PacManGameProps {
  onBackToSelect: () => void;
}

const PacManGame: React.FC<PacManGameProps> = ({ onBackToSelect }) => {
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
    canvasRef: { current: null },
    pacman,
    pacmanDirection,
    ghosts,
    currentMaze,
    enableGlow: settings.enableGlow,
    canvasWidth: CANVAS_WIDTH,
    canvasHeight: CANVAS_HEIGHT
  });

  // Track pellets and ghosts eaten for achievements
  // This would be better tracked in the game logic, but for now we can estimate
  // based on score increases

  return (
    <div className="h-full flex flex-col">
      <GameHUD 
        score={score}
        lives={lives}
        level={level}
        gameName="PAC-MAN"
        onBackToSelect={onBackToSelect}
      />

      <PacManCanvas
        gameState={gameState}
        pacman={pacman}
        pacmanDirection={pacmanDirection}
        ghosts={ghosts}
        currentMaze={currentMaze}
        enableGlow={settings.enableGlow}
        showAuthModal={showAuthModal}
        setShowAuthModal={setShowAuthModal}
      />

      <PacManControls
        gameState={gameState}
        movePacman={movePacman}
        startGame={startGame}
        onBackToSelect={onBackToSelect}
      />

      <PacManGameLogic
        gameState={gameState}
        moveGhosts={moveGhosts}
        checkCollisions={checkCollisions}
        drawGame={drawGame}
      />

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
