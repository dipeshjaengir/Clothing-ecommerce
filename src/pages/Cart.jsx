import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowLeft, ShieldCheck, CreditCard, RotateCcw, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import LuxuryImage from '../components/common/LuxuryImage';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, cartSubtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [checkoutStep, setCheckoutStep] = useState('cart'); // cart, loading, success

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === 'LUXORA10') {
      setDiscountPercent(10);
      toast.success('Promo applied: 10% Off your acquisition.', {
        style: {
          background: '#FFFFFF',
          color: '#111111',
          border: '1px solid #B68D40',
        },
      });
    } else {
      toast.error('Invalid promo code. Try "LUXORA10"', {
        style: {
          background: '#FFFFFF',
          color: '#111111',
          border: '1px solid #c0392b',
        },
      });
    }
  };

  const handleCheckoutSubmit = async () => {
    setCheckoutStep('loading');
    
    // Simulate premium payment processing
    await new Promise((resolve) => setTimeout(resolve, 3000));
    
    setCheckoutStep('success');
    clearCart();
  };

  const discountAmount = Math.round((cartSubtotal * discountPercent) / 100);
  const shippingCost = cartSubtotal >= 300 || cartSubtotal === 0 ? 0 : 25;
  const estimatedTax = Math.round((cartSubtotal - discountAmount) * 0.08);
  const orderTotal = cartSubtotal - discountAmount + shippingCost + estimatedTax;

  if (checkoutStep === 'loading') {
    return (
      <div className="pt-28 pb-24 bg-luxury-bg text-primary font-manrope min-h-screen flex flex-col justify-center items-center text-center">
        <div className="w-16 h-16 border-2 border-accent border-t-transparent rounded-full animate-spin mb-6" />
        <h2 className="font-syne text-xl md:text-3xl font-bold tracking-widest uppercase">
          SECURELY PROCESSING TRANSACTION...
        </h2>
        <p className="text-luxury-muted mt-2 text-xs md:text-sm max-w-sm leading-relaxed">
          Please do not refresh or close this panel. Communicating with security gateways.
        </p>
      </div>
    );
  }

  if (checkoutStep === 'success') {
    return (
      <div className="pt-28 pb-24 bg-luxury-bg text-primary font-manrope min-h-screen flex flex-col justify-center items-center text-center px-6">
        <div className="w-20 h-20 bg-accent/10 border border-accent rounded-full flex items-center justify-center text-accent mb-6 animate-bounce">
          <ShieldCheck className="w-10 h-10" />
        </div>
        
        <span className="text-[10px] font-bold tracking-widest text-accent uppercase">TRANSACTION COMPLETED</span>
        <h2 className="font-syne text-3xl md:text-5xl font-black tracking-wider text-primary uppercase mt-2">
          ACQUISITION SUCCESSFUL
        </h2>
        
        <p className="text-xs md:text-sm text-luxury-muted max-w-md mt-4 leading-relaxed font-manrope">
          Thank you for shopping with LUXORA. An encrypted receipt along with real-time DHL carrier tracking details has been dispatched to your email address.
        </p>

        <button
          onClick={() => navigate('/shop')}
          className="mt-8 px-8 py-4 bg-[#111111] text-[#F8F7F3] font-syne font-bold text-xs tracking-widest rounded-full hover:bg-accent transition-colors shadow-premium"
        >
          CONTINUE BROWSING ARCHIVES
        </button>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-24 bg-luxury-bg text-primary font-manrope min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Title */}
        <div className="border-b border-luxury-border/60 pb-8 mb-12">
          <span className="text-[10px] font-bold tracking-widest text-accent uppercase">
            YOUR COLLECTION BAG
          </span>
          <h1 className="font-syne text-4xl md:text-6xl font-black tracking-wider text-primary uppercase mt-2">
            THE SHOPPING CART
          </h1>
        </div>

        {cart.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            
            {/* Left Items Column */}
            <div className="lg:col-span-2 space-y-6">
              {cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                  className="flex flex-col sm:flex-row gap-6 p-6 rounded-2xl bg-luxury-card/30 border border-luxury-border/80 relative group hover:border-luxury-border transition-all duration-300"
                >
                  {/* Image */}
                  <div className="w-24 h-32 overflow-hidden rounded-xl bg-luxury-border flex-shrink-0">
                    <LuxuryImage
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-4 pr-8">
                        <h3 className="font-syne font-bold text-sm md:text-base text-primary tracking-wider">
                        <Link to={`/product/${item.product.id}`} className="hover:text-accent transition-colors">
                          {item.product.name}
                        </Link>
                      </h3>
                    </div>
                    <div className="flex gap-x-4 gap-y-1 flex-wrap text-xs text-luxury-muted mt-2 font-semibold">
                      <span>SIZE: <strong className="text-primary">{item.selectedSize}</strong></span>
                      <span>COLOR: <strong className="text-primary">{item.selectedColor}</strong></span>
                    </div>
                    </div>

                    {/* Controls Row */}
                    <div className="flex justify-between items-end mt-4">
                      
                      {/* Quantity Selector */}
                      <div className="flex items-center border border-luxury-border rounded-lg bg-luxury-bg/50">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.selectedSize, item.selectedColor, item.quantity - 1)}
                          className="px-2.5 py-1 text-luxury-muted hover:text-primary transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-xs font-bold text-primary font-manrope">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.selectedSize, item.selectedColor, item.quantity + 1)}
                          className="px-2.5 py-1 text-luxury-muted hover:text-primary transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Total */}
                      <span className="font-bold text-base text-accent font-manrope">
                        ${item.product.price * item.quantity}
                      </span>

                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.product.id, item.selectedSize, item.selectedColor)}
                    className="absolute top-6 right-6 p-2 rounded-xl text-luxury-muted hover:text-red-500 hover:bg-red-500/10 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 text-xs font-syne font-extrabold tracking-widest text-luxury-muted hover:text-accent transition-colors py-2"
              >
                <ArrowLeft className="w-4 h-4" /> BACK TO SHOPPING
              </Link>
            </div>

            {/* Right Summary Column */}
            <div className="space-y-6">
              
              {/* Order Summary box */}
              <div className="p-8 rounded-3xl bg-luxury-card/30 border border-luxury-border/80 shadow-premium space-y-6">
                <h3 className="font-syne font-bold text-base tracking-wider text-primary uppercase border-b border-luxury-border pb-4">
                  ORDER SUMMARY
                </h3>

                <div className="space-y-4 text-xs font-semibold tracking-wider text-luxury-muted font-manrope">
                  <div className="flex justify-between">
                    <span>BAG SUBTOTAL</span>
                    <span className="text-primary">${cartSubtotal}</span>
                  </div>
                  
                  {discountPercent > 0 && (
                    <div className="flex justify-between text-accent">
                      <span>PROMO DISCOUNT ({discountPercent}%)</span>
                      <span>-${discountAmount}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>SHIPPING COST</span>
                    <span className="text-primary">
                      {shippingCost === 0 ? "FREE EXPRESS" : `$${shippingCost}`}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>ESTIMATED TAX (8%)</span>
                    <span className="text-primary">${estimatedTax}</span>
                  </div>

                  <div className="h-[1px] bg-luxury-border my-2" />

                  <div className="flex justify-between text-sm text-primary font-extrabold font-manrope pt-2">
                    <span>TOTAL ACQUISITION</span>
                    <span className="text-accent text-lg">${orderTotal}</span>
                  </div>
                </div>

                {/* Checkout Trigger */}
                <button
                  onClick={handleCheckoutSubmit}
                  className="w-full py-4 bg-accent text-black font-syne font-bold text-xs tracking-widest rounded-xl hover:bg-accent-light transition-colors duration-300 flex items-center justify-center gap-2 group shadow-gold"
                >
                  <CreditCard className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" /> COMPLETE ACQUISITION
                </button>
              </div>

              {/* Promo Code Box */}
              <div className="p-6 rounded-2xl bg-luxury-card/20 border border-luxury-border/80 shadow-premium">
                <span className="text-[10px] font-bold tracking-widest text-accent uppercase block mb-3">PROMOTIONAL CODE</span>
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="ENTER CODE..."
                    className="flex-grow px-4 py-2.5 rounded-xl bg-luxury-card border border-luxury-border text-xs outline-none text-primary focus:border-accent font-manrope placeholder-luxury-muted uppercase tracking-wider"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-[#111111] text-[#F8F7F3] font-syne font-bold text-[10px] tracking-widest rounded-xl hover:bg-accent transition-colors"
                  >
                    APPLY
                  </button>
                </form>
                <p className="text-[9px] text-luxury-muted mt-2 font-semibold">Tip: Apply code "LUXORA10" to claim 10% off.</p>
              </div>

              {/* Guarantees Box */}
              <div className="grid grid-cols-3 gap-4 text-center text-luxury-muted text-[9px] font-semibold tracking-wider font-manrope">
                <div className="p-3 border border-luxury-border/40 rounded-xl">
                  <ShieldCheck className="w-5 h-5 text-accent mx-auto mb-1.5" />
                  <span>SECURE PACK</span>
                </div>
                <div className="p-3 border border-luxury-border/40 rounded-xl">
                  <RotateCcw className="w-5 h-5 text-accent mx-auto mb-1.5" />
                  <span>30 DAY EXCH</span>
                </div>
                <div className="p-3 border border-luxury-border/40 rounded-xl">
                  <Sparkles className="w-5 h-5 text-accent mx-auto mb-1.5" />
                  <span>AUTHENTIC</span>
                </div>
              </div>

            </div>

          </div>
        ) : (
          <div className="py-24 text-center rounded-3xl border border-dashed border-luxury-border flex flex-col justify-center items-center">
            <h2 className="font-syne font-bold text-xl tracking-wider mb-2">YOUR BAG IS EMPTY</h2>
            <p className="text-sm text-luxury-muted max-w-sm mb-8 leading-relaxed">
              You have not saved any garments in your checkout queue. Browse the store to acquire designs.
            </p>
            <Link
              to="/shop"
              className="px-8 py-4 bg-[#111111] text-[#F8F7F3] font-syne font-bold text-xs tracking-widest rounded-full hover:bg-accent transition-all duration-300 shadow-premium"
            >
              SHOP NEW DROPS
            </Link>
          </div>
        )}

      </div>
    </div>
  );
};

export default Cart;
