
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const ThreeDNavigation: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 w-full bg-slate-800 bg-opacity-90 backdrop-blur-sm border-b border-slate-700 z-40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex space-x-8">
            <div className="text-lg font-bold text-blue-400">3D Portfolio</div>
            <div className="flex space-x-6">
              <Link 
                to="/about" 
                className={`transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 rounded ${
                  isActive('/about') 
                    ? 'text-white' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                About
              </Link>
              <Link 
                to="/work" 
                className={`transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 rounded ${
                  isActive('/work') 
                    ? 'text-white' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Work
              </Link>
              <Link 
                to="/contact" 
                className={`transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 rounded ${
                  isActive('/contact') 
                    ? 'text-white' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Contact
              </Link>
              <Link 
                to="/showcase" 
                className={`transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 rounded ${
                  isActive('/showcase') 
                    ? 'text-white' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Showcase
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default ThreeDNavigation;
