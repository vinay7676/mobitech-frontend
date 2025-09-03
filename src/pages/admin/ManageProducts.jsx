import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";


const ManageProducts = () => {
  const { productList, updateProduct, deleteProduct, isAdmin } = useContext(AppContext);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editForm, setEditForm] = useState({});

  const handleEdit = (product) => {
    setEditingProduct(product._id);
    setEditForm(product);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedProduct = {
      ...editForm,
      price: Number(editForm.price),
      offerPrice: Number(editForm.offerPrice),
      rating: Number(editForm.rating),
      reviews: Number(editForm.reviews),
    };
    
    updateProduct(editingProduct, updatedProduct);
    setEditingProduct(null);
    setEditForm({});
  };

  const handleDelete = (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteProduct(productId);
    }
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h2>
          <p className="text-gray-600">Only admin users can manage products.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-8">Manage Products</h1>
      
      <div className="grid gap-6">
        {productList.map((product) => (
          <div key={product._id} className="bg-white p-6 rounded-lg shadow-md">
            {editingProduct === product._id ? (
              <form onSubmit={handleUpdate} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={editForm.title}
                    onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                    className="p-2 border rounded"
                    placeholder="Title"
                  />
                  <input
                    type="number"
                    value={editForm.price}
                    onChange={(e) => setEditForm({...editForm, price: e.target.value})}
                    className="p-2 border rounded"
                    placeholder="Price"
                  />
                </div>
                <textarea
                  value={editForm.description}
                  onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                  className="w-full p-2 border rounded"
                  placeholder="Description"
                  rows="2"
                />
                <div className="flex gap-2">
                  <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
                    Save
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setEditingProduct(null)}
                    className="bg-gray-500 text-white px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex justify-between items-start">
                <div className="flex gap-4">
                  <img 
                    src={product.image} 
                    alt={product.title}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-bold text-lg">{product.title}</h3>
                    <p className="text-gray-600">{product.description}</p>
                    <p className="text-green-600 font-semibold">₹{product.offerPrice}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageProducts;
