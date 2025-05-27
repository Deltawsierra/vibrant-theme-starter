
import React, { useState } from 'react';
import MinimalistNavigation from './MinimalistNavigation';

interface MinimalistLayoutProps {
  children: React.ReactNode;
}

const MinimalistLayout: React.FC<MinimalistLayoutProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`min-h-screen font-magneti ${isDarkMode ? 'bg-gray-900 text-gray-100 dark' : 'bg-white text-gray-900'}`}>
      {/* Navigation */}
      <MinimalistNavigation />

      {/* Dark Mode Toggle - NO ANIMATIONS */}
      <div className="fixed top-6 right-8 z-50">
        <button
          onClick={toggleDarkMode}
          className={`px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-gray-400 rounded ${
            isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-200 text-gray-800'
          }`}
          style={{ transition: 'none' }}
        >
          {isDarkMode ? 'Light' : 'Dark'}
        </button>
      </div>

      {/* Main Content - NO ANIMATIONS */}
      <main className="min-h-[calc(100vh-120px)]">
        {children}
      </main>

      {/* Footer - NO ANIMATIONS */}
      <footer className={`w-full ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'} border-t`}>
        <div className="max-w-6xl mx-auto px-8 py-6">
          <div className="text-center">
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Footer Placeholder - Minimalist Theme
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MinimalistLayout;
