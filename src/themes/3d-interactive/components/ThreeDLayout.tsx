
import React, { useState } from 'react';
import ThreeDNavigation from './ThreeDNavigation';
import LoadingOverlay from './LoadingOverlay';
import ThreeDViewport from './ThreeDViewport';
import { useDeviceCapabilities } from './MotionHooks';
import { ThreeDProvider, useThreeD } from '../context/ThreeDContext';

interface ThreeDLayoutProps {
  children: React.ReactNode;
}

const ThreeDLayoutContent: React.FC<ThreeDLayoutProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { fallbackMode } = useDeviceCapabilities();
  const { 
    isMinimapVisible, 
    toggleMinimap, 
    resetCamera,
    interactiveObjects,
    selectedObjectId 
  } = useThreeD();

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const handleViewportReady = () => {
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

      {/* Back to Lobby Button */}
      <button
        onClick={() => window.location.href = '/'}
        className="fixed top-4 left-4 z-50 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        ← Back to Lobby
      </button>

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
            <div>Right Click: Pan</div>
          </div>
          <div className="text-xs text-blue-400">
            <div>Objects: {interactiveObjects.length}</div>
            <div>Selected: {selectedObjectId || 'None'}</div>
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
              <div className="absolute inset-0 p-2">
                {interactiveObjects.map((obj, index) => (
                  <div
                    key={obj.id}
                    className={`absolute w-2 h-2 rounded-full ${
                      obj.id === selectedObjectId ? 'bg-yellow-400' : 'bg-blue-400'
                    }`}
                    style={{
                      left: `${((obj.position.x + 10) / 20) * 100}%`,
                      top: `${((obj.position.z + 10) / 20) * 100}%`
                    }}
                    title={obj.name}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main 3D Viewport Container */}
      <main className="pt-16 min-h-screen">
        <div className="w-full h-[calc(100vh-4rem)] relative">
          {fallbackMode ? (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
              <div className="text-center text-gray-400">
                <div className="text-2xl mb-4">3D Scene Fallback</div>
                <div className="text-sm">Your device doesn't support 3D rendering</div>
                <div className="mt-4 grid grid-cols-3 gap-4">
                  {interactiveObjects.map((obj) => (
                    <div
                      key={obj.id}
                      className="p-4 bg-slate-800 rounded cursor-pointer hover:bg-slate-700"
                      onClick={() => console.log('Clicked', obj.name)}
                    >
                      {obj.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <ThreeDViewport onReady={handleViewportReady} />
          )}
          
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

const ThreeDLayout: React.FC<ThreeDLayoutProps> = ({ children }) => {
  return (
    <ThreeDProvider>
      <ThreeDLayoutContent>{children}</ThreeDLayoutContent>
    </ThreeDProvider>
  );
};

export default ThreeDLayout;
