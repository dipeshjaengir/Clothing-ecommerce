import React from 'react';
import { ShieldCheck, Truck, RefreshCw, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

const WhyChooseUs = () => {
  const cards = [
    {
      icon: <ShieldCheck className="w-8 h-8 text-accent" />,
      title: "PREMIUM ARTISAN QUALITY",
      description: "Crafted by hand in European ateliers. Sourced using organic long-staple cottons, superfine alpacas, and authentic Japanese selvedge denims."
    },
    {
      icon: <Truck className="w-8 h-8 text-accent" />,
      title: "EXPRESS WORLDWIDE SHIPPING",
      description: "Secure door-to-door delivery with major luxury couriers. Fully carbon-neutral dispatch with complete real-time tracking details."
    },
    {
      icon: <RefreshCw className="w-8 h-8 text-accent" />,
      title: "EASY COMPLIMENTARY RETURNS",
      description: "Enjoy stress-free shopping. We offer simple, free returns and sizing exchanges within 30 days of receiving your package."
    },
    {
      icon: <Lock className="w-8 h-8 text-accent" />,
      title: "SECURE ENCRYPTED CHECKOUT",
      description: "Shop with absolute peace of mind. All payments are securely routed and processed through Stripe using high-grade encryption."
    }
  ];

  return (
    <section className="py-24 bg-luxury-bg border-b border-luxury-border/60">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="mb-16 text-center max-w-xl mx-auto">
          <span className="text-xs font-syne font-extrabold tracking-widest text-accent uppercase block mb-2">
            05 // THE CLIENT CHARTER
          </span>
          <h2 className="font-syne text-3xl md:text-4xl font-black tracking-wider text-white uppercase">
            WHY LUXORA COUTURE
          </h2>
          <div className="h-[2px] bg-accent/20 w-24 mx-auto mt-4" />
        </div>

        {/* Features Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="p-8 rounded-3xl bg-luxury-card/30 border border-luxury-border/60 hover:border-accent/40 transition-all duration-500 hover:shadow-premium flex flex-col justify-start gap-4"
            >
              <div className="bg-luxury-card w-14 h-14 rounded-2xl flex items-center justify-center border border-luxury-border shadow-premium">
                {card.icon}
              </div>
              <h3 className="font-syne font-bold text-sm tracking-wider text-white mt-2">
                {card.title}
              </h3>
              <p className="text-xs text-luxury-muted leading-relaxed font-manrope">
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
