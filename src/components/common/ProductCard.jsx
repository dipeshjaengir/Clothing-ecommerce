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
      <motion.div 
        className="group relative flex flex-col gap-5 select-none"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Image Canvas Frame */}
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-3xl bg-luxury-card border border-luxury-border/40 hover:border-luxury-border/80 transition-colors duration-500 shadow-premium">
          
          {/* New / Sale Gold Tag */}
          {product.isNew && (
            <span className="absolute top-5 left-5 z-10 px-3.5 py-1 bg-accent text-black font-syne font-extrabold text-[9px] tracking-widest rounded-full shadow-gold uppercase">
              NEW RELEASE
            </span>
          )}

          {/* Wishlist Trigger */}
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={() => toggleWishlist(product)}
            className="absolute top-5 right-5 z-10 p-3 rounded-full bg-luxury-bg/85 border border-luxury-border/60 backdrop-blur-md text-white hover:text-accent hover:border-accent transition-all duration-300 shadow-premium"
            aria-label={`Add ${product.name} to wishlist`}
          >
            <Heart 
              className={`w-4 h-4 transition-transform duration-300 ${
                favorited ? 'fill-accent text-accent scale-110' : 'text-white'
              }`} 
            />
          </motion.button>

          {/* Product Image Link */}
          <Link to={`/product/${product.id}`} className="block w-full h-full relative cursor-none" aria-label={`View details for ${product.name}`}>
            <motion.img
              src={product.images[0]}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover"
              animate={{ scale: isHovered ? 1.06 : 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              loading="lazy"
            />
            {product.images[1] && (
              <AnimatePresence>
                {isHovered && (
                  <motion.img
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    src={product.images[1]}
                    alt={`${product.name} alternate view`}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                )}
              </AnimatePresence>
            )}
            
            {/* Dark overlay mask */}
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/25 transition-colors duration-500" />
          </Link>

          {/* Slide-Up Interactive Action Controls */}
          <div className="absolute bottom-5 inset-x-5 z-10">
            <motion.div 
              className="flex gap-2"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Add to Cart */}
              <button
                onClick={handleQuickAddToCart}
                className="flex-grow py-3.5 bg-white text-black font-syne font-bold text-[10px] tracking-widest rounded-2xl hover:bg-accent hover:text-black transition-colors duration-300 flex items-center justify-center gap-1.5 shadow-premium"
                aria-label={`Quick add ${product.name} to cart`}
              >
                <ShoppingBag className="w-3.5 h-3.5" /> ADD TO BAG
              </button>
              {/* Quick View */}
              <button
                onClick={() => setIsQuickViewOpen(true)}
                className="p-3.5 bg-luxury-bg border border-luxury-border text-white hover:text-accent hover:border-accent rounded-2xl transition-colors duration-300 shadow-premium"
                aria-label={`Quick view ${product.name}`}
              >
                <Eye className="w-4 h-4" />
              </button>
            </motion.div>
          </div>

        </div>

        {/* Product Meta Info */}
        <div className="flex flex-col gap-1.5 px-2">
          <span className="text-[9px] font-bold tracking-[0.25em] text-accent uppercase font-syne">
            {product.category}
          </span>
          <div className="flex justify-between items-start gap-4">
            <h3 className="font-syne font-bold text-sm md:text-base text-white tracking-wide hover:text-accent transition-colors leading-tight">
              <Link to={`/product/${product.id}`}>{product.name}</Link>
            </h3>
            <span className="font-extrabold text-sm text-white/95 font-manrope tracking-wider">${product.price}</span>
          </div>
        </div>
      </motion.div>

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
              className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
            />

            {/* Modal Frame Container */}
            <motion.div
              initial={{ scale: 0.95, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 15, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed z-50 w-full max-w-3xl bg-luxury-bg border border-luxury-border/60 rounded-3xl p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-8 shadow-premium"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsQuickViewOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full bg-luxury-card border border-luxury-border text-luxury-muted hover:text-white transition-colors z-10"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Product Gallery Images */}
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-luxury-card border border-luxury-border/40">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Product Content Details */}
              <div className="flex flex-col justify-between py-1">
                <div className="space-y-5">
                  <div>
                    <span className="text-[9px] font-extrabold tracking-widest text-accent uppercase block font-syne">{product.category} DROP</span>
                    <h2 className="font-syne font-bold text-xl md:text-3xl text-white tracking-wide mt-1.5 uppercase leading-tight">{product.name}</h2>
                    <div className="flex items-center gap-2 mt-2.5">
                      <div className="flex text-accent">
                        {Array.from({ length: 5 }).map((_, idx) => (
                          <Star key={idx} className={`w-3.5 h-3.5 ${idx < Math.floor(product.rating) ? 'fill-accent' : 'opacity-20'}`} />
                        ))}
                      </div>
                      <span className="text-[10px] text-luxury-muted font-bold tracking-wider font-manrope">({product.reviewsCount} REVIEWS)</span>
                    </div>
                  </div>

                  <p className="text-2xl font-black text-white font-manrope tracking-wider">${product.price}</p>
                  
                  <p className="text-xs text-luxury-muted leading-relaxed font-manrope">{product.description}</p>
                  
                  {/* Select Color */}
                  <div>
                    <span className="text-[9px] font-bold tracking-widest text-luxury-muted uppercase block mb-2.5 font-syne">Select Tint</span>
                    <div className="flex gap-2">
                      {product.colors.map((color) => (
                        <button
                          key={color.name}
                          onClick={() => setSelectedColor(color.name)}
                          className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
                            selectedColor === color.name ? 'border-accent scale-105' : 'border-transparent'
                          }`}
                          title={color.name}
                        >
                          <span 
                            className="w-6 h-6 rounded-full border border-white/15" 
                            style={{ backgroundColor: color.hex }}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Select Size */}
                  <div>
                    <span className="text-[9px] font-bold tracking-widest text-luxury-muted uppercase block mb-2.5 font-syne">Select Sizing</span>
                    <div className="flex gap-2">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`w-10 h-10 rounded-xl border text-xs font-bold flex items-center justify-center transition-all duration-350 ${
                            selectedSize === size
                              ? 'border-accent bg-accent text-black font-extrabold'
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
                <div className="pt-6 border-t border-luxury-border/60 mt-6">
                  <button
                    onClick={handleQuickViewSubmit}
                    className="w-full py-4 bg-white text-black font-syne font-bold text-xs tracking-widest rounded-full hover:bg-accent transition-colors duration-300 flex items-center justify-center gap-2 shadow-premium"
                  >
                    <ShoppingBag className="w-4 h-4" /> ADD TO BAG
                  </button>
                  <Link
                    to={`/product/${product.id}`}
                    onClick={() => setIsQuickViewOpen(false)}
                    className="block text-center text-xs tracking-wider text-luxury-muted hover:text-white mt-4 transition-colors font-bold uppercase font-syne"
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
