
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface MinimalistNavigationProps {
  isDarkMode: boolean;
}

const MinimalistNavigation: React.FC<MinimalistNavigationProps> = ({ isDarkMode }) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className={`w-full ${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border-b`}>
      <div className="max-w-6xl mx-auto px-8 py-8">
        <div className="flex justify-between items-center">
          <Link 
            to="/" 
            className={`text-2xl font-magneti font-medium ${
              isDarkMode ? 'text-gray-100' : 'text-gray-900'
            }`}
          >
            Portfolio
          </Link>
          
          <div className="flex space-x-16">
            <Link 
              to="/about" 
              className={`text-xl font-magneti font-light ${
                isActive('/about') 
                  ? (isDarkMode ? 'text-gray-100' : 'text-gray-900')
                  : (isDarkMode ? 'text-gray-500' : 'text-gray-500')
              }`}
            >
              About
            </Link>
            <Link 
              to="/work" 
              className={`text-xl font-magneti font-light ${
                isActive('/work') 
                  ? (isDarkMode ? 'text-gray-100' : 'text-gray-900')
                  : (isDarkMode ? 'text-gray-500' : 'text-gray-500')
              }`}
            >
              Work
            </Link>
            <Link 
              to="/contact" 
              className={`text-xl font-magneti font-light ${
                isActive('/contact') 
                  ? (isDarkMode ? 'text-gray-100' : 'text-gray-900')
                  : (isDarkMode ? 'text-gray-500' : 'text-gray-500')
              }`}
            >
              Contact
            </Link>
            <Link 
              to="/showcase" 
              className={`text-xl font-magneti font-light ${
                isActive('/showcase') 
                  ? (isDarkMode ? 'text-gray-100' : 'text-gray-900')
                  : (isDarkMode ? 'text-gray-500' : 'text-gray-500')
              }`}
            >
              Showcase
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MinimalistNavigation;
