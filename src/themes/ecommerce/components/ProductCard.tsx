
import React from 'react';
import { useShoppingCart } from '../context/ShoppingContext';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  inStock: boolean;
  variants: {
    colors: string[];
    sizes: string[];
  };
  description: string;
}

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails }) => {
  const { addToCart } = useShoppingCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (product.inStock) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
        selectedVariants: {
          color: product.variants.colors[0] || '',
          size: product.variants.sizes[0] || ''
        }
      });
    }
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-gray-200"
      onClick={() => onViewDetails(product)}
    >
      <div className="aspect-square bg-gray-100 rounded-t-lg overflow-hidden">
        <img 
          src={product.image || "/placeholder.svg"} 
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>
        
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">${product.price}</span>
          
          {product.inStock ? (
            <button
              onClick={handleAddToCart}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Add to Cart
            </button>
          ) : (
            <div className="text-right">
              <div className="text-sm text-red-600 font-medium">Out of Stock</div>
              <button className="text-xs text-blue-600 hover:underline">
                Notify Me
              </button>
            </div>
          )}
        </div>
        
        {product.variants.colors.length > 0 && (
          <div className="mt-3 flex space-x-1">
            {product.variants.colors.slice(0, 4).map((color, index) => (
              <div
                key={index}
                className="w-4 h-4 rounded-full border border-gray-300"
                style={{ backgroundColor: color.toLowerCase() }}
                title={color}
              />
            ))}
            {product.variants.colors.length > 4 && (
              <span className="text-xs text-gray-500">+{product.variants.colors.length - 4}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
