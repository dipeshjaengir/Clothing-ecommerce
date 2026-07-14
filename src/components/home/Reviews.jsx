import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { Star } from 'lucide-react';
import { reviews } from '../../data/mockData';

// Swiper Styles
import 'swiper/css';
import 'swiper/css/pagination';

const Reviews = () => {
  return (
    <section className="py-32 bg-luxury-bg border-b border-luxury-border/60">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Asymmetric Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 items-center">
          
          {/* Column 1: Editorial Section Header */}
          <div className="text-left space-y-4 lg:pr-8">
            <span className="text-[10px] font-syne font-extrabold tracking-[0.3em] text-accent uppercase block mb-3">
              06 // CLIENT COMMENDATIONS
            </span>
            <h2 className="font-syne text-4xl md:text-5xl font-black tracking-wider text-secondary uppercase leading-none">
              CLIENT AUDITS
            </h2>
            <div className="h-[2px] bg-accent/25 w-16 mt-4" />
            <p className="text-xs text-luxury-muted font-light leading-relaxed font-manrope pt-4">
              Real testimonials from verified global curators. Discover why LUXORA is the premier choice for minimal structured apparel.
            </p>
          </div>

          {/* Columns 2-3: Testimonial Carousel */}
          <div className="lg:col-span-2 p-8 md:p-12 rounded-[2rem] bg-luxury-card/30 border border-luxury-border/80 relative shadow-premium overflow-hidden">
            {/* Giant background quote icon mark */}
            <div className="absolute -top-6 -right-6 text-[12rem] font-syne font-black text-white/[0.02] leading-none select-none">
              “
            </div>

            <Swiper
              modules={[Pagination, Autoplay]}
              spaceBetween={40}
              slidesPerView={1}
              loop={true}
              autoplay={{
                delay: 6000,
                disableOnInteraction: false,
              }}
              pagination={{ 
                clickable: true,
                dynamicBullets: true,
                el: '.swiper-pagination-reviews-container'
              }}
              className="testimonial-swiper"
            >
              {reviews.map((rev) => (
                <SwiperSlide key={rev.id}>
                  <div className="flex flex-col gap-6">
                    {/* Stars */}
                    <div className="flex text-accent gap-1">
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-accent text-accent" />
                      ))}
                    </div>

                    {/* Review text */}
                    <p className="font-syne text-base md:text-xl font-medium tracking-wide text-secondary leading-relaxed italic pr-6 select-text">
                      "{rev.comment}"
                    </p>

                    {/* Author Meta */}
                    <div className="flex items-center gap-3.5 border-t border-luxury-border/60 pt-5 mt-2">
                      <img
                        src={rev.avatar}
                        alt={rev.user}
                        className="w-11 h-11 rounded-full object-cover border border-luxury-border/60 shadow-premium"
                        loading="lazy"
                      />
                      <div>
                        <span className="block font-syne font-bold text-xs tracking-widest text-secondary uppercase">
                          {rev.user}
                        </span>
                        <span className="block text-[8px] text-accent font-extrabold tracking-wider mt-0.5">
                          VERIFIED ACQUISITION // {rev.productName.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Pagination Bullet Container */}
            <div className="swiper-pagination-reviews-container flex justify-start mt-8" />
          </div>

        </div>

      </div>
    </section>
  );
};

export default Reviews;
