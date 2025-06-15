import React, { useEffect, useState } from 'react';
import Homenavbar from '../../components/Homenavbar';
import Uploadpost from './Uploadpost';
import Profiledisplay from './Profiledisplay';
import Post from './Post';
import Message from './message/Message';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '../../config/redux/action/postAction';
import { getAboutUser } from '../../config/redux/action/authAction';

export default function Home() {
  const [isTokenThere, setisTokenThere] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const authstate = useSelector((state) => state.auth);

  useEffect(() => {
    if (localStorage.getItem('token') === null) {
      navigate('/login');
    }
    setisTokenThere(true);
  }, []);

  useEffect(() => {
    if (isTokenThere) {
      dispatch(getAllPosts());
      dispatch(getAboutUser({ token: localStorage.getItem('token') }));
    }
  }, [isTokenThere]);



  return (
    <>

      <Homenavbar />

      <div className="h-[calc(100vh-64px)] flex px-4 ">
        {/* Left Column - Profiledisplay */}
        <div className="hidden md:block w-1/4 sticky top-[64px] self-start h-[calc(100vh-64px)] overflow-hidden">
          <Profiledisplay />
        </div>

        {/* Center Column - Uploadpost and Post */}
        <div className="w-full md:w-2/4 h-[calc(100vh-64px)] overflow-y-scroll px-4 space-y-6">
          <Uploadpost />
          <Post />
        </div>

        {/* Right Column - Message */}
        <div className="hidden lg:block w-1/4 sticky ml-2 top-[64px] self-start h-[calc(100vh-64px)] overflow-hidden">
          <Message />
        </div>
      </div>
    </>
  );
}

