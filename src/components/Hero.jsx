import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useAnimation, useInView } from "framer-motion";

const fadeVariants = {
  hidden: { opacity: 0, y: 20 }, // Reduced y value for mobile
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.5, // Faster duration for mobile
      delay,
      ease: "easeOut" // Smoother easing for mobile
    }
  })
};

const Hero = () => {
  const ref = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(ref, { 
    once: false, 
    amount: 0.2, // Less visible area needed to trigger on mobile
    margin: "0px 0px -50px 0px" // Adjust trigger point
  });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [isInView, controls]);

  const handleShopLink = (e, brand) => {
    e.preventDefault();
    const shopLinks = {
      google: "https://store.google.com",
      samsung: "https://shop-links.co/link-to-samsung",
      oneplus: "https://www.oneplus.com",
      apple: "https://www.apple.com",
      realme: "https://www.realme.com"
    };
    window.open(shopLinks[brand.toLowerCase()], "_blank");
  };

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={fadeVariants}
      className="mt-1 bg-gradient-to-br from-purple-500 via-indigo-500 to-indigo-800 text-white py-10 md:py-20 px-4 sm:px-6 lg:px-40 text-center relative overflow-hidden"
    >
      {/* Optimized animated background for mobile */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 overflow-hidden">
        <div className="absolute top-20 left-10 w-16 h-16 md:w-40 md:h-40 bg-pink-500 rounded-full mix-blend-screen filter blur-xl md:blur-3xl animate-float-1"></div>
        <div className="absolute bottom-10 right-10 w-20 h-20 md:w-60 md:h-60 bg-blue-500 rounded-full mix-blend-screen filter blur-xl md:blur-3xl animate-float-2"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Responsive heading */}
        <motion.h1
          custom={0.1}
          variants={fadeVariants}
          className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-snug md:leading-tight mb-3 md:mb-6 px-2"
        >
          <span className="inline-block">Launch Your Mobile App</span>
          <br className="hidden sm:block" />
          <span className="inline-block bg-gradient-to-r from-pink-400 to-pink-600 bg-clip-text text-transparent">
            with Powerful Features
          </span>
        </motion.h1>

        {/* Responsive subheading */}
        <motion.p
          custom={0.2} // Reduced delay for mobile
          variants={fadeVariants}
          className="text-sm sm:text-base md:text-lg text-gray-300 mb-6 md:mb-10 max-w-2xl mx-auto"
        >
          Experience seamless performance, elegant design, and smart tools that boost your mobile presence.
        </motion.p>

        {/* Stacked buttons on mobile */}
        <motion.div
          custom={0.3} // Reduced delay for mobile
          variants={fadeVariants}
          className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-6 mb-8 md:mb-16"
        >
          <Link
            to="/shop"
            className="relative group bg-blue-600 hover:bg-gradient-to-r from-pink-500 to-pink-600 text-white px-5 py-2 sm:px-8 sm:py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-pink-500/30 text-sm sm:text-base"
          >
            <span className="relative z-10">Get Started</span>
            <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full group-hover:opacity-0 transition-opacity duration-300"></span>
          </Link>
          <button
            onClick={(e) => handleShopLink(e, "google")}
            className="relative group bg-white/10 hover:bg-gradient-to-r from-pink-500/10 to-pink-600/20 text-white px-5 py-2 sm:px-8 sm:py-3 rounded-full font-semibold transition-all duration-300 border border-white/20 hover:border-pink-400/30 text-sm sm:text-base"
          >
            <span className="relative z-10">Learn More</span>
            <span className="absolute inset-0 rounded-full group-hover:bg-pink-500/10 transition-all duration-300"></span>
          </button>
        </motion.div>

        {/* Responsive trusted brands */}
        <motion.div
          custom={0.4} // Reduced delay for mobile
          variants={fadeVariants}
          className="mt-8 md:mt-20"
        >
          <p className="text-gray-400 mb-3 md:mb-6 text-xs sm:text-sm uppercase tracking-wider">
            Trusted by users from
          </p>
          <div className="flex justify-center items-center gap-3 sm:gap-6 md:gap-8 flex-wrap">
            {["Google", "Samsung", "OnePlus", "Apple", "Realme"].map((brand) => (
              <button
                key={brand}
                onClick={(e) => handleShopLink(e, brand)}
                className="text-white opacity-80 hover:opacity-100 hover:text-pink-300 transition-all duration-300 group text-xs sm:text-sm md:text-base"
              >
                <span className="font-medium">{brand}</span>
                <span className="block h-px sm:h-0.5 bg-transparent group-hover:bg-pink-400 w-full transition-all duration-300"></span>
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Add mobile-specific styles */}
      <style jsx>{`
        @media (max-width: 640px) {
          .animate-float-1 {
            animation: float-mobile 15s ease-in-out infinite;
          }
          .animate-float-2 {
            animation: float-mobile 20s ease-in-out infinite reverse;
          }
          @keyframes float-mobile {
            0%, 100% { transform: translate(0, 0); }
            50% { transform: translate(10px, 10px); }
          }
        }
        @media (min-width: 641px) {
          .animate-float-1 {
            animation: float 25s ease-in-out infinite;
          }
          .animate-float-2 {
            animation: float 30s ease-in-out infinite reverse;
          }
          @keyframes float {
            0%, 100% { transform: translate(0, 0); }
            50% { transform: translate(20px, 20px); }
          }
        }
      `}</style>
    </motion.section>
  );
};

export default Hero;