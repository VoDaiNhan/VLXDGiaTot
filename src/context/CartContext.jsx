import React, { createContext, useContext, useState, useEffect } from 'react';
import { useCurrentUser } from '../lib/auth';
import { products } from '../data/products';
import sql from '../lib/db';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const { isSignedIn, isLoaded, user } = useCurrentUser();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load cart on mount/auth change
  useEffect(() => {
    loadCart();
  }, [isSignedIn, isLoaded, user?.email]);

  const loadCart = async () => {
    setLoading(true);
    try {
      if (isSignedIn && user?.email) {
        // Fetch user_id from DB first (based on email)
        const userRes = await sql`SELECT id FROM users WHERE email = ${user.email}`;
        if (userRes && userRes.length > 0) {
          const userId = userRes[0].id;
          
          // Fetch cart items
          const items = await sql`
            SELECT product_id, quantity 
            FROM cart_items 
            WHERE user_id = ${userId}
          `;
          
          // Merge with product details
          const enrichedItems = items.map(item => {
            const product = products.find(p => p.id === item.product_id);
            if (!product) return null;
            return {
              ...product,
              quantity: item.quantity
            };
          }).filter(Boolean);
          
          setCartItems(enrichedItems);
        } else {
          // User not in DB yet? Should happen via AccountPage or auth flow, 
          // but for safety treat as empty or fallback to local
          setCartItems([]);
        }
      } else {
        // Load from local storage
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          setCartItems(JSON.parse(savedCart));
        } else {
          setCartItems([]);
        }
      }
    } catch (error) {
      console.error('Error loading cart:', error);
      // Fallback to local on error
      const savedCart = localStorage.getItem('cart');
      if (savedCart) setCartItems(JSON.parse(savedCart));
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (product, quantity = 1) => {
    // Optimistic update
    const updatedItems = [...cartItems];
    const existingItemIndex = updatedItems.findIndex(item => item.id === product.id);
    
    if (existingItemIndex >= 0) {
      updatedItems[existingItemIndex].quantity += quantity;
    } else {
      updatedItems.push({ ...product, quantity });
    }
    
    setCartItems(updatedItems);
    
    // Sync with DB or LocalStorage
    if (isSignedIn && user?.email) {
      try {
        const userRes = await sql`SELECT id FROM users WHERE email = ${user.email}`;
        if (userRes && userRes.length > 0) {
          const userId = userRes[0].id;
          const newQuantity = existingItemIndex >= 0 ? updatedItems[existingItemIndex].quantity : quantity;
          
          await sql`
            INSERT INTO cart_items (user_id, product_id, quantity)
            VALUES (${userId}, ${product.id}, ${newQuantity})
            ON CONFLICT (user_id, product_id) 
            DO UPDATE SET quantity = ${newQuantity}
          `;
        }
      } catch (error) {
        console.error('Error syncing cart to DB:', error);
      }
    } else {
      localStorage.setItem('cart', JSON.stringify(updatedItems));
    }
  };

  const removeFromCart = async (productId) => {
    console.log('Removing product:', productId);
    const pId = parseInt(productId);
    const updatedItems = cartItems.filter(item => item.id !== pId);
    setCartItems(updatedItems);

    if (isSignedIn && user?.email) {
      try {
        const userRes = await sql`SELECT id FROM users WHERE email = ${user.email}`;
        if (userRes && userRes.length > 0) {
          const userId = userRes[0].id;
          console.log('Deleting from DB:', { userId, pId });
          await sql`
            DELETE FROM cart_items 
            WHERE user_id = ${userId} AND product_id = ${pId}
          `;
          console.log('Deleted from DB success');
        }
      } catch (error) {
        console.error('Error removing from cart DB:', error);
      }
    } else {
      localStorage.setItem('cart', JSON.stringify(updatedItems));
    }
  };

  const updateQuantity = async (productId, delta) => {
    const updatedItems = cartItems.map(item => {
      if (item.id === productId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    });
    
    setCartItems(updatedItems);

    if (isSignedIn && user?.email) {
      try {
        const userRes = await sql`SELECT id FROM users WHERE email = ${user.email}`;
        if (userRes && userRes.length > 0) {
          const userId = userRes[0].id;
          const item = updatedItems.find(i => i.id === productId);
          if (item) {
             await sql`
              UPDATE cart_items 
              SET quantity = ${item.quantity}
              WHERE user_id = ${userId} AND product_id = ${productId}
            `;
          }
        }
      } catch (error) {
        console.error('Error updating cart DB:', error);
      }
    } else {
      localStorage.setItem('cart', JSON.stringify(updatedItems));
    }
  };

  const clearCart = async () => {
    setCartItems([]);
    if (isSignedIn && user?.email) {
       try {
        const userRes = await sql`SELECT id FROM users WHERE email = ${user.email}`;
        if (userRes && userRes.length > 0) {
          const userId = userRes[0].id;
          await sql`DELETE FROM cart_items WHERE user_id = ${userId}`;
        }
      } catch (error) {
        console.error('Error clearing cart DB:', error);
      }
    } else {
      localStorage.removeItem('cart');
    }
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + (item.salePrice || item.originalPrice) * item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      loading, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart,
      cartCount,
      subtotal
    }}>
      {children}
    </CartContext.Provider>
  );
};
