import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Collections = () => {
  const collectionList = [
    {
      id: "col-1",
      title: "THE COZY KNITWEAR COLLECTION",
      description: "Organic loopbacks, 5-gauge alpaca wool cardigans, and premium double-faced heavyweight hoodies. Engineered for cold comfort.",
      category: "Hoodies",
      image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1000&auto=format&fit=crop",
      tag: "WINTER CAPSULE",
      align: "left"
    },
    {
      id: "col-2",
      title: "THE OVERSIZED SILHOUETTE EDIT",
      description: "Drop shoulder coats, boxy tees, and raw Okayama selvedge denims creating architectural structures around the form.",
      category: "Oversized",
      image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=1000&auto=format&fit=crop",
      tag: "PERMANENT ARCHIVE",
      align: "right"
    },
    {
      id: "col-3",
      title: "SUMMER SILK & LINEN",
      description: "Belgian linen, mulberry silk shirts, and breathable relaxed trousers. Fluid, minimal garments styled for warm climate ease.",
      category: "Shirts",
      image: "https://images.unsplash.com/photo-1620012253295-c05518e99309?q=80&w=1000&auto=format&fit=crop",
      tag: "EDITORIAL DROP",
      align: "left"
    }
  ];

  return (
    <div className="pt-28 pb-24 bg-luxury-bg text-white font-manrope">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Title */}
        <div className="border-b border-luxury-border/60 pb-8 mb-20 text-center md:text-left">
          <span className="text-[10px] font-bold tracking-widest text-accent uppercase">
            EDITORIAL CAPSULES
          </span>
          <h1 className="font-syne text-4xl md:text-6xl font-black tracking-wider text-white uppercase mt-2">
            DESIGN COLLECTIONS
          </h1>
          <p className="text-sm text-luxury-muted font-manrope mt-4 max-w-xl">
            Explore curated design concepts and limited capsule drops designed around structured silhouettes.
          </p>
        </div>

        {/* Collections Stack */}
        <div className="space-y-32">
          {collectionList.map((col, idx) => (
            <div
              key={col.id}
              className={`flex flex-col lg:flex-row gap-12 lg:gap-20 items-center ${
                col.align === 'right' ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Image Frame */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="w-full lg:w-1/2 aspect-[4/3] rounded-3xl overflow-hidden bg-luxury-card border border-luxury-border/60 relative group"
              >
                <img
                  src={col.image}
                  alt={col.title}
                  className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/30" />
              </motion.div>

              {/* Details Column */}
              <motion.div
                initial={{ opacity: 0, x: col.align === 'right' ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-full lg:w-1/2 space-y-6 text-left"
              >
                <span className="px-4 py-1 rounded-full border border-accent/20 bg-accent/5 text-[9px] tracking-widest font-extrabold text-accent inline-block uppercase">
                  {col.tag}
                </span>
                
                <h2 className="font-syne text-2xl md:text-4xl font-extrabold tracking-wider text-white uppercase leading-tight">
                  {col.title}
                </h2>
                
                <p className="text-xs md:text-sm text-luxury-muted leading-relaxed font-manrope">
                  {col.description}
                </p>
                
                <div className="pt-4">
                  <Link
                    to={`/shop?category=${col.category}`}
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-black font-syne font-bold text-[10px] tracking-widest rounded-full hover:bg-accent hover:text-black transition-colors group"
                  >
                    ACQUIRE LOOKS <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Collections;
