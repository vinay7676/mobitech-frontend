import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { FaTools, FaExchangeAlt, FaShieldAlt, FaBolt } from 'react-icons/fa';

const services = [
  {
    icon: <FaTools className="text-white text-2xl" />,
    title: 'Expert Repairs',
    desc: 'Professional repair services for all major brands with genuine parts and warranty.',
  },
  {
    icon: <FaExchangeAlt className="text-white text-2xl" />,
    title: 'Trade-In Program',
    desc: 'Get the best value for your old device when upgrading to a new smartphone.',
  },
  {
    icon: <FaShieldAlt className="text-white text-2xl" />,
    title: 'Extended Warranty',
    desc: 'Comprehensive protection plans to keep your device safe from unexpected damages.',
  },
  {
    icon: <FaBolt className="text-white text-2xl" />,
    title: 'Quick Setup',
    desc: 'Free device setup and data transfer service with every purchase.',
  },
];

const fadeVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay },
  }),
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.3,
      duration: 0.5,
      type: 'spring',
      stiffness: 100,
    },
  }),
};

const HeroSection = () => {
  const ref = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={fadeVariants}
      className="py-16 bg-white text-center"
    >
      <motion.h2
        custom={0.1}
        variants={fadeVariants}
        className="text-4xl font-bold text-gray-900"
      >
        Our Services
      </motion.h2>

      <motion.p
        custom={0.3}
        variants={fadeVariants}
        className="text-gray-600 mt-3 max-w-xl mx-auto"
      >
        Beyond just selling phones, we provide comprehensive services to keep you connected.
      </motion.p>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-6">
        {services.map((service, idx) => (
          <motion.div
            key={idx}
            custom={idx}
            initial="hidden"
            animate={controls}
            variants={cardVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-lg cursor-pointer"
          >
            <div className="bg-gradient-to-r from-blue-500 to-green-500 w-12 h-12 mx-auto rounded-md flex items-center justify-center mb-4">
              {service.icon}
            </div>
            <h3 className="text-lg font-bold text-gray-900">{service.title}</h3>
            <p className="text-sm text-gray-600 mt-2">{service.desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default HeroSection;
