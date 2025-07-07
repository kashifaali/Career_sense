import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="px-4 py-4 bg-white shadow-md">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        
        {/* Left: Logo */}
        <div className="flex items-center justify-between w-full md:w-1/4">
        <Link to={"/"}>
          <div className="text-2xl font-bold whitespace-nowrap ml-9">
            <span className="text-blue-600">Career</span>
            <span className="text-emerald-600">Sense</span>
          </div>

          </Link>

          {/* Mobile: Join / Sign in or Logout */}
          <div className="flex md:hidden items-center space-x-4">
            {!isLoggedIn ? (
              <>
                <Link to="/signup">
                  <button className="text-gray-700 font-medium hover:underline">Join now</button>
                </Link>
                <Link to="/login">
                  <button className="px-4 py-1 border border-blue-600 text-blue-600 font-medium rounded-full hover:bg-blue-50">
                    Sign in
                  </button>
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="px-4 py-1 border border-red-600 text-red-600 font-medium rounded-full hover:bg-red-50"
              >
                Logout
              </button>
            )}
          </div>
        </div>

        {/* Center: Search Bar */}
        <div className="w-full md:w-2/4 flex justify-center">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <svg
              className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
              />
            </svg>
          </div>
        </div>

        {/* Desktop: Join / Sign in or Logout */}
        <div className="hidden md:flex md:w-1/4 justify-end items-center space-x-8 mr-10">
          {!isLoggedIn ? (
            <>
              <Link to="/signup">
                <button className="text-gray-700 font-medium hover:underline">Join now</button>
              </Link>
              <Link to="/login">
                <button className="px-4 py-2 border border-blue-600 text-blue-600 font-medium rounded-full hover:bg-blue-50">
                  Sign in
                </button>
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="px-4 py-2 border border-red-600 text-red-600 font-medium rounded-full hover:bg-red-50"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
