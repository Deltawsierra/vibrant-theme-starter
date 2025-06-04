
import React from 'react';
import MinimalistNavigation from './MinimalistNavigation';
import { useDarkMode } from '../hooks/useDarkMode';

interface MinimalistLayoutProps {
  children: React.ReactNode;
}

const MinimalistLayout: React.FC<MinimalistLayoutProps> = ({ children }) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <div className={`min-h-screen font-magneti ${isDarkMode ? 'bg-gray-900 text-gray-100 dark' : 'bg-white text-gray-900'}`}>
      {/* Navigation - Always visible, clean hard-cut */}
      <MinimalistNavigation isDarkMode={isDarkMode} />

      {/* Dark Mode Toggle - Clean, no effects */}
      <div className="fixed top-8 right-8 z-50">
        <button
          onClick={toggleDarkMode}
          className={`px-6 py-3 text-base font-magneti font-medium border ${
            isDarkMode 
              ? 'bg-gray-800 text-gray-200 border-gray-700' 
              : 'bg-gray-100 text-gray-800 border-gray-300'
          }`}
          aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
        >
          {isDarkMode ? 'Light' : 'Dark'}
        </button>
      </div>

      {/* Main Content - Pure, clean layout */}
      <main className="min-h-screen">
        {children}
      </main>

      {/* Footer - Minimal, functional */}
      <footer className={`w-full ${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border-t`}>
        <div className="max-w-6xl mx-auto px-8 py-12">
          <div className="text-center">
            <p className={`text-base font-magneti ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
              Portfolio 2024
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MinimalistLayout;
