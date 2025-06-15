import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 text-sm">

      {/* Top Section - Logo + Columns */}
      <div className="max-w-7xl mx-auto px-24 py-10">

        {/* Logo */}
        <div className="mb-8">
          <div className="text-2xl font-bold whitespace-nowrap">
            <span className="text-blue-600">Career</span>
            <span className="text-emerald-600">Link</span>
          </div>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

          {/* Column 1 */}
          <div>
            <h3 className="font-semibold text-black mb-3">General</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">Sign Up</a></li>
              <li><a href="#" className="hover:underline">Help Center</a></li>
              <li><a href="#" className="hover:underline">About</a></li>
              <li><a href="#" className="hover:underline">Press</a></li>
              <li><a href="#" className="hover:underline">Blog</a></li>
              <li><a href="#" className="hover:underline">Careers</a></li>
              <li><a href="#" className="hover:underline">Developers</a></li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="font-semibold text-black mb-3">Browse LinkedIn</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">Learning</a></li>
              <li><a href="#" className="hover:underline">Jobs</a></li>
              <li><a href="#" className="hover:underline">Games</a></li>
              <li><a href="#" className="hover:underline">Salary</a></li>
              <li><a href="#" className="hover:underline">Mobile</a></li>
              <li><a href="#" className="hover:underline">Services</a></li>
              <li><a href="#" className="hover:underline">Products</a></li>
              <li><a href="#" className="hover:underline">Top Companies Hub</a></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="font-semibold text-black mb-3">Business Solutions</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">Talent</a></li>
              <li><a href="#" className="hover:underline">Marketing</a></li>
              <li><a href="#" className="hover:underline">Sales</a></li>
              <li><a href="#" className="hover:underline">Learning</a></li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h3 className="font-semibold text-black mb-3">Directories</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">Members</a></li>
              <li><a href="#" className="hover:underline">Jobs</a></li>
              <li><a href="#" className="hover:underline">Companies</a></li>
              <li><a href="#" className="hover:underline">Featured</a></li>
              <li><a href="#" className="hover:underline">Learning</a></li>
              <li><a href="#" className="hover:underline">Posts</a></li>
              <li><a href="#" className="hover:underline">Articles</a></li>
              <li><a href="#" className="hover:underline">Schools</a></li>
              <li><a href="#" className="hover:underline">News</a></li>
              <li><a href="#" className="hover:underline">News Letters</a></li>
              <li><a href="#" className="hover:underline">Services</a></li>
              <li><a href="#" className="hover:underline">Products</a></li>
              <li><a href="#" className="hover:underline">Advice</a></li>
              <li><a href="#" className="hover:underline">People Search</a></li>
            </ul>
          </div>

        </div>

      </div>

    </footer>
  );
}
