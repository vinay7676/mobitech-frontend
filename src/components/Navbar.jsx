// src/components/Navbar.jsx
import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { FaSearch, FaUser, FaBars, FaTimes } from 'react-icons/fa';
import { FaShopify } from "react-icons/fa6";
import { toast } from "react-hot-toast";
import { GiShoppingCart } from "react-icons/gi";
import Logo from '../components/Logo';

const Navbar = () => {
  const { user, setUser, cartItems } = useContext(AppContext);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);

  useEffect(() => {
    // Check sessionStorage instead of localStorage
    const storedUser = sessionStorage.getItem('user');
    if (storedUser && !user) {
      setUser(JSON.parse(storedUser));
    }
  }, [user, setUser]);

  const handleLogout = () => {
    // Remove from sessionStorage instead of localStorage
    sessionStorage.removeItem('user');
    setUser(null);
    navigate('/');
    toast.success('Logged out successfully!');
    setIsMobileMenuOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setShowSearchBar(false);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className="w-full transition-all duration-300 bg-gray-100 shadow-md py-3">
      <div className="container mx-auto px-4">
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center">
              <Logo />
            </Link>
            <div className="flex gap-6">
              <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">Home</Link>
              <Link to="/shop" className="text-gray-700 hover:text-blue-600 font-medium">Shop</Link>
              <Link to="/contact" className="text-gray-700 hover:text-blue-600 font-medium">Contact</Link>
              <Link to="/admin" className="text-gray-700 hover:text-blue-600 font-medium">Admin</Link>
            </div>
          </div>

          <form onSubmit={handleSearch} className="relative w-1/3 mx-4">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="absolute right-3 top-2.5 text-gray-500 hover:text-blue-600"
            >
              <FaSearch />
            </button>
          </form>

          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/cart")}
              className="relative"
            >
              <FaShopify className="w-7 h-7 text-black font-bold text-3xl cursor-pointer hover:text-blue-600" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </button>

            {user ? (
              <>
                <button
                  onClick={() => navigate("/account")}
                  className="p-2 text-gray-700 hover:text-blue-600 relative group"
                >
                  <FaUser className='w-5 h-5' />
                  <span className="absolute -bottom-7 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100">
                    Account
                  </span>
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 active:scale-90 cursor-pointer"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 active:scale-90 cursor-pointer"
              >
                Login
              </button>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 focus:outline-none"
            >
              {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
            <Link to="/" className="flex items-center">
              <Logo />
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowSearchBar(!showSearchBar)}
              className="text-gray-700"
            >
              <FaSearch size={20} />
            </button>
            <button
              onClick={() => navigate("/cart")}
              className="relative"
            >
              <FaShopify className='w-6 h-6 cursor-pointer hover:text-blue-600' />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {showSearchBar && (
          <form onSubmit={handleSearch} className="mt-3 md:hidden">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-3 top-2.5 text-gray-500 hover:text-blue-600"
              >
                <FaSearch />
              </button>
            </div>
          </form>
        )}

        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 bg-white rounded-lg shadow-lg p-4">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-gray-700 hover:text-blue-600 font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/shop"
                className="text-gray-700 hover:text-blue-600 font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Shop
              </Link>
              <Link
                to="/contact"
                className="text-gray-700 hover:text-blue-600 font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                to="/admin"
                className="text-gray-700 hover:text-blue-600 font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Admin
              </Link>

              <div className="pt-4 border-t border-gray-200">
                {user ? (
                  <>
                    <button
                      onClick={() => {
                        navigate("/account");
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full text-left py-2 text-gray-700 hover:text-blue-600 font-medium"
                    >
                      My Account
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full mt-2 px-4 py-2 rounded-full bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      navigate("/login");
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700"
                  >
                    Login
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
