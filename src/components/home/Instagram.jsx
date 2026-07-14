import React from 'react';
import { instagramFeed } from '../../data/mockData';
import { motion } from 'framer-motion';
import LuxuryImage from '../common/LuxuryImage';

const Instagram = () => {
  return (
    <section className="py-32 bg-luxury-bg border-b border-luxury-border/60">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="text-center mb-24">
          <span className="text-[10px] font-syne font-extrabold tracking-[0.3em] text-accent uppercase block mb-3">
            07 // DIGITAL EDITORIALS
          </span>
          <h2 className="font-syne text-3xl md:text-4xl font-black tracking-wider text-primary uppercase leading-none">
            INSTAGRAM GALLERY
          </h2>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="text-[10px] font-syne font-bold text-luxury-muted hover:text-accent tracking-widest mt-3.5 inline-block transition-colors border-b border-transparent hover:border-accent"
          >
            @LUXORA_ARCHIVES
          </a>
        </div>

        {/* Grid Images - Staggered Offset Layout for high-end lookbook rhythm */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 lg:pb-8">
          {instagramFeed.map((post, idx) => {
            const isOdd = idx % 2 === 1;
            return (
              <motion.a
                key={post.id}
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: idx * 0.05 }}
                className={`relative aspect-square overflow-hidden rounded-[1.75rem] bg-luxury-card border border-luxury-border/60 group block cursor-none shadow-premium ${
                  isOdd ? 'lg:translate-y-6' : 'lg:translate-y-0'
                } transition-transform duration-750`}
              >
                {/* Photo */}
                <LuxuryImage
                  src={post.img}
                  alt="LUXORA Instagram drop look"
                  className="w-full h-full object-cover transition-transform duration-[1200ms] cubic-bezier(0.16, 1, 0.3, 1) group-hover:scale-105"
                  loading="lazy"
                />

                {/* Glass / Hover Mask */}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300 backdrop-blur-xs">
                  <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white scale-75 group-hover:scale-100 transition-all duration-300">
                    {/* SVG Instagram logo */}
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Instagram;
