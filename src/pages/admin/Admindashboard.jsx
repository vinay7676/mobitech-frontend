import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleOrders = () => {
    navigate("/admin-orders");
  };

  const handleAddItems = () => {
    navigate("/admin-add-item");
  };

  const handleLogout = () => {
    // Optional: Clear any admin login state here
    // e.g., localStorage.removeItem("adminToken"); or context update
    navigate("/");
      toast.success("Admin Logged out ");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-10">Admin Dashboard</h1>

      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <button
          onClick={handleOrders}
          className="  cursor-pointer px-6 py-3 bg-blue-600 text-white rounded-xl text-lg hover:bg-blue-700 transition duration-300"
        >
          View Orders
        </button>

        <button
          onClick={handleAddItems}
          className=" cursor-pointer px-6 py-3 bg-green-600 text-white rounded-xl text-lg hover:bg-green-700 transition duration-300"
        >
          Add Items
        </button>
      </div>

      <button
        onClick={handleLogout}
        className=" cursor-pointer px-6 py-3 bg-red-600 text-white rounded-xl text-lg hover:bg-red-700 transition duration-300"
      >
        Logout
      </button>
    </div>
  );
};

export default AdminDashboard;
