import React, { useEffect, useRef, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { products } from '../assets/assets';
import { AppContext } from '../context/AppContext';

const Search = () => {
  const location = useLocation();
  const { handleAddToCart } = useContext(AppContext);
  const query = new URLSearchParams(location.search).get('q')?.toLowerCase() || '';
  const productRefs = useRef({});

  const matchedProducts = products.filter((product) =>
    product.title.toLowerCase().includes(query)
  );

  useEffect(() => {
    if (query && productRefs.current[query]) {
      const el = productRefs.current[query];
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.focus();
    }
  }, [query]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 mt-5">
      <h1 className="text-2xl font-bold mb-6 text-center">Search Results for "{query}"</h1>

      {query && matchedProducts.length === 0 && (
        <p className="text-center text-red-500 text-lg mb-4">No product found</p>
      )}

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => {
          const titleLower = product.title.toLowerCase();
          const isMatch = titleLower.includes(query);

          return (
            <div
              key={product._id}
              ref={(el) => {
                if (isMatch) productRefs.current[query] = el;
              }}
              tabIndex={-1}
              className={`rounded-xl shadow hover:shadow-lg transition duration-300 p-4 flex flex-col bg-gray-100 ${
                isMatch ? 'ring-2 ring-blue-400' : ''
              }`}
            >
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
                onClick={() => handleAddToCart(product)}
                className="mt-auto bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200 cursor-pointer"
              >
                Add to Cart
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Search;
