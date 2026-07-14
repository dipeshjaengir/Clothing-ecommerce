import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = ({ isFinished }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isFinished) {
      setProgress(100);
      return;
    }
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 98) {
          clearInterval(interval);
          return 98;
        }
        return prev + Math.floor(Math.random() * 8) + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isFinished]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ 
            y: '-100%',
            transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-50 flex flex-col justify-between bg-luxury-bg p-8 lg:p-16 select-none"
        >
          {/* Header */}
          <div className="flex justify-between items-center text-xs tracking-widest text-luxury-muted font-manrope">
            <span>LUXORA EDITORIAL</span>
            <span>COLLECTION 2026</span>
          </div>

          {/* Center Brand Logo */}
          <div className="flex flex-col items-center justify-center text-center">
            <motion.h1 
              initial={{ letterSpacing: '0.5em', opacity: 0 }}
              animate={{ letterSpacing: '0.25em', opacity: 1 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              className="font-syne text-5xl md:text-8xl font-bold tracking-widest text-primary mb-2"
            >
              LUXORA
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-xs md:text-sm tracking-[0.4em] text-accent font-light"
            >
              HAUTE COUTURE
            </motion.p>
          </div>

          {/* Footer with Progress Counter */}
          <div className="flex justify-between items-end">
            <div className="text-xs tracking-widest text-luxury-muted max-w-[200px] hidden md:block">
              PREMIUM FASHION EXPERIENCE. ALL RIGHTS RESERVED.
            </div>
            
            <div className="flex flex-col items-end w-full md:w-auto">
              <div className="font-syne text-7xl md:text-9xl font-bold text-gradient-gold tabular-nums leading-none">
                {progress}%
              </div>
              <div className="h-[2px] bg-luxury-border w-48 mt-4 relative overflow-hidden">
                <motion.div 
                  initial={{ width: '0%' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: 'easeOut', duration: 0.3 }}
                  className="absolute inset-y-0 left-0 bg-accent"
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
