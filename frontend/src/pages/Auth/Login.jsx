import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import Bottomfooter from '../../components/Bottomfooter';
import { loginUser } from '../../config/redux/action/authAction';

export default function Login() {
  const [userloginmethod, setuserloginmethod] = useState(false);
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [errors, setErrors] = useState({});

  const authState = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (authState.loggedIn) {
      navigate('/home');
    }
  }, [authState.loggedIn, navigate]);

  // ✅ Validate inputs
  const validateForm = () => {
    const newErrors = {};

    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';

    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = () => {
    if (validateForm()) {
      dispatch(loginUser({ email, password }));
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
            Log in to <span className="text-blue-600">Career</span>
            <span className="text-emerald-600">Sense</span>
          </h2>

          {/* Redux login error message */}
          {authState.isError && authState.message && (
            <div className="bg-red-100 text-red-700 border border-red-400 text-sm px-4 py-2 rounded mb-4">
              {typeof authState.message === 'object'
                ? authState.message.message || 'Login failed'
                : authState.message}
            </div>
          )}

          <form className="space-y-4">
            <div>
              <label className="block text-sm text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-sm text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            <button
              onClick={(e) => {
                e.preventDefault();
                if (!userloginmethod) handleLogin();
              }}
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              {authState.isLoading ? 'Logging in...' : 'Log In'}
            </button>
          </form>

          <div className="flex items-center my-4">
            <div className="flex-grow h-px bg-gray-300" />
            <span className="px-2 text-sm text-gray-500">OR</span>
            <div className="flex-grow h-px bg-gray-300" />
          </div>

          <button className="w-full flex items-center justify-center space-x-3 border border-gray-300 py-2 rounded-md hover:bg-gray-50 transition">
            <FcGoogle className="w-5 h-5" />
            <span className="text-sm text-gray-700">Continue with Google</span>
          </button>

          <button className="w-full flex items-center justify-center space-x-3 border border-gray-300 py-2 rounded-md mt-2 hover:bg-gray-50 transition">
            <FaFacebook className="w-5 h-5 text-blue-600" />
            <span className="text-sm text-gray-700">Continue with Facebook</span>
          </button>

          <p className="text-center text-sm text-gray-600 mt-6">
            Don't have an account?{' '}
            <a href="/signup" className="text-blue-600 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>

      <Bottomfooter />
    </>
  );
}
