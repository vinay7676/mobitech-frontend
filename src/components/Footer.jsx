import React from 'react';
import { motion } from 'framer-motion';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import logo from '../assets/logo.png';

const Footer = () => {
  const socialIconClass = 'w-6 h-6 text-gray-600 hover:text-blue-600 transition-colors duration-300';
  const linkClass = 'hover:text-blue-600 transition-colors duration-300 cursor-pointer';

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const socialIconVariants = {
    hover: {
      y: -5,
      scale: 1.2,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.9
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0px 5px 15px rgba(37, 99, 235, 0.3)"
    },
    tap: {
      scale: 0.98
    }
  };

  const inputVariants = {
    focus: {
      borderColor: "#3b82f6",
      boxShadow: "0px 0px 0px 3px rgba(59, 130, 246, 0.2)"
    }
  };

  return (
    <motion.footer 
      className='bg-gray-100 text-gray-700 pt-12 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 mt-20'
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6'>
        {/* Logo & Description */}
        <motion.div 
          className='sm:col-span-2 lg:col-span-1 max-w-80'
          variants={itemVariants}
        >
          <motion.img 
            src={logo} 
            alt="Logo" 
            className='mb-4 h-16 w-16 sm:h-20 sm:w-20 rounded-full'
            whileHover={{ rotate: 5, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
          <p className='text-sm'>
            Discover the best mobile gadgets & accessories. Quality you can trust, prices you'll love.
          </p>

          {/* Social Icons */}
          <div className='flex items-center gap-4 mt-4'>
            <motion.a 
              href="#" 
              aria-label="Instagram"
              variants={socialIconVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <FaInstagram className={socialIconClass} />
            </motion.a>
            <motion.a 
              href="#" 
              aria-label="Twitter"
              variants={socialIconVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <FaTwitter className={socialIconClass} />
            </motion.a>
            <motion.a 
              href="#" 
              aria-label="LinkedIn"
              variants={socialIconVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <FaLinkedin className={socialIconClass} />
            </motion.a>
            <motion.a 
              href="#" 
              aria-label="Facebook"
              variants={socialIconVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <FaFacebookF className={socialIconClass} />
            </motion.a>
          </div>
        </motion.div>

        {/* Company Links */}
        <motion.div variants={itemVariants}>
          <p className='text-lg font-medium text-gray-800'>COMPANY</p>
          <ul className='mt-3 flex flex-col gap-2 text-sm'>
            {["About", "Careers", "Blog", "Press"].map((item, index) => (
              <motion.li 
                key={index}
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <a className={linkClass} href="#">{item}</a>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Support Links */}
        <motion.div variants={itemVariants}>
          <p className='text-lg font-medium text-gray-800'>SUPPORT</p>
          <ul className='mt-3 flex flex-col gap-2 text-sm'>
            {["Help Center", "Contact Us", "Shipping", "Returns"].map((item, index) => (
              <motion.li 
                key={index}
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <a className={linkClass} href="#">{item}</a>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Newsletter Section */}
        <motion.div 
          className='sm:col-span-2 lg:col-span-1 max-w-80'
          variants={itemVariants}
        >
          <p className='text-lg font-medium text-gray-800'>NEWSLETTER</p>
          <p className='mt-3 text-sm'>
            Subscribe to our newsletter for updates and exclusive deals.
          </p>
          <motion.div 
            className='flex items-center mt-4'
            whileHover={{ scale: 1.01 }}
          >
            <motion.input
              type="email"
              placeholder="Your email"
              className='flex-grow bg-white rounded-l border border-gray-300 h-10 px-3 text-sm outline-none min-w-0'
              whileFocus="focus"
              variants={inputVariants}
              transition={{ duration: 0.2 }}
            />
            <motion.button 
              className='flex-shrink-0 flex items-center justify-center bg-blue-600 h-10 px-4 text-white text-sm rounded-r hover:bg-blue-700 transition duration-300'
              aria-label="Subscribe"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Subscribe
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <motion.hr 
        className='border-gray-300 mt-10'
        initial={{ width: 0 }}
        whileInView={{ width: "100%" }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      />
      <motion.div 
        className='flex flex-col md:flex-row gap-4 items-center justify-between py-5 text-sm text-gray-500'
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.p variants={itemVariants}>
          © {new Date().getFullYear()} YourCompany. All rights reserved.
        </motion.p>
        <motion.ul 
          className='flex flex-wrap items-center justify-center gap-4'
          variants={containerVariants}
        >
          {["Privacy", "Terms", "Sitemap"].map((item, index) => (
            <motion.li 
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a className={linkClass} href="#">{item}</a>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;