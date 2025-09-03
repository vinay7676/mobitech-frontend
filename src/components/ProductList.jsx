import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const ProductList = () => {
  const { productList, loading } = useContext(AppContext);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (productList.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No products available</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
      {productList.map((product) => (
        <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
          <img 
            src={`http://localhost:5000${product.image}`} 
            alt={product.title}
            className="w-full h-48 object-cover"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/300x200?text=No+Image";
            }}
          />
          <div className="p-4">
            <h3 className="font-semibold text-lg mb-2 truncate">{product.title}</h3>
            <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
            <div className="flex items-center mb-2">
              <span className="text-yellow-500">★</span>
              <span className="ml-1 text-sm">{product.rating} ({product.reviews} reviews)</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-lg font-bold text-green-600">₹{product.offerPrice}</span>
                <span className="text-sm text-gray-500 line-through ml-2">₹{product.price}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;