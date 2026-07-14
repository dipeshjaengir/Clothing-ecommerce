import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserPlus, ArrowRight } from 'lucide-react';

// Validation Schema
const registerSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  confirmPassword: z.string().min(6, { message: "Confirmation must match password." })
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"], // sets error on confirmPassword field
});

const Register = () => {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data) => {
    const success = registerUser(data.name, data.email, data.password);
    if (success) {
      navigate('/login'); // Redirect to profile
    }
  };

  return (
    <div className="pt-28 pb-24 bg-luxury-bg text-white font-manrope min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md px-6">
        
        {/* Form Box */}
        <div className="p-8 rounded-3xl bg-luxury-card/30 border border-luxury-border/80 shadow-premium space-y-6">
          <div className="text-center">
            <span className="text-[9px] font-bold tracking-widest text-accent uppercase">MEMBER PORTAL</span>
            <h2 className="font-syne text-2xl md:text-3xl font-extrabold tracking-wider text-white uppercase mt-1">
              CREATE AN ACCOUNT
            </h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            
            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold tracking-wider text-luxury-muted uppercase">Full Name</label>
              <input
                type="text"
                {...register('name')}
                placeholder="Enter full name..."
                className="px-4 py-2.5 rounded-xl bg-luxury-card border border-luxury-border text-xs outline-none text-white focus:border-accent transition-colors font-manrope placeholder-luxury-muted"
              />
              {errors.name && (
                <span className="text-[10px] text-red-500 font-semibold">{errors.name.message}</span>
              )}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold tracking-wider text-luxury-muted uppercase">Email Address</label>
              <input
                type="email"
                {...register('email')}
                placeholder="Enter email..."
                className="px-4 py-2.5 rounded-xl bg-luxury-card border border-luxury-border text-xs outline-none text-white focus:border-accent transition-colors font-manrope placeholder-luxury-muted"
              />
              {errors.email && (
                <span className="text-[10px] text-red-500 font-semibold">{errors.email.message}</span>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold tracking-wider text-luxury-muted uppercase">Password</label>
              <input
                type="password"
                {...register('password')}
                placeholder="Create password..."
                className="px-4 py-2.5 rounded-xl bg-luxury-card border border-luxury-border text-xs outline-none text-white focus:border-accent transition-colors font-manrope placeholder-luxury-muted"
              />
              {errors.password && (
                <span className="text-[10px] text-red-500 font-semibold">{errors.password.message}</span>
              )}
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold tracking-wider text-luxury-muted uppercase">Confirm Password</label>
              <input
                type="password"
                {...register('confirmPassword')}
                placeholder="Verify password..."
                className="px-4 py-2.5 rounded-xl bg-luxury-card border border-luxury-border text-xs outline-none text-white focus:border-accent transition-colors font-manrope placeholder-luxury-muted"
              />
              {errors.confirmPassword && (
                <span className="text-[10px] text-red-500 font-semibold">{errors.confirmPassword.message}</span>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-white text-black font-syne font-bold text-xs tracking-widest rounded-full hover:bg-accent hover:text-black transition-colors flex items-center justify-center gap-2"
            >
              CREATE ACCOUNT <UserPlus className="w-4 h-4" />
            </button>

          </form>

          {/* Link to login page */}
          <div className="text-center pt-2 border-t border-luxury-border/60">
            <span className="text-xs text-luxury-muted">Already registered? </span>
            <Link to="/login" className="text-xs font-bold text-accent hover:underline inline-flex items-center gap-0.5">
              Log in to profile <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Register;
