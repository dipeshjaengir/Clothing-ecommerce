import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const LuxuryImage = ({ src, alt, className = "", ...props }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Reliable luxury editorial campaign fallback URL
  const fallbackUrl = "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop";

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

  return (
    <div className={`relative w-full h-full overflow-hidden bg-[#EFECE6] ${className}`}>
      
      {/* Skeleton Loading State */}
      {loading && (
        <div className="absolute inset-0 bg-[#EFECE6] animate-pulse flex items-center justify-center z-10">
          <div className="w-5 h-5 border-2 border-[#B68D40]/30 border-t-[#B68D40] rounded-full animate-spin" />
        </div>
      )}

      {/* Actual Image Rendering with Error Fallbacks */}
      <motion.img
        src={error ? fallbackUrl : (src || fallbackUrl)}
        alt={alt || "LUXORA Editorial Campaign"}
        onLoad={handleLoad}
        onError={handleError}
        className={`w-full h-full object-cover ${loading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-700 ease-out`}
        loading="lazy"
        {...props}
      />

    </div>
  );
};

export default LuxuryImage;
