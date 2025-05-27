
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const ArcadeNavigation: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="w-full bg-gray-900 border-b-2 border-cyan-400 shadow-lg shadow-cyan-400/20">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Left Side - Navigation */}
          <div className="flex space-x-8">
            <Link 
              to="/about" 
              className={`px-4 py-2 border-2 font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
                isActive('/about') 
                  ? 'border-yellow-400 text-yellow-400 bg-yellow-400/10' 
                  : 'border-green-400 text-green-400 hover:border-yellow-400 hover:text-yellow-400'
              }`}
            >
              ABOUT
            </Link>
            <Link 
              to="/work" 
              className={`px-4 py-2 border-2 font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
                isActive('/work') 
                  ? 'border-yellow-400 text-yellow-400 bg-yellow-400/10' 
                  : 'border-green-400 text-green-400 hover:border-yellow-400 hover:text-yellow-400'
              }`}
            >
              WORK
            </Link>
            <Link 
              to="/contact" 
              className={`px-4 py-2 border-2 font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
                isActive('/contact') 
                  ? 'border-yellow-400 text-yellow-400 bg-yellow-400/10' 
                  : 'border-green-400 text-green-400 hover:border-yellow-400 hover:text-yellow-400'
              }`}
            >
              CONTACT
            </Link>
            <Link 
              to="/showcase" 
              className={`px-4 py-2 border-2 font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
                isActive('/showcase') 
                  ? 'border-yellow-400 text-yellow-400 bg-yellow-400/10' 
                  : 'border-green-400 text-green-400 hover:border-yellow-400 hover:text-yellow-400'
              }`}
            >
              SHOWCASE
            </Link>
          </div>

          {/* Center - Score/Coin Tracker */}
          <div className="flex space-x-6 text-cyan-400">
            <div className="text-lg font-bold">SCORE: 999999</div>
            <div className="text-lg font-bold">COINS: 25</div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default ArcadeNavigation;
