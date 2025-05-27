
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface MinimalistLayoutProps {
  children: React.ReactNode;
}

const MinimalistLayout: React.FC<MinimalistLayoutProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className={`min-h-screen font-magneti ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}`}>
      {/* Top Navigation Bar */}
      <nav className={`w-full ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'} border-b`}>
        <div className="max-w-6xl mx-auto px-8 py-6">
          <div className="flex justify-between items-center">
            <div className="flex space-x-12">
              <Link 
                to="/about" 
                className={`text-lg font-medium ${isActive('/about') ? (isDarkMode ? 'text-white' : 'text-black') : (isDarkMode ? 'text-gray-400' : 'text-gray-600')}`}
              >
                About
              </Link>
              <Link 
                to="/work" 
                className={`text-lg font-medium ${isActive('/work') ? (isDarkMode ? 'text-white' : 'text-black') : (isDarkMode ? 'text-gray-400' : 'text-gray-600')}`}
              >
                Work
              </Link>
              <Link 
                to="/contact" 
                className={`text-lg font-medium ${isActive('/contact') ? (isDarkMode ? 'text-white' : 'text-black') : (isDarkMode ? 'text-gray-400' : 'text-gray-600')}`}
              >
                Contact
              </Link>
              <Link 
                to="/showcase" 
                className={`text-lg font-medium ${isActive('/showcase') ? (isDarkMode ? 'text-white' : 'text-black') : (isDarkMode ? 'text-gray-400' : 'text-gray-600')}`}
              >
                Showcase
              </Link>
            </div>
            <button
              onClick={toggleDarkMode}
              className={`px-4 py-2 text-sm font-medium ${isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-200 text-gray-800'}`}
            >
              {isDarkMode ? 'Light' : 'Dark'}
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="min-h-[calc(100vh-120px)]">
        {children}
      </main>

      {/* Footer Placeholder */}
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
