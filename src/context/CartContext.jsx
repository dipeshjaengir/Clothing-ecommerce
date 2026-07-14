import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('luxora_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('luxora_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity = 1, size = 'M', color = product.colors[0]?.name) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === size && item.selectedColor === color
      );

      if (existingItemIndex > -1) {
        const updated = [...prevCart];
        updated[existingItemIndex].quantity += quantity;
        toast.success(`Updated ${product.name} quantity to ${updated[existingItemIndex].quantity}`, {
          style: {
            background: '#121212',
            color: '#FFFFFF',
            border: '1px solid #C9A227',
            fontFamily: 'Manrope',
          },
          iconTheme: {
            primary: '#C9A227',
            secondary: '#121212',
          },
        });
        return updated;
      }

      toast.success(`Added ${product.name} (${size}) to Cart`, {
        style: {
          background: '#121212',
          color: '#FFFFFF',
          border: '1px solid #C9A227',
          fontFamily: 'Manrope',
        },
        iconTheme: {
          primary: '#C9A227',
          secondary: '#121212',
        },
      });

      return [...prevCart, { product, quantity, selectedSize: size, selectedColor: color }];
    });
  };

  const removeFromCart = (productId, size, color) => {
    setCart((prevCart) => {
      const itemToRemove = prevCart.find(
        (item) => item.product.id === productId && item.selectedSize === size && item.selectedColor === color
      );
      
      if (itemToRemove) {
        toast.error(`Removed ${itemToRemove.product.name} from Cart`, {
          style: {
            background: '#121212',
            color: '#FFFFFF',
            border: '1px solid #c0392b',
            fontFamily: 'Manrope',
          },
        });
      }
      return prevCart.filter(
        (item) => !(item.product.id === productId && item.selectedSize === size && item.selectedColor === color)
      );
    });
  };

  const updateQuantity = (productId, size, color, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId, size, color);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId && item.selectedSize === size && item.selectedColor === color
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    toast.success('Cart cleared', {
      style: {
        background: '#121212',
        color: '#FFFFFF',
        border: '1px solid #C9A227',
      },
    });
  };

  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartSubtotal,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
