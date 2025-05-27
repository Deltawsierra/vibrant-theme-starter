
import React, { useState } from 'react';

interface ProductCardProps {
  children: React.ReactNode;
  isInStock?: boolean;
  isNew?: boolean;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  children, 
  isInStock = true, 
  isNew = false,
  className = '' 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`relative overflow-hidden bg-white rounded-lg border border-gray-200 transition-all duration-300 ease-out ${
        isHovered ? 'shadow-lg shadow-gray-500/10 -translate-y-1' : 'shadow-sm'
      } ${!isInStock ? 'opacity-75' : ''} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      
      {/* Stock status overlay */}
      {!isInStock && (
        <div className="absolute inset-0 bg-gray-900/10 flex items-center justify-center">
          <div className="bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-600 shadow-sm">
            Out of Stock
          </div>
        </div>
      )}
      
      {/* New badge */}
      {isNew && (
        <div className="absolute top-3 left-3 z-10">
          <div className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium animate-pulse">
            New
          </div>
        </div>
      )}
      
      {/* Hover overlay */}
      <div className={`absolute inset-0 bg-blue-600/5 transition-opacity duration-300 ${
        isHovered ? 'opacity-100' : 'opacity-0'
      }`} />
    </div>
  );
};

interface QuickViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ 
  isOpen, 
  onClose, 
  children 
}) => {
  return (
    <div className={`fixed inset-0 z-50 transition-all duration-300 ${
      isOpen 
        ? 'opacity-100 pointer-events-auto' 
        : 'opacity-0 pointer-events-none'
    }`}>
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative flex items-center justify-center min-h-screen p-4">
        <div className={`bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-auto transform transition-all duration-300 ${
          isOpen 
            ? 'scale-100 translate-y-0 opacity-100' 
            : 'scale-95 translate-y-4 opacity-0'
        }`}>
          {children}
        </div>
      </div>
    </div>
  );
};

interface StickyCartProps {
  children: React.ReactNode;
  isVisible: boolean;
  hasItems?: boolean;
}

export const StickyCart: React.FC<StickyCartProps> = ({ 
  children, 
  isVisible,
  hasItems = false 
}) => {
  return (
    <div className={`fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg transform transition-all duration-300 ease-out z-40 ${
      isVisible 
        ? 'translate-y-0 opacity-100' 
        : 'translate-y-full opacity-0'
    }`}>
      <div className={`transition-all duration-300 ${hasItems ? 'animate-pulse' : ''}`}>
        {children}
      </div>
    </div>
  );
};

interface RestockNotificationProps {
  isVisible: boolean;
  productName: string;
  onClose: () => void;
}

export const RestockNotification: React.FC<RestockNotificationProps> = ({ 
  isVisible, 
  productName, 
  onClose 
}) => {
  return (
    <div className={`fixed top-4 right-4 z-50 transform transition-all duration-500 ease-out ${
      isVisible 
        ? 'translate-x-0 opacity-100 scale-100' 
        : 'translate-x-full opacity-0 scale-95'
    }`}>
      <div className="bg-green-600 text-white p-4 rounded-lg shadow-lg max-w-sm">
        <div className="flex items-start justify-between">
          <div>
            <h4 className="font-medium mb-1">Back in Stock!</h4>
            <p className="text-sm text-green-100">{productName} is now available</p>
          </div>
          <button 
            onClick={onClose}
            className="ml-3 text-green-200 hover:text-white transition-colors"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
};

interface LoyaltyPopupProps {
  isVisible: boolean;
  points: number;
  onClose: () => void;
}

export const LoyaltyPopup: React.FC<LoyaltyPopupProps> = ({ 
  isVisible, 
  points, 
  onClose 
}) => {
  return (
    <div className={`fixed bottom-20 right-4 z-50 transform transition-all duration-700 ease-out ${
      isVisible 
        ? 'translate-y-0 opacity-100 rotate-0' 
        : 'translate-y-8 opacity-0 rotate-3'
    }`}>
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-lg shadow-xl max-w-xs">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center mb-1">
              <span className="text-lg">🎉</span>
              <span className="ml-2 font-medium">Points Earned!</span>
            </div>
            <p className="text-sm text-purple-100">+{points} loyalty points</p>
          </div>
          <button 
            onClick={onClose}
            className="ml-3 text-purple-200 hover:text-white transition-colors"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
};

interface CategoryTransitionProps {
  children: React.ReactNode;
  category: string;
  isActive: boolean;
}

export const CategoryTransition: React.FC<CategoryTransitionProps> = ({ 
  children, 
  category, 
  isActive 
}) => {
  const getCategoryColor = (cat: string) => {
    const colors = {
      electronics: 'from-blue-500/10 to-cyan-500/10',
      clothing: 'from-pink-500/10 to-purple-500/10',
      home: 'from-green-500/10 to-emerald-500/10',
      books: 'from-amber-500/10 to-orange-500/10'
    };
    return colors[cat as keyof typeof colors] || 'from-gray-500/10 to-slate-500/10';
  };

  return (
    <div className={`relative overflow-hidden transition-all duration-500 ease-out ${
      isActive 
        ? 'opacity-100 translate-x-0' 
        : 'opacity-0 translate-x-8'
    }`}>
      <div className={`absolute inset-0 bg-gradient-to-r ${getCategoryColor(category)} transition-opacity duration-300 ${
        isActive ? 'opacity-100' : 'opacity-0'
      }`} />
      <div className="relative">
        {children}
      </div>
    </div>
  );
};
