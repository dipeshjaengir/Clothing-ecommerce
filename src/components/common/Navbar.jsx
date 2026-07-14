import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Heart, ShoppingBag, User, Menu, X, ArrowRight } from 'lucide-react';
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

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
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

  const activeLinkStyle = (path) => {
    return pathname === path 
      ? 'text-accent border-b border-accent pb-1' 
      : 'text-white/80 hover:text-accent transition-colors pb-1';
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'py-4 bg-luxury-bg/85 backdrop-blur-md border-b border-luxury-border shadow-premium'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          
          {/* Left Navigation Links - Desktop Only */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-syne font-bold tracking-widest">
            {navLinks.map((link) => (
              <Link key={link.name} to={link.path} className={activeLinkStyle(link.path)}>
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Icon - Mobile Only */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden text-white hover:text-accent transition-colors"
            aria-label="Open mobile menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Central Monogram Brand Logo */}
          <Link to="/" className="flex flex-col items-center">
            <span className="font-syne text-2xl md:text-3xl font-extrabold tracking-[0.25em] text-white">
              LUXORA
            </span>
            <span className="text-[7px] tracking-[0.5em] text-accent font-semibold -mt-1 hidden md:block">
              HAUTE COUTURE
            </span>
          </Link>

          {/* Right Action Icons */}
          <div className="flex items-center gap-4 md:gap-6">
            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="text-white hover:text-accent transition-colors p-1"
              aria-label="Open search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Profile Account */}
            <Link
              to={isAuthenticated ? "/login" : "/login"} // Login handles profile mock state too
              className="text-white hover:text-accent transition-colors p-1 hidden sm:block"
              aria-label="Account"
            >
              <User className="w-5 h-5" />
            </Link>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="text-white hover:text-accent transition-colors p-1 relative"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-accent text-black text-[9px] font-extrabold flex items-center justify-center rounded-full leading-none scale-90">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart Bag */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="text-white hover:text-accent transition-colors p-1 relative"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-white text-black text-[9px] font-extrabold flex items-center justify-center rounded-full leading-none scale-90">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-100%' }}
            transition={{ type: 'tween', ease: [0.16, 1, 0.3, 1], duration: 0.5 }}
            className="fixed inset-0 z-50 bg-luxury-bg flex flex-col justify-between p-8"
          >
            {/* Header */}
            <div className="flex justify-between items-center border-b border-luxury-border pb-6">
              <span className="font-syne text-xl font-bold tracking-widest">LUXORA</span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-white hover:text-accent transition-colors"
                aria-label="Close mobile menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Links */}
            <nav className="flex flex-col gap-6 py-12 text-center">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="font-syne text-3xl font-bold tracking-widest text-white hover:text-accent transition-colors py-2"
                >
                  {link.name}
                </Link>
              ))}
              
              {/* Account Link for Mobile */}
              <Link
                to="/login"
                className="font-syne text-xl font-bold tracking-widest text-luxury-muted hover:text-accent transition-colors mt-6 border-t border-luxury-border/50 pt-6 flex items-center justify-center gap-2"
              >
                <User className="w-4 h-4" /> MY ACCOUNT
              </Link>
            </nav>

            {/* Footer */}
            <div className="border-t border-luxury-border pt-6 text-center space-y-4">
              <div className="flex justify-center gap-6 text-xs font-manrope text-luxury-muted">
                <span>EN / USD</span>
                <span>GLOBAL SHIPPING</span>
              </div>
              <p className="text-[10px] text-luxury-muted tracking-wider">
                © 2026 LUXORA HAUTE COUTURE. ALL RIGHTS RESERVED.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Embedded Search Overlay */}
      <SearchPopup isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default Navbar;
