import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

const Footer = () => {
  
  const handleEmailSubscribe = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    if (email) {
      toast.success('Thank you for subscribing to LUXORA Journal.', {
        style: {
          background: '#121212',
          color: '#FFFFFF',
          border: '1px solid #C9A227',
        },
      });
      e.target.reset();
    }
  };

  return (
    <footer className="bg-[#030303] border-t border-luxury-border/60 text-white font-manrope">
      {/* Upper Footer Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
        
        {/* Brand Manifesto Info */}
        <div className="space-y-6">
          <Link to="/" className="inline-block">
            <span className="font-syne text-2xl font-black tracking-widest text-white">LUXORA</span>
          </Link>
          <p className="text-xs text-luxury-muted leading-relaxed tracking-wide max-w-[280px]">
            Inspired by architectural minimalism, refined silhouettes, and artisanal tailoring. Crafting modern luxury essentials for the contemporary curator.
          </p>
          <div className="flex gap-4 text-luxury-muted pt-2">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
          </div>
        </div>

        {/* Shop Collections Links */}
        <div>
          <h4 className="font-syne font-bold text-xs tracking-[0.2em] text-accent uppercase mb-6">COLLECTIONS</h4>
          <ul className="space-y-3 text-xs tracking-wide text-luxury-muted">
            <li>
              <Link to="/shop?category=Oversized" className="hover:text-white transition-colors">Oversized Silhouette</Link>
            </li>
            <li>
              <Link to="/shop?category=Sneakers" className="hover:text-white transition-colors">Luxury Footwear</Link>
            </li>
            <li>
              <Link to="/shop?category=Hoodies" className="hover:text-white transition-colors">Cozy Knitwear drops</Link>
            </li>
            <li>
              <Link to="/shop?category=Shirts" className="hover:text-white transition-colors">Minimalist Shirts</Link>
            </li>
            <li>
              <Link to="/shop?category=Accessories" className="hover:text-white transition-colors">Premium Accessories</Link>
            </li>
          </ul>
        </div>

        {/* Corporate Support Links */}
        <div>
          <h4 className="font-syne font-bold text-xs tracking-[0.2em] text-accent uppercase mb-6">SERVICES & CARE</h4>
          <ul className="space-y-3 text-xs tracking-wide text-luxury-muted">
            <li>
              <Link to="/contact" className="hover:text-white transition-colors">Contact Client Care</Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-white transition-colors">Brand Heritage & Ethos</Link>
            </li>
            <li>
              <a href="#returns" className="hover:text-white transition-colors">Returns & Exchanges Policy</a>
            </li>
            <li>
              <a href="#shipping" className="hover:text-white transition-colors">Worldwide Shipping Rates</a>
            </li>
            <li>
              <a href="#privacy" className="hover:text-white transition-colors">Privacy & Data Protections</a>
            </li>
          </ul>
        </div>

        {/* Journal Subscription input */}
        <div className="space-y-6">
          <h4 className="font-syne font-bold text-xs tracking-[0.2em] text-accent uppercase mb-4">THE LUXORA JOURNAL</h4>
          <p className="text-xs text-luxury-muted leading-relaxed max-w-[280px]">
            Subscribe to receive exclusive access to early drops, lookbooks, and private sales.
          </p>
          <form onSubmit={handleEmailSubscribe} className="relative w-full max-w-[280px] border-b border-luxury-border pb-2 flex">
            <input
              type="email"
              name="email"
              placeholder="ENTER EMAIL ADDRESS..."
              className="bg-transparent text-xs outline-none text-white placeholder-luxury-muted flex-grow pr-8 tracking-wider"
              required
            />
            <button type="submit" className="absolute right-0 top-0 text-white hover:text-accent transition-colors" aria-label="Subscribe">
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>

      {/* Large Typography Brand Banner */}
      <div className="w-full border-t border-luxury-border/60 py-6 overflow-hidden select-none bg-black">
        <h2 className="font-syne text-[10vw] font-black text-center text-stroke leading-none tracking-widest opacity-25">
          LUXORA
        </h2>
      </div>

      {/* Bottom Legal footer details */}
      <div className="bg-[#010101] py-8 px-6 md:px-12 border-t border-luxury-border/40 text-[10px] tracking-widest text-luxury-muted font-manrope">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <span>© 2026 LUXORA HAUTE COUTURE. REGISTERED IN PORTUGAL. ALL RIGHTS RESERVED.</span>
          </div>
          <div className="flex gap-6">
            <span>SECURE PAYMENT VIA STRIPE</span>
            <span>POWERED BY VITE + REACT 19</span>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
