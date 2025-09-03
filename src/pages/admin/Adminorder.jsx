import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";

const AdminOrders = () => {
  const { orders, user, isAdmin } = useContext(AppContext);

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen p-6 md:p-10 bg-gray-50 flex items-center justify-center">
        <p className="text-xl text-gray-700">Access denied. Admins only.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 md:p-10 bg-gray-50">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">All Orders</h1>
      {orders.length === 0 ? (
        <p className="text-center text-gray-600">No orders have been placed yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((item, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row justify-between items-center bg-white shadow-lg p-6 rounded-xl"
            >
              <div className="flex items-center gap-4 mb-4 md:mb-0">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-24 h-24 object-cover rounded-md"
                />
                <div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  <p className="text-sm text-gray-500">
                    Ordered At:{" "}
                    {item.orderedAt
                      ? new Date(item.orderedAt).toLocaleString(undefined, {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })
                      : "N/A"}
                  </p>
                  <p className="text-sm text-gray-500">
                    Ordered by: <span className="font-medium">{item.userName || item.userEmail || "Unknown"}</span>
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-indigo-600 font-bold text-lg">₹{item.offerPrice}</p>
                <p className="text-xs text-gray-500 mt-1">Order #{index + 1}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;