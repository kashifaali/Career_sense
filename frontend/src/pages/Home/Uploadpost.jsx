import React, { useState, useEffect } from 'react';
import { getAllPosts, createPost } from '../../config/redux/action/postAction';
import { getAboutUser } from '../../config/redux/action/authAction';
import { useDispatch, useSelector } from 'react-redux';

export default function Uploadpost() {
  const [postContent, setPostContent] = useState('');
  const [fileContent, setFileContent] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const postState = useSelector((state) => state.post);
  const authstate = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(getAllPosts());
      dispatch(getAboutUser({ token }));
    }
  }, [dispatch]);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!postContent) return;

    await dispatch(
      createPost({
        file: fileContent,
        body: postContent,
      })
    );

    // ✅ Fetch updated posts after creating one
    await dispatch(getAllPosts());

    // Clear the form
    setPostContent('');
    setFileContent(null);

    // Show success message
    setSuccessMessage('✅ Post uploaded successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {successMessage && (
        <div className="text-green-600 text-sm mb-3 font-semibold">{successMessage}</div>
      )}

      <form onSubmit={handleUpload}>
        <textarea
          className="w-full border border-gray-300 rounded-full p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="1"
          onChange={(e) => setPostContent(e.target.value)}
          placeholder="What do you want to talk about?"
          value={postContent}
          required
        />

        <div className="flex items-center justify-between mt-4">
          {/* File input */}
          <label className="cursor-pointer text-blue-600 hover:underline text-sm">
            Add Image
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFileContent(e.target.files[0])}
              className="hidden"
            />
          </label>

          {/* Submit button */}
          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
          >
            Post
          </button>
        </div>

        {/* Preview selected image */}
        {fileContent && (
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-1">Selected Image Preview:</p>
            <img
              src={URL.createObjectURL(fileContent)}
              alt="Preview"
              className="max-h-40 rounded-md object-cover"
            />
          </div>
        )}
      </form>
    </div>
  );
}
