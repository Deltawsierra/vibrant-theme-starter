
import React, { useState } from 'react';

interface ThreeDLayoutProps {
  children: React.ReactNode;
}

const ThreeDLayout: React.FC<ThreeDLayoutProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showMinimap, setShowMinimap] = useState(true);

  const resetCamera = () => {
    console.log('Reset camera position');
    // Future: Reset 3D camera to default position
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white overflow-hidden relative">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
            <p className="text-blue-400">Loading 3D Environment...</p>
          </div>
        </div>
      )}

      {/* Top Navigation Bar */}
      <nav className="fixed top-0 left-0 w-full bg-slate-800 bg-opacity-90 backdrop-blur-sm border-b border-slate-700 z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex space-x-8">
              <div className="text-lg font-bold text-blue-400">3D Portfolio</div>
              <div className="flex space-x-6">
                <button className="text-gray-300 hover:text-white transition-colors">About</button>
                <button className="text-gray-300 hover:text-white transition-colors">Work</button>
                <button className="text-gray-300 hover:text-white transition-colors">Contact</button>
                <button className="text-gray-300 hover:text-white transition-colors">Showcase</button>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowMinimap(!showMinimap)}
                className="px-3 py-1 text-sm bg-slate-700 text-gray-300 rounded hover:bg-slate-600 transition-colors"
              >
                {showMinimap ? 'Hide Map' : 'Show Map'}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Side Control Panel */}
      <div className="fixed left-4 top-24 bg-slate-800 bg-opacity-90 backdrop-blur-sm rounded-lg p-4 z-30 border border-slate-700">
        <div className="space-y-3">
          <button
            onClick={resetCamera}
            className="w-full px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
          >
            Reset Camera
          </button>
          <div className="text-xs text-gray-400">
            <div>Controls:</div>
            <div>Click & Drag: Rotate</div>
            <div>Scroll: Zoom</div>
            <div>Arrow Keys: Move</div>
          </div>
        </div>
      </div>

      {/* Minimap */}
      {showMinimap && (
        <div className="fixed bottom-4 right-4 w-48 h-32 bg-slate-800 bg-opacity-90 backdrop-blur-sm rounded-lg border border-slate-700 z-30">
          <div className="p-2">
            <div className="text-xs text-gray-400 mb-2">Scene Overview</div>
            <div className="w-full h-20 bg-slate-700 rounded relative">
              {/* Future: Minimap 3D scene representation */}
              <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-500">
                Minimap Placeholder
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main 3D Viewport Container */}
      <main className="pt-16 min-h-screen">
        <div className="w-full h-[calc(100vh-4rem)] bg-gradient-to-br from-slate-900 to-slate-800 relative">
          {/* 3D Scene Container */}
          <div id="threejs-container" className="w-full h-full">
            {/* Future: Three.js canvas will be rendered here */}
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center text-gray-400">
                <div className="text-2xl mb-4">3D Scene Placeholder</div>
                <div className="text-sm">Three.js integration coming in Phase 3</div>
              </div>
            </div>
          </div>
          
          {/* Content Overlay */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="pointer-events-auto">
              {children}
            </div>
          </div>
        </div>
      </main>

      {/* Mobile/Low-end Fallback Indicator */}
      <div className="hidden" id="fallback-mode">
        {/* Future: Mobile/low-end device fallback UI */}
      </div>
    </div>
  );
};

export default ThreeDLayout;
