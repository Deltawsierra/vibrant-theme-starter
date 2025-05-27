
import React, { useState } from 'react';

interface EcommerceLayoutProps {
  children: React.ReactNode;
}

const EcommerceLayout: React.FC<EcommerceLayoutProps> = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewsletter, setShowNewsletter] = useState(false);
  const [cartCount] = useState(0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Sticky Navigation */}
      <nav className="sticky top-0 bg-white shadow-md border-b border-gray-200 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="text-2xl font-bold text-gray-900">Store</div>
            </div>

            {/* Category Links - Hidden on mobile */}
            <div className="hidden md:flex space-x-8">
              <button className="text-gray-700 hover:text-gray-900 transition-colors">Electronics</button>
              <button className="text-gray-700 hover:text-gray-900 transition-colors">Clothing</button>
              <button className="text-gray-700 hover:text-gray-900 transition-colors">Home</button>
              <button className="text-gray-700 hover:text-gray-900 transition-colors">Sports</button>
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
                <button className="absolute right-2 top-2 text-gray-400 hover:text-gray-600">
                  🔍
                </button>
              </div>
            </div>

            {/* User/Account Area */}
            <div className="flex items-center space-x-4">
              <button className="text-gray-700 hover:text-gray-900 transition-colors">Account</button>
              <button className="relative text-gray-700 hover:text-gray-900 transition-colors">
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
            <button className="whitespace-nowrap text-sm text-gray-700">Electronics</button>
            <button className="whitespace-nowrap text-sm text-gray-700">Clothing</button>
            <button className="whitespace-nowrap text-sm text-gray-700">Home</button>
            <button className="whitespace-nowrap text-sm text-gray-700">Sports</button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="min-h-[calc(100vh-4rem)] pb-20 md:pb-8">
        {children}
      </main>

      {/* Sticky Mobile Add-to-Cart Button */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-30">
        <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
          Add to Cart - $0.00
        </button>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <h3 className="text-lg font-bold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-300">
                <li><button className="hover:text-white transition-colors">About Us</button></li>
                <li><button className="hover:text-white transition-colors">Careers</button></li>
                <li><button className="hover:text-white transition-colors">Press</button></li>
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <h3 className="text-lg font-bold mb-4">Customer Service</h3>
              <ul className="space-y-2 text-gray-300">
                <li><button className="hover:text-white transition-colors">Contact Us</button></li>
                <li><button className="hover:text-white transition-colors">Shipping Info</button></li>
                <li><button className="hover:text-white transition-colors">Returns</button></li>
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-lg font-bold mb-4">Categories</h3>
              <ul className="space-y-2 text-gray-300">
                <li><button className="hover:text-white transition-colors">Electronics</button></li>
                <li><button className="hover:text-white transition-colors">Clothing</button></li>
                <li><button className="hover:text-white transition-colors">Home & Garden</button></li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-lg font-bold mb-4">Stay Updated</h3>
              <p className="text-gray-300 mb-4">Get the latest deals and updates.</p>
              <button
                onClick={() => setShowNewsletter(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
              >
                Subscribe
              </button>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Store. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Newsletter Modal Placeholder */}
      {showNewsletter && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md mx-4">
            <h2 className="text-xl font-bold mb-4">Newsletter Signup</h2>
            <p className="text-gray-600 mb-4">Stay updated with our latest offers and products.</p>
            <div className="flex space-x-2">
              <button
                onClick={() => setShowNewsletter(false)}
                className="flex-1 bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowNewsletter(false)}
                className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EcommerceLayout;
