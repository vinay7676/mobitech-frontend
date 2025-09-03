// src/components/WhyChoose.jsx
import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { FaAward, FaUsers, FaCheckCircle } from 'react-icons/fa';

const reasons = [
  {
    icon: <FaAward className="text-white text-2xl  " />,
    title: 'Authorized Dealer',
    desc: 'Official retailer for all major brands',
    bg: 'from-blue-500 to-indigo-500',
  },
  {
    icon: <FaUsers className="text-white text-2xl" />,
    title: 'Expert Staff',
    desc: 'Knowledgeable team to help you choose',
    bg: 'from-purple-500 to-pink-500',
  },
  {
    icon: <FaCheckCircle className="text-white text-2xl" />,
    title: 'Quality Guarantee',
    desc: '100% authentic products with warranty',
    bg: 'from-green-400 to-green-600',
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
      delay: i * 0.7,
      duration: 0.5,
      type: 'spring',
      stiffness: 100,
    },
  }),
};

const WhyChoose = () => {
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
      className="py-16 px-4 text-black text-center "
    >
      <motion.h2
        custom={0.1}
        variants={fadeVariants}
        className="text-4xl font-bold mb-4 "
      >
        Why Choose MobiTech?
      </motion.h2>

      <motion.p
        custom={0.7}
        variants={fadeVariants}
        className="text-lg max-w-xl mx-auto mb-12"
      >
        We're more than just a mobile shop - we're your technology partners.
      </motion.p>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto ">
        {reasons.map((reason, idx) => (
          <motion.div
            key={idx}
            custom={idx}
            initial="hidden"
            animate={controls}
            variants={cardVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white text-gray-800 p-6 rounded-xl shadow hover:shadow-lg cursor-pointer"
          >
            <div
              className={`bg-gradient-to-r ${reason.bg} w-12 h-12 mx-auto rounded-md flex items-center justify-center mb-4`}
            >
              {reason.icon}
            </div>
            <h3 className="text-lg font-bold">{reason.title}</h3>
            <p className="text-sm mt-2">{reason.desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default WhyChoose;




/*hello from backend */
