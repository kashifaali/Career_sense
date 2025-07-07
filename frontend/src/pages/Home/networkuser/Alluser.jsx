import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../../config/redux/action/authAction';
import { useNavigate } from 'react-router-dom';

export default function Alluser() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const authstate = useSelector((state) => state.auth);

    const loggedInUserId = authstate.user?._id; // ✅ Logged-in user's ID

    useEffect(() => {
        if (!authstate.all_profiles_fetched) {
            dispatch(getAllUsers());
        }
    }, [authstate.all_profiles_fetched, dispatch]);

    // ✅ Exclude logged-in user's profile
    const validUsers = authstate.all_users.filter(
        profile => profile.userId && profile.userId._id !== loggedInUserId
    );

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Discover</h1>

            {validUsers.length === 0 && (
                <p className="text-gray-500">No user profiles found.</p>
            )}

            {validUsers.map((userProfile, index) => (
                <div
                    onClick={() => {
                        navigate(`/view_profile/${userProfile.userId.username}`);
                    }}
                    key={index}
                    className="p-4 rounded-lg shadow-md mb-4 flex items-center gap-4 cursor-pointer hover:bg-gray-100 transition"
                >
                    <img
                        src={
                            userProfile.userId.profilePicture === 'default.png'
                                ? '/default.jpeg'
                                : userProfile.userId.profilePicture
                        }
                        alt="Profile"
                        className="w-16 h-16 rounded-full object-cover border"
                    />
                    <div>
                        <p><strong>Name:</strong> {userProfile.userId.name}</p>
                        <p><strong>Username:</strong> {userProfile.userId.username}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
