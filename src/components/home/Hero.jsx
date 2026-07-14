import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import SplitType from 'split-type';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import MagneticButton from '../common/MagneticButton';
import LuxuryImage from '../common/LuxuryImage';

const Hero = () => {
  const containerRef = useRef(null);
  const headlineRef = useRef(null);
  const sublineRef = useRef(null);
  const descRef = useRef(null);
  const ctaRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
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
        { y: '110%' },
        { y: '0%', duration: 1.4, ease: "power4.out", stagger: 0.02, delay: 0.5 }
      );

      // Subtle float reveal for subline badge
      gsap.fromTo(sublineRef.current,
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 1.0 }
      );

      // Float reveal for subline description
      gsap.fromTo(descRef.current,
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 1.2 }
      );

      // Slide reveal for call to actions
      gsap.fromTo(ctaRef.current,
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 1.4 }
      );

      // Zoom-out reveal for the background image
      gsap.fromTo(imageRef.current,
        { scale: 1.12, opacity: 0 },
        { scale: 1.02, opacity: 0.85, duration: 2.2, ease: "power2.out" }
      );
    }, containerRef);

    // Mouse Move Parallax Handler
    const handleMouseMove = (e) => {
      if (!containerRef.current || !imageRef.current) return;
      const { clientX, clientY } = e;
      const { width, height } = containerRef.current.getBoundingClientRect();
      
      // Compute mouse ratio from center
      const moveX = (clientX / width - 0.5) * 15;
      const moveY = (clientY / height - 0.5) * 15;

      gsap.to(imageRef.current, {
        x: moveX,
        y: moveY,
        duration: 1.5,
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
      className="relative w-full h-screen flex items-center overflow-hidden bg-[#F8F7F3] select-none"
    >
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div ref={imageRef} className="w-full h-full scale-105">
          <LuxuryImage
            src="https://images.unsplash.com/photo-1486308512493-ae6a8e574483?q=80&w=1600&auto=format&fit=crop"
            alt="LUXORA Editorial Campaign"
            className="w-full h-full object-cover object-center"
          />
        </div>
        {/* Soft Vignette and Gradient Overlays matching rebranding palette */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#F8F7F3] via-[#F8F7F3]/70 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F8F7F3] via-transparent to-[#F8F7F3]/40 z-10" />
        <div className="absolute inset-0 bg-radial-vignette opacity-50 pointer-events-none z-10" />
      </div>

      {/* Hero Content - Left Aligned with spacious design */}
      <div className="relative z-25 w-full max-w-7xl mx-auto px-6 md:px-12 flex items-center h-full">
        <div className="max-w-3xl text-left flex flex-col items-start pt-16">
          
          {/* Subtitle Badge */}
          <div 
            ref={sublineRef}
            className="mb-5 opacity-0"
          >
            <span className="text-[10px] md:text-xs font-bold tracking-[0.3em] text-[#B68D40] uppercase font-syne">
              NEW COLLECTION 2026
            </span>
          </div>

          {/* Primary Luxury Headline */}
          <div className="mb-6 select-text">
            <h1 
              ref={headlineRef}
              className="font-syne text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-wide text-[#111111] leading-[1.1] uppercase"
            >
              Crafted for<br />
              Modern Luxury.
            </h1>
          </div>

          {/* Description Subheading */}
          <p 
            ref={descRef}
            className="text-xs sm:text-sm md:text-base text-[#6D6D6D] font-light leading-relaxed font-manrope max-w-md mb-10 opacity-0"
          >
            Timeless silhouettes designed for everyday elegance.
          </p>

          {/* Call to Actions */}
          <div 
            ref={ctaRef}
            className="flex flex-col sm:flex-row gap-5 items-stretch opacity-0"
          >
            <MagneticButton>
              <Link
                to="/shop"
                className="px-8 py-4 bg-[#111111] text-[#F8F7F3] font-syne font-bold text-xs tracking-[0.15em] rounded-full hover:bg-[#B68D40] hover:text-white transition-all duration-300 flex items-center justify-center gap-2 group relative overflow-hidden shadow-premium"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
                EXPLORE COLLECTION <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </MagneticButton>
            
            <MagneticButton>
              <Link
                to="/collections"
                className="px-8 py-4 bg-transparent text-[#111111] border border-black/10 font-syne font-bold text-xs tracking-[0.15em] rounded-full hover:bg-black hover:text-white hover:border-black transition-all duration-300 flex justify-center"
              >
                VIEW LOOKBOOK
              </Link>
            </MagneticButton>
          </div>

        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div 
        onClick={handleScrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 cursor-pointer group"
      >
        <span className="text-[9px] tracking-widest text-luxury-muted font-bold group-hover:text-accent transition-colors duration-300 uppercase">
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
