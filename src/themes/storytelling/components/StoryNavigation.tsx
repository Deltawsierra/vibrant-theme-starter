
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface StoryNavigationProps {
  isVisible?: boolean;
}

const StoryNavigation: React.FC<StoryNavigationProps> = ({ isVisible = false }) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  if (!isVisible) return null;

  return (
    <nav className="fixed top-16 left-1/2 transform -translate-x-1/2 z-40 bg-amber-100 border border-amber-300 rounded-lg shadow-lg px-6 py-4">
      <div className="flex space-x-6">
        <Link 
          to="/about" 
          className={`text-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400 rounded ${
            isActive('/about') 
              ? 'text-amber-900' 
              : 'text-amber-700 hover:text-amber-900'
          }`}
        >
          About
        </Link>
        <Link 
          to="/work" 
          className={`text-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400 rounded ${
            isActive('/work') 
              ? 'text-amber-900' 
              : 'text-amber-700 hover:text-amber-900'
          }`}
        >
          Work
        </Link>
        <Link 
          to="/contact" 
          className={`text-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400 rounded ${
            isActive('/contact') 
              ? 'text-amber-900' 
              : 'text-amber-700 hover:text-amber-900'
          }`}
        >
          Contact
        </Link>
        <Link 
          to="/showcase" 
          className={`text-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400 rounded ${
            isActive('/showcase') 
              ? 'text-amber-900' 
              : 'text-amber-700 hover:text-amber-900'
          }`}
        >
          Showcase
        </Link>
      </div>
    </nav>
  );
};

export default StoryNavigation;
