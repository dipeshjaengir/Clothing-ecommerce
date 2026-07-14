import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, FreeMode, Navigation } from 'swiper/modules';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { products } from '../../data/mockData';
import ProductCard from '../common/ProductCard';

// Swiper Styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';

const NewArrivals = () => {
  const newProducts = products.filter(p => p.isNew);

  return (
    <section className="py-32 bg-luxury-bg border-b border-luxury-border/60">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-16">
          <div>
            <span className="text-[10px] font-syne font-extrabold tracking-[0.3em] text-accent uppercase block mb-3">
              02 // RECENT RELEASES
            </span>
            <h2 className="font-syne text-4xl md:text-5xl font-black tracking-wider text-primary uppercase leading-none">
              NEW ARRIVALS
            </h2>
          </div>
          
          {/* Custom Navigation Controls */}
          <div className="flex gap-2">
            <button 
              className="swiper-prev-custom p-3.5 rounded-full border border-luxury-border hover:border-accent text-primary hover:text-accent transition-colors duration-300 shadow-premium focus:outline-none bg-luxury-card"
              aria-label="Previous slide"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button 
              className="swiper-next-custom p-3.5 rounded-full border border-luxury-border hover:border-accent text-primary hover:text-accent transition-colors duration-300 shadow-premium focus:outline-none bg-luxury-card"
              aria-label="Next slide"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Carousel Slider */}
        <div className="relative">
          <Swiper
            modules={[Pagination, FreeMode, Navigation]}
            spaceBetween={30}
            slidesPerView={1}
            freeMode={true}
            navigation={{
              prevEl: '.swiper-prev-custom',
              nextEl: '.swiper-next-custom',
            }}
            pagination={{ 
              clickable: true,
              dynamicBullets: true,
              el: '.swiper-pagination-custom-container'
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
              1280: {
                slidesPerView: 4,
              }
            }}
            className="mySwiper"
          >
            {newProducts.map((product) => (
              <SwiperSlide key={product.id} className="py-2">
                <ProductCard product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Custom Pagination Bullet Container */}
        <div className="swiper-pagination-custom-container flex justify-center mt-10" />

      </div>
    </section>
  );
};

export default NewArrivals;
