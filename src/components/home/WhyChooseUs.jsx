import React from 'react';
import { ShieldCheck, Truck, RefreshCw, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

const WhyChooseUs = () => {
  const cards = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-accent" />,
      title: "PREMIUM ARTISAN QUALITY",
      description: "Crafted by hand in European ateliers. Sourced using organic long-staple cottons, superfine alpacas, and authentic Japanese selvedge denims."
    },
    {
      icon: <Truck className="w-6 h-6 text-accent" />,
      title: "EXPRESS WORLDWIDE SHIPPING",
      description: "Secure door-to-door delivery with major luxury couriers. Fully carbon-neutral dispatch with complete real-time tracking details."
    },
    {
      icon: <RefreshCw className="w-6 h-6 text-accent" />,
      title: "COMPLIMENTARY RETURNS",
      description: "Enjoy stress-free shopping. We offer simple, free returns and sizing exchanges within 30 days of receiving your package."
    },
    {
      icon: <Lock className="w-6 h-6 text-accent" />,
      title: "SECURE ENCRYPTED CHECKOUT",
      description: "Shop with absolute peace of mind. All payments are securely routed and processed through Stripe using high-grade encryption."
    }
  ];

  return (
    <section className="py-32 bg-luxury-bg border-b border-luxury-border/60 relative">
      {/* Top gold separator line */}
      <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="mb-20 text-center max-w-xl mx-auto">
          <span className="text-[10px] font-syne font-extrabold tracking-[0.3em] text-accent uppercase block mb-3">
            05 // THE CLIENT CHARTER
          </span>
          <h2 className="font-syne text-3xl md:text-4xl font-black tracking-wider text-secondary uppercase leading-none">
            WHY LUXORA COUTURE
          </h2>
          <div className="h-[2px] bg-accent/25 w-16 mx-auto mt-4" />
        </div>

        {/* Features Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: idx * 0.08 }}
              className="p-8 rounded-[2rem] bg-luxury-card/30 border border-luxury-border/60 hover:border-accent/30 transition-all duration-500 hover:shadow-premium flex flex-col justify-start gap-5 group"
            >
              {/* Icon Container with scale springs */}
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-luxury-card w-12 h-12 rounded-2xl flex items-center justify-center border border-luxury-border shadow-premium group-hover:border-accent/40 group-hover:text-accent transition-colors duration-300"
              >
                {card.icon}
              </motion.div>
              
              <h3 className="font-syne font-bold text-xs tracking-widest text-secondary uppercase">
                {card.title}
              </h3>
              
              <p className="text-xs text-luxury-muted leading-relaxed font-manrope font-light">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
