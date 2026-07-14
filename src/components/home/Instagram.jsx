import React from 'react';
import { instagramFeed } from '../../data/mockData';
import { motion } from 'framer-motion';

const Instagram = () => {
  return (
    <section className="py-24 bg-luxury-bg border-b border-luxury-border/60">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-syne font-extrabold tracking-widest text-accent uppercase block mb-2">
            07 // DIGITAL EDITORIALS
          </span>
          <h2 className="font-syne text-3xl md:text-4xl font-black tracking-wider text-white uppercase">
            INSTAGRAM GALLERY
          </h2>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="text-xs font-manrope font-semibold text-luxury-muted hover:text-accent tracking-widest mt-2 inline-block transition-colors"
          >
            @LUXORA_ARCHIVES
          </a>
        </div>

        {/* Grid Images */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {instagramFeed.map((post, idx) => (
            <motion.a
              key={post.id}
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.6, delay: idx * 0.05 }}
              className="relative aspect-square overflow-hidden rounded-2xl bg-luxury-card border border-luxury-border/60 group block cursor-pointer"
            >
              {/* Photo */}
              <img
                src={post.img}
                alt="LUXORA Instagram drop look"
                className="w-full h-full object-cover transition-transform duration-[1000ms] group-hover:scale-105"
                loading="lazy"
              />

              {/* Glass / Hover Mask */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300 backdrop-blur-xs">
                <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white scale-75 group-hover:scale-100 transition-all duration-300">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Instagram;
