import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';

export default function Ats_checker() {


  return (
    <>
      
      <Navbar/>
      {/* ATS Checker Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-8 md:px-20 py-12 bg-white min-h-screen">
        
        {/* Left Side */}
        <div className="md:w-1/2 mb-12 md:mb-0">
          <p className="text-sm font-semibold text-blue-700 tracking-wide uppercase mb-2">
            Resume Checker
          </p>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight mb-6">
            Is your resume good<br /> enough?
          </h1>

          <p className="text-base text-gray-700 mb-8 max-w-md">
            A free and fast AI resume checker doing 16 crucial checks to ensure
            your resume is ready to perform and get you interview callbacks.
          </p>

          <div className="border border-dashed border-gray-400 p-6 rounded-lg w-full max-w-md bg-gray-50">
            <p className="text-gray-600 text-sm mb-2">
              Drop your resume here or choose a file. <br />
              <span className="text-xs text-gray-500">PDF & DOCX only. Max 2MB file size.</span>
            </p>

            <button className="mt-4 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded transition duration-300">
              Upload Your Resume
            </button>

            <p className="text-xs text-gray-500 mt-2">🔒 Privacy guaranteed</p>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src="ats-img.avif"
            alt="Resume Score Preview"
            className="max-w-full w-[90%] md:w-[500px] rounded-xl shadow-lg"
          />
        </div>
      </section>
    </>
  );
}
