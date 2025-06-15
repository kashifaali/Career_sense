import React from 'react';
import { useSelector } from 'react-redux';

export default function Profiledisplay() {
  const authState = useSelector((state) => state.auth);
  const userProfile = authState.user;

  // Optional check to avoid errors if data not yet loaded
  if (!userProfile || !userProfile.userId) {
    return <div className="text-center">Loading profile...</div>;
  }

  return (
    
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
      {/* Profile Photo */}
      <div className="w-24 h-24 rounded-full bg-gray-300 mb-4 overflow-hidden">
        <img 
          src={
            userProfile.userId.profilePicture === 'default.png'
              ? '/default.jpeg' // 👉 change to actual path if stored locally
              : userProfile.userId.profilePicture
          }
          alt="Profile" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* User Name */}
      <h2 className="text-xl font-semibold text-gray-900">{userProfile.userId.name}</h2>

      {/* Username */}
      <p className="text-sm text-gray-600 mt-1">@{userProfile.userId.username}</p>

      {/* Location (optional: hardcoded for now) */}
      <p className="text-xs text-gray-500 mt-1">Pakistan</p>

      {/* Short Bio */}
      <p className="text-sm text-gray-700 mt-4 px-4">
        {userProfile.bio || 'No bio provided yet.'}
      </p>

      {/* View Profile Button */}
      <button className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
        View Profile
      </button>
    </div>
  );
}
