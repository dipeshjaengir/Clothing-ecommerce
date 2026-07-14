import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="pt-28 pb-24 bg-luxury-bg text-white font-manrope min-h-screen flex items-center justify-center text-center">
      <div className="max-w-md px-6 flex flex-col items-center">
        
        <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 text-red-500 rounded-full flex items-center justify-center mb-6">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <span className="text-[10px] font-bold tracking-widest text-accent uppercase">ERROR CODE 404</span>
        <h1 className="font-syne text-4xl md:text-5xl font-black tracking-wider text-white uppercase mt-2">
          PAGE NOT FOUND
        </h1>
        
        <p className="text-xs md:text-sm text-luxury-muted mt-4 leading-relaxed font-manrope">
          The editorial layout or product drop you are seeking has been archived, relocated, or does not exist.
        </p>

        <Link
          to="/"
          className="mt-8 px-8 py-4 bg-white text-black font-syne font-bold text-xs tracking-widest rounded-full hover:bg-accent hover:text-black transition-all duration-300 flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> BACK TO HOMEPAGE
        </Link>

      </div>
    </div>
  );
};

export default NotFound;
