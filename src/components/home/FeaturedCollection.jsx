import React from 'react';
import { products } from '../../data/mockData';
import ProductCard from '../common/ProductCard';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const FeaturedCollection = () => {
  const featuredProducts = products.filter(p => p.isFeatured).slice(0, 4);

  return (
    <section id="featured-collection" className="py-32 bg-luxury-bg border-b border-luxury-border/60 relative">
      {/* Decorative vertical line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-accent/25 via-transparent to-transparent hidden lg:block" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-20">
          <div>
            <span className="text-[10px] font-syne font-extrabold tracking-[0.3em] text-accent uppercase block mb-3">
              01 // THE EDITORIAL SELECTS
            </span>
            <h2 className="font-syne text-4xl md:text-5xl font-black tracking-wider text-secondary uppercase leading-none">
              FEATURED COLLECTION
            </h2>
          </div>
          <Link
            to="/shop"
            className="flex items-center gap-2 text-xs font-syne font-extrabold tracking-widest text-luxury-muted hover:text-accent transition-colors group py-1.5 border-b border-transparent hover:border-accent"
          >
            VIEW ALL PRODUCTS <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Product Cards Grid: Staggered Offset Layout for visual interest */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16 lg:pb-12">
          {featuredProducts.map((product, index) => {
            const isEven = index % 2 === 1;
            return (
              <div 
                key={product.id} 
                className={`${isEven ? 'lg:translate-y-12' : 'lg:translate-y-0'} transition-transform duration-700`}
              >
                <ProductCard product={product} />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FeaturedCollection;
