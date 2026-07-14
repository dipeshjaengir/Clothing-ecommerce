import React from 'react';
import { products } from '../../data/mockData';
import ProductCard from '../common/ProductCard';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Trending = () => {
  // Take 3 items to make room for our editorial card
  const trendingProducts = products.filter(p => p.isTrending).slice(0, 3);

  return (
    <section className="py-32 bg-luxury-bg border-b border-luxury-border/60">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-20">
          <div>
            <span className="text-[10px] font-syne font-extrabold tracking-[0.3em] text-accent uppercase block mb-3">
              03.5 // CLIENT SELECTIONS
            </span>
            <h2 className="font-syne text-4xl md:text-5xl font-black tracking-wider text-primary uppercase leading-none">
              BEST SELLERS
            </h2>
          </div>
          <Link
            to="/shop"
            className="flex items-center gap-2 text-xs font-syne font-extrabold tracking-widest text-luxury-muted hover:text-accent transition-colors group py-1.5 border-b border-transparent hover:border-accent"
          >
            VIEW ENTIRE SHOP <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Asymmetric Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Column 1: Typographic Editorial Card */}
          <div className="p-8 rounded-3xl bg-luxury-card border border-luxury-border/80 flex flex-col justify-between aspect-[3/4] shadow-premium relative overflow-hidden group hover:border-accent/40 transition-colors duration-500">
            {/* Soft backdrop shine */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-full blur-2xl group-hover:bg-accent/10 transition-all duration-700" />
            
            <div>
              <span className="text-[9px] font-bold tracking-widest text-accent uppercase font-syne block mb-2">THE CONCEPT</span>
              <h3 className="font-syne text-2xl font-extrabold tracking-wide text-primary uppercase leading-snug">
                MODERN<br />
                ESSENTIALS<br />
                ARCHIVE
              </h3>
              <div className="h-[2px] bg-accent/30 w-12 mt-4" />
            </div>

            <div>
              <p className="text-xs text-luxury-muted leading-relaxed font-manrope font-light mb-6">
                Silhouettes engineered with precise dropped coordinates and weight distributions, designed to retain shape over years.
              </p>
              <Link 
                to="/shop" 
                className="text-[10px] font-syne font-bold tracking-widest text-primary hover:text-accent flex items-center gap-1.5 transition-colors"
              >
                BROWSE ARCHIVES <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Columns 2, 3, 4: Product Cards */}
          {trendingProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Trending;
