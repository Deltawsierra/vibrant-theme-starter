
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface MinimalistNavigationProps {
  isDarkMode: boolean;
}

const MinimalistNavigation: React.FC<MinimalistNavigationProps> = ({ isDarkMode }) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className={`w-full ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'} border-b`}>
      <div className="max-w-6xl mx-auto px-8 py-6">
        <div className="flex space-x-12">
          <Link 
            to="/about" 
            className={`text-lg font-medium ${
              isActive('/about') 
                ? (isDarkMode ? 'text-white' : 'text-black')
                : (isDarkMode ? 'text-gray-400' : 'text-gray-600')
            }`}
          >
            About
          </Link>
          <Link 
            to="/work" 
            className={`text-lg font-medium ${
              isActive('/work') 
                ? (isDarkMode ? 'text-white' : 'text-black')
                : (isDarkMode ? 'text-gray-400' : 'text-gray-600')
            }`}
          >
            Work
          </Link>
          <Link 
            to="/contact" 
            className={`text-lg font-medium ${
              isActive('/contact') 
                ? (isDarkMode ? 'text-white' : 'text-black')
                : (isDarkMode ? 'text-gray-400' : 'text-gray-600')
            }`}
          >
            Contact
          </Link>
          <Link 
            to="/showcase" 
            className={`text-lg font-medium ${
              isActive('/showcase') 
                ? (isDarkMode ? 'text-white' : 'text-black')
                : (isDarkMode ? 'text-gray-400' : 'text-gray-600')
            }`}
          >
            Showcase
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default MinimalistNavigation;
