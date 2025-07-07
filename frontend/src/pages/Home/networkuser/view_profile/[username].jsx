import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosClient from '../../../../config/redux/axiosClient';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '../../../../config/redux/action/postAction';
import Homenavbar from '../../../../components/Homenavbar';
import { getConnectionRequests, sendConnectionRequest } from '../../../../config/redux/action/authAction';
import clientServer from '../../../../config/redux/axiosClient';

export default function ViewProfilePage() {
  const { username } = useParams();
  const dispatch = useDispatch();
  const allPosts = useSelector((state) => state.post.posts);
  const authState = useSelector((state) => state.auth);

  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [IsCurrentUserInConnection, setIsCurrentUserInConnection] = useState(false);
  const [isConnectionNull, setIsConnectionNull] = useState(true);

  const initData = async () => {
    await dispatch(getAllPosts());
    await dispatch(getConnectionRequests({ token: localStorage.getItem("token") }));
  };

  useEffect(() => {
    if (!userProfile || !authState?.connections?.length) return;

    const connection = authState.connections.find(
      user => user?.connectionId?._id === userProfile?.userId?._id
    );

    if (connection) {
      setIsCurrentUserInConnection(true);
      setIsConnectionNull(!connection.status_accepted);
    }
  }, [authState.connections, userProfile]);

  useEffect(() => {
    initData();
  }, []);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await axiosClient.get('/user/get_profile_based_on_username', {
          params: { username },
        });

        if (res.data?.profile) {
          setUserProfile(res.data.profile);
        } else {
          setError('Profile not found.');
        }
      } catch (err) {
        setError('Failed to fetch profile.');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchUserProfile();
      dispatch(getAllPosts());
    } else {
      setError('No username provided.');
      setLoading(false);
    }
  }, [username, dispatch]);

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading profile...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!userProfile) return <p className="text-center mt-10 text-gray-500">No profile data.</p>;

  const { userId, bio, currentPost, postWork, education } = userProfile;
  const userPosts = allPosts.filter(post => post.userId._id === userId._id);

  return (
    <>
      <Homenavbar />
      <div className="max-w-4xl mx-auto mt-10 p-4">
        {/* Banner */}
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1503264116251-35a269479413?fit=crop&w=1000&q=80"
            alt="Banner"
            className="w-full h-48 object-cover rounded-lg"
          />
          {/* Profile image */}
          <div className="absolute -bottom-10 left-6">
            <img
              src={
                userId.profilePicture === 'default.png'
                  ? '/default.jpeg'
                  : userId.profilePicture
              }
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover border-4 border-white"
            />
          </div>

          {/* Connect button */}
          <div className="absolute top-52 right-4">
            {IsCurrentUserInConnection ? (
              isConnectionNull ? (
                <button
                  disabled
                  className="bg-blue-600 text-white px-4 py-2 rounded-md cursor-not-allowed opacity-80"
                >
                  Pending
                </button>
              ) : (
                <button
                  disabled
                  className="bg-green-500 text-white px-4 py-2 rounded-md cursor-not-allowed opacity-80"
                >
                  Connected
                </button>
              )
            ) : (
              <button
                onClick={() =>
                  dispatch(sendConnectionRequest({
                    token: localStorage.getItem("token"),
                    user_id: userProfile.userId._id
                  }))
                }
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Connect
              </button>
            )}
          </div>
        </div>

        {/* Profile Info */}
        <div className="mt-14 ml-6">
          <h1 className="text-2xl font-bold">{userId.name}</h1>
          <p className="text-gray-600">@{userId.username}</p>
          <p className="text-gray-500">{userId.email}</p>


           <button
           onClick={async()=>{
            const response = await clientServer.get(`/users/download_resume?user_id=${userProfile.userId._id}`)
window.open(`${import.meta.env.VITE_BASE_URL}/${response.data.message}`, "_blank");
           }}
    className="mt-3 px-4 py-2 cursor-pointer bg-gray-800 text-white rounded-md hover:bg-gray-900 transition"
  >
    Download Resume
  </button>
        </div>

        {/* Bio */}
        <div className="mt-6 ml-6">
          <h2 className="text-xl font-semibold mb-2">Bio</h2>
          <p className="text-gray-700">{bio || 'No bio provided.'}</p>
        </div>

        {/* Current Post */}
        <div className="mt-6 ml-6">
          <h2 className="text-xl font-semibold mb-2">Current Post</h2>
          <p className="text-gray-700">{currentPost || 'Not specified.'}</p>
        </div>

        {/* Work Experience */}
        <div className="mt-6 ml-6">
          <h2 className="text-xl font-semibold mb-2">Work Experience</h2>
          {postWork.length > 0 ? (
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {postWork.map((job, index) => (
                <li key={index}>{job}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-700">No work experience added.</p>
          )}
        </div>

        {/* Education */}
        <div className="mt-6 ml-6 mb-10">
          <h2 className="text-xl font-semibold mb-2">Education</h2>
          {education.length > 0 ? (
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {education.map((edu, index) => (
                <li key={index}>{edu}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-700">No education records added.</p>
          )}
        </div>

        {/* User's Posts */}
        <div className="mt-10 border-t pt-6">
          <h2 className="text-2xl font-bold mb-4">Posts by {userId.name}</h2>
          {userPosts.length > 0 ? (
            userPosts.map((post) => (
              <div
                key={post._id}
                className="bg-white rounded-lg shadow-md p-4 mb-6"
              >
                <div className="flex items-center space-x-4 mb-2">
                  <img
                    src={
                      post.userId.profilePicture?.startsWith('http')
                        ? post.userId.profilePicture
                        : `http://localhost:5000/${post.userId.profilePicture || 'default.png'}`
                    }
                    alt={post.userId.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold">{post.userId.name}</h3>
                    <p className="text-sm text-gray-500">@{post.userId.username}</p>
                  </div>
                </div>
                <p className="text-gray-800">{post.body}</p>
                {post.media && (
                  <img
                    src={`http://localhost:5000/${post.media}`}
                    alt="Post media"
                    className="mt-4 rounded-md w-full max-h-80 object-cover"
                  />
                )}
                <div className="mt-2 text-sm text-gray-500">
                  {post.likes} Likes · {post.comments?.length || 0} Comments
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No posts available.</p>
          )}
        </div>
      </div>
    </>
  );
}
