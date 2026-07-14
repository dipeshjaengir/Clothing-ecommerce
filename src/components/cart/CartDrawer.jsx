import React, { useEffect } from 'react';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import LuxuryImage from '../common/LuxuryImage';

const CartDrawer = () => {
  const { cart, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, cartSubtotal } = useCart();
  const navigate = useNavigate();

  // Close scrollbar when drawer is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    navigate('/cart');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop blur overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Slider Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', ease: [0.16, 1, 0.3, 1], duration: 0.5 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-luxury-card border-l border-luxury-border flex flex-col justify-between shadow-premium"
          >
            {/* Drawer Header */}
            <div className="p-6 border-b border-luxury-border flex justify-between items-center">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-accent" />
                <span className="font-syne font-bold text-lg tracking-wider">YOUR CART</span>
                <span className="bg-luxury-card text-accent text-xs font-semibold px-2 py-0.5 rounded-full border border-accent/20">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 text-luxury-muted hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Item List */}
            <div className="flex-grow p-6 overflow-y-auto no-scrollbar space-y-6">
              {cart.length > 0 ? (
                cart.map((item, index) => (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                    className="flex gap-4 p-4 rounded-2xl bg-luxury-card/30 border border-luxury-border/60 hover:border-luxury-border transition-all duration-300 relative group"
                  >
                    {/* Item Image */}
                    <div className="w-20 h-24 overflow-hidden rounded-xl bg-luxury-border flex-shrink-0">
                      <LuxuryImage
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Item Details */}
                    <div className="flex-grow flex flex-col justify-between">
                      <div>
                        <h4 className="font-syne font-bold text-sm text-secondary tracking-wider pr-6">
                          <Link
                            to={`/product/${item.product.id}`}
                            onClick={() => setIsCartOpen(false)}
                            className="hover:text-accent transition-colors"
                          >
                            {item.product.name}
                          </Link>
                        </h4>
                        <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1 text-[11px] text-luxury-muted font-manrope">
                          <span>Size: <strong className="text-white">{item.selectedSize}</strong></span>
                          <span>Color: <strong className="text-white">{item.selectedColor}</strong></span>
                        </div>
                      </div>

                      {/* Quantity & Price Controls */}
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center border border-luxury-border rounded-lg bg-luxury-bg/50">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.selectedSize, item.selectedColor, item.quantity - 1)}
                            className="p-1 px-2 text-luxury-muted hover:text-white transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-semibold select-none text-white font-manrope">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.selectedSize, item.selectedColor, item.quantity + 1)}
                            className="p-1 px-2 text-luxury-muted hover:text-white transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        
                        <span className="font-bold text-sm text-accent font-manrope">
                          ${item.product.price * item.quantity}
                        </span>
                      </div>
                    </div>

                    {/* Trash Button */}
                    <button
                      onClick={() => removeFromCart(item.product.id, item.selectedSize, item.selectedColor)}
                      className="absolute top-4 right-4 p-1.5 rounded-lg text-luxury-muted hover:text-red-500 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-all duration-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))
              ) : (
                <div className="h-full flex flex-col justify-center items-center text-center">
                  <ShoppingBag className="w-16 h-16 text-luxury-border mb-4 animate-pulse-slow" />
                  <p className="font-syne font-bold text-lg tracking-wider mb-2">YOUR ARCHIVE IS EMPTY</p>
                  <p className="text-sm text-luxury-muted max-w-[240px] mb-6">Explore the collections and acquire elite garments.</p>
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      navigate('/shop');
                    }}
                    className="px-6 py-3 bg-secondary text-primary font-syne font-bold text-xs tracking-widest rounded-full hover:bg-accent hover:text-black transition-all duration-300"
                  >
                    SHOP NEW DROPS
                  </button>
                </div>
              )}
            </div>

            {/* Drawer Checkout Footer */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-luxury-border bg-luxury-card/50 space-y-4">
                <div className="flex justify-between items-center text-sm font-semibold tracking-wider font-manrope">
                  <span className="text-luxury-muted">SUBTOTAL</span>
                  <span className="text-lg font-bold text-secondary font-manrope">${cartSubtotal}</span>
                </div>
                <p className="text-[11px] text-luxury-muted font-manrope">Shipping fees, taxes, and promotional codes computed at checkout.</p>
                <div className="grid grid-cols-1 gap-2 pt-2">
                  <button
                    onClick={handleCheckoutClick}
                    className="w-full py-4 bg-accent text-black font-syne font-bold text-xs tracking-widest rounded-full hover:bg-accent-light transition-all duration-300 flex items-center justify-center gap-2 group"
                  >
                    PROCEED TO CHECKOUT <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="w-full py-3 bg-transparent text-secondary font-syne font-bold text-xs tracking-widest rounded-full hover:text-accent transition-colors"
                  >
                    CONTINUE BROWSING
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
