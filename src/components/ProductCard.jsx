

import React, { useContext } from 'react';

import { products } from '../assets/assets';
import { AppContext } from '../context/AppContext';

const ProductCard = () => {
  const { handleAddToCart } = useContext(AppContext);
 

  const handleClick = (product) => {
    handleAddToCart(product);
    
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 mt-5">
      <h2 className="text-2xl font-bold mb-6 text-center">Featured Products</h2>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map(product => (
          <div key={product._id} className="rounded-xl shadow-xl hover:shadow-2xl transition duration-300 p-4 flex flex-col ">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-48 object-contain mb-4 rounded"
            />
            <h3 className="text-lg font-semibold text-gray-800">{product.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{product.description}</p>

            <div className="mt-2 text-sm text-gray-800 font-medium">
              <span className="line-through text-gray-400 mr-2">₹{product.price}</span>
              <span className="text-green-600">₹{product.offerPrice}</span>
            </div>

            <div className="mt-1 text-sm text-yellow-500">
              ⭐ {product.rating} ({product.reviews} reviews)
            </div>

            <button
              onClick={() => handleClick(product)}
              className="mt-auto bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200 cursor-pointer active:scale-90"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCard;
