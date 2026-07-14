import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, ArrowUpDown, X, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { products } from '../data/mockData';
import ProductCard from '../components/common/ProductCard';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const initialSearch = searchParams.get('search') || '';

  const [categoryFilter, setCategoryFilter] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [priceRange, setPriceRange] = useState(600); // max price limit
  const [sortBy, setSortBy] = useState('newest'); // newest, low-to-high, high-to-low, rated
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const categories = [
    'All',
    'Men',
    'Women',
    'Oversized',
    'Hoodies',
    'T-Shirts',
    'Shirts',
    'Jeans',
    'Sneakers',
    'Accessories'
  ];

  // Update filter state if query parameters change
  useEffect(() => {
    setCategoryFilter(searchParams.get('category') || 'All');
    setSearchQuery(searchParams.get('search') || '');
  }, [searchParams]);

  // Handle category selection
  const handleCategorySelect = (category) => {
    setCategoryFilter(category);
    if (category === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', category);
    }
    setSearchParams(searchParams);
  };

  // Clear all filters
  const handleResetFilters = () => {
    setCategoryFilter('All');
    setPriceRange(600);
    setSortBy('newest');
    setSearchQuery('');
    setSearchParams({});
  };

  // Filter and Sort products
  const filteredProducts = products
    .filter((product) => {
      // Category filter
      const matchesCategory =
        categoryFilter === 'All' ||
        product.category.toLowerCase() === categoryFilter.toLowerCase() ||
        product.gender?.toLowerCase() === categoryFilter.toLowerCase();

      // Search query filter
      const matchesSearch =
        searchQuery === '' ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());

      // Price limit filter
      const matchesPrice = product.price <= priceRange;

      return matchesCategory && matchesSearch && matchesPrice;
    })
    .sort((a, b) => {
      if (sortBy === 'low-to-high') return a.price - b.price;
      if (sortBy === 'high-to-low') return b.price - a.price;
      if (sortBy === 'rated') return b.rating - a.rating;
      // Default: newest drops
      return b.isNew - a.isNew;
    });

  return (
    <div className="pt-28 pb-24 bg-luxury-bg text-primary font-manrope">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Page Title / Meta */}
        <div className="border-b border-luxury-border/60 pb-8 mb-12">
          <span className="text-[10px] font-bold tracking-widest text-accent uppercase">
            ARCHIVE CLASSIFICATION
          </span>
          <h1 className="font-syne text-4xl md:text-6xl font-black tracking-wider text-primary uppercase mt-2">
            THE LUXORA SHOP
          </h1>
          {searchQuery && (
            <p className="text-xs text-luxury-muted mt-3 font-manrope flex items-center gap-2">
              Showing search results for <strong className="text-primary">"{searchQuery}"</strong>
              <button 
                onClick={() => handleResetFilters()} 
                className="p-1 rounded bg-luxury-card border border-luxury-border hover:border-red-500 transition-colors"
                title="Clear Search"
              >
                <X className="w-3.5 h-3.5 text-red-500" />
              </button>
            </p>
          )}
        </div>

        {/* Top Control Bar */}
        <div className="flex justify-between items-center bg-luxury-card/30 border border-luxury-border/80 rounded-2xl p-4 mb-8">
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 px-4 py-2 border border-luxury-border rounded-xl text-xs font-syne font-bold tracking-widest hover:border-accent text-primary hover:text-accent transition-colors bg-luxury-card"
          >
            <SlidersHorizontal className="w-4 h-4" /> FILTERS
          </button>
          
          <span className="text-xs text-luxury-muted hidden lg:block tracking-wider font-semibold">
            SHOWING {filteredProducts.length} DESIGNS
          </span>

          <div className="flex items-center gap-3 ml-auto">
            <ArrowUpDown className="w-4 h-4 text-accent" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-luxury-bg border border-luxury-border text-primary text-xs font-semibold py-2 px-3 rounded-xl outline-none focus:border-accent tracking-wider font-syne"
            >
              <option value="newest">NEW RELEASES</option>
              <option value="low-to-high">PRICE: LOW TO HIGH</option>
              <option value="high-to-low">PRICE: HIGH TO LOW</option>
              <option value="rated">TOP RATED</option>
            </select>
          </div>
        </div>

        {/* Main Content Split */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          {/* Side Filter Panel (Desktop Only) */}
          <aside className="hidden lg:block space-y-8">
            
            {/* Category Filter */}
            <div>
              <h3 className="font-syne font-bold text-xs tracking-widest text-accent uppercase mb-4">
                CATEGORIES
              </h3>
              <div className="flex flex-col gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategorySelect(cat)}
                    className={`text-left text-xs font-semibold tracking-wider py-1.5 transition-colors ${
                      categoryFilter === cat ? 'text-accent font-bold' : 'text-luxury-muted hover:text-primary'
                    }`}
                  >
                    {cat.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div>
              <h3 className="font-syne font-bold text-xs tracking-widest text-accent uppercase mb-4">
                MAX PRICE: ${priceRange}
              </h3>
              <input
                type="range"
                min="50"
                max="600"
                step="10"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full h-1 bg-luxury-border rounded-lg appearance-none cursor-pointer accent-accent"
              />
              <div className="flex justify-between text-[10px] text-luxury-muted mt-2 font-semibold font-manrope">
                <span>$50</span>
                <span>$600</span>
              </div>
            </div>

            {/* Reset Button */}
            <button
              onClick={handleResetFilters}
              className="w-full py-3 border border-luxury-border rounded-xl text-xs font-syne font-bold tracking-widest text-primary hover:border-accent hover:text-accent transition-all duration-300"
            >
              RESET ALL FILTERS
            </button>

          </aside>

          {/* Product Grid Area */}
          <main className="lg:col-span-3">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="py-24 text-center rounded-3xl border border-dashed border-luxury-border flex flex-col justify-center items-center">
                <SlidersHorizontal className="w-12 h-12 text-luxury-border mb-4 animate-pulse-slow" />
                <p className="font-syne font-bold text-lg tracking-wider mb-2">NO DESIGNS FOUND</p>
                <p className="text-sm text-luxury-muted max-w-[280px] mb-6">Modify your filter criteria or reset parameters to browse the archive.</p>
                <button
                  onClick={handleResetFilters}
                  className="px-6 py-3 bg-[#111111] text-[#F8F7F3] font-syne font-bold text-xs tracking-widest rounded-full hover:bg-accent transition-colors"
                >
                  RESET FILTERS
                </button>
              </div>
            )}
          </main>

        </div>

      </div>

      {/* Mobile Filters Drawer */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', ease: 'easeOut', duration: 0.4 }}
              className="fixed left-0 top-0 bottom-0 z-50 w-full max-w-xs bg-luxury-bg border-r border-luxury-border p-6 flex flex-col justify-between lg:hidden"
            >
              <div className="space-y-8 overflow-y-auto no-scrollbar flex-grow pr-2">
                <div className="flex justify-between items-center border-b border-luxury-border pb-4">
                  <span className="font-syne font-bold text-sm tracking-widest">FILTER SELECTIONS</span>
                  <button onClick={() => setIsMobileFilterOpen(false)}>
                    <X className="w-5 h-5 text-luxury-muted hover:text-primary" />
                  </button>
                </div>

                {/* Categories */}
                <div>
                  <h4 className="font-syne font-bold text-xs tracking-widest text-accent uppercase mb-4">CATEGORIES</h4>
                  <div className="flex flex-col gap-3">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => {
                          handleCategorySelect(cat);
                          setIsMobileFilterOpen(false);
                        }}
                        className={`text-left text-xs font-semibold py-1 transition-colors ${
                          categoryFilter === cat ? 'text-accent font-bold' : 'text-luxury-muted'
                        }`}
                      >
                        {cat.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div>
                  <h4 className="font-syne font-bold text-xs tracking-widest text-accent uppercase mb-4">
                    MAX PRICE: ${priceRange}
                  </h4>
                  <input
                    type="range"
                    min="50"
                    max="600"
                    step="10"
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                    className="w-full h-1 bg-luxury-border rounded-lg appearance-none cursor-pointer accent-accent"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-luxury-border space-y-2">
                <button
                  onClick={() => {
                    handleResetFilters();
                    setIsMobileFilterOpen(false);
                  }}
                  className="w-full py-3 bg-luxury-card border border-luxury-border rounded-xl text-xs font-syne font-bold tracking-widest"
                >
                  RESET
                </button>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-full py-3 bg-[#111111] text-[#F8F7F3] rounded-xl text-xs font-syne font-bold tracking-widest"
                >
                  APPLY FILTERS
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Shop;
