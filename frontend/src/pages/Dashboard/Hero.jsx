import React from 'react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-8 md:px-16 bg-white h-100vh">
      
      {/* Left side - Text Content */}
      <div className="md:w-1/2 mb-8 md:mb-0">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
          Welcome to your <br /> professional community
        </h1>
        
        <div className="space-y-4">
          {/* Google Button */}
          <button className="flex items-center justify-center w-full md:w-auto px-6 py-3 text-white bg-blue-600 rounded-full hover:bg-blue-700 transition">
            <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" className="w-5 h-5 mr-2" />
            Continue with Google
          </button>

          {/* Microsoft Button */}
          <button className="flex items-center justify-center w-full md:w-auto px-6 py-3 border border-gray-400 rounded-full hover:bg-gray-100 transition">
            <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" alt="Microsoft" className="w-5 h-5 mr-2" />
            Continue with Microsoft
          </button>

          {/* Email Button */}
          <button className="flex items-center justify-center w-full md:w-auto px-6 py-3 border border-gray-400 rounded-full hover:bg-gray-100 transition">
            <img src="https://img.icons8.com/ios-filled/50/000000/new-post.png" alt="Email" className="w-5 h-5 mr-2" />
            Sign in with email
          </button>
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
