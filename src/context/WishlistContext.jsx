import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('luxora_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('luxora_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (product) => {
    setWishlist((prevWishlist) => {
      const exists = prevWishlist.some((item) => item.id === product.id);

      if (exists) {
        toast.success(`Removed ${product.name} from Wishlist`, {
          style: {
            background: '#121212',
            color: '#FFFFFF',
            border: '1px solid #777',
            fontFamily: 'Manrope',
          },
        });
        return prevWishlist.filter((item) => item.id !== product.id);
      } else {
        toast.success(`Added ${product.name} to Wishlist`, {
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
        return [...prevWishlist, product];
      }
    });
  };

  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  const clearWishlist = () => {
    setWishlist([]);
    toast.success('Wishlist cleared', {
      style: {
        background: '#121212',
        color: '#FFFFFF',
        border: '1px solid #C9A227',
      },
    });
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        isInWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
