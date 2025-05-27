
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const EcommerceNavigation: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount] = useState(0);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 bg-white shadow-md border-b border-gray-200 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-2xl font-bold text-gray-900">Store</div>
          </div>

          {/* Category Links - Hidden on mobile */}
          <div className="hidden md:flex space-x-8">
            <Link 
              to="/about" 
              className={`transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 rounded ${
                isActive('/about') 
                  ? 'text-gray-900' 
                  : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              About
            </Link>
            <Link 
              to="/work" 
              className={`transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 rounded ${
                isActive('/work') 
                  ? 'text-gray-900' 
                  : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              Work
            </Link>
            <Link 
              to="/contact" 
              className={`transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 rounded ${
                isActive('/contact') 
                  ? 'text-gray-900' 
                  : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              Contact
            </Link>
            <Link 
              to="/showcase" 
              className={`transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 rounded ${
                isActive('/showcase') 
                  ? 'text-gray-900' 
                  : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              Showcase
            </Link>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button className="absolute right-2 top-2 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded">
                🔍
              </button>
            </div>
          </div>

          {/* User/Account Area */}
          <div className="flex items-center space-x-4">
            <button className="text-gray-700 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 rounded">
              Account
            </button>
            <button className="relative text-gray-700 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 rounded">
              🛒
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Category Menu */}
      <div className="md:hidden border-t border-gray-200 bg-gray-50">
        <div className="flex overflow-x-auto px-4 py-2 space-x-6">
          <Link 
            to="/about" 
            className="whitespace-nowrap text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
          >
            About
          </Link>
          <Link 
            to="/work" 
            className="whitespace-nowrap text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
          >
            Work
          </Link>
          <Link 
            to="/contact" 
            className="whitespace-nowrap text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
          >
            Contact
          </Link>
          <Link 
            to="/showcase" 
            className="whitespace-nowrap text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
          >
            Showcase
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default EcommerceNavigation;
