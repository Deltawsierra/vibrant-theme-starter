
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
            className={`text-lg font-medium ${
              isActive('/about') 
                ? 'text-black dark:text-white' 
                : 'text-gray-600 dark:text-gray-400'
            }`}
            style={{ transition: 'none' }}
          >
            About
          </Link>
          <Link 
            to="/work" 
            className={`text-lg font-medium ${
              isActive('/work') 
                ? 'text-black dark:text-white' 
                : 'text-gray-600 dark:text-gray-400'
            }`}
            style={{ transition: 'none' }}
          >
            Work
          </Link>
          <Link 
            to="/contact" 
            className={`text-lg font-medium ${
              isActive('/contact') 
                ? 'text-black dark:text-white' 
                : 'text-gray-600 dark:text-gray-400'
            }`}
            style={{ transition: 'none' }}
          >
            Contact
          </Link>
          <Link 
            to="/showcase" 
            className={`text-lg font-medium ${
              isActive('/showcase') 
                ? 'text-black dark:text-white' 
                : 'text-gray-600 dark:text-gray-400'
            }`}
            style={{ transition: 'none' }}
          >
            Showcase
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default MinimalistNavigation;
