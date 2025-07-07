import React from 'react';
import { Link } from 'react-router-dom';
import { FaClipboardCheck } from 'react-icons/fa'; // React icon for ATS score

export default function Hero() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-8 md:px-16 bg-white h-100vh">
      
      {/* Left side - Text Content */}
      <div className="md:w-1/2 mb-8 md:mb-0">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
          Welcome to your <br /> professional community
        </h1>
        
        <div className="space-y-4">
          {/* ATS Score Checker Button */}
          <Link
            to="/ats-checker"
            className="flex items-center justify-center w-full md:w-auto px-6 py-3 text-white bg-blue-700 rounded-full hover:bg-blue-800 transition"
          >
            <FaClipboardCheck className="w-5 h-5 mr-2" />
            Check Your ATS Score
          </Link>
        </div>

        <p className="text-sm text-gray-600 mt-4">
          By clicking Continue to join or sign in, you agree to LinkedIn's&nbsp;
          <Link to="#" className="text-blue-600 underline">User Agreement</Link>,&nbsp;
          <Link to="#" className="text-blue-600 underline">Privacy Policy</Link>, and&nbsp;
          <Link to="#" className="text-blue-600 underline">Cookie Policy</Link>.
        </p>

        <p className="text-sm text-gray-700 mt-6">
          New to LinkedIn?&nbsp;
          <Link to={'/signup'} className="text-blue-600 font-semibold">Join now</Link>
        </p>
      </div>

      {/* Right side - Image */}
      <div className="md:w-1/2 flex justify-center">
        <img
          src="/hero-img.webp" // Replace with your own image path
          alt="Hero Illustration"
          className="max-w-full h-auto"
        />
      </div>

    </section>
  );
}
