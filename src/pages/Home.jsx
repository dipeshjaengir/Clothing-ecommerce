import React from 'react';
import Hero from '../components/home/Hero';
import FeaturedCollection from '../components/home/FeaturedCollection';
import NewArrivals from '../components/home/NewArrivals';
import Trending from '../components/home/Trending';
import Categories from '../components/home/Categories';
import Lookbook from '../components/home/Lookbook';
import WhyChooseUs from '../components/home/WhyChooseUs';
import Reviews from '../components/home/Reviews';
import Instagram from '../components/home/Instagram';
import Newsletter from '../components/home/Newsletter';

const Home = () => {
  return (
    <>
      <Hero />
      <FeaturedCollection />
      <NewArrivals />
      <Trending />
      <Categories />
      <Lookbook />
      <WhyChooseUs />
      <Reviews />
      <Instagram />
      <Newsletter />
    </>
  );
};

export default Home;
