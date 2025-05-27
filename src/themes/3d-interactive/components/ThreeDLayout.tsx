
import React, { useState } from 'react';
import ThreeDNavigation from './ThreeDNavigation';
import LoadingOverlay from './LoadingOverlay';
import { useDeviceCapabilities } from './MotionHooks';
import { useThreeD } from '../context/ThreeDContext';

interface ThreeDLayoutProps {
  children: React.ReactNode;
}

const ThreeDLayout: React.FC<ThreeDLayoutProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { fallbackMode } = useDeviceCapabilities();
  const { 
    isMinimapVisible, 
    toggleMinimap, 
    resetCamera,
    interactiveObjects 
  } = useThreeD();

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white overflow-hidden relative">
      {/* Loading Overlay */}
      <LoadingOverlay 
        isVisible={isLoading} 
        onComplete={handleLoadingComplete}
        fallbackMode={fallbackMode}
      />

      {/* Navigation */}
      <ThreeDNavigation />

      {/* Side Control Panel */}
      <div className="fixed left-4 top-24 bg-slate-800 bg-opacity-90 backdrop-blur-sm rounded-lg p-4 z-30 border border-slate-700">
        <div className="space-y-3">
          <button
            onClick={resetCamera}
            className="w-full px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Reset Camera
          </button>
          <div className="text-xs text-gray-400">
            <div>Controls:</div>
            <div>Click & Drag: Rotate</div>
            <div>Scroll: Zoom</div>
            <div>Arrow Keys: Move</div>
          </div>
          <div className="text-xs text-blue-400">
            <div>Objects: {interactiveObjects.length}</div>
            <div>Highlighted: {interactiveObjects.filter(obj => obj.isHighlighted).length}</div>
          </div>
          {fallbackMode && (
            <div className="text-xs text-yellow-400 bg-yellow-400/10 p-2 rounded">
              Fallback Mode Active
            </div>
          )}
        </div>
      </div>

      {/* Minimap Toggle */}
      <button
        onClick={toggleMinimap}
        className="fixed top-4 right-4 z-50 px-3 py-1 text-sm bg-slate-700 text-gray-300 rounded hover:bg-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        {isMinimapVisible ? 'Hide Map' : 'Show Map'}
      </button>

      {/* Minimap */}
      {isMinimapVisible && (
        <div className="fixed bottom-4 right-4 w-48 h-32 bg-slate-800 bg-opacity-90 backdrop-blur-sm rounded-lg border border-slate-700 z-30">
          <div className="p-2">
            <div className="text-xs text-gray-400 mb-2">Scene Overview</div>
            <div className="w-full h-20 bg-slate-700 rounded relative">
              <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-500">
                {interactiveObjects.length > 0 ? `${interactiveObjects.length} Objects` : 'Minimap Placeholder'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main 3D Viewport Container */}
      <main className="pt-16 min-h-screen">
        <div className="w-full h-[calc(100vh-4rem)] bg-gradient-to-br from-slate-900 to-slate-800 relative">
          <div id="threejs-container" className="w-full h-full">
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center text-gray-400">
                <div className="text-2xl mb-4">3D Scene Placeholder</div>
                <div className="text-sm">Three.js integration coming in Phase 3</div>
                {fallbackMode && (
                  <div className="text-xs text-yellow-400 mt-2">
                    Running in compatibility mode
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="absolute inset-0 pointer-events-none">
            <div className="pointer-events-auto">
              {children}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ThreeDLayout;
