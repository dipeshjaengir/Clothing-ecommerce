import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { products } from '../../data/mockData';
import LuxuryImage from '../common/LuxuryImage';

const SearchPopup = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const popularSearches = [
    "Oversized Hoodie",
    "Sneakers",
    "Selvedge Denim",
    "Silk Linen Shirt",
    "Trench Coat"
  ];

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
      setResults([]);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered.slice(0, 5));
  }, [query]);

  const handleResultClick = (productId) => {
    onClose();
    navigate(`/product/${productId}`);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onClose();
      navigate(`/shop?search=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 glassmorphism flex justify-center items-start pt-[12vh] px-6 md:px-12"
        >
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="w-full max-w-3xl bg-luxury-bg border border-luxury-border p-6 md:p-10 rounded-3xl shadow-premium relative"
          >
            {/* Close Button */}
             <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 text-luxury-muted hover:text-primary transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Input Form */}
            <form onSubmit={handleSearchSubmit} className="relative w-full border-b border-luxury-border pb-4">
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="SEARCH THE LUXORA ARCHIVE..."
                className="w-full bg-transparent text-xl md:text-3xl font-syne font-semibold tracking-wider outline-none text-primary placeholder-luxury-muted pr-10"
              />
              <button type="submit" className="absolute right-0 top-1 text-accent hover:text-accent-light">
                <Search className="w-7 h-7" />
              </button>
            </form>

            {/* Popular Searches */}
            {query === '' && (
              <div className="mt-8">
                <h4 className="text-xs font-syne font-bold tracking-widest text-luxury-muted uppercase mb-4">
                  Popular Searches
                </h4>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((term, index) => (
                    <button
                      key={index}
                      onClick={() => setQuery(term)}
                      className="px-4 py-2 text-xs font-manrope font-semibold tracking-wider rounded-full bg-luxury-card border border-luxury-border hover:border-accent hover:text-accent transition-all duration-300"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Live Search Results */}
            {query !== '' && (
              <div className="mt-8">
                <h4 className="text-xs font-syne font-bold tracking-widest text-luxury-muted uppercase mb-4">
                  Matches found ({results.length})
                </h4>

                <div className="space-y-4 max-h-[350px] overflow-y-auto no-scrollbar">
                  {results.length > 0 ? (
                    results.map((product) => (
                      <div
                        key={product.id}
                        onClick={() => handleResultClick(product.id)}
                        className="flex items-center gap-4 p-3 rounded-2xl bg-luxury-card/50 hover:bg-luxury-card border border-transparent hover:border-luxury-border cursor-pointer transition-all duration-300 group"
                      >
                        <div className="w-16 h-20 overflow-hidden rounded-xl bg-luxury-border flex-shrink-0">
                          <LuxuryImage
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-grow">
                          <h5 className="font-syne font-bold text-sm md:text-base text-primary tracking-wider group-hover:text-accent transition-colors duration-300">
                            {product.name}
                          </h5>
                          <span className="text-xs font-manrope text-luxury-muted">
                            in {product.category}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-accent font-manrope">
                            ${product.price}
                          </span>
                          <ArrowRight className="w-4 h-4 text-luxury-muted opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-luxury-muted py-4">No archives match your query. Try searching for "Hoodie", "Sneakers", or "Denim".</p>
                  )}
                </div>
                
                {query !== '' && results.length > 0 && (
                  <button 
                    onClick={handleSearchSubmit}
                    className="w-full mt-6 text-center text-xs tracking-widest font-syne font-bold text-accent hover:text-primary transition-colors flex items-center justify-center gap-2"
                  >
                    VIEW ALL RESULTS <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchPopup;
