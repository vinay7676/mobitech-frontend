import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Account = () => {
  const { orders, user } = useContext(AppContext); 

  return (
    <div className="min-h-screen p-6 md:p-10 bg-gray-50">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      {orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-white shadow-md p-4 rounded-xl"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  <p className="text-sm text-gray-500">
                    Ordered on:{" "}
                    {new Date(item.orderedAt).toLocaleString(undefined, {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>
                  <p className="text-sm text-gray-600 italic">
                    ordered by: {user?.name || "Unknown"}
                  </p>
                  <p className="text-sm text-gray-600">
                    Payment Method: {item.paymentMethod || "Cash On Delivery"}
                  </p>
                </div>
              </div>
              <div className="text-lg font-bold text-indigo-600">
                ₹{item.offerPrice}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Account;