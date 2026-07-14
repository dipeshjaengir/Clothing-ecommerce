import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

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
    <section className="py-24 bg-luxury-bg border-b border-luxury-border/60">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="mb-16">
          <span className="text-xs font-syne font-extrabold tracking-widest text-accent uppercase block mb-2">
            04 // CURATED CATEGORIES
          </span>
          <h2 className="font-syne text-4xl md:text-5xl font-black tracking-wider text-white uppercase">
            SHOP BY CLASSIFICATION
          </h2>
        </div>

        {/* Masonry Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px] md:auto-rows-[300px]">
          {categoriesList.map((cat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: "easeOut", delay: idx * 0.1 }}
              className={`group relative overflow-hidden rounded-3xl bg-luxury-card border border-luxury-border/60 ${cat.gridClass}`}
            >
              {/* Image */}
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-[1200ms] cubic-bezier(0.16, 1, 0.3, 1) group-hover:scale-105 opacity-60 group-hover:opacity-75"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Text / Actions Overlay */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end items-start">
                <span className="text-[10px] font-bold tracking-widest text-accent mb-1">
                  {cat.label}
                </span>
                <h3 className="font-syne font-bold text-xl md:text-2xl text-white tracking-widest uppercase">
                  {cat.name}
                </h3>
                
                <Link
                  to={`/shop?category=${cat.name}`}
                  className="mt-4 flex items-center gap-1.5 text-[10px] font-syne font-bold tracking-widest text-white/80 group-hover:text-accent transition-colors py-1 border-b border-white/20 group-hover:border-accent"
                >
                  DISCOVER ARCHIVE <ArrowUpRight className="w-3.5 h-3.5" />
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
