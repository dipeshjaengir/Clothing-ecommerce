import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const LuxuryImage = ({ src, alt, className = "", ...props }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Reset states if src changes
  useEffect(() => {
    setLoading(true);
    setError(false);
  }, [src]);

  const handleLoad = () => {
    setLoading(false);
  };

  const handleError = () => {
    setLoading(false);
    setError(true);
  };

  // Luxury minimalist SVG fallback image
  const FallbackPlaceholder = () => (
    <div className="w-full h-full bg-[#EFECE6] flex flex-col items-center justify-center text-center p-4 relative overflow-hidden select-none">
      {/* Decorative fine-line border inside */}
      <div className="border border-[#B68D40]/25 w-full h-full flex flex-col items-center justify-center p-6 relative">
        <span className="absolute top-3 left-4 text-[7px] tracking-[0.2em] text-[#6D6D6D] font-bold">LUXORA</span>
        <span className="absolute bottom-3 right-4 text-[7px] tracking-[0.2em] text-[#B68D40] font-bold">EST. 2026</span>
        <span className="font-syne text-sm font-black tracking-[0.25em] text-[#111111] uppercase">IMAGE OFFLINE</span>
        <span className="text-[6px] tracking-[0.3em] text-[#6D6D6D] mt-2 uppercase font-bold">HAUTE COUTURE ARCHIVE</span>
      </div>
    </div>
  );

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      
      {/* Skeleton Loading state */}
      {loading && (
        <div className="absolute inset-0 bg-[#EFECE6] animate-pulse flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-[#B68D40]/30 border-t-[#B68D40] rounded-full animate-spin" />
        </div>
      )}

      {/* Actual Image */}
      {!error ? (
        <motion.img
          src={src}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          className={`w-full h-full object-cover ${loading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-700 ease-out`}
          {...props}
        />
      ) : (
        <FallbackPlaceholder />
      )}

    </div>
  );
};

export default LuxuryImage;
