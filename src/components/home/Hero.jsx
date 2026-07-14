import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowRight } from 'lucide-react';

const Hero = () => {
  const containerRef = useRef(null);
  const headlineRef = useRef(null);
  const sublineRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    // GSAP Stagger Entrance Animation for Hero text
    const ctx = gsap.context(() => {
      // Split text-like reveal using GSAP y-transforms
      gsap.fromTo(headlineRef.current, 
        { y: 80, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1.2, ease: "power4.out", delay: 0.8 }
      );
      
      gsap.fromTo(sublineRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 0.6, duration: 1, ease: "power3.out", delay: 1.2 }
      );

      gsap.fromTo(ctaRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 1.5 }
      );
    }, containerRef);

    return () => ctx.revert(); // clean up GSAP context on unmount
  }, []);

  const handleScrollDown = () => {
    const nextSection = document.getElementById('featured-collection');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-black select-none"
    >
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1600&auto=format&fit=crop"
          alt="LUXORA Haute Couture background"
          className="w-full h-full object-cover object-center opacity-45 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-bg via-transparent to-black/70" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-6 md:px-12 flex flex-col items-center">
        {/* Subtitle Badge */}
        <div 
          ref={sublineRef}
          className="mb-6"
        >
          <span className="px-4 py-1.5 rounded-full border border-accent/30 bg-accent/5 text-accent text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase inline-block">
            ARCHIVE COLLECTION 2026
          </span>
        </div>

        {/* Primary Luxury Headline */}
        <div className="overflow-hidden mb-8 py-2">
          <h1 
            ref={headlineRef}
            className="font-syne text-5xl md:text-7xl lg:text-9xl font-extrabold tracking-widest text-white leading-none uppercase"
          >
            SILHOUETTES<br />
            <span className="text-gradient-gold">REFINED</span>
          </h1>
        </div>

        {/* Call to Actions */}
        <div 
          ref={ctaRef}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            to="/shop"
            className="px-8 py-4 bg-accent text-black font-syne font-bold text-xs tracking-widest rounded-full hover:bg-accent-light transition-all duration-300 flex items-center gap-2 group shadow-gold"
          >
            ACQUIRE GARMENTS <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <Link
            to="/collections"
            className="px-8 py-4 bg-transparent text-white border border-white/20 font-syne font-bold text-xs tracking-widest rounded-full hover:bg-white hover:text-black hover:border-white transition-all duration-300"
          >
            VIEW EDITORIAL
          </Link>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div 
        onClick={handleScrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 cursor-pointer group"
      >
        <span className="text-[10px] tracking-widest text-luxury-muted font-bold group-hover:text-accent transition-colors duration-300 uppercase">
          SCROLL TO EXPLORE
        </span>
        <div className="w-6 h-10 border border-luxury-border rounded-full flex justify-center p-1 group-hover:border-accent transition-colors duration-300">
          <motion.div 
            animate={{ 
              y: [0, 12, 0] 
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
            className="w-1.5 h-1.5 rounded-full bg-accent"
          />
        </div>
      </div>

    </section>
  );
};

export default Hero;
