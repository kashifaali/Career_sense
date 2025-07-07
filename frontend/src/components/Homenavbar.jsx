import React, { useEffect, useState } from 'react';
import { FiHome, FiUsers, FiMessageCircle, FiBell, FiUser } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';


export default function Homenavbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false); // flag for logout redirect
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    if (shouldRedirect && !isLoggedIn) {
      navigate("/login");
    }
  }, [shouldRedirect, isLoggedIn, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setShouldRedirect(true); // trigger useEffect
  };

   const isActive = (path) => location.pathname === path;

  return (
    <nav className="w-full bg-white shadow-md px-4 py-5 mb-4 flex items-center justify-between">
      
      {/* Left: Website Name */}
      <div className="text-xl font-bold text-blue-600">
        <span className="text-blue-600">Career</span>
        <span className="text-emerald-600">Sense</span>
      </div>

      {/* Center: Navigation Tabs */}
      <div className="hidden md:flex space-x-8 text-gray-700 font-medium">
        <Link to="/home">
          <button className={`flex items-center space-x-1 transition duration-150 ${isActive("/home") ? "text-blue-600 font-semibold" : "hover:text-blue-500"}`}>
            <FiHome size={20} />
            <span>Home</span>
          </button>
        </Link>

        <Link to="/network">
          <button className={`flex items-center space-x-1 transition duration-150 ${isActive("/network") ? "text-blue-600 font-semibold" : "hover:text-blue-500"}`}>
            <FiUsers size={20} />
            <span>Explore Users</span>
          </button>
        </Link>

        <Link to="/Connections">
  <button className={`flex items-center space-x-1 transition duration-150 ${isActive("/Connections") ? "text-blue-600 font-semibold" : "hover:text-blue-500"}`}>
    <FiMessageCircle size={20} />
    <span>My Connections</span>
  </button>
</Link>

        <button className={`flex items-center space-x-1 transition duration-150 ${isActive("/notifications") ? "text-blue-600 font-semibold" : "hover:text-blue-500"}`}>
          <FiBell size={20} />
          <span>Notification</span>
        </button>

        <button className={`flex items-center space-x-1 transition duration-150 ${isActive("/profile") ? "text-blue-600 font-semibold" : "hover:text-blue-500"}`}>
          <FiUser size={20} />
          <span>Profile</span>
        </button>
      </div>

      {/* Right: Logout Button */}
      <div>
      
        <button 
        onClick={handleLogout}
        className="bg-blue-600 text-white px-4 py-1 rounded-md hover:bg-blue-700 transition duration-150">
          Log out
        </button>
      </div>
    </nav>
  );
}
