
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

interface CartItem {
  id: string;
  product_id: string;
  quantity: number;
  variant_id?: string;
  product?: {
    name: string;
    price: number;
    image_url?: string;
  };
}

interface CartState {
  items: CartItem[];
  total: number;
  item_count: number;
}

export const useCart = () => {
  const { user } = useAuth();
  const [cart, setCart] = useState<CartState>({
    items: [],
    total: 0,
    item_count: 0
  });
  const [loading, setLoading] = useState(false);

  const calculateTotals = (items: CartItem[]) => {
    const total = items.reduce((sum, item) => {
      const price = item.product?.price || 0;
      return sum + (price * item.quantity);
    }, 0);
    
    const item_count = items.reduce((sum, item) => sum + item.quantity, 0);
    
    return { total, item_count };
  };

  const loadCart = async () => {
    try {
      setLoading(true);
      
      // Using localStorage for cart since database table doesn't exist yet
      console.log('Using localStorage for cart data');
      const saved = localStorage.getItem('cart');
      if (saved) {
        try {
          const items = JSON.parse(saved);
          const totals = calculateTotals(items);
          setCart({ items, ...totals });
        } catch (error) {
          console.error('Error parsing cart from localStorage:', error);
          setCart({ items: [], total: 0, item_count: 0 });
        }
      }
    } catch (error) {
      console.error('Error loading cart:', error);
      setCart({ items: [], total: 0, item_count: 0 });
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId: string, quantity: number = 1, variantId?: string) => {
    updateLocalStorageCart(productId, quantity, variantId);
  };

  const updateLocalStorageCart = (productId: string, quantity: number, variantId?: string) => {
    const existingIndex = cart.items.findIndex(
      item => item.product_id === productId && item.variant_id === variantId
    );
    
    let updatedItems;
    if (existingIndex >= 0) {
      updatedItems = cart.items.map((item, index) => 
        index === existingIndex 
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      updatedItems = [...cart.items, { id: Date.now().toString(), product_id: productId, quantity, variant_id: variantId }];
    }
    
    localStorage.setItem('cart', JSON.stringify(updatedItems));
    const totals = calculateTotals(updatedItems);
    setCart({ items: updatedItems, ...totals });
  };

  const removeFromCart = async (itemId: string) => {
    const updatedItems = cart.items.filter(item => item.id !== itemId);
    localStorage.setItem('cart', JSON.stringify(updatedItems));
    const totals = calculateTotals(updatedItems);
    setCart({ items: updatedItems, ...totals });
  };

  const clearCart = async () => {
    localStorage.removeItem('cart');
    setCart({ items: [], total: 0, item_count: 0 });
  };

  useEffect(() => {
    loadCart();
  }, [user]);

  return {
    cart,
    loading,
    addToCart,
    removeFromCart,
    clearCart,
    refetch: loadCart
  };
};
