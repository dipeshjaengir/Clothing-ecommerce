import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import LuxuryImage from '../common/LuxuryImage';

const Lookbook = () => {
  const looks = [
    {
      id: "look-1",
      image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=800&auto=format&fit=crop",
      title: "STRUCTURAL FORM",
      subtitle: "LOOK 01",
      aspect: "aspect-[2/3]",
      widthClass: "w-full md:w-[85%]"
    },
    {
      id: "look-2",
      image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop",
      title: "ORGANIC TEXTURE",
      subtitle: "LOOK 02",
      aspect: "aspect-square",
      widthClass: "w-full md:w-[95%] md:translate-y-16"
    },
    {
      id: "look-3",
      image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=800&auto=format&fit=crop",
      title: "MINIMALIST SILHOUETTE",
      subtitle: "LOOK 03",
      aspect: "aspect-[2/3]",
      widthClass: "w-full md:w-[85%] md:translate-y-32"
    }
  ];

  return (
    <section id="lookbook" className="py-36 bg-luxury-bg border-b border-luxury-border/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Title */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-24">
          <div>
            <span className="text-[10px] font-syne font-extrabold tracking-[0.3em] text-accent uppercase block mb-3">
              04.5 // VISUAL STORYTELLING
            </span>
            <h2 className="font-syne text-4xl md:text-5xl lg:text-6xl font-black tracking-wider text-primary uppercase leading-none">
              THE STUDIO LOOKBOOK
            </h2>
          </div>
          <div className="max-w-xs text-left">
            <p className="text-xs text-luxury-muted leading-relaxed font-manrope font-light">
              An architectural research on drape and fabric geometry, captured inside clean neutral spaces. Form, function, and detail in perfect balance.
            </p>
          </div>
        </div>

        {/* Vogue Asymmetric Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 pb-32">
          {looks.map((look, idx) => (
            <motion.div
              key={look.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: idx * 0.15 }}
              className={`flex flex-col items-center ${look.widthClass}`}
            >
              {/* Photo Card with zoom and shadow */}
              <div className={`relative w-full ${look.aspect} overflow-hidden rounded-[2.5rem] bg-luxury-card border border-luxury-border shadow-premium group`}>
                <LuxuryImage
                  src={look.image}
                  alt={look.title}
                  className="w-full h-full object-cover transition-transform duration-[1800ms] ease-out group-hover:scale-103"
                  loading="lazy"
                />
                {/* Overlay Vignette */}
                <div className="absolute inset-0 bg-[#111111]/5 group-hover:bg-[#111111]/20 transition-all duration-500" />
                
                {/* Look badge */}
                <div className="absolute top-6 left-6 px-3 py-1 bg-[#F8F7F3]/90 border border-luxury-border/40 backdrop-blur-md rounded-full text-[9px] font-syne font-bold tracking-widest text-[#111111]">
                  {look.subtitle}
                </div>
              </div>

              {/* Look Meta */}
              <div className="mt-8 text-center flex flex-col items-center gap-1.5">
                <span className="text-[10px] font-syne font-bold tracking-[0.2em] text-[#111111]">
                  {look.title}
                </span>
                <Link 
                  to="/shop" 
                  className="text-[9px] font-syne font-bold tracking-widest text-accent hover:text-[#111111] transition-colors flex items-center gap-1 border-b border-transparent hover:border-accent"
                >
                  SHOP THIS STYLE <ArrowUpRight className="w-3 h-3" />
                </Link>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Lookbook;
