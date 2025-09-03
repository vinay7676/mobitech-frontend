import React, { createContext, useState, useEffect } from "react";
import { products } from "../assets/assets";
import { toast } from "react-hot-toast";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [productList, setProductList] = useState(products);
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [user, setUser ] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Load user from sessionStorage
  useEffect(() => {
    const storedUser  = sessionStorage.getItem("user");
    if (storedUser ) {
      const parsedUser  = JSON.parse(storedUser );
      setUser (parsedUser );
      setIsAdmin(parsedUser ?.email === "admin@admin.com");
    }
  }, []);

  // Save user to sessionStorage
  useEffect(() => {
    if (user) {
      sessionStorage.setItem("user", JSON.stringify(user));
    } else {
      sessionStorage.removeItem("user");
    }
  }, [user]);

  // Fetch orders when user or admin status changes
  useEffect(() => {
    const fetchOrders = async () => {
      if (user?.email) {
        try {
          const endpoint = isAdmin
            ? "http://localhost:5000/api/orders"
            : `http://localhost:5000/api/orders/user/${user.email}`;
          const res = await fetch(endpoint);
          const data = await res.json();
          setOrders(data);
        } catch (error) {
          console.error("Failed to fetch orders:", error);
        }
      }
    };
    fetchOrders();
  }, [user, isAdmin]);

  // NEW: Fetch cart items from backend when user logs in
  useEffect(() => {
    const fetchCart = async () => {
      if (user?.email) {
        try {
          const res = await fetch(`http://localhost:5000/api/cart/${user.email}`);
          const data = await res.json();
          setCartItems(data.items || []);
        } catch (error) {
          console.error("Failed to fetch cart:", error);
        }
      } else {
        setCartItems([]); // clear cart on logout
      }
    };
    fetchCart();
  }, [user]);

  // NEW: Save cart items to backend whenever cartItems change and user is logged in
  useEffect(() => {
    const saveCart = async () => {
      if (user?.email) {
        try {
          await fetch("http://localhost:5000/api/cart/save", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userEmail: user.email, items: cartItems }),
          });
        } catch (error) {
          console.error("Failed to save cart:", error);
        }
      }
    };
    saveCart();
  }, [cartItems, user]);

  const handleAddToCart = (product) => {
    if (!user) {
      toast.error("Please login to add items to cart");
      return;
    }

    const currentTime = new Date().toISOString();
    const exists = cartItems.find((item) => item._id === product._id);

    if (exists) {
      setCartItems(cartItems.map((item) =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + 1, addedAt: currentTime }
          : item
      ));
    } else {
      setCartItems([
        ...cartItems,
        { ...product, quantity: 1, addedAt: currentTime }
      ]);
    }

    toast.success(`${product.title} added to cart`);
  };

  return (
    <AppContext.Provider value={{
      productList, setProductList,
      cartItems, setCartItems,
      orders, setOrders,
      handleAddToCart, cartCount,
      user, setUser ,
      isAdmin, setIsAdmin
    }}>
      {children}
    </AppContext.Provider>
  );
};





