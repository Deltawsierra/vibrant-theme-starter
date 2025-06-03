
import { useState, useEffect } from 'react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url?: string;
  category: string;
  stock_quantity: number;
  variants?: ProductVariant[];
  metadata?: Record<string, any>;
}

interface ProductVariant {
  id: string;
  product_id: string;
  name: string;
  price_modifier: number;
  stock_quantity: number;
}

export const useProducts = (category?: string) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      // Using fallback products since database table doesn't exist yet
      console.log('Using fallback products data');
      setProducts([
        {
          id: 'prod-1',
          name: 'Portfolio Template',
          description: 'Professional portfolio template',
          price: 49.99,
          category: 'templates',
          stock_quantity: 100,
          image_url: '/placeholder.svg'
        },
        {
          id: 'prod-2',
          name: 'Design System',
          description: 'Complete design system package',
          price: 99.99,
          category: 'design',
          stock_quantity: 50,
          image_url: '/placeholder.svg'
        }
      ]);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [category]);

  return {
    products,
    loading,
    error,
    refetch: fetchProducts
  };
};
