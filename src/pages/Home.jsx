import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../assets/assets';
import Hero from '../components/Hero';
import Newsletter from '../components/Newsletter';
import HeroSection from '../components/HeroSection';
import WhyChoose from '../components/WhyChoose';
import Logo from '../components/Logo';

const Home = () => {
  const [stopScroll, setStopScroll] = useState(false);

  return (
    <>
      <Hero />
      
       


      <style>{`
        .marquee-inner {
          animation: marqueeScroll linear infinite;
        }

        @keyframes marqueeScroll {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>

      <div
      
        className="overflow-hidden w-full relative max-w-6xl mx-auto bg-gray-100 py-12 mt-16" 
        onMouseEnter={() => setStopScroll(true)}
        onMouseLeave={() => setStopScroll(false)}
      >
        <h1 className="text-2xl font-bold text-center py-6">Trending Items</h1>

        {/* Left Gradient */}
        <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-gray-100 to-transparent" />

        {/* Scrolling Cards */}
        <div
          className="marquee-inner flex w-fit"
          style={{
            animationPlayState: stopScroll ? 'paused' : 'running',
            animationDuration: products.length * 2500 + 'ms',
          }}
        >
          <div className="flex">
            {[...products, ...products].map((product, index) => (
              <div
                key={index}
                className="w-56 mx-4 h-[24rem] bg-white shadow-md rounded-xl flex flex-col overflow-hidden"
              >
                <div className="w-full h-40 flex items-center justify-center p-2">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-full object-contain"
                  />
                </div>
                <div className="p-3 flex-1 flex flex-col justify-between">
                  <h3 className="text-lg font-semibold text-gray-800">{product.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{product.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Gradient */}
        <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-gray-100 to-transparent" />
      </div>

      {/* Shop Now Button */}
      <div className="flex justify-center mt-6 mb-12">
        <Link
  to="/shop"
  className="relative px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-full 
  hover:from-blue-700 hover:to-blue-600 transition-all duration-500 
  hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-1 active:scale-70"
>
  Shop Now
</Link>
      </div>
<HeroSection />
     
      <WhyChoose/>
     
    </>
  );
};

export default Home;
