import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Quick Animated Counter Component
const Counter = ({ target, duration = 1.5, suffix = "" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(target, 10);
    if (start === end) return;

    const totalMiliseconds = duration * 1000;
    const incrementTime = Math.abs(Math.floor(totalMiliseconds / end));
    
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [target, duration]);

  return <span>{count}{suffix}</span>;
};

const About = () => {
  return (
    <div className="pt-28 pb-24 bg-luxury-bg text-white font-manrope">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Editorial Heading */}
        <div className="border-b border-luxury-border/60 pb-8 mb-16 text-center md:text-left">
          <span className="text-[10px] font-bold tracking-widest text-accent uppercase">
            BRAND MANIFESTO
          </span>
          <h1 className="font-syne text-4xl md:text-6xl font-black tracking-wider text-white uppercase mt-2">
            OUR BRAND HERITAGE
          </h1>
        </div>

        {/* Narrative & Image Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24">
          <div className="space-y-6">
            <h2 className="font-syne text-xl md:text-3xl font-extrabold tracking-wider text-white uppercase leading-snug">
              MINIMALISM. STRUCTURE.<br />
              TEMPORAL PERMANENCE.
            </h2>
            <p className="text-xs md:text-sm text-luxury-muted leading-relaxed">
              Founded in 2021, LUXORA was conceived as an architectural response to disposable fashion. We seek elegance in raw structural margins, dropped silhouettes, and clean palettes, celebrating geometric symmetry and luxury material choices.
            </p>
            <p className="text-xs md:text-sm text-luxury-muted leading-relaxed">
              Every detail is meticulously refined—from custom brushed gold hardware to raw selvedge cotton alignments. We manufacture exclusively in small batches across family-owned European ateliers, respecting traditional artisan methodologies.
            </p>
          </div>
          
          <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-luxury-card border border-luxury-border/60">
            <img
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop"
              alt="Artisan sewing garments"
              className="w-full h-full object-cover opacity-80"
              loading="lazy"
            />
          </div>
        </div>

        {/* Animated Metrics Counters */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 py-12 border-t border-b border-luxury-border/60 mb-24">
          
          <div className="text-center">
            <div className="font-syne text-5xl lg:text-7xl font-bold text-gradient-gold mb-2">
              <Counter target="32" suffix="+" />
            </div>
            <span className="text-[9px] font-bold tracking-widest text-luxury-muted uppercase">
              ARTISAN ATELIERS
            </span>
          </div>

          <div className="text-center">
            <div className="font-syne text-5xl lg:text-7xl font-bold text-gradient-gold mb-2">
              <Counter target="14" suffix="" />
            </div>
            <span className="text-[9px] font-bold tracking-widest text-luxury-muted uppercase">
              COUNTRIES DISTRIBUTED
            </span>
          </div>

          <div className="text-center">
            <div className="font-syne text-5xl lg:text-7xl font-bold text-gradient-gold mb-2">
              <Counter target="99" suffix="%" />
            </div>
            <span className="text-[9px] font-bold tracking-widest text-luxury-muted uppercase">
              CLIENT SATISFACTION
            </span>
          </div>

          <div className="text-center">
            <div className="font-syne text-5xl lg:text-7xl font-bold text-gradient-gold mb-2">
              <Counter target="120" suffix="K+" />
            </div>
            <span className="text-[9px] font-bold tracking-widest text-luxury-muted uppercase">
              GARMENTS ACQUIRED
            </span>
          </div>

        </div>

        {/* Design Philosophy Grid */}
        <div className="space-y-12">
          <h3 className="font-syne text-2xl md:text-3xl font-black text-center text-white uppercase mb-16">
            OUR ETHICAL STANDARDS
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-luxury-card/30 border border-luxury-border/60 space-y-4">
              <h4 className="font-syne font-bold text-sm tracking-wider text-accent">I. ECO-SOURCED MATERIALS</h4>
              <p className="text-xs text-luxury-muted leading-relaxed">We source exclusively certified organic loopbacks, Peruvian superfine alpaca fibers, and eco-tanned leathers to ensure minimal ecological footprint.</p>
            </div>
            <div className="p-8 rounded-2xl bg-luxury-card/30 border border-luxury-border/60 space-y-4">
              <h4 className="font-syne font-bold text-sm tracking-wider text-accent">II. ARTISANAL FAIRNESS</h4>
              <p className="text-xs text-luxury-muted leading-relaxed">Our atelier creators work in fully ventilated, fair-wage, verified safe facilities. We value traditional artisan preservation above speed.</p>
            </div>
            <div className="p-8 rounded-2xl bg-luxury-card/30 border border-luxury-border/60 space-y-4">
              <h4 className="font-syne font-bold text-sm tracking-wider text-accent">III. CIRCULAR CARBON DisPATCH</h4>
              <p className="text-xs text-luxury-muted leading-relaxed">All luxury boxes, dust covers, and shipping parcels are crafted from 100% post-consumer recyclables and delivered via carbon-neutral transits.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
