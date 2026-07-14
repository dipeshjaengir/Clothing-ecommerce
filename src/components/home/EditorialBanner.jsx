import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import LuxuryImage from '../common/LuxuryImage';

const EditorialBanner = () => {
  return (
    <section className="py-24 bg-luxury-bg border-b border-luxury-border/60 relative overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Large Padded Inner Box with rounded corners and card styling */}
        <div className="relative w-full h-[550px] md:h-[600px] overflow-hidden rounded-[3rem] border border-luxury-border shadow-premium group">
          
          {/* Parallax Background Image */}
          <div className="absolute inset-0 z-0">
            <LuxuryImage
              src="https://images.unsplash.com/photo-1486308512493-ae6a8e574483?q=80&w=1200&auto=format&fit=crop"
              alt="LUXORA Editorial Campaign"
              className="w-full h-full object-cover scale-102 transition-transform duration-[2000ms] group-hover:scale-100"
            />
            {/* Editorial overlay vignette to make text legible */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent z-10" />
          </div>

          {/* Text Content Overlay */}
          <div className="absolute inset-0 z-20 flex flex-col justify-end items-start p-8 sm:p-12 md:p-20 max-w-xl text-left select-text">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
            >
              <span className="text-[10px] font-syne font-extrabold tracking-[0.3em] text-[#B68D40] uppercase block">
                03 // ARCHIVAL FRAMEWORK
              </span>
              
              <h2 className="font-playfair text-3xl sm:text-5xl font-normal tracking-wide text-white leading-tight uppercase">
                SYSTEMATIC<br />
                ELEGANCE<span className="text-[#B68D40]">.</span>
              </h2>
              
              <p className="text-xs text-white/70 leading-relaxed font-manrope font-light">
                A study in fluid movements and structural drape. Tailored with dropped seam lines and clean offsets, designed to move with quiet, timeless comfort.
              </p>

              <div className="pt-2">
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-black hover:bg-[#B68D40] hover:text-white rounded-full text-xs font-syne font-bold tracking-[0.22em] transition-all duration-300 shadow-premium"
                >
                  READ THE EDITORIAL <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default EditorialBanner;
