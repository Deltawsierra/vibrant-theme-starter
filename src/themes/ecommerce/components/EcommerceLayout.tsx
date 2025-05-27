
import React, { useState } from 'react';
import EcommerceNavigation from './EcommerceNavigation';

interface EcommerceLayoutProps {
  children: React.ReactNode;
}

const EcommerceLayout: React.FC<EcommerceLayoutProps> = ({ children }) => {
  const [showNewsletter, setShowNewsletter] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <EcommerceNavigation />

      {/* Main Content */}
      <main className="min-h-[calc(100vh-4rem)] pb-20 md:pb-8">
        {children}
      </main>

      {/* Sticky Mobile Add-to-Cart Button */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-30">
        <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400">
          Add to Cart - $0.00
        </button>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-300">
                <li><button className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 rounded">About Us</button></li>
                <li><button className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 rounded">Careers</button></li>
                <li><button className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 rounded">Press</button></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Customer Service</h3>
              <ul className="space-y-2 text-gray-300">
                <li><button className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 rounded">Contact Us</button></li>
                <li><button className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 rounded">Shipping Info</button></li>
                <li><button className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 rounded">Returns</button></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Categories</h3>
              <ul className="space-y-2 text-gray-300">
                <li><button className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 rounded">Electronics</button></li>
                <li><button className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 rounded">Clothing</button></li>
                <li><button className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 rounded">Home & Garden</button></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Stay Updated</h3>
              <p className="text-gray-300 mb-4">Get the latest deals and updates.</p>
              <button
                onClick={() => setShowNewsletter(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                className="flex-1 bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowNewsletter(false)}
                className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
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
