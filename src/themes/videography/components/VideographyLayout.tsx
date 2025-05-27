
import React, { useState } from 'react';
import VideographyNavigation from './VideographyNavigation';
import { useVideo } from '../context/VideoContext';

interface VideographyLayoutProps {
  children: React.ReactNode;
  mode?: 'cinematic' | 'editorial';
}

const VideographyLayout: React.FC<VideographyLayoutProps> = ({ 
  children, 
  mode: propMode
}) => {
  const { 
    mode, 
    setMode, 
    isLeftDrawerOpen, 
    isRightDrawerOpen, 
    toggleLeftDrawer, 
    toggleRightDrawer 
  } = useVideo();
  
  // Use prop mode if provided, otherwise use context mode
  const currentMode = propMode || mode;
  const [showLightbox, setShowLightbox] = useState(false);

  const cinematicClasses = "bg-black text-white";
  const editorialClasses = "bg-white text-gray-900";

  const currentClasses = currentMode === 'cinematic' ? cinematicClasses : editorialClasses;

  const handleModeToggle = () => {
    const newMode = currentMode === 'cinematic' ? 'editorial' : 'cinematic';
    setMode(newMode);
  };

  return (
    <div className={`min-h-screen ${currentClasses} relative overflow-hidden`}>
      {/* Navigation */}
      <VideographyNavigation mode={currentMode} onModeToggle={handleModeToggle} />

      {/* Left Drawer */}
      <div className={`fixed left-0 top-0 h-full w-80 transform transition-transform duration-300 z-30 ${
        isLeftDrawerOpen ? 'translate-x-0' : '-translate-x-full'
      } ${
        currentMode === 'cinematic' 
          ? 'bg-gray-900 bg-opacity-95 border-gray-700' 
          : 'bg-white bg-opacity-95 border-gray-300'
      } backdrop-blur-sm border-r`}>
        <div className="p-6 pt-24">
          <h3 className={`text-lg font-bold mb-4 ${
            currentMode === 'cinematic' ? 'text-white' : 'text-gray-900'
          }`}>
            Project Info
          </h3>
          <div className="space-y-4">
            <div>
              <h4 className={`font-medium mb-2 ${
                currentMode === 'cinematic' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Behind the Scenes
              </h4>
              <p className={`text-sm ${
                currentMode === 'cinematic' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Placeholder for behind-the-scenes content and production notes.
              </p>
            </div>
          </div>
        </div>
        <button
          onClick={toggleLeftDrawer}
          className={`absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center ${
            currentMode === 'cinematic'
              ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          } focus:outline-none focus:ring-2 focus:ring-blue-400`}
        >
          ×
        </button>
      </div>

      {/* Right Drawer */}
      <div className={`fixed right-0 top-0 h-full w-80 transform transition-transform duration-300 z-30 ${
        isRightDrawerOpen ? 'translate-x-0' : 'translate-x-full'
      } ${
        currentMode === 'cinematic' 
          ? 'bg-gray-900 bg-opacity-95 border-gray-700' 
          : 'bg-white bg-opacity-95 border-gray-300'
      } backdrop-blur-sm border-l`}>
        <div className="p-6 pt-24">
          <h3 className={`text-lg font-bold mb-4 ${
            currentMode === 'cinematic' ? 'text-white' : 'text-gray-900'
          }`}>
            Downloads & Actions
          </h3>
          <div className="space-y-4">
            <button className={`w-full py-2 px-4 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              currentMode === 'cinematic'
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}>
              Download HD Version
            </button>
          </div>
        </div>
        <button
          onClick={toggleRightDrawer}
          className={`absolute top-4 left-4 w-8 h-8 rounded-full flex items-center justify-center ${
            currentMode === 'cinematic'
              ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          } focus:outline-none focus:ring-2 focus:ring-blue-400`}
        >
          ×
        </button>
      </div>

      {/* Main Spotlight Video Area */}
      <main className="pt-20 pb-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="aspect-video bg-gray-800 rounded-lg mb-8 relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={() => setShowLightbox(true)}
                className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-white text-2xl hover:bg-opacity-30 transition-all focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                ▶
              </button>
            </div>
          </div>
          {children}
        </div>
      </main>

      {/* Drawer Toggle Buttons */}
      <button
        onClick={toggleLeftDrawer}
        className={`fixed left-4 top-1/2 transform -translate-y-1/2 w-10 h-16 rounded-r-lg flex items-center justify-center z-20 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 ${
          currentMode === 'cinematic'
            ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        ▶
      </button>

      <button
        onClick={toggleRightDrawer}
        className={`fixed right-4 top-1/2 transform -translate-y-1/2 w-10 h-16 rounded-l-lg flex items-center justify-center z-20 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 ${
          currentMode === 'cinematic'
            ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        ◀
      </button>

      {/* Lightbox Modal Placeholder */}
      {showLightbox && (
        <div className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50">
          <div className="relative w-full max-w-6xl mx-4">
            <div className="aspect-video bg-gray-900 rounded-lg">
              <div className="w-full h-full flex items-center justify-center text-white">
                Video Lightbox Placeholder
              </div>
            </div>
            <button
              onClick={() => setShowLightbox(false)}
              className="absolute top-4 right-4 w-10 h-10 bg-black bg-opacity-50 rounded-full flex items-center justify-center text-white hover:bg-opacity-70 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideographyLayout;
