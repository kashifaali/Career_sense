import React from 'react';

export default function Introsection() {
  return (
    <section className="bg-blue-100 py-12 px-6 md:px-20">
      
      {/* Heading */}
      <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-10">
        Top ways to help you get ahead
      </h1>

      {/* Cards Container */}
      <div className="space-y-6">

        {/* Card 1 */}
        <div className="flex items-center bg-white p-6 rounded-lg shadow-sm">
          <img src="/icon-1.svg" alt="Better job" className="w-16 h-16 mr-6" />
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-1">A better job - faster</h2>
            <p className="text-gray-600 mb-2">Find job listings from multiple sites - all in one place.</p>
            <a href="#" className="text-indigo-700 font-semibold hover:underline">
              Search job postings →
            </a>
          </div>
        </div>

        {/* Card 2 */}
        <div className="flex items-center bg-white p-6 rounded-lg shadow-sm">
          <img src="/icon-2.svg" alt="Helpful community" className="w-16 h-16 mr-6" />
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-1">A helpful community</h2>
            <p className="text-gray-600 mb-2">Get answers & support from millions of workers like you.</p>
            <a href="#" className="text-indigo-700 font-semibold hover:underline">
              Explore Community →
            </a>
          </div>
        </div>

        {/* Card 3 */}
        <div className="flex items-center bg-white p-6 rounded-lg shadow-sm">
          <img src="/icon-3.svg" alt="Standout profile" className="w-16 h-16 mr-6" />
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-1">A standout profile</h2>
            <p className="text-gray-600 mb-2">Complete your profile and get better job matches.</p>
            <a href="#" className="text-indigo-700 font-semibold hover:underline">
              Start your profile →
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
