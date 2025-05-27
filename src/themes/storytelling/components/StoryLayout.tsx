
import React, { useState } from 'react';

interface StoryLayoutProps {
  children: React.ReactNode;
}

const StoryLayout: React.FC<StoryLayoutProps> = ({ children }) => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [currentChapter, setCurrentChapter] = useState(1);
  const totalChapters = 5;

  const toggleAudio = () => {
    setIsAudioPlaying(!isAudioPlaying);
  };

  return (
    <div className="min-h-screen bg-amber-50 text-amber-900" style={{ fontFamily: '"Crimson Text", serif' }}>
      {/* Timeline Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-2 bg-amber-200 z-50">
        <div 
          className="h-full bg-amber-600 transition-all duration-500"
          style={{ width: `${(currentChapter / totalChapters) * 100}%` }}
        ></div>
      </div>

      {/* Chapter Progress Indicator */}
      <div className="fixed top-4 left-4 z-50 bg-amber-100 px-4 py-2 rounded-lg shadow-lg border border-amber-300">
        <div className="text-sm font-medium text-amber-800">
          Chapter {currentChapter} of {totalChapters}
        </div>
        <div className="flex space-x-1 mt-1">
          {Array.from({ length: totalChapters }, (_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${i < currentChapter ? 'bg-amber-600' : 'bg-amber-300'}`}
            ></div>
          ))}
        </div>
      </div>

      {/* Floating Audio Toggle */}
      <button
        onClick={toggleAudio}
        className="fixed top-4 right-4 z-50 w-12 h-12 bg-amber-600 text-white rounded-full shadow-lg border-2 border-amber-700 flex items-center justify-center"
      >
        {isAudioPlaying ? '⏸' : '▶'}
      </button>

      {/* Main Story Page Area */}
      <main className="min-h-screen pt-12 pb-8 px-8">
        <div className="max-w-4xl mx-auto">
          {/* Placeholder for page flip animation container */}
          <div className="story-page-container bg-white shadow-2xl rounded-lg border border-amber-200 min-h-[calc(100vh-120px)] p-12">
            {children}
          </div>
        </div>
      </main>

      {/* Story-specific styles for text */}
      <style jsx>{`
        .story-page-container {
          background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);
        }
        .story-page-container p {
          line-height: 1.8;
          font-size: 1.125rem;
          margin-bottom: 1.5rem;
        }
        .story-page-container h1, .story-page-container h2, .story-page-container h3 {
          font-weight: 600;
          margin-bottom: 1rem;
          color: #92400e;
        }
      `}</style>
    </div>
  );
};

export default StoryLayout;
