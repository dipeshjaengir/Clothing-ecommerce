import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowLeft, Heart } from 'lucide-react';

const Wishlist = () => {
  const { wishlist, toggleWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleQuickAdd = (product) => {
    addToCart(product, 1, product.sizes[0], product.colors[0]?.name);
  };

  return (
    <div className="pt-28 pb-24 bg-luxury-bg text-white font-manrope min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Title */}
        <div className="border-b border-luxury-border/60 pb-8 mb-12 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-center sm:text-left">
            <span className="text-[10px] font-bold tracking-widest text-accent uppercase">
              SAVED SILHOUETTES
            </span>
            <h1 className="font-syne text-4xl md:text-6xl font-black tracking-wider text-white uppercase mt-2">
              MY WISHLIST
            </h1>
          </div>
          {wishlist.length > 0 && (
            <button
              onClick={clearWishlist}
              className="px-6 py-2.5 border border-red-500/30 text-red-500 rounded-xl text-xs font-syne font-bold tracking-widest hover:bg-red-500/10 transition-colors"
            >
              CLEAR ALL
            </button>
          )}
        </div>

        {wishlist.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {wishlist.map((product) => (
              <div
                key={product.id}
                className="group relative flex flex-col gap-4 bg-luxury-card/25 border border-luxury-border/60 rounded-3xl p-4 hover:border-luxury-border transition-all duration-300"
              >
                {/* Image Frame */}
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-luxury-card border border-luxury-border/40">
                  
                  {/* Remove Button */}
                  <button
                    onClick={() => toggleWishlist(product)}
                    className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/60 border border-luxury-border backdrop-blur-md text-red-400 hover:text-red-500 transition-colors"
                    title="Remove from Wishlist"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <Link to={`/product/${product.id}`} className="block w-full h-full">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
                  </Link>
                </div>

                {/* Details */}
                <div className="flex flex-col gap-2 flex-grow">
                  <span className="text-[9px] font-bold tracking-widest text-luxury-muted uppercase">
                    {product.category}
                  </span>
                  
                  <h3 className="font-syne font-bold text-sm text-white tracking-wider flex-grow">
                    <Link to={`/product/${product.id}`} className="hover:text-accent transition-colors">
                      {product.name}
                    </Link>
                  </h3>

                  <div className="flex justify-between items-center mt-2 border-t border-luxury-border/60 pt-3">
                    <span className="font-bold text-sm text-white font-manrope">${product.price}</span>
                    
                    <button
                      onClick={() => handleQuickAdd(product)}
                      className="px-4 py-2.5 bg-white text-black font-syne font-bold text-[9px] tracking-widest rounded-xl hover:bg-accent hover:text-black transition-colors flex items-center gap-1 shadow-premium"
                    >
                      <ShoppingBag className="w-3 h-3" /> ADD TO BAG
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="py-24 text-center rounded-3xl border border-dashed border-luxury-border flex flex-col justify-center items-center">
            <Heart className="w-12 h-12 text-luxury-border mb-4 animate-pulse-slow" />
            <h2 className="font-syne font-bold text-xl tracking-wider mb-2">WISHLIST IS EMPTY</h2>
            <p className="text-sm text-luxury-muted max-w-sm mb-8 leading-relaxed">
              No garments have been saved. Browse our digital editorials to queue items for acquisition.
            </p>
            <Link
              to="/shop"
              className="px-8 py-4 bg-white text-black font-syne font-bold text-xs tracking-widest rounded-full hover:bg-accent transition-all duration-300"
            >
              SHOP NEW DROPS
            </Link>
          </div>
        )}

      </div>
    </div>
  );
};

export default Wishlist;
