import React from 'react';
import Hero from '../components/home/Hero';
import NewArrivals from '../components/home/NewArrivals';
import EditorialBanner from '../components/home/EditorialBanner';
import FeaturedCollection from '../components/home/FeaturedCollection';
import Lookbook from '../components/home/Lookbook';
import Trending from '../components/home/Trending';
import WhyChooseUs from '../components/home/WhyChooseUs';
import Instagram from '../components/home/Instagram';
import Newsletter from '../components/home/Newsletter';

const Home = () => {
  return (
    <>
      <Hero />
      <NewArrivals />
      <EditorialBanner />
      <FeaturedCollection />
      <Lookbook />
      <Trending />
      <WhyChooseUs />
      <Instagram />
      <Newsletter />
    </>
  );
};

export default Home;
