import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { FaTimes, FaPlus, FaMinus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Cart = () => {
  const { cartItems, setCartItems, user } = useContext(AppContext);
  const [paymentOption, setPaymentOption] = useState("Cash On Delivery");
  const navigate = useNavigate();

  const handleRemove = (id) => {
    const updated = cartItems.filter((item) => item._id !== id);
    setCartItems(updated);
  };

 
  const updateQuantity = (id, change) => {
    const updated = cartItems.map((item) => {
      if (item._id === id) {
        const newQuantity = item.quantity + change;
        // Prevent quantity from going below 1
        if (newQuantity < 1) {
          return item;
        }
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCartItems(updated);
  };

  // ✅ NEW: Increase quantity
  const increaseQuantity = (id) => {
    updateQuantity(id, 1);
  };

  // ✅ NEW: Decrease quantity
  const decreaseQuantity = (id) => {
    updateQuantity(id, -1);
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.offerPrice * item.quantity, 0);
  };

  const tax = Math.round(calculateSubtotal() * 0.02);
  const shipping = 0;
  const totalAmount = calculateSubtotal() + tax + shipping;

  const handlePlaceOrder = async () => {
    if (!cartItems.length) {
      toast.error("Cart is empty");
      return;
    }

    if (!user?.email) {
      toast.error("Please login to place an order");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/orders/place", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userEmail: user.email,
          userName: user.name,
          paymentMethod: paymentOption,
          items: cartItems.map((item) => ({
            title: item.title,
            image: item.image,
            quantity: item.quantity,
            offerPrice: item.offerPrice,
            orderedAt: new Date(),
          })),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      toast.success("Order placed!");
      setCartItems([]);
      navigate("/");
    } catch (err) {
      toast.error(err.message || "Failed to place order");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-10 flex flex-col md:flex-row justify-between gap-8">
      {/* Left: Cart Items */}
      <div className="flex-1">
        <h2 className="text-2xl font-bold mb-4">
          Shopping Cart <span className="text-purple-600">({cartItems.length} Items)</span>
        </h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between bg-white p-4 mb-4 rounded-lg shadow-sm"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-20 object-cover rounded"
                />




                <div>
  <h3 className="font-semibold">{item.title}</h3>

  {/* ✅ Enhanced Quantity Controls */}
  <div className="flex items-center gap-2 mt-3">
    <span className="text-sm text-gray-600">Qty:</span>
    <div className="flex items-center bg-gray-50 border border-gray-200 rounded-full shadow-sm overflow-hidden">
      {/* Decrease Button */}
      <button
        onClick={() => decreaseQuantity(item._id)}
        disabled={item.quantity <= 1}
        className={`px-3 py-2 transition-all flex items-center justify-center 
          ${item.quantity <= 1 
            ? "text-gray-300 cursor-not-allowed" 
            : "hover:bg-red-100 text-gray-600 hover:text-red-500"
          }`}
      >
        <FaMinus className="text-sm" />
      </button>

      {/* Quantity Display */}
      <span className="px-5 py-1 text-gray-800 font-semibold text-sm bg-white">
        {item.quantity}
      </span>

      {/* Increase Button */}
      <button
        onClick={() => increaseQuantity(item._id)}
        className="px-3 py-2 text-gray-600 hover:bg-green-100 hover:text-green-600 transition-all flex items-center justify-center"
      >
        <FaPlus className="text-sm" />
      </button>
    </div>
  </div>

  <p className="text-sm text-gray-500 mt-2">
    Added on:{" "}
    {new Date(item.addedAt || Date.now()).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    })}
  </p>
</div>

             
             
             
             
              </div>
              <div className="flex flex-col items-end gap-2">
                {/* ✅ UPDATED: Show individual and total price */}
                <div className="text-right">
                  <div className="text-sm text-gray-500">₹{item.offerPrice} each</div>
                  <div className="text-lg font-bold">₹{item.offerPrice * item.quantity}</div>
                </div>
                <button
                  onClick={() => handleRemove(item._id)}
                  className="text-red-600 hover:text-red-800 transition-colors cursor-pointer"
                >
                  <FaTimes />
                </button>
              </div>
            </div>
          ))
        )}
        <button
          onClick={() => navigate("/shop")}
          className="text-purple-600 mt-4 inline-block cursor-pointer hover:text-purple-800 transition-colors"
        >
          ← Continue Shopping
        </button>
      </div>

      {/* Right: Order Summary */}
      <div className="w-full md:w-[400px] bg-white shadow-md rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
        <div className="mb-4">
          <p className="text-sm font-bold">DELIVERY ADDRESS</p>
          <p className="text-gray-500">
            No address found{" "}
            <span className="text-blue-500 cursor-pointer">Change</span>
          </p>
        </div>
        <div className="mb-4">
          <p className="text-sm font-bold mb-1">PAYMENT METHOD</p>
          <select
            value={paymentOption}
            onChange={(e) => setPaymentOption(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="Cash On Delivery">Cash On Delivery</option>
            <option value="UPI">UPI</option>
            <option value="Credit Card">Credit Card</option>
          </select>
        </div>
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex justify-between">
            <span>Price</span>
            <span>₹{calculateSubtotal()}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping Fee</span>
            <span className="text-green-600">Free</span>
          </div>
          <div className="flex justify-between">
            <span>Tax (2%)</span>
            <span>₹{tax}</span>
          </div>
        </div>
        <div className="flex justify-between mt-4 font-bold text-lg">
          <span>Total Amount:</span>
          <span>₹{totalAmount}</span>
        </div>
        <button
          onClick={handlePlaceOrder}
          disabled={!cartItems.length}
          className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white py-3 rounded-xl transition active:scale-95 cursor-pointer"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Cart;
