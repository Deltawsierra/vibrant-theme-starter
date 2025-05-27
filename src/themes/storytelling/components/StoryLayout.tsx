
import React, { useState } from 'react';
import StoryNavigation from './StoryNavigation';

interface StoryLayoutProps {
  children: React.ReactNode;
}

const StoryLayout: React.FC<StoryLayoutProps> = ({ children }) => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [currentChapter, setCurrentChapter] = useState(1);
  const [showNavigation, setShowNavigation] = useState(false);
  const totalChapters = 5;

  const toggleAudio = () => {
    setIsAudioPlaying(!isAudioPlaying);
  };

  return (
    <div className="min-h-screen bg-amber-50 text-amber-900 font-crimson">
      {/* Timeline Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-2 bg-amber-200 z-50">
        <div 
          className="h-full bg-amber-600 transition-all duration-500"
          style={{ width: `${(currentChapter / totalChapters) * 100}%` }}
        ></div>
      </div>

      {/* Navigation Toggle Button */}
      <button
        onClick={() => setShowNavigation(!showNavigation)}
        className="fixed top-4 left-4 z-50 w-12 h-12 bg-amber-200 text-amber-800 rounded-full shadow-lg border-2 border-amber-300 flex items-center justify-center hover:bg-amber-300 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400"
      >
        ☰
      </button>

      {/* Navigation */}
      <StoryNavigation isVisible={showNavigation} />

      {/* Chapter Progress Indicator */}
      <div className="fixed top-4 left-20 z-50 bg-amber-100 px-4 py-2 rounded-lg shadow-lg border border-amber-300">
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
        className="fixed top-4 right-4 z-50 w-12 h-12 bg-amber-600 text-white rounded-full shadow-lg border-2 border-amber-700 flex items-center justify-center hover:bg-amber-700 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400"
      >
        {isAudioPlaying ? '⏸' : '▶'}
      </button>

      {/* Main Story Page Area */}
      <main className="min-h-screen pt-12 pb-8 px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-amber-50 to-amber-100 shadow-2xl rounded-lg border border-amber-200 min-h-[calc(100vh-120px)] p-12">
            <div className="prose prose-amber prose-lg max-w-none">
              {children}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StoryLayout;
