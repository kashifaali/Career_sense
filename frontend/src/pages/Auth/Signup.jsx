import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import Bottomfooter from '../../components/Bottomfooter';
import { registerUser } from '../../config/redux/action/authAction';

export default function Signup() {
  const authState = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userloginmethod, setuserloginmethod] = useState(false);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [username, setusername] = useState("");
  const [name, setname] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (authState.loggedIn) {
      navigate("/home");
    }
  }, [authState.loggedIn, navigate]);

  // ✅ Validation function
  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) newErrors.name = "Name is required";
    else if (name.trim().length < 3) newErrors.name = "Name must be at least 3 characters";

    if (!username.trim()) newErrors.username = "Username is required";
    else if (username.includes(" ")) newErrors.username = "Username should not contain spaces";
    else if (username.length < 3) newErrors.username = "Username must be at least 3 characters";

    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";

    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6) newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = () => {
    if (validateForm()) {
      dispatch(registerUser({ username, email, password, name }));
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md mb-8 mt-6">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
            Create your <span className="text-blue-600">Career</span>
            <span className="text-emerald-600">Sense</span> account
          </h2>

          <form className="space-y-4">
            <div>
              <input
                onChange={(e) => setname(e.target.value)}
                type="text"
                placeholder="Your name"
                name='name'
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <input
                onChange={(e) => setusername(e.target.value)}
                type="text"
                placeholder="Choose a username"
                name='username'
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
              />
              {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
            </div>

            <div>
              <input
                onChange={(e) => setemail(e.target.value)}
                type="email"
                placeholder="you@example.com"
                name='email'
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <input
                onChange={(e) => setpassword(e.target.value)}
                type="password"
                placeholder="Enter your password"
                name='password'
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            <button
              onClick={(e) => {
                e.preventDefault();
                if (!userloginmethod) handleRegister();
              }}
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Sign Up
            </button>
          </form>

          <div className="flex items-center my-4">
            <div className="flex-grow h-px bg-gray-300" />
            <span className="px-2 text-sm text-gray-500">OR</span>
            <div className="flex-grow h-px bg-gray-300" />
          </div>

          <button className="w-full flex items-center justify-center space-x-2 border border-gray-300 py-2 rounded-md hover:bg-gray-50 transition">
            <FcGoogle className="w-5 h-5" />
            <span className="text-sm text-gray-700">Continue with Google</span>
          </button>

          <button className="w-full flex items-center justify-center space-x-2 border border-gray-300 py-2 rounded-md mt-2 hover:bg-gray-50 transition">
            <FaFacebook className="w-5 h-5 text-blue-600" />
            <span className="text-sm text-gray-700">Continue with Facebook</span>
          </button>

          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{' '}
            <a href="/login" className="text-blue-600 hover:underline">Log in</a>
          </p>
        </div>
      </div>

      <Bottomfooter />
    </>
  );
}
