import React, { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-hot-toast";

const AddItem = () => {
  const { addNewProduct } = useContext(AppContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    offerPrice: "",
    rating: "",
    reviews: "",
    description: "",
  });

  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Basic validation
    if (Number(formData.price) <= 0 || Number(formData.offerPrice) <= 0) {
      toast.error("Prices must be greater than 0");
      setIsSubmitting(false);
      return;
    }

    if (Number(formData.rating) < 0 || Number(formData.rating) > 5) {
      toast.error("Rating must be between 0 and 5");
      setIsSubmitting(false);
      return;
    }

    if (Number(formData.reviews) < 0) {
      toast.error("Reviews cannot be negative");
      setIsSubmitting(false);
      return;
    }

    if (!imageFile) {
      toast.error("Please select an image");
      setIsSubmitting(false);
      return;
    }

    // Create FormData for file upload
    const submitData = new FormData();
    submitData.append('title', formData.title);
    submitData.append('price', Number(formData.price));
    submitData.append('offerPrice', Number(formData.offerPrice));
    submitData.append('rating', Number(formData.rating));
    submitData.append('reviews', Number(formData.reviews));
    submitData.append('description', formData.description);
    submitData.append('image', imageFile);

    const success = await addNewProduct(submitData);

    if (success) {
      setFormData({
        title: "",
        price: "",
        offerPrice: "",
        rating: "",
        reviews: "",
        description: "",
      });
      setImageFile(null);
      setImagePreview(null);
    }

    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100 flex justify-center items-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-4">
        <h2 className="text-xl font-semibold text-center">Add New Product</h2>

        {Object.keys(formData).map((field) => 
          field === "description" ? (
            <textarea
              key={field}
              name={field}
              placeholder="Product description"
              value={formData[field]}
              onChange={handleChange}
              className="w-full p-2 border rounded resize-none h-20"
              required
            />
          ) : (
            <input
              key={field}
              type={field === "price" || field === "offerPrice" || field === "rating" || field === "reviews" ? "number" : "text"}
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={formData[field]}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              step={field === "rating" ? "0.1" : field === "price" || field === "offerPrice" ? "1" : undefined}
              min={field === "rating" ? "0" : field === "price" || field === "offerPrice" || field === "reviews" ? "0" : undefined}
              max={field === "rating" ? "5" : undefined}
              required
            />
          )
        )}

        {/* Image Upload */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Product Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border rounded"
            required
          />
          {imagePreview && (
            <div className="mt-2">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-32 object-cover rounded border"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Adding Product..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddItem;