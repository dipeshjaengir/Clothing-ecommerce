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
  const shapesRef = useRef(null);

  useEffect(() => {
    let splitInstance;
    const ctx = gsap.context(() => {
      // Split text into characters
      splitInstance = new SplitType(headlineRef.current, { types: 'chars' });
      
      // Wrap characters in overflow hidden wrapper
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
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.9 }
      );

      // Float reveal for subline description
      gsap.fromTo(descRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 1.1 }
      );

      // Slide reveal for call to actions
      gsap.fromTo(ctaRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 1.3 }
      );

      // Fade up reveal for the model image card
      gsap.fromTo(imageRef.current,
        { y: 50, scale: 1.05, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, duration: 1.8, ease: "power4.out", delay: 0.4 }
      );
    }, containerRef);

    // Mouse Move Parallax Handler (for model and background shapes)
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const { clientX, clientY } = e;
      const { width, height } = containerRef.current.getBoundingClientRect();
      
      // Compute mouse ratio from center (-0.5 to 0.5)
      const ratioX = (clientX / width - 0.5);
      const ratioY = (clientY / height - 0.5);

      if (imageRef.current) {
        gsap.to(imageRef.current, {
          x: ratioX * 12,
          y: ratioY * 12,
          duration: 1.5,
          ease: "power2.out"
        });
      }

      if (shapesRef.current) {
        gsap.to(shapesRef.current.children, {
          x: (idx) => ratioX * (20 + idx * 15),
          y: (idx) => ratioY * (20 + idx * 15),
          duration: 2,
          ease: "power2.out",
          stagger: 0.05
        });
      }
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
      className="relative w-full min-h-screen flex items-center bg-[#F8F7F3] overflow-hidden select-none py-20 lg:py-0"
    >
      {/* 1. Grain Noise Overlay */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3联%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      {/* 2. Floating Ambient Shapes (Luxury Soft Blur Gradient Circles) */}
      <div ref={shapesRef} className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-accent/5 rounded-full blur-[100px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/3 w-[450px] h-[450px] bg-accent/10 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/3 right-10 w-[280px] h-[280px] bg-luxury-hover rounded-full blur-[80px]" />
      </div>

      {/* Main Grid Content */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[90vh]">
        
        {/* Left Side (55% Width equivalent) */}
        <div className="lg:col-span-7 text-left flex flex-col items-start justify-center pr-0 lg:pr-8 py-8 lg:py-0">
          
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
              className="font-syne text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-wide text-[#111111] leading-[1.08] uppercase"
            >
              Crafted For<br />
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
            className="flex flex-col sm:flex-row gap-5 items-stretch opacity-0 w-full sm:w-auto"
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
                className="px-8 py-4 bg-transparent text-[#111111] border border-black/10 font-syne font-bold text-xs tracking-[0.15em] rounded-full hover:bg-black hover:text-white hover:border-black transition-all duration-300 flex justify-center items-center"
              >
                VIEW LOOKBOOK
              </Link>
            </MagneticButton>
          </div>

        </div>

        {/* Right Side - Full-Height Premium Model (45% Width equivalent) */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end items-center h-full w-full relative">
          <div 
            ref={imageRef}
            className="relative w-full max-w-[420px] aspect-[3/4.5] overflow-hidden rounded-[2.5rem] bg-luxury-card border border-luxury-border shadow-premium opacity-0 group"
          >
            <LuxuryImage
              src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=800&auto=format&fit=crop"
              alt="LUXORA Campaign Model"
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-[1500ms]"
            />
            
            {/* Blending Gradients over the model block edges */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#F8F7F3]/20 via-transparent to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-radial-vignette opacity-20 pointer-events-none" />
          </div>
        </div>

      </div>

      {/* Scroll Down Indicator */}
      <div 
        onClick={handleScrollDown}
        className="absolute bottom-6 left-6 z-20 hidden lg:flex items-center gap-3 cursor-pointer group"
      >
        <div className="w-6 h-10 border border-[#111111]/10 rounded-full flex justify-center p-1 group-hover:border-[#B68D40] transition-colors duration-300">
          <motion.div 
            animate={{ 
              y: [0, 12, 0] 
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
            className="w-1.5 h-1.5 rounded-full bg-[#B68D40]"
          />
        </div>
        <span className="text-[9px] tracking-widest text-luxury-muted font-bold group-hover:text-accent transition-colors duration-300 uppercase">
          SCROLL TO EXPLORE
        </span>
      </div>

    </section>
  );
};

export default Hero;
