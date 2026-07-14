import React from 'react';
import { products } from '../../data/mockData';
import ProductCard from '../common/ProductCard';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const FeaturedCollection = () => {
  // Filter only featured products (limit to 4 items)
  const featuredProducts = products.filter(p => p.isFeatured).slice(0, 4);

  return (
    <section id="featured-collection" className="py-24 bg-luxury-bg border-b border-luxury-border/60">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <div>
            <span className="text-xs font-syne font-extrabold tracking-widest text-accent uppercase block mb-2">
              01 // THE EDITORIAL SELECTS
            </span>
            <h2 className="font-syne text-4xl md:text-5xl font-black tracking-wider text-white uppercase">
              FEATURED COLLECTION
            </h2>
          </div>
          <Link
            to="/shop"
            className="flex items-center gap-2 text-xs font-syne font-extrabold tracking-widest text-luxury-muted hover:text-accent transition-colors group"
          >
            VIEW ALL PRODUCTS <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturedCollection;
