import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import toast from 'react-hot-toast';

// Zod Validation Schema
const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data) => {
    // Simulate API request delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast.success('Your message has been sent to client care. We will reply within 12 hours.', {
      style: {
        background: '#121212',
        color: '#FFFFFF',
        border: '1px solid #C9A227',
        fontFamily: 'Manrope',
      },
      iconTheme: {
        primary: '#C9A227',
        secondary: '#121212',
      },
    });
    
    reset();
  };

  return (
    <div className="pt-28 pb-24 bg-luxury-bg text-white font-manrope">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Title */}
        <div className="border-b border-luxury-border/60 pb-8 mb-16 text-center md:text-left">
          <span className="text-[10px] font-bold tracking-widest text-accent uppercase">
            CLIENT RELATIONS
          </span>
          <h1 className="font-syne text-4xl md:text-6xl font-black tracking-wider text-white uppercase mt-2">
            CONTACT CLIENT CARE
          </h1>
        </div>

        {/* Contact Split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Details Column */}
          <div className="space-y-10">
            <div>
              <h2 className="font-syne text-2xl font-bold tracking-wider uppercase mb-4 text-white">
                GET IN TOUCH
              </h2>
              <p className="text-xs text-luxury-muted leading-relaxed max-w-md">
                Our client advisors are available to assist with sizing requests, order updates, shipping policies, or bespoke couture inquiries.
              </p>
            </div>

            <div className="space-y-6">
              
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-luxury-card border border-luxury-border flex items-center justify-center flex-shrink-0 text-accent">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-syne font-bold text-xs tracking-wider text-white uppercase">EMAIL ADVISORS</h4>
                  <span className="text-xs text-luxury-muted">care@luxoracouture.com</span>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-luxury-card border border-luxury-border flex items-center justify-center flex-shrink-0 text-accent">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-syne font-bold text-xs tracking-wider text-white uppercase">TELEPHONE ENQUIRIES</h4>
                  <span className="text-xs text-luxury-muted">+351 213 456 789 (Mon-Fri)</span>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-luxury-card border border-luxury-border flex items-center justify-center flex-shrink-0 text-accent">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-syne font-bold text-xs tracking-wider text-white uppercase">HEADQUARTERS</h4>
                  <span className="text-xs text-luxury-muted">Avenida da Liberdade 120, Lisbon, Portugal</span>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-luxury-card border border-luxury-border flex items-center justify-center flex-shrink-0 text-accent">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-syne font-bold text-xs tracking-wider text-white uppercase">CARE HOURS</h4>
                  <span className="text-xs text-luxury-muted">GMT 09:00 - 18:00 (London/Lisbon)</span>
                </div>
              </div>

            </div>
          </div>

          {/* Form Column */}
          <div className="p-8 rounded-3xl bg-luxury-card/30 border border-luxury-border/80 shadow-premium">
            <h3 className="font-syne font-bold text-lg tracking-wider text-white uppercase mb-6">
              SEND AN INQUIRY
            </h3>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              
              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold tracking-wider text-luxury-muted uppercase">Full Name</label>
                <input
                  type="text"
                  {...register('name')}
                  placeholder="Enter your name..."
                  className="px-4 py-3.5 rounded-xl bg-luxury-card border border-luxury-border text-xs outline-none text-white focus:border-accent transition-colors font-manrope placeholder-luxury-muted"
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
                  placeholder="Enter your email..."
                  className="px-4 py-3.5 rounded-xl bg-luxury-card border border-luxury-border text-xs outline-none text-white focus:border-accent transition-colors font-manrope placeholder-luxury-muted"
                />
                {errors.email && (
                  <span className="text-[10px] text-red-500 font-semibold">{errors.email.message}</span>
                )}
              </div>

              {/* Subject */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold tracking-wider text-luxury-muted uppercase">Subject</label>
                <input
                  type="text"
                  {...register('subject')}
                  placeholder="Inquiry subject..."
                  className="px-4 py-3.5 rounded-xl bg-luxury-card border border-luxury-border text-xs outline-none text-white focus:border-accent transition-colors font-manrope placeholder-luxury-muted"
                />
                {errors.subject && (
                  <span className="text-[10px] text-red-500 font-semibold">{errors.subject.message}</span>
                )}
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold tracking-wider text-luxury-muted uppercase">Message Details</label>
                <textarea
                  rows="4"
                  {...register('message')}
                  placeholder="How can we assist you?"
                  className="px-4 py-3.5 rounded-xl bg-luxury-card border border-luxury-border text-xs outline-none text-white focus:border-accent transition-colors font-manrope placeholder-luxury-muted resize-none"
                />
                {errors.message && (
                  <span className="text-[10px] text-red-500 font-semibold">{errors.message.message}</span>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-white text-black font-syne font-bold text-xs tracking-widest rounded-full hover:bg-accent transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? "TRANSMITTING..." : (
                  <>
                    TRANSMIT INQUIRY <Send className="w-4 h-4" />
                  </>
                )}
              </button>

            </form>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Contact;
