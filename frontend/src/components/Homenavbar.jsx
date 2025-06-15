import React from 'react';
import { FiHome, FiUsers, FiMessageCircle, FiBell, FiUser } from 'react-icons/fi';

export default function Homenavbar() {

  return (
    <>

      <nav className="w-full bg-white shadow-md px-4 py-5 mb-4 flex items-center justify-between">
        
        {/* Left: Website Name */}
        <div className="text-xl font-bold text-blue-600">
          <span className="text-blue-600">Career</span>
          <span className="text-emerald-600">Sense</span>
        </div>

        {/* Center: Navigation Tabs */}
        <div className="hidden md:flex space-x-8 text-gray-700 font-medium">
          <button className="flex items-center space-x-1 hover:text-blue-500 transition duration-150">
            <FiHome size={20} />
            <span>Home</span>
          </button>
          <button className="flex items-center space-x-1 hover:text-blue-500 transition duration-150">
            <FiUsers size={20} />
            <span>My Network</span>
          </button>
          <button className="flex items-center space-x-1 hover:text-blue-500 transition duration-150">
            <FiMessageCircle size={20} />
            <span>Messaging</span>
          </button>
          <button className="flex items-center space-x-1 hover:text-blue-500 transition duration-150">
            <FiBell size={20} />
            <span>Notification</span>
          </button>
          <button className="flex items-center space-x-1 hover:text-blue-500 transition duration-150">
            <FiUser size={20} />
            <span>Profile</span>
          </button>
        </div>

        {/* Right: Logout Button */}
        <div>
          <button className="bg-blue-600 text-white px-4 py-1 rounded-md hover:bg-blue-700 transition duration-150">
            Log out
          </button>
        </div>
      </nav>
    </>
  );
}
