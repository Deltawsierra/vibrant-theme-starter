
import React, { useState, useEffect } from 'react';

interface LoadingOverlayProps {
  isVisible: boolean;
  onComplete?: () => void;
  fallbackMode?: boolean;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ 
  isVisible, 
  onComplete,
  fallbackMode = false 
}) => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing 3D Environment...');

  useEffect(() => {
    if (!isVisible) return;

    const loadingSequence = [
      { progress: 20, text: 'Loading geometry...' },
      { progress: 40, text: 'Rendering materials...' },
      { progress: 60, text: 'Setting up lighting...' },
      { progress: 80, text: 'Preparing camera...' },
      { progress: 100, text: 'Entering world...' }
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < loadingSequence.length) {
        const step = loadingSequence[currentStep];
        setLoadingProgress(step.progress);
        setLoadingText(step.text);
        currentStep++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          onComplete?.();
        }, 500);
      }
    }, fallbackMode ? 300 : 800);

    return () => clearInterval(interval);
  }, [isVisible, onComplete, fallbackMode]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-slate-900 z-50 flex items-center justify-center">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-20">
        <div className={`w-full h-full bg-gradient-to-br from-blue-900/30 to-slate-900 ${
          !fallbackMode ? 'animate-pulse' : ''
        }`} />
        {!fallbackMode && (
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_24%,rgba(59,130,246,0.1)_25%,rgba(59,130,246,0.1)_26%,transparent_27%,transparent_74%,rgba(59,130,246,0.1)_75%,rgba(59,130,246,0.1)_76%,transparent_77%,transparent)] bg-[length:20px_20px] animate-[slide_4s_linear_infinite]" />
        )}
      </div>

      {/* Loading content */}
      <div className="relative z-10 text-center">
        <div className={`w-20 h-20 mx-auto mb-8 ${
          fallbackMode 
            ? 'border-4 border-blue-400 border-t-transparent rounded-full animate-spin' 
            : 'relative'
        }`}>
          {!fallbackMode ? (
            <>
              <div className="absolute inset-0 border-4 border-blue-400/30 rounded-full" />
              <div className="absolute inset-2 border-2 border-blue-500/50 rounded-full animate-ping" />
              <div className="absolute inset-4 border border-blue-400 rounded-full animate-pulse" />
              <div className="absolute inset-6 bg-blue-400 rounded-full animate-bounce" />
            </>
          ) : null}
        </div>

        <h2 className="text-2xl font-bold text-white mb-4">
          {fallbackMode ? 'Loading Portfolio' : 'Entering 3D World'}
        </h2>
        
        <p className="text-blue-400 mb-6 font-mono text-sm">
          {loadingText}
        </p>

        {/* Progress bar */}
        <div className="w-80 mx-auto bg-slate-800 rounded-full h-2 mb-4">
          <div 
            className={`h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-300 ${
              !fallbackMode ? 'shadow-lg shadow-blue-500/50' : ''
            }`}
            style={{ width: `${loadingProgress}%` }}
          />
        </div>
        
        <div className="text-blue-300 text-sm font-mono">
          {loadingProgress}% Complete
        </div>

        {fallbackMode && (
          <p className="text-gray-400 text-xs mt-4 max-w-md mx-auto">
            Running in compatibility mode for optimal performance
          </p>
        )}
      </div>
    </div>
  );
};

export default LoadingOverlay;
