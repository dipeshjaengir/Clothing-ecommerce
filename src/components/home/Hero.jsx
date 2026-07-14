import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import SplitType from 'split-type';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowRight } from 'lucide-react';
import MagneticButton from '../common/MagneticButton';

const Hero = () => {
  const containerRef = useRef(null);
  const headlineRef = useRef(null);
  const sublineRef = useRef(null);
  const ctaRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    // Stagger character reveal on the main title using SplitType + GSAP
    let splitInstance;
    const ctx = gsap.context(() => {
      // Split text into characters
      splitInstance = new SplitType(headlineRef.current, { types: 'chars' });
      
      // Wrap characters in overflow hidden wrapper dynamically in JS
      splitInstance.chars.forEach(char => {
        const wrapper = document.createElement('span');
        wrapper.style.display = 'inline-block';
        wrapper.style.overflow = 'hidden';
        wrapper.style.verticalAlign = 'bottom';
        char.parentNode.insertBefore(wrapper, char);
        wrapper.appendChild(char);
      });

      // Animate chars up from overflow wrapper
      gsap.fromTo(splitInstance.chars,
        { y: '100%' },
        { y: '0%', duration: 1.4, ease: "power4.out", stagger: 0.02, delay: 0.5 }
      );

      // Subtle float reveal for subline badge
      gsap.fromTo(sublineRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 1.1 }
      );

      // Slide reveal for call to actions
      gsap.fromTo(ctaRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 1.3 }
      );

      // Zoom-out reveal for the background image
      gsap.fromTo(imageRef.current,
        { scale: 1.15, opacity: 0 },
        { scale: 1.05, opacity: 0.45, duration: 2.2, ease: "power2.out" }
      );
    }, containerRef);

    // Mouse Move Parallax Handler
    const handleMouseMove = (e) => {
      if (!containerRef.current || !imageRef.current) return;
      const { clientX, clientY } = e;
      const { width, height } = containerRef.current.getBoundingClientRect();
      
      // Compute mouse ratio from center (-0.5 to 0.5)
      const moveX = (clientX / width - 0.5) * 25; // 25px max movement
      const moveY = (clientY / height - 0.5) * 25;

      gsap.to(imageRef.current, {
        x: moveX,
        y: moveY,
        duration: 1.2,
        ease: "power2.out"
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      ctx.revert();
      if (splitInstance) splitInstance.revert();
      window.removeEventListener('mousemove', handleMouseMove);
    };
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
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          ref={imageRef}
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1600&auto=format&fit=crop"
          alt="LUXORA Haute Couture background"
          className="w-full h-full object-cover object-center scale-105"
        />
        {/* Soft Vignette and Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-bg via-transparent to-black/80" />
        <div className="absolute inset-0 bg-radial-vignette opacity-70 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-0 bg-black/35" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-6 md:px-12 flex flex-col items-center">
        {/* Subtitle Badge */}
        <div 
          ref={sublineRef}
          className="mb-6 opacity-0"
        >
          <span className="px-4 py-1.5 rounded-full border border-accent/30 bg-accent/5 text-accent text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase inline-block font-syne">
            ARCHIVE COLLECTION 2026
          </span>
        </div>

        {/* Primary Luxury Headline */}
        <div className="mb-10 py-1 select-text">
          <h1 
            ref={headlineRef}
            className="font-syne text-5xl md:text-8xl lg:text-9xl font-extrabold tracking-widest text-white leading-none uppercase"
          >
            SILHOUETTES<br />
            <span className="text-gradient-gold">REFINED</span>
          </h1>
        </div>

        {/* Call to Actions */}
        <div 
          ref={ctaRef}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center opacity-0"
        >
          <MagneticButton>
            <Link
              to="/shop"
              className="px-8 py-4 bg-accent text-black font-syne font-bold text-xs tracking-[0.15em] rounded-full hover:bg-accent-light transition-all duration-300 flex items-center gap-2 group shadow-gold relative overflow-hidden"
            >
              {/* Shimmer sweep effect in markup */}
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
              ACQUIRE GARMENTS <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </MagneticButton>
          
          <MagneticButton>
            <Link
              to="/collections"
              className="px-8 py-4 bg-transparent text-white border border-white/20 font-syne font-bold text-xs tracking-[0.15em] rounded-full hover:bg-white hover:text-black hover:border-white transition-all duration-300"
            >
              VIEW EDITORIAL
            </Link>
          </MagneticButton>
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
