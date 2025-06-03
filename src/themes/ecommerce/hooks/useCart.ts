
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
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
    if (!user) {
      // Load from localStorage for guests
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
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('cart_items')
        .select(`
          *,
          products!cart_items_product_id_fkey(name, price, image_url)
        `)
        .eq('user_id', user.id);

      if (error) {
        console.warn('Could not load cart from Supabase:', error);
        // Fall back to localStorage
        const saved = localStorage.getItem('cart');
        if (saved) {
          try {
            const items = JSON.parse(saved);
            const totals = calculateTotals(items);
            setCart({ items, ...totals });
          } catch (parseError) {
            console.error('Error parsing cart from localStorage:', parseError);
            setCart({ items: [], total: 0, item_count: 0 });
          }
        }
        return;
      }

      const items = (data || []).map(item => ({
        ...item,
        product: Array.isArray(item.products) ? item.products[0] : item.products
      }));
      const totals = calculateTotals(items);
      setCart({ items, ...totals });
    } catch (error) {
      console.error('Error loading cart:', error);
      setCart({ items: [], total: 0, item_count: 0 });
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId: string, quantity: number = 1, variantId?: string) => {
    const newItem: Omit<CartItem, 'id'> = {
      product_id: productId,
      quantity,
      variant_id: variantId
    };

    if (user) {
      try {
        const { error } = await supabase
          .from('cart_items')
          .upsert([
            {
              user_id: user.id,
              ...newItem
            }
          ]);

        if (error) {
          console.warn('Failed to add to cart in Supabase:', error);
          // Fall back to localStorage
          updateLocalStorageCart(productId, quantity, variantId);
        } else {
          await loadCart();
        }
      } catch (error) {
        console.error('Error adding to cart:', error);
        updateLocalStorageCart(productId, quantity, variantId);
      }
    } else {
      updateLocalStorageCart(productId, quantity, variantId);
    }
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
    if (user) {
      try {
        const { error } = await supabase
          .from('cart_items')
          .delete()
          .eq('id', itemId);

        if (error) {
          console.warn('Failed to remove from cart in Supabase:', error);
        }
        await loadCart();
      } catch (error) {
        console.error('Error removing from cart:', error);
      }
    } else {
      const updatedItems = cart.items.filter(item => item.id !== itemId);
      localStorage.setItem('cart', JSON.stringify(updatedItems));
      const totals = calculateTotals(updatedItems);
      setCart({ items: updatedItems, ...totals });
    }
  };

  const clearCart = async () => {
    if (user) {
      try {
        const { error } = await supabase
          .from('cart_items')
          .delete()
          .eq('user_id', user.id);

        if (error) {
          console.warn('Failed to clear cart in Supabase:', error);
        }
      } catch (error) {
        console.error('Error clearing cart:', error);
      }
    } else {
      localStorage.removeItem('cart');
    }
    
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
