
import React, { createContext, useContext, useState, useCallback } from 'react';

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

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  selectedVariants?: {
    color: string;
    size: string;
  };
}

interface ShoppingContextType {
  cartItems: CartItem[];
  wishlistItems: Product[];
  isCartOpen: boolean;
  recentlyViewed: Product[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  toggleCart: () => void;
  addToRecentlyViewed: (product: Product) => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;
  clearCart: () => void;
}

const ShoppingContext = createContext<ShoppingContextType | undefined>(undefined);

interface ShoppingProviderProps {
  children: React.ReactNode;
}

export const ShoppingProvider: React.FC<ShoppingProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('ecommerce-cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlistItems, setWishlistItems] = useState<Product[]>(() => {
    const saved = localStorage.getItem('ecommerce-wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>(() => {
    const saved = localStorage.getItem('ecommerce-recent');
    return saved ? JSON.parse(saved) : [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  const saveCart = useCallback((items: CartItem[]) => {
    setCartItems(items);
    localStorage.setItem('ecommerce-cart', JSON.stringify(items));
  }, []);

  const saveWishlist = useCallback((items: Product[]) => {
    setWishlistItems(items);
    localStorage.setItem('ecommerce-wishlist', JSON.stringify(items));
  }, []);

  const addToCart = useCallback((item: CartItem) => {
    setCartItems(prev => {
      const existingKey = `${item.id}-${item.selectedVariants?.color}-${item.selectedVariants?.size}`;
      const existing = prev.find(cartItem => 
        `${cartItem.id}-${cartItem.selectedVariants?.color}-${cartItem.selectedVariants?.size}` === existingKey
      );
      
      const newItems = existing
        ? prev.map(cartItem => 
            `${cartItem.id}-${cartItem.selectedVariants?.color}-${cartItem.selectedVariants?.size}` === existingKey
              ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
              : cartItem
          )
        : [...prev, item];
      
      localStorage.setItem('ecommerce-cart', JSON.stringify(newItems));
      return newItems;
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    const newItems = cartItems.filter(item => item.id !== productId);
    saveCart(newItems);
  }, [cartItems, saveCart]);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    const newItems = cartItems.map(item => 
      item.id === productId ? { ...item, quantity } : item
    );
    saveCart(newItems);
  }, [cartItems, saveCart, removeFromCart]);

  const addToWishlist = useCallback((product: Product) => {
    if (!wishlistItems.find(item => item.id === product.id)) {
      const newItems = [...wishlistItems, product];
      saveWishlist(newItems);
    }
  }, [wishlistItems, saveWishlist]);

  const removeFromWishlist = useCallback((productId: string) => {
    const newItems = wishlistItems.filter(item => item.id !== productId);
    saveWishlist(newItems);
  }, [wishlistItems, saveWishlist]);

  const toggleCart = useCallback(() => {
    setIsCartOpen(prev => !prev);
  }, []);

  const addToRecentlyViewed = useCallback((product: Product) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(item => item.id !== product.id);
      const newItems = [product, ...filtered].slice(0, 10);
      localStorage.setItem('ecommerce-recent', JSON.stringify(newItems));
      return newItems;
    });
  }, []);

  const getCartTotal = useCallback(() => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }, [cartItems]);

  const getCartItemCount = useCallback(() => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  }, [cartItems]);

  const clearCart = useCallback(() => {
    saveCart([]);
  }, [saveCart]);

  const contextValue: ShoppingContextType = {
    cartItems,
    wishlistItems,
    isCartOpen,
    recentlyViewed,
    addToCart,
    removeFromCart,
    updateQuantity,
    addToWishlist,
    removeFromWishlist,
    toggleCart,
    addToRecentlyViewed,
    getCartTotal,
    getCartItemCount,
    clearCart
  };

  return (
    <ShoppingContext.Provider value={contextValue}>
      {children}
    </ShoppingContext.Provider>
  );
};

export const useShopping = (): ShoppingContextType => {
  const context = useContext(ShoppingContext);
  if (!context) {
    throw new Error('useShopping must be used within a ShoppingProvider');
  }
  return context;
};
