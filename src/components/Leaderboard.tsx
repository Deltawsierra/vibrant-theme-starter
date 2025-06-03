
import React from 'react';
import { useScores } from '@/hooks/useScores';

interface LeaderboardProps {
  gameType?: string;
  className?: string;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ gameType = 'galaga', className = '' }) => {
  const { scores, loading } = useScores(gameType);

  if (loading) {
    return (
      <div className={`p-4 ${className}`}>
        <h3 className="text-lg font-bold mb-4">Leaderboard</h3>
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className={`p-4 ${className}`}>
      <h3 className="text-lg font-bold mb-4">Top 10 Scores</h3>
      {scores.length === 0 ? (
        <div className="text-gray-500">No scores yet. Be the first to play!</div>
      ) : (
        <div className="space-y-2">
          {scores.map((score, index) => (
            <div
              key={score.id}
              className="flex justify-between items-center p-2 bg-gray-100 rounded"
            >
              <div className="flex items-center space-x-3">
                <span className="font-bold text-gray-600">#{index + 1}</span>
                <span className="text-gray-800">
                  {score.profiles?.username || 'Anonymous'}
                </span>
              </div>
              <span className="font-mono text-gray-900">{score.score}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
