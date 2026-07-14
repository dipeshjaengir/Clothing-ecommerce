import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import LuxuryImage from '../common/LuxuryImage';

const Categories = () => {
  const categoriesList = [
    {
      name: "Oversized",
      image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=600&auto=format&fit=crop",
      gridClass: "md:col-span-2 md:row-span-2 aspect-[4/3] md:aspect-auto",
      label: "THE OVERSIZED SILHOUETTE"
    },
    {
      name: "Sneakers",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=600&auto=format&fit=crop",
      gridClass: "aspect-square md:aspect-auto",
      label: "LUXURY FOOTWEAR"
    },
    {
      name: "Women",
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=600&auto=format&fit=crop",
      gridClass: "md:row-span-2 aspect-[3/4] md:aspect-auto",
      label: "WOMEN'S ATTIRE"
    },
    {
      name: "Accessories",
      image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=600&auto=format&fit=crop",
      gridClass: "aspect-square md:aspect-auto",
      label: "ESSENTIAL ACCESSORIES"
    },
    {
      name: "Men",
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=600&auto=format&fit=crop",
      gridClass: "md:col-span-2 aspect-[2/1] md:aspect-auto",
      label: "MEN'S COUTURE"
    }
  ];

  return (
    <section className="py-32 bg-luxury-bg border-b border-luxury-border/60">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="mb-20">
          <span className="text-[10px] font-syne font-extrabold tracking-[0.3em] text-accent uppercase block mb-3">
            04 // CURATED CATEGORIES
          </span>
          <h2 className="font-syne text-4xl md:text-5xl font-black tracking-wider text-primary uppercase leading-none">
            SHOP BY CLASSIFICATION
          </h2>
        </div>

        {/* Masonry Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 auto-rows-[280px] md:auto-rows-[340px]">
          {categoriesList.map((cat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: idx * 0.08 }}
              className={`group relative overflow-hidden rounded-[2rem] bg-luxury-card border border-luxury-border/60 hover:border-accent/30 transition-colors duration-500 ${cat.gridClass}`}
            >
              {/* Image with zoom and vignette */}
              <div className="w-full h-full transition-transform duration-[1200ms] cubic-bezier(0.16, 1, 0.3, 1) group-hover:scale-105 opacity-85 group-hover:opacity-90">
                <LuxuryImage
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Radial gradient mask for text contrast */}
              <div className="absolute inset-0 bg-[#111111]/45 transition-opacity duration-500 group-hover:opacity-60" />
              
              {/* Gold border accent inside the card on hover */}
              <div className="absolute inset-4 rounded-[1.5rem] border border-accent/0 group-hover:border-accent/15 transition-all duration-500 pointer-events-none" />

              {/* Text / Actions Overlay */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end items-start z-10">
                <span className="text-[9px] font-bold tracking-[0.2em] text-accent mb-2 font-syne">
                  {cat.label}
                </span>
                <h3 className="font-syne font-bold text-2xl md:text-3xl text-white tracking-widest uppercase">
                  {cat.name}
                </h3>
                
                <Link
                  to={`/shop?category=${cat.name}`}
                  className="mt-5 flex items-center gap-1.5 text-[10px] font-syne font-bold tracking-widest text-white/80 group-hover:text-accent transition-colors py-1 border-b border-white/20 group-hover:border-accent group"
                >
                  DISCOVER ARCHIVE 
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Categories;
