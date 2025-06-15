import React, { useState } from 'react';
import { FiThumbsUp, FiMessageCircle, FiTrash2 } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import {
  deletePost,
  getAllPosts,
  incrementPostLike,
  getAllComments,
  postComment,
} from '../../config/redux/action/postAction';

export default function Post() {
  const dispatch = useDispatch();
  const postState = useSelector((state) => state.post);
  const authState = useSelector((state) => state.auth);
  const [openComments, setOpenComments] = useState({});
  const [CommentText, setCommentText] = useState({});

  const toggleComments = (postId) => {
    setOpenComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const handleDeletePost = async (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      await dispatch(deletePost({ post_id: postId }));
      await dispatch(getAllPosts());
    }
  };

  return (
    <div className="space-y-6">
      {[...postState.posts]?.reverse().map((post) => {
        const isOwner = authState.user?.userId?._id === post.userId._id;

        return (
          <div
            key={post._id}
            className="bg-white rounded-lg shadow-md p-5 max-w-xl mx-auto"
          >
            {/* Post Header */}
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center space-x-4">
                <img
                  src={
                    post.userId.profilePicture?.startsWith('http')
                      ? post.userId.profilePicture
                      : `http://localhost:5000/${post.userId.profilePicture || 'default.png'}`
                  }
                  alt={post.userId.name || 'User'}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{post.userId.name}</h3>
                  <p className="text-xs text-gray-500">@{post.userId.username}</p>
                  <p className="text-xs text-gray-400">{post.time || ''}</p>
                </div>
              </div>

              {isOwner && (
                <button
                  onClick={() => handleDeletePost(post._id)}
                  className="text-gray-400 text-sm hover:text-black cursor-pointer mr-4"
                  title="Delete Post"
                >
                  <FiTrash2 size={18} />
                </button>
              )}
            </div>

            <hr />

            {/* Post Content */}
            <p className="mt-4 text-gray-800">{post.body}</p>

            {/* Post Image */}
            {post.media && (
              <img
                src={`http://localhost:5000/${post.media}`}
                alt="Post content"
                className="mt-4 rounded-md max-h-80 w-full object-cover"
              />
            )}

            {/* Likes & Comments Count */}
            <div className="flex justify-end text-sm text-gray-500 mt-2">
              <span className="mr-4">{post.likes || 0} Likes</span>
              <span>{postState.postId === post._id ? postState.comments.length : post.comments?.length || 0} Comments</span>
            </div>

            {/* Post Actions */}
            <div className="flex space-x-6 mt-2 text-gray-600">
              <button
                onClick={async () => {
                  try {
                    await dispatch(incrementPostLike({ post_id: post._id })).unwrap();
                    await dispatch(getAllPosts());
                  } catch (error) {
                    console.error("Failed to like post:", error);
                  }
                }}
                className="flex items-center space-x-1 hover:text-blue-600 transition"
              >
                <FiThumbsUp size={18} />
                <span className="text-sm">Like</span>
              </button>

              <button
                onClick={() => {
                  toggleComments(post._id);
                  dispatch(getAllComments({ post_id: post._id }));
                }}
                className="flex items-center space-x-1 hover:text-blue-600 transition"
              >
                <FiMessageCircle size={18} />
                <span className="text-sm">Comment</span>
              </button>
            </div>

            {/* Comment Section */}
            {openComments[post._id] && (
              <div className="mt-4 bg-gray-50 rounded-md p-4">
                {/* Comments List */}
                {postState.comments.length === 0 ? (
                  <p className="text-sm text-gray-500 mb-3">No comments yet.</p>
                ) : (
                  <div className="space-y-4 mb-4">
                    {postState.comments.map((comment) => (
                      <div
                        key={comment._id}
                        className="flex space-x-3 p-3 border-none"
                      >
                        <img
                          src={
                            comment.userId.profilePicture?.startsWith('http')
                              ? comment.userId.profilePicture
                              : `http://localhost:5000/${comment.userId.profilePicture || 'default.png'}`
                          }
                          alt={comment.userId.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <p className="text-sm font-semibold text-gray-800">
                            {comment.userId.name}
                            <span className="ml-2 text-xs text-gray-500">@{comment.userId.username}</span>
                          </p>
                          <p className="text-sm text-gray-700 mt-1">{comment.body}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Comment Input */}
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={CommentText[post._id] || ""}
                    onChange={(e) =>
                      setCommentText({ ...CommentText, [post._id]: e.target.value })
                    }
                    onKeyDown={async (e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        const text = CommentText[post._id]?.trim();
                        if (!text) return;

                        await dispatch(postComment({ post_id: post._id, body: text }));
                        await dispatch(getAllPosts());
                        await dispatch(getAllComments({ post_id: post._id }));
                        setCommentText({ ...CommentText, [post._id]: "" });
                      }
                    }}
                    placeholder="Write a comment..."
                    className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={async () => {
                      const text = CommentText[post._id]?.trim();
                      if (!text) return;

                      await dispatch(postComment({ post_id: post._id, body: text }));
                      await dispatch(getAllPosts());
                      await dispatch(getAllComments({ post_id: post._id }));
                      setCommentText({ ...CommentText, [post._id]: "" });
                    }}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition text-sm"
                  >
                    Comment
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
