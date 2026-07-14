import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { Star, Quote } from 'lucide-react';
import { reviews } from '../../data/mockData';

// Swiper Styles
import 'swiper/css';
import 'swiper/css/pagination';

const Reviews = () => {
  return (
    <section className="py-24 bg-luxury-bg border-b border-luxury-border/60">
      <div className="max-w-4xl mx-auto px-6 text-center">
        
        {/* Section Header */}
        <div className="mb-12">
          <span className="text-xs font-syne font-extrabold tracking-widest text-accent uppercase block mb-2">
            06 // VOICES OF DISCRETION
          </span>
          <h2 className="font-syne text-3xl md:text-4xl font-black tracking-wider text-white uppercase">
            CLIENT TESTIMONIALS
          </h2>
          <div className="h-[2px] bg-accent/20 w-16 mx-auto mt-4" />
        </div>

        {/* Testimonial Swiper Slider */}
        <div className="relative pt-6 px-4 md:px-12">
          <Quote className="w-12 h-12 text-accent/15 mx-auto mb-6 rotate-180" />
          
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={50}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            className="testimonial-swiper"
          >
            {reviews.map((rev) => (
              <SwiperSlide key={rev.id} className="pb-12">
                <div className="flex flex-col items-center gap-6">
                  {/* Rating Stars */}
                  <div className="flex text-accent gap-1">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-accent" />
                    ))}
                  </div>

                  {/* Comment */}
                  <p className="font-syne text-lg md:text-2xl font-medium tracking-wide text-white leading-relaxed max-w-3xl italic">
                    "{rev.comment}"
                  </p>

                  {/* Author Meta */}
                  <div className="flex items-center gap-3 mt-4">
                    <img
                      src={rev.avatar}
                      alt={rev.user}
                      className="w-12 h-12 rounded-full object-cover border border-luxury-border shadow-premium"
                    />
                    <div className="text-left">
                      <span className="block font-syne font-bold text-xs tracking-widest text-white uppercase">
                        {rev.user}
                      </span>
                      <span className="block text-[10px] text-accent font-semibold tracking-wider">
                        VERIFIED ACQUISITION
                      </span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>
    </section>
  );
};

export default Reviews;
