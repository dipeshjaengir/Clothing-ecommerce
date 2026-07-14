import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn, LogOut, Package, ArrowRight, UserCheck, Calendar, ShieldAlert } from 'lucide-react';

// Validation Schema
const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

const Login = () => {
  const { user, isAuthenticated, login, logout } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data) => {
    const success = login(data.email, data.password);
    if (success) {
      navigate('/login'); // Refresh/display profile card
    }
  };

  // Render Profile View if logged in
  if (isAuthenticated && user) {
    return (
      <div className="pt-28 pb-24 bg-luxury-bg text-white font-manrope min-h-screen">
        <div className="max-w-4xl mx-auto px-6">
          
          {/* Header */}
          <div className="border-b border-luxury-border/60 pb-6 mb-10 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <UserCheck className="w-6 h-6 text-accent" />
              <h1 className="font-syne text-2xl md:text-3xl font-extrabold tracking-wider uppercase">
                CLIENT ARCHIVE PROFILE
              </h1>
            </div>
            <button
              onClick={logout}
              className="px-6 py-2.5 bg-transparent border border-red-500/30 text-red-500 rounded-xl text-xs font-syne font-bold tracking-widest hover:bg-red-500/10 transition-colors flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" /> LOG OUT
            </button>
          </div>

          {/* Profile Content Split */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Left Account Card */}
            <div className="p-6 rounded-2xl bg-luxury-card/30 border border-luxury-border/80 text-center space-y-4">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-24 h-24 rounded-full object-cover mx-auto border-2 border-accent/20"
              />
              <div>
                <h3 className="font-syne font-bold text-base text-white tracking-wider">{user.name}</h3>
                <span className="text-xs text-luxury-muted block mt-1">{user.email}</span>
              </div>
              <div className="pt-4 border-t border-luxury-border text-[10px] tracking-widest font-bold text-accent uppercase">
                VERIFIED MEMBER SINCE 2026
              </div>
            </div>

            {/* Right Orders List Column */}
            <div className="md:col-span-2 space-y-6">
              <h3 className="font-syne font-bold text-sm tracking-widest text-white uppercase flex items-center gap-2">
                <Package className="w-4 h-4 text-accent" /> ORDER ARCHIVE HISTORY
              </h3>

              {user.orders.length > 0 ? (
                <div className="space-y-4">
                  {user.orders.map((order) => (
                    <div
                      key={order.id}
                      className="p-6 rounded-2xl bg-luxury-card/20 border border-luxury-border/80 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-luxury-border transition-colors"
                    >
                      <div className="space-y-1">
                        <span className="text-xs font-bold text-white font-manrope">{order.id}</span>
                        <div className="flex gap-2 text-[10px] text-luxury-muted font-semibold items-center">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{order.date}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                        <span className="font-bold text-sm text-white font-manrope">${order.total}</span>
                        <span className={`px-3 py-1 rounded-full text-[9px] font-extrabold tracking-wider uppercase border ${
                          order.status === 'Delivered' 
                            ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-400'
                            : 'bg-amber-500/5 border-amber-500/20 text-amber-400'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center rounded-2xl border border-dashed border-luxury-border text-luxury-muted text-xs">
                  No purchases found in your archive file.
                </div>
              )}
            </div>

          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-24 bg-luxury-bg text-white font-manrope min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md px-6">
        
        {/* Form Box */}
        <div className="p-8 rounded-3xl bg-luxury-card/30 border border-luxury-border/80 shadow-premium space-y-6">
          <div className="text-center">
            <span className="text-[9px] font-bold tracking-widest text-accent uppercase">MEMBER PORTAL</span>
            <h2 className="font-syne text-2xl md:text-3xl font-extrabold tracking-wider text-white uppercase mt-1">
              LOG IN TO PROFILE
            </h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            
            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold tracking-wider text-luxury-muted uppercase">Email Address</label>
              <input
                type="email"
                {...register('email')}
                placeholder="Enter email..."
                className="px-4 py-3 bg-luxury-card border border-luxury-border text-xs outline-none text-white focus:border-accent transition-colors font-manrope placeholder-luxury-muted"
              />
              {errors.email && (
                <span className="text-[10px] text-red-500 font-semibold">{errors.email.message}</span>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-bold tracking-wider text-luxury-muted uppercase">Password</label>
                <button type="button" className="text-[9px] font-bold tracking-wider text-accent hover:underline uppercase">Forgot?</button>
              </div>
              <input
                type="password"
                {...register('password')}
                placeholder="Enter password..."
                className="px-4 py-3 bg-luxury-card border border-luxury-border text-xs outline-none text-white focus:border-accent transition-colors font-manrope placeholder-luxury-muted"
              />
              {errors.password && (
                <span className="text-[10px] text-red-500 font-semibold">{errors.password.message}</span>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-white text-black font-syne font-bold text-xs tracking-widest rounded-full hover:bg-accent hover:text-black transition-colors flex items-center justify-center gap-2"
            >
              LOG IN <LogIn className="w-4 h-4" />
            </button>

          </form>

          {/* Direct registration navigation link */}
          <div className="text-center pt-2 border-t border-luxury-border/60">
            <span className="text-xs text-luxury-muted">New to the collective? </span>
            <Link to="/register" className="text-xs font-bold text-accent hover:underline inline-flex items-center gap-0.5">
              Create an account <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Login;
