// src/components/Logo.jsx
import React from 'react';
import { FaBolt, FaMobileAlt } from 'react-icons/fa';

const Logo = () => {
  return (
    <div className="flex items-center gap-3">
      {/* Icon Box */}
      <div className="relative">
        {/* Purple Rounded Icon */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-3">
          <FaMobileAlt className="text-white text-2xl" />
        </div>

        {/* Notification Badge */}
        <div className="absolute -top-1 -right-1 bg-orange-500 rounded-full w-5 h-5 flex items-center justify-center border-2 border-white">
          <FaBolt className="text-white text-xs" />
        </div>
      </div>

      {/* Text */}
      <div className="leading-tight">
        <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          MobiTech
        </h1>
        <p className="text-sm text-gray-500">Your Mobile Universe</p>
      </div>
    </div>
  );
};

export default Logo;
