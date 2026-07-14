import React from 'react';
import { ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import MagneticButton from '../common/MagneticButton';

const Newsletter = () => {
  const handleSubscribe = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    if (email) {
      toast.success('Your subscription to LUXORA Journal has been confirmed.', {
        style: {
          background: '#FFFFFF',
          color: '#111111',
          border: '1px solid #B68D40',
          fontFamily: 'Manrope',
        },
        iconTheme: {
          primary: '#B68D40',
          secondary: '#FFFFFF',
        },
      });
      e.target.reset();
    }
  };

  return (
    <section className="py-36 bg-luxury-hover border-b border-luxury-border/60 relative overflow-hidden">
      {/* Soft background vignette */}
      <div className="absolute inset-0 bg-radial-vignette opacity-30 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 text-center flex flex-col items-center relative z-10">
        
        {/* Title */}
        <span className="text-[10px] font-syne font-extrabold tracking-[0.3em] text-accent uppercase block mb-4">
          08 // MEMBER ACCESS
        </span>
        <h2 className="font-syne text-4xl md:text-5xl lg:text-6xl font-black tracking-wider text-primary uppercase mb-6 leading-none">
          JOIN THE LUXORA COLLECTIVE
        </h2>
        <p className="text-xs md:text-sm text-luxury-muted font-manrope font-light max-w-xl mb-12 leading-relaxed">
          Unlock priority access to upcoming architectural lookbooks, private capsule releases, and seasonal member-only selections.
        </p>

        {/* Form Input */}
        <form onSubmit={handleSubscribe} className="w-full max-w-md flex flex-col sm:flex-row gap-4 items-center justify-center">
          <input
            type="email"
            name="email"
            placeholder="ENTER YOUR EMAIL..."
            className="w-full sm:flex-grow px-6 py-4 rounded-full bg-luxury-card border border-luxury-border text-xs tracking-wider outline-none text-primary focus:border-accent transition-colors font-manrope placeholder-luxury-muted font-light shadow-premium"
            required
            aria-label="Email address for collective signup"
          />
          <div className="w-full sm:w-auto">
            <MagneticButton className="w-full sm:w-auto">
              <button
                type="submit"
                className="w-full px-8 py-4 bg-[#111111] text-[#F8F7F3] font-syne font-bold text-xs tracking-widest rounded-full hover:bg-accent hover:text-white transition-colors duration-300 flex items-center justify-center gap-2 group relative overflow-hidden shadow-premium"
              >
                {/* Shimmer effect */}
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
                SUBSCRIBE <ArrowRight className="w-4 h-4" />
              </button>
            </MagneticButton>
          </div>
        </form>

        {/* Small T&C */}
        <span className="text-[9px] text-luxury-muted tracking-widest uppercase mt-5 font-bold">
          By signing up, you consent to our privacy terms. Opt-out at any time.
        </span>

      </div>
    </section>
  );
};

export default Newsletter;
