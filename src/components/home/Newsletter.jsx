import React from 'react';
import { ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

const Newsletter = () => {
  const handleSubscribe = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    if (email) {
      toast.success('Your subscription to LUXORA Journal has been confirmed.', {
        style: {
          background: '#121212',
          color: '#FFFFFF',
          border: '1px solid #C9A227',
          fontFamily: 'Manrope',
        },
        iconTheme: {
          primary: '#C9A227',
          secondary: '#121212',
        },
      });
      e.target.reset();
    }
  };

  return (
    <section className="py-28 bg-[#030303] border-b border-luxury-border/60">
      <div className="max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
        
        {/* Title */}
        <span className="text-xs font-syne font-extrabold tracking-widest text-accent uppercase block mb-3">
          08 // MEMBER ACCESS
        </span>
        <h2 className="font-syne text-4xl md:text-5xl lg:text-6xl font-black tracking-wider text-white uppercase mb-6 leading-none">
          JOIN THE LUXORA COLLECTIVE
        </h2>
        <p className="text-sm text-luxury-muted font-manrope max-w-xl mb-10 leading-relaxed">
          Unlock priority access to upcoming architectural lookbooks, private capsule releases, and seasonal member-only selections.
        </p>

        {/* Form Input */}
        <form onSubmit={handleSubscribe} className="w-full max-w-md flex flex-col sm:flex-row gap-4 items-stretch">
          <input
            type="email"
            name="email"
            placeholder="ENTER YOUR EMAIL..."
            className="flex-grow px-6 py-4 rounded-full bg-luxury-card border border-luxury-border text-xs tracking-wider outline-none text-white focus:border-accent transition-colors font-manrope placeholder-luxury-muted"
            required
          />
          <button
            type="submit"
            className="px-8 py-4 bg-white text-black font-syne font-bold text-xs tracking-widest rounded-full hover:bg-accent hover:text-black transition-colors duration-300 flex items-center justify-center gap-2"
          >
            SUBSCRIBE <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Small T&C */}
        <span className="text-[10px] text-luxury-muted tracking-wider mt-4">
          By signing up, you consent to our privacy terms. Opt-out at any time.
        </span>

      </div>
    </section>
  );
};

export default Newsletter;
