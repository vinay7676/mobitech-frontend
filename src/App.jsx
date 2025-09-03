import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import './index.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Toaster } from 'react-hot-toast';

import Home from './pages/Home';
import Shop from './pages/Shop';
import Contact from './pages/Contact';
import Search from './pages/Search';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Account from './pages/Account';

import Adminlogin from './pages/admin/Adminlogin';
import AdminDashboard from './pages/admin/Admindashboard';
import AdminOrder from './pages/admin/Adminorder';
import AddItem from './pages/admin/Additem'; // ✅ Added AddItem import

function App() {
  const location = useLocation();

  // ✅ Hide Navbar/Footer on admin-only pages
  const hideNavFooter = [
    '/admin',
    '/admin-dashboard',
    '/admin-orders',
    '/admin-add-item', // ✅ Added this to hide nav/footer
  ].includes(location.pathname);

  return (
    <div>
      <Toaster reverseOrder={false} />

      {!hideNavFooter && <Navbar />}

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/search" element={<Search />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/account" element={<Account />} />

        {/* Admin routes */}
        <Route path="/admin" element={<Adminlogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-orders" element={<AdminOrder />} />
        <Route path="/admin-add-item" element={<AddItem />} /> {/* ✅ Add Item route */}
      </Routes>

      {!hideNavFooter && <Footer />}
    </div>
  );
}

export default App;
