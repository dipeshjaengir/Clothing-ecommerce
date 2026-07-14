import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Eye, X, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  
  const [isHovered, setIsHovered] = useState(false);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name);

  const favorited = isInWishlist(product.id);

  const handleQuickAddToCart = (e) => {
    e.preventDefault();
    addToCart(product, 1, product.sizes[0], product.colors[0]?.name);
  };

  const handleQuickViewSubmit = (e) => {
    e.preventDefault();
    addToCart(product, 1, selectedSize, selectedColor);
    setIsQuickViewOpen(false);
  };

  return (
    <>
      <div 
        className="group relative flex flex-col gap-4"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container with Badges */}
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-luxury-card border border-luxury-border/60">
          
          {/* New Tag / Hot Tags */}
          {product.isNew && (
            <span className="absolute top-4 left-4 z-10 px-3 py-1 bg-accent text-black font-syne font-extrabold text-[9px] tracking-widest rounded-full">
              NEW DROP
            </span>
          )}

          {/* Wishlist Action Heart */}
          <button
            onClick={() => toggleWishlist(product)}
            className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-luxury-bg/75 border border-luxury-border backdrop-blur-md text-white hover:text-accent transition-colors duration-300"
            aria-label="Add to wishlist"
          >
            <Heart 
              className={`w-4 h-4 transition-transform duration-300 active:scale-125 ${
                favorited ? 'fill-accent text-accent' : 'text-white'
              }`} 
            />
          </button>

          {/* Product Image Links (Swap on Hover) */}
          <Link to={`/product/${product.id}`} className="block w-full h-full relative cursor-pointer">
            <img
              src={product.images[0]}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] cubic-bezier(0.16, 1, 0.3, 1) group-hover:scale-110"
              loading="lazy"
            />
            {product.images[1] && (
              <img
                src={product.images[1]}
                alt={`${product.name} alternate`}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
                  isHovered ? 'opacity-100' : 'opacity-0'
                }`}
                loading="lazy"
              />
            )}
            
            {/* Dark Hover overlay mask */}
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-500" />
          </Link>

          {/* Hover Panel Slide-up Actions (Desktop) */}
          <div className="absolute bottom-4 inset-x-4 flex gap-2 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-10">
            {/* Add to Cart quick button */}
            <button
              onClick={handleQuickAddToCart}
              className="flex-grow py-3 bg-white text-black font-syne font-bold text-[10px] tracking-widest rounded-xl hover:bg-accent hover:text-black transition-colors duration-300 flex items-center justify-center gap-1.5 shadow-premium"
            >
              <ShoppingBag className="w-3.5 h-3.5" /> ADD TO CART
            </button>
            {/* Quick View Icon button */}
            <button
              onClick={() => setIsQuickViewOpen(true)}
              className="p-3 bg-luxury-bg border border-luxury-border text-white hover:text-accent rounded-xl transition-colors duration-300 shadow-premium"
              title="Quick View"
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Product Info Details */}
        <div className="flex flex-col gap-1 px-1">
          <span className="text-[10px] font-bold tracking-widest text-luxury-muted uppercase">
            {product.category}
          </span>
          <div className="flex justify-between items-start gap-4">
            <h3 className="font-syne font-bold text-sm text-white tracking-wider hover:text-accent transition-colors">
              <Link to={`/product/${product.id}`}>{product.name}</Link>
            </h3>
            <span className="font-bold text-sm text-white font-manrope">${product.price}</span>
          </div>
        </div>
      </div>

      {/* Quick View Modal Overlay */}
      <AnimatePresence>
        {isQuickViewOpen && (
          <>
            {/* Modal Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsQuickViewOpen(false)}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
            />

            {/* Modal Frame Container */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed z-50 w-full max-w-3xl bg-luxury-bg border border-luxury-border rounded-3xl p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 shadow-premium"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsQuickViewOpen(false)}
                className="absolute top-4 right-4 p-2 text-luxury-muted hover:text-white transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Product Gallery Images */}
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-luxury-card border border-luxury-border">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Product Content Details */}
              <div className="flex flex-col justify-between py-2">
                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] font-extrabold tracking-widest text-accent uppercase">{product.category}</span>
                    <h2 className="font-syne font-bold text-xl md:text-2xl text-white tracking-wider mt-1">{product.name}</h2>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex text-accent">
                        {Array.from({ length: 5 }).map((_, idx) => (
                          <Star key={idx} className={`w-3.5 h-3.5 ${idx < Math.floor(product.rating) ? 'fill-accent' : 'opacity-30'}`} />
                        ))}
                      </div>
                      <span className="text-xs text-luxury-muted font-manrope">({product.reviewsCount} reviews)</span>
                    </div>
                  </div>

                  <p className="text-2xl font-extrabold text-white font-manrope">${product.price}</p>
                  
                  <p className="text-xs text-luxury-muted leading-relaxed font-manrope">{product.description}</p>
                  
                  {/* Select Color */}
                  <div>
                    <span className="text-[10px] font-bold tracking-wider text-luxury-muted uppercase block mb-2">Color</span>
                    <div className="flex gap-2">
                      {product.colors.map((color) => (
                        <button
                          key={color.name}
                          onClick={() => setSelectedColor(color.name)}
                          className={`w-7 h-7 rounded-full border flex items-center justify-center transition-all ${
                            selectedColor === color.name ? 'border-accent scale-110' : 'border-transparent'
                          }`}
                          title={color.name}
                        >
                          <span 
                            className="w-5 h-5 rounded-full border border-white/10" 
                            style={{ backgroundColor: color.hex }}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Select Size */}
                  <div>
                    <span className="text-[10px] font-bold tracking-wider text-luxury-muted uppercase block mb-2">Size</span>
                    <div className="flex gap-2">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`w-10 h-10 rounded-xl border text-xs font-semibold flex items-center justify-center transition-all ${
                            selectedSize === size
                              ? 'border-accent bg-accent text-black'
                              : 'border-luxury-border bg-luxury-card text-white hover:border-white/50'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Submit Action */}
                <div className="pt-6">
                  <button
                    onClick={handleQuickViewSubmit}
                    className="w-full py-4 bg-white text-black font-syne font-bold text-xs tracking-widest rounded-full hover:bg-accent transition-colors duration-300 flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" /> ADD TO BAG
                  </button>
                  <Link
                    to={`/product/${product.id}`}
                    onClick={() => setIsQuickViewOpen(false)}
                    className="block text-center text-xs tracking-wider text-luxury-muted hover:text-white mt-4 transition-colors font-semibold"
                  >
                    View Full Archive Details
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductCard;
