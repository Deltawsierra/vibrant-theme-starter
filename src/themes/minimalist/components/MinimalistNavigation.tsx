
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const MinimalistNavigation: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="w-full bg-gray-50 border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="max-w-6xl mx-auto px-8 py-6">
        <div className="flex space-x-12">
          <Link 
            to="/about" 
            className={`text-lg font-medium transition-colors ${
              isActive('/about') 
                ? 'text-black dark:text-white' 
                : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
            }`}
          >
            About
          </Link>
          <Link 
            to="/work" 
            className={`text-lg font-medium transition-colors ${
              isActive('/work') 
                ? 'text-black dark:text-white' 
                : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
            }`}
          >
            Work
          </Link>
          <Link 
            to="/contact" 
            className={`text-lg font-medium transition-colors ${
              isActive('/contact') 
                ? 'text-black dark:text-white' 
                : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
            }`}
          >
            Contact
          </Link>
          <Link 
            to="/showcase" 
            className={`text-lg font-medium transition-colors ${
              isActive('/showcase') 
                ? 'text-black dark:text-white' 
                : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
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
