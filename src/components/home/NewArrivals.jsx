import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, FreeMode } from 'swiper/modules';
import { products } from '../../data/mockData';
import ProductCard from '../common/ProductCard';

// Swiper Styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';

const NewArrivals = () => {
  const newProducts = products.filter(p => p.isNew);

  return (
    <section className="py-24 bg-luxury-bg border-b border-luxury-border/60">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="mb-16">
          <span className="text-xs font-syne font-extrabold tracking-widest text-accent uppercase block mb-2">
            02 // RECENT RELEASES
          </span>
          <h2 className="font-syne text-4xl md:text-5xl font-black tracking-wider text-white uppercase">
            NEW ARRIVALS
          </h2>
        </div>

        {/* Carousel Slider */}
        <div className="relative pb-10">
          <Swiper
            modules={[Pagination, FreeMode]}
            spaceBetween={30}
            slidesPerView={1}
            freeMode={true}
            pagination={{ 
              clickable: true,
              dynamicBullets: true 
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

      </div>
    </section>
  );
};

export default NewArrivals;
