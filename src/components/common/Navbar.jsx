import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Heart, ShoppingBag, User, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';
import SearchPopup from '../search/SearchPopup';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const { pathname } = useLocation();
  const { setIsCartOpen, cartCount } = useCart();
  const { wishlist } = useWishlist();
  const { isAuthenticated } = useAuth();

  const navLinks = [
    { name: 'SHOP', path: '/shop' },
    { name: 'COLLECTIONS', path: '/collections' },
    { name: 'ABOUT', path: '/about' },
    { name: 'CONTACT', path: '/contact' },
  ];

  // Scroll handler to shrink navbar and toggle glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-700 ${
          isScrolled
            ? 'py-3.5 bg-luxury-bg/85 backdrop-blur-xl border-b border-accent/15 shadow-premium'
            : 'py-6 bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center relative">
          
          {/* Left Navigation Links - Desktop Only */}
          <nav className="hidden lg:flex items-center gap-10 text-xs font-syne font-bold tracking-[0.2em] relative">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link 
                  key={link.name} 
                  to={link.path} 
                  className="relative py-2 text-secondary/80 hover:text-accent transition-colors duration-300 group"
                >
                  <span>{link.name}</span>
                  {/* Underline expansion on hover */}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1.5px] bg-accent transition-all duration-300 group-hover:w-full" />
                  
                  {/* Active sliding pill */}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-accent"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Icon - Mobile Only */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden text-secondary hover:text-accent transition-colors focus:outline-none p-1.5"
            aria-label="Open mobile menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Central Monogram Brand Logo */}
          <Link to="/" className="flex flex-col items-center select-none absolute left-1/2 -translate-x-1/2">
            <span className="font-syne text-2xl md:text-3xl font-extrabold tracking-[0.3em] text-[#F8F8F8]">
              LUXORA
            </span>
            <span className="text-[7px] tracking-[0.55em] text-accent font-bold -mt-0.5 hidden md:block">
              HAUTE COUTURE
            </span>
          </Link>

          {/* Right Action Icons */}
          <div className="flex items-center gap-3.5 md:gap-5 ml-auto">
            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="text-[#F8F8F8] hover:text-accent p-2 rounded-full hover:bg-white/5 transition-all duration-300"
              aria-label="Open search archive"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Profile Account */}
            <Link
              to="/login"
              className="text-[#F8F8F8] hover:text-accent p-2 rounded-full hover:bg-white/5 transition-all duration-300 hidden sm:block"
              aria-label="View user profile"
            >
              <User className="w-4 h-4" />
            </Link>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="text-[#F8F8F8] hover:text-accent p-2 rounded-full hover:bg-white/5 transition-all duration-300 relative"
              aria-label="View wishlist folder"
            >
              <Heart className="w-4 h-4" />
              <AnimatePresence>
                {wishlist.length > 0 && (
                  <motion.span
                    key={wishlist.length}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 15 }}
                    className="absolute top-0 right-0 w-4 h-4 bg-accent text-black text-[8px] font-black flex items-center justify-center rounded-full leading-none scale-75"
                  >
                    {wishlist.length}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

            {/* Cart Bag */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="text-[#F8F8F8] hover:text-accent p-2 rounded-full hover:bg-white/5 transition-all duration-300 relative"
              aria-label="Open checkout drawer"
            >
              <ShoppingBag className="w-4 h-4" />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    key={cartCount}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 15 }}
                    className="absolute top-0 right-0 w-4 h-4 bg-secondary text-black text-[8px] font-black flex items-center justify-center rounded-full leading-none scale-75"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-10%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-10%' }}
            transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.55 }}
            className="fixed inset-0 z-50 bg-[#0B0B0B]/95 backdrop-blur-xl flex flex-col justify-between p-8"
          >
            {/* Header */}
            <div className="flex justify-between items-center border-b border-luxury-border/60 pb-6">
              <span className="font-syne text-xl font-bold tracking-widest text-secondary">LUXORA</span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-secondary hover:text-accent transition-colors focus:outline-none"
                aria-label="Close mobile menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Links */}
            <nav className="flex flex-col gap-6 py-12 text-center">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                >
                  <Link
                    to={link.path}
                    className="font-syne text-3xl font-bold tracking-widest text-secondary hover:text-accent transition-colors py-2 inline-block"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.1, duration: 0.5 }}
              >
                <Link
                  to="/login"
                  className="font-syne text-lg font-bold tracking-widest text-luxury-muted hover:text-accent transition-colors mt-6 border-t border-luxury-border/60 pt-6 flex items-center justify-center gap-2"
                >
                  <User className="w-4 h-4" /> MY ACCOUNT
                </Link>
              </motion.div>
            </nav>

            {/* Footer */}
            <div className="border-t border-luxury-border/60 pt-6 text-center space-y-4">
              <div className="flex justify-center gap-6 text-xs font-manrope text-luxury-muted font-semibold tracking-wider">
                <span>EN / USD</span>
                <span>GLOBAL SHIPPING</span>
              </div>
              <p className="text-[9px] text-luxury-muted tracking-widest uppercase">
                © 2026 LUXORA HAUTE COUTURE. ALL RIGHTS RESERVED.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <SearchPopup isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default Navbar;
