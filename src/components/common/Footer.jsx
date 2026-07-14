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
          fontFamily: 'Manrope',
        },
      });
      e.target.reset();
    }
  };

  return (
    <footer className="bg-primary border-t border-luxury-border/60 text-secondary font-manrope">
      
      {/* Upper Grid Layout */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-28 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-10">
        
        {/* Brand Manifesto */}
        <div className="space-y-6 lg:pr-8">
          <Link to="/" className="inline-block" aria-label="LUXORA Home">
            <span className="font-syne text-2xl font-black tracking-[0.25em] text-secondary">LUXORA</span>
          </Link>
          <p className="text-xs text-luxury-muted leading-relaxed tracking-wide font-light">
            Inspired by architectural minimalism, refined silhouettes, and artisanal tailoring. Crafting modern luxury essentials for the contemporary curator.
          </p>
          {/* Socials */}
          <div className="flex gap-4 text-luxury-muted pt-2">
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noreferrer" 
              className="p-2 rounded-full border border-luxury-border hover:border-accent hover:text-accent transition-all duration-300"
              aria-label="Follow us on Instagram"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noreferrer" 
              className="p-2 rounded-full border border-luxury-border hover:border-accent hover:text-accent transition-all duration-300"
              aria-label="Follow us on Twitter"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
            </a>
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noreferrer" 
              className="p-2 rounded-full border border-luxury-border hover:border-accent hover:text-accent transition-all duration-300"
              aria-label="Follow us on Facebook"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
          </div>
        </div>

        {/* Link List: Shop */}
        <div className="space-y-6">
          <h4 className="font-syne font-bold text-xs tracking-[0.25em] text-accent uppercase flex items-center gap-1.5">
            <span>COLLECTIONS</span>
            <span className="w-6 h-[1px] bg-accent/25" />
          </h4>
          <ul className="space-y-3.5 text-xs tracking-wider text-luxury-muted font-manrope">
            <li>
              <Link to="/shop?category=Oversized" className="hover:text-secondary transition-colors duration-300 hover:pl-1 transition-all">Oversized Silhouette</Link>
            </li>
            <li>
              <Link to="/shop?category=Sneakers" className="hover:text-secondary transition-colors duration-300 hover:pl-1 transition-all">Luxury Footwear</Link>
            </li>
            <li>
              <Link to="/shop?category=Hoodies" className="hover:text-secondary transition-colors duration-300 hover:pl-1 transition-all">Cozy Knitwear drops</Link>
            </li>
            <li>
              <Link to="/shop?category=Shirts" className="hover:text-secondary transition-colors duration-300 hover:pl-1 transition-all">Minimalist Shirts</Link>
            </li>
            <li>
              <Link to="/shop?category=Accessories" className="hover:text-secondary transition-colors duration-300 hover:pl-1 transition-all">Premium Accessories</Link>
            </li>
          </ul>
        </div>

        {/* Link List: Care */}
        <div className="space-y-6">
          <h4 className="font-syne font-bold text-xs tracking-[0.25em] text-accent uppercase flex items-center gap-1.5">
            <span>SERVICES & CARE</span>
            <span className="w-6 h-[1px] bg-accent/25" />
          </h4>
          <ul className="space-y-3.5 text-xs tracking-wider text-luxury-muted font-manrope">
            <li>
              <Link to="/contact" className="hover:text-secondary transition-colors duration-300 hover:pl-1 transition-all">Contact Client Care</Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-secondary transition-colors duration-300 hover:pl-1 transition-all">Brand Heritage & Ethos</Link>
            </li>
            <li>
              <a href="#returns" className="hover:text-secondary transition-colors duration-300 hover:pl-1 transition-all">Returns & Exchanges Policy</a>
            </li>
            <li>
              <a href="#shipping" className="hover:text-secondary transition-colors duration-300 hover:pl-1 transition-all">Worldwide Shipping Rates</a>
            </li>
            <li>
              <a href="#privacy" className="hover:text-secondary transition-colors duration-300 hover:pl-1 transition-all">Privacy & Data Protections</a>
            </li>
          </ul>
        </div>

        {/* Subscriptions */}
        <div className="space-y-6">
          <h4 className="font-syne font-bold text-xs tracking-[0.25em] text-accent uppercase flex items-center gap-1.5">
            <span>THE JOURNAL</span>
            <span className="w-6 h-[1px] bg-accent/25" />
          </h4>
          <p className="text-xs text-luxury-muted leading-relaxed font-light">
            Subscribe to receive exclusive access to early drops, seasonal lookbooks, and members private sales.
          </p>
          <form onSubmit={handleEmailSubscribe} className="relative w-full max-w-[300px] border-b border-luxury-border pb-3 flex">
            <input
              type="email"
              name="email"
              placeholder="ENTER EMAIL ADDRESS..."
              className="bg-transparent text-xs outline-none text-secondary placeholder-luxury-muted flex-grow pr-8 tracking-[0.1em] font-light"
              required
              aria-label="Email address for subscription"
            />
            <button 
              type="submit" 
              className="absolute right-0 top-0 text-secondary hover:text-accent transition-colors duration-300" 
              aria-label="Submit email subscription"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>

      {/* Large branded divider monogram */}
      <div className="w-full border-t border-luxury-border/60 py-8 overflow-hidden select-none bg-primary relative">
        {/* Thin Gold Line running under brand statement */}
        <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
        
        <h2 className="font-syne text-[11vw] font-black text-center text-stroke leading-none tracking-[0.15em] opacity-15 select-none">
          LUXORA
        </h2>
      </div>

      {/* Legal and Base footer credits */}
      <div className="bg-[#060606] py-8 px-6 md:px-12 border-t border-luxury-border/40 text-[10px] tracking-widest text-luxury-muted font-manrope uppercase font-bold">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-5">
          <div>
            <span>© 2026 LUXORA HAUTE COUTURE. REGISTERED IN PORTUGAL. ALL RIGHTS RESERVED.</span>
          </div>
          <div className="flex gap-6 font-semibold">
            <span>SECURE PAYMENT VIA STRIPE</span>
            <span className="text-accent/80">POWERED BY VITE + REACT 19</span>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
