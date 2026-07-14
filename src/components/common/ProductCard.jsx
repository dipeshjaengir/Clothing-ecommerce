import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Eye, X, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import LuxuryImage from './LuxuryImage';

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
        className="group relative flex flex-col gap-4 select-none bg-transparent"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Image Canvas Frame - Increased size aspect */}
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[2rem] bg-luxury-card border border-luxury-border/60 hover:border-accent/30 transition-all duration-500 shadow-premium">
          
          {/* New Tag */}
          {product.isNew && (
            <span className="absolute top-4 left-4 z-10 px-3 py-1 bg-accent text-white font-syne font-extrabold text-[8px] tracking-widest rounded-full shadow-gold uppercase">
              NEW RELEASE
            </span>
          )}

          {/* Wishlist Trigger */}
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={() => toggleWishlist(product)}
            className="absolute top-4 right-4 z-10 p-3 rounded-full bg-luxury-card/90 border border-luxury-border/80 backdrop-blur-md text-primary hover:text-accent hover:border-accent transition-all duration-300 shadow-premium"
            aria-label={`Add ${product.name} to wishlist`}
          >
            <Heart 
              className={`w-3.5 h-3.5 transition-transform duration-300 ${
                favorited ? 'fill-accent text-accent scale-110' : 'text-primary/70'
              }`} 
            />
          </motion.button>

          {/* Product Image Link */}
          <Link to={`/product/${product.id}`} className="block w-full h-full relative cursor-none" aria-label={`View details for ${product.name}`}>
            <LuxuryImage
              src={product.images[0]}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
            />
            {product.images[1] && (
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <LuxuryImage
                      src={product.images[1]}
                      alt={`${product.name} alternate view`}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            )}
            
            {/* Subtle Vignette overlay for depth */}
            <div className="absolute inset-0 bg-black/[0.02] group-hover:bg-black/[0.06] transition-colors duration-500" />
          </Link>

          {/* Slide-Up Interactive Action Controls */}
          <div className="absolute bottom-4 inset-x-4 z-10">
            <motion.div 
              className="flex gap-2"
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: isHovered ? 0 : 15, opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Add to Cart */}
              <button
                onClick={handleQuickAddToCart}
                className="flex-grow py-3 bg-[#111111] text-[#F8F7F3] font-syne font-bold text-[9px] tracking-widest rounded-xl hover:bg-accent hover:text-white transition-colors duration-300 flex items-center justify-center gap-1.5 shadow-premium"
                aria-label={`Quick add ${product.name} to cart`}
              >
                <ShoppingBag className="w-3 h-3" /> ADD TO BAG
              </button>
              {/* Quick View */}
              <button
                onClick={() => setIsQuickViewOpen(true)}
                className="p-3 bg-luxury-card border border-luxury-border text-[#111111] hover:text-accent hover:border-accent rounded-xl transition-colors duration-300 shadow-premium"
                aria-label={`Quick view ${product.name}`}
              >
                <Eye className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          </div>

        </div>

        {/* Product Meta Info */}
        <div className="flex flex-col gap-1 px-1">
          <div className="flex justify-between items-center text-[9px] font-bold tracking-widest text-accent uppercase font-syne">
            <span>{product.category}</span>
            {/* Fabric Details */}
            {product.details?.[0] && (
              <span className="text-[8px] text-luxury-muted font-manrope font-light capitalize tracking-normal">
                {product.details[0].split('(')[0].trim()}
              </span>
            )}
          </div>
          
          <div className="flex justify-between items-start gap-4 mt-0.5">
            <h3 className="font-syne font-bold text-xs md:text-sm text-primary tracking-wide hover:text-accent transition-colors leading-tight">
              <Link to={`/product/${product.id}`}>{product.name}</Link>
            </h3>
            <span className="font-extrabold text-xs md:text-sm text-primary font-manrope tracking-wider">${product.price}.00</span>
          </div>

          {/* Sizing Indicator Flex row */}
          <div className="flex flex-wrap gap-1 mt-2.5 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
            {product.sizes.map((size) => (
              <span 
                key={size} 
                className="text-[8px] font-bold text-luxury-muted px-1.5 py-0.5 border border-luxury-border rounded bg-luxury-card"
              >
                {size}
              </span>
            ))}
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
              className="fixed inset-0 z-50 bg-[#111111]/40 backdrop-blur-md flex items-center justify-center p-4"
            />

            {/* Modal Frame Container */}
            <motion.div
              initial={{ scale: 0.96, y: 10, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.96, y: 10, opacity: 0 }}
              transition={{ type: 'spring', damping: 28, stiffness: 240 }}
              className="fixed z-50 w-full max-w-2xl bg-luxury-card border border-luxury-border rounded-[2.5rem] p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 shadow-premium"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsQuickViewOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full bg-luxury-bg border border-luxury-border text-[#111111] hover:text-accent transition-colors z-10 shadow-premium"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Product Gallery Images */}
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[1.75rem] bg-luxury-bg border border-luxury-border">
                <LuxuryImage
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Product Content Details */}
              <div className="flex flex-col justify-between py-1 text-left">
                <div className="space-y-4">
                  <div>
                    <span className="text-[8px] font-extrabold tracking-widest text-accent uppercase block font-syne">{product.category} DROP</span>
                    <h2 className="font-syne font-bold text-lg md:text-2xl text-primary tracking-wide mt-1.5 uppercase leading-tight">{product.name}</h2>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex text-accent">
                        {Array.from({ length: 5 }).map((_, idx) => (
                          <Star key={idx} className={`w-3 h-3 ${idx < Math.floor(product.rating) ? 'fill-accent text-accent' : 'opacity-20'}`} />
                        ))}
                      </div>
                      <span className="text-[9px] text-luxury-muted font-bold tracking-wider font-manrope">({product.reviewsCount} AUDITS)</span>
                    </div>
                  </div>

                  <p className="text-xl font-extrabold text-primary font-manrope tracking-wider">${product.price}.00</p>
                  
                  <p className="text-[11px] text-luxury-muted leading-relaxed font-manrope">{product.description}</p>
                  
                  {/* Select Color */}
                  <div>
                    <span className="text-[8px] font-bold tracking-widest text-[#111111] uppercase block mb-2 font-syne">Select Color</span>
                    <div className="flex gap-1.5">
                      {product.colors.map((color) => (
                        <button
                          key={color.name}
                          onClick={() => setSelectedColor(color.name)}
                          className={`w-7 h-7 rounded-full border flex items-center justify-center transition-all ${
                            selectedColor === color.name ? 'border-accent scale-105' : 'border-transparent'
                          }`}
                          title={color.name}
                        >
                          <span 
                            className="w-5 h-5 rounded-full border border-black/5" 
                            style={{ backgroundColor: color.hex }}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Select Size */}
                  <div>
                    <span className="text-[8px] font-bold tracking-widest text-[#111111] uppercase block mb-2 font-syne">Select Size</span>
                    <div className="flex flex-wrap gap-1.5">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`w-9 h-9 rounded-xl border text-[10px] font-bold flex items-center justify-center transition-all duration-300 ${
                            selectedSize === size
                              ? 'border-accent bg-accent text-white font-extrabold'
                              : 'border-luxury-border bg-luxury-card text-primary hover:border-accent/40'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Submit Action */}
                <div className="pt-4 border-t border-luxury-border mt-4">
                  <button
                    onClick={handleQuickViewSubmit}
                    className="w-full py-3 bg-[#111111] text-[#F8F7F3] font-syne font-bold text-[10px] tracking-widest rounded-xl hover:bg-accent transition-colors duration-300 flex items-center justify-center gap-1.5 shadow-premium"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" /> ADD TO BAG
                  </button>
                  <Link
                    to={`/product/${product.id}`}
                    onClick={() => setIsQuickViewOpen(false)}
                    className="block text-center text-[9px] tracking-wider text-luxury-muted hover:text-accent mt-3 transition-colors font-bold uppercase font-syne"
                  >
                    View Product details
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
