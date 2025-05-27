
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface VideographyNavigationProps {
  mode?: 'cinematic' | 'editorial';
  onModeToggle?: () => void;
}

const VideographyNavigation: React.FC<VideographyNavigationProps> = ({ 
  mode = 'cinematic',
  onModeToggle 
}) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-40 ${
      mode === 'cinematic' 
        ? 'bg-black bg-opacity-80 border-gray-700' 
        : 'bg-white bg-opacity-90 border-gray-300'
    } backdrop-blur-sm border rounded-full px-6 py-3`}>
      <div className="flex items-center space-x-8">
        <div className={`text-lg font-bold ${
          mode === 'cinematic' ? 'text-white' : 'text-gray-900'
        }`}>
          Studio
        </div>
        <div className="flex space-x-6">
          <Link 
            to="/about" 
            className={`transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 rounded ${
              mode === 'cinematic' 
                ? isActive('/about') ? 'text-white' : 'text-gray-300 hover:text-white'
                : isActive('/about') ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            About
          </Link>
          <Link 
            to="/work" 
            className={`transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 rounded ${
              mode === 'cinematic' 
                ? isActive('/work') ? 'text-white' : 'text-gray-300 hover:text-white'
                : isActive('/work') ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Work
          </Link>
          <Link 
            to="/contact" 
            className={`transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 rounded ${
              mode === 'cinematic' 
                ? isActive('/contact') ? 'text-white' : 'text-gray-300 hover:text-white'
                : isActive('/contact') ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Contact
          </Link>
          <Link 
            to="/showcase" 
            className={`transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 rounded ${
              mode === 'cinematic' 
                ? isActive('/showcase') ? 'text-white' : 'text-gray-300 hover:text-white'
                : isActive('/showcase') ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Showcase
          </Link>
        </div>
        {onModeToggle && (
          <button
            onClick={onModeToggle}
            className={`px-3 py-1 text-sm rounded transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              mode === 'cinematic'
                ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {mode === 'cinematic' ? 'Editorial' : 'Cinematic'}
          </button>
        )}
      </div>
    </nav>
  );
};

export default VideographyNavigation;
