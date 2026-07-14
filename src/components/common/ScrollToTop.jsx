import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  // Scroll window to top on pathname changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    // If lenis is active, lenis handles it, otherwise window.scrollTo
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-12 h-12 rounded-full border border-luxury-border bg-luxury-bg/85 backdrop-blur-md text-white shadow-premium hover:border-accent hover:text-accent transition-all duration-300 group"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform duration-300" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
