
import React, { useState, useMemo } from 'react';
import ProductCard, { Product } from './ProductCard';
import ProductDetailModal from './ProductDetailModal';

// Demo products with random out-of-stock status
const demoProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    price: 299,
    image: '/placeholder.svg',
    category: 'Electronics',
    inStock: Math.random() > 0.3,
    variants: {
      colors: ['Black', 'White', 'Gray'],
      sizes: ['One Size']
    },
    description: 'High-quality wireless headphones with noise cancellation and premium sound quality.'
  },
  {
    id: '2',
    name: 'Ergonomic Office Chair',
    price: 450,
    image: '/placeholder.svg',
    category: 'Furniture',
    inStock: Math.random() > 0.3,
    variants: {
      colors: ['Black', 'Gray', 'Blue'],
      sizes: ['Standard', 'Large']
    },
    description: 'Comfortable ergonomic office chair designed for long work sessions.'
  },
  {
    id: '3',
    name: 'Smart Fitness Watch',
    price: 199,
    image: '/placeholder.svg',
    category: 'Electronics',
    inStock: Math.random() > 0.3,
    variants: {
      colors: ['Black', 'Silver', 'Gold'],
      sizes: ['38mm', '42mm', '46mm']
    },
    description: 'Advanced fitness tracking with heart rate monitoring and GPS.'
  },
  {
    id: '4',
    name: 'Organic Cotton T-Shirt',
    price: 35,
    image: '/placeholder.svg',
    category: 'Clothing',
    inStock: Math.random() > 0.3,
    variants: {
      colors: ['White', 'Black', 'Navy', 'Gray'],
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
    },
    description: 'Sustainable organic cotton t-shirt with comfortable fit.'
  },
  {
    id: '5',
    name: 'Professional Camera Lens',
    price: 899,
    image: '/placeholder.svg',
    category: 'Electronics',
    inStock: Math.random() > 0.3,
    variants: {
      colors: ['Black'],
      sizes: ['50mm', '85mm', '135mm']
    },
    description: 'Professional-grade camera lens for photography enthusiasts.'
  },
  {
    id: '6',
    name: 'Modern Table Lamp',
    price: 120,
    image: '/placeholder.svg',
    category: 'Home',
    inStock: Math.random() > 0.3,
    variants: {
      colors: ['Brass', 'Black', 'White'],
      sizes: ['Small', 'Medium', 'Large']
    },
    description: 'Stylish modern table lamp perfect for any room.'
  }
];

const categories = ['All', 'Electronics', 'Furniture', 'Clothing', 'Home'];

const ProductCatalog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState<'name' | 'price-low' | 'price-high'>('name');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = selectedCategory === 'All' 
      ? demoProducts 
      : demoProducts.filter(product => product.category === selectedCategory);

    switch (sortBy) {
      case 'price-low':
        return filtered.sort((a, b) => a.price - b.price);
      case 'price-high':
        return filtered.sort((a, b) => b.price - a.price);
      default:
        return filtered.sort((a, b) => a.name.localeCompare(b.name));
    }
  }, [selectedCategory, sortBy]);

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
          className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="name">Sort by Name</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredAndSortedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onViewDetails={setSelectedProduct}
          />
        ))}
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default ProductCatalog;
