import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, ShoppingBag, Star, RefreshCw, Truck, HelpCircle, ChevronRight } from 'lucide-react';
import { products, reviews } from '../data/mockData';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/common/ProductCard';
import SkeletonLoader from '../components/common/SkeletonLoader';
import LuxuryImage from '../components/common/LuxuryImage';

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('details'); // details, shipping, care

  useEffect(() => {
    setLoading(true);
    // Simulate API fetch delay
    const timer = setTimeout(() => {
      const found = products.find((p) => p.id === id);
      if (found) {
        setProduct(found);
        setActiveImage(found.images[0]);
        setSelectedSize(found.sizes[0]);
        setSelectedColor(found.colors[0]?.name);
        setQuantity(1);
      }
      setLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [id]);

  if (loading) {
    return (
      <div className="pt-32 pb-24 bg-luxury-bg text-primary font-manrope min-h-screen">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <SkeletonLoader type="details" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-32 pb-24 bg-luxury-bg text-primary font-manrope min-h-screen flex flex-col justify-center items-center text-center">
        <h2 className="font-syne text-3xl font-bold mb-4">PRODUCT ARCHIVE NOT FOUND</h2>
        <p className="text-luxury-muted mb-8">The requested garment does not exist in our system.</p>
        <Link
          to="/shop"
          className="px-8 py-4 bg-[#111111] text-[#F8F7F3] font-syne font-bold text-xs tracking-widest rounded-full hover:bg-accent hover:text-black transition-all duration-300"
        >
          RETURN TO SHOP
        </Link>
      </div>
    );
  }

  // Filter reviews matching this specific product (fallback to random reviews if no specific)
  const productReviews = reviews.filter((r) => r.productName === product.name);
  const generalReviews = productReviews.length > 0 ? productReviews : reviews.slice(0, 2);

  // Filter related products (same category or others, excluding current)
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
  };

  const isFavorited = isInWishlist(product.id);

  return (
    <div className="pt-28 pb-24 bg-luxury-bg text-primary font-manrope">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-luxury-muted uppercase mb-8">
          <Link to="/" className="hover:text-primary transition-colors">HOME</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/shop" className="hover:text-primary transition-colors">SHOP</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to={`/shop?category=${product.category}`} className="hover:text-primary transition-colors">{product.category}</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-accent truncate max-w-[150px]">{product.name}</span>
        </nav>

        {/* Product Details Split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Image Gallery */}
          <div className="flex flex-col gap-4">
            {/* Main Image View */}
            <div className="aspect-[3/4] w-full overflow-hidden rounded-2xl bg-luxury-card border border-luxury-border">
              <LuxuryImage
                src={activeImage}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Gallery Thumbnails */}
            <div className="grid grid-cols-3 gap-4">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`aspect-square rounded-xl overflow-hidden bg-luxury-card border transition-all ${
                    activeImage === img ? 'border-accent scale-[0.98]' : 'border-luxury-border hover:border-accent/40'
                  }`}
                >
                  <LuxuryImage
                    src={img}
                    alt={`${product.name} thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Information Panel */}
          <div className="space-y-6 lg:py-2">
            
            {/* Header info */}
            <div>
              <span className="text-[10px] font-bold tracking-widest text-accent uppercase">
                {product.category.toUpperCase()} DROP
              </span>
              <h1 className="font-syne text-3xl md:text-4xl font-extrabold tracking-wider text-primary uppercase mt-2">
                {product.name}
              </h1>
              
              {/* Rating stars */}
              <div className="flex items-center gap-3 mt-3">
                <div className="flex text-accent gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < Math.floor(product.rating) ? 'fill-accent' : 'opacity-25'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-luxury-muted font-semibold tracking-wide">
                  {product.rating} / 5.0 ({product.reviewsCount} verified clients)
                </span>
              </div>
            </div>

            {/* Price tag */}
            <div className="border-b border-luxury-border/60 pb-6">
              <span className="text-3xl font-extrabold text-primary font-manrope">
                ${product.price}
              </span>
            </div>

            {/* Brief Description */}
            <p className="text-xs text-luxury-muted leading-relaxed font-manrope">
              {product.description}
            </p>

            {/* Select Color */}
            <div>
              <span className="text-[10px] font-bold tracking-widest text-luxury-muted uppercase block mb-3">
                SELECT TINT: <strong className="text-primary ml-1">{selectedColor}</strong>
              </span>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
                      selectedColor === color.name ? 'border-accent scale-110' : 'border-transparent'
                    }`}
                    title={color.name}
                  >
                    <span 
                      className="w-6 h-6 rounded-full border border-white/10" 
                      style={{ backgroundColor: color.hex }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Select Size */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] font-bold tracking-widest text-luxury-muted uppercase">
                  SELECT SIZING: <strong className="text-primary ml-1">{selectedSize}</strong>
                </span>
                <button className="text-[10px] font-bold tracking-widest text-accent hover:underline flex items-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5" /> SIZE CHART
                </button>
              </div>
              <div className="flex gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 rounded-xl border text-xs font-bold flex items-center justify-center transition-all duration-300 ${
                      selectedSize === size
                        ? 'border-accent bg-accent text-white font-extrabold'
                        : 'border-luxury-border bg-luxury-card text-primary hover:border-accent/40'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Cart/Wishlist Actions */}
            <div className="border-t border-b border-luxury-border/60 py-6 flex flex-col sm:flex-row gap-4 items-stretch">
              
              {/* Quantity input */}
              <div className="flex items-center justify-between border border-luxury-border rounded-xl px-4 py-3 bg-luxury-card/30 sm:w-32">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="text-luxury-muted hover:text-primary font-bold transition-colors"
                >
                  -
                </button>
                <span className="font-bold text-xs select-none font-manrope">{quantity}</span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="text-luxury-muted hover:text-primary font-bold transition-colors"
                >
                  +
                </button>
              </div>

              {/* Add to Cart button */}
              <button
                onClick={handleAddToCart}
                className="flex-grow py-4 bg-accent text-black font-syne font-bold text-xs tracking-widest rounded-xl hover:bg-accent-light transition-colors flex items-center justify-center gap-2 group shadow-gold"
              >
                <ShoppingBag className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" /> ADD TO BAG
              </button>

              {/* Wishlist toggle */}
              <button
                onClick={() => toggleWishlist(product)}
                className={`py-4 px-5 rounded-xl border flex items-center justify-center transition-colors duration-300 ${
                  isFavorited
                    ? 'border-accent text-accent bg-accent/5'
                    : 'border-luxury-border text-primary hover:text-accent hover:border-accent'
                }`}
                title="Add to Wishlist"
              >
                <Heart className={`w-5 h-5 ${isFavorited ? 'fill-accent' : ''}`} />
              </button>
            </div>

            {/* Specifications Accordion / Tab system */}
            <div className="border border-luxury-border rounded-2xl overflow-hidden bg-luxury-card/25">
              
              {/* Tabs Headers */}
              <div className="grid grid-cols-3 text-center border-b border-luxury-border text-[10px] font-bold tracking-widest font-syne bg-luxury-card/50">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`py-3.5 border-r border-luxury-border transition-colors ${
                    activeTab === 'details' ? 'text-accent bg-luxury-bg/30' : 'text-luxury-muted hover:text-primary'
                  }`}
                >
                  SPECIFICATIONS
                </button>
                <button
                  onClick={() => setActiveTab('shipping')}
                  className={`py-3.5 border-r border-luxury-border transition-colors ${
                    activeTab === 'shipping' ? 'text-accent bg-luxury-bg/30' : 'text-luxury-muted hover:text-primary'
                  }`}
                >
                  SHIPPING
                </button>
                <button
                  onClick={() => setActiveTab('care')}
                  className={`py-3.5 transition-colors ${
                    activeTab === 'care' ? 'text-accent bg-luxury-bg/30' : 'text-luxury-muted hover:text-primary'
                  }`}
                >
                  CLEANING
                </button>
              </div>

              {/* Tab Content body */}
              <div className="p-6 text-xs text-luxury-muted font-manrope leading-relaxed">
                {activeTab === 'details' && (
                  <ul className="space-y-2 list-disc pl-4">
                    {product.details.map((detail, idx) => (
                      <li key={idx}>{detail}</li>
                    ))}
                  </ul>
                )}
                {activeTab === 'shipping' && (
                  <div className="space-y-4">
                    <p className="flex gap-2 items-center"><Truck className="w-4 h-4 text-accent" /> Complimentary express shipping on all orders above $300.</p>
                    <p className="flex gap-2 items-center"><RefreshCw className="w-4 h-4 text-accent" /> Returns and size swaps eligible inside a 30-day window.</p>
                  </div>
                )}
                {activeTab === 'care' && (
                  <p>Hand-wash cold using organic detergent or dry clean with professional solvents. Shape and dry flat in shaded areas. Do not bleach or tumble dry.</p>
                )}
              </div>

            </div>

          </div>
        </div>

        {/* Customer Reviews Section */}
        <section className="mt-28 border-t border-luxury-border/60 pt-16">
          <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-6">
            <div>
              <span className="text-[10px] font-bold tracking-widest text-accent uppercase">VERIFIED REVIEWS</span>
              <h2 className="font-syne text-2xl md:text-3xl font-black tracking-wider text-primary uppercase mt-1">CLIENT REVIEWS</h2>
            </div>
            <button className="px-6 py-3 border border-luxury-border rounded-xl text-xs font-syne font-bold tracking-widest hover:border-accent hover:text-accent transition-colors">
              WRITE A REVIEW
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {generalReviews.map((rev) => (
              <div
                key={rev.id}
                className="p-6 rounded-2xl bg-luxury-card/30 border border-luxury-border/80 space-y-4"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-luxury-border/60 shadow-premium flex-shrink-0">
                    <LuxuryImage
                      src={rev.avatar}
                      alt={rev.user}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-syne font-bold text-xs tracking-wider text-primary uppercase">{rev.user}</h4>
                    <span className="text-[9px] text-accent font-semibold tracking-wider">VERIFIED ACQUISITION</span>
                    </div>
                  </div>
                  <div className="flex text-accent gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-accent' : 'opacity-20'}`} />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-luxury-muted leading-relaxed italic">"{rev.comment}"</p>
                <span className="text-[9px] text-luxury-muted block font-manrope">{rev.date}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Recommended Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-28 border-t border-luxury-border/60 pt-16">
            <h2 className="font-syne text-2xl md:text-3xl font-black tracking-wider text-primary uppercase mb-12">
              RECOMMENDED COMPLEMENTS
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
};

export default ProductDetails;
