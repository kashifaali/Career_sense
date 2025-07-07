import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../../config/redux/action/authAction';
import { useNavigate } from 'react-router-dom';

export default function Myconnections() {
  return (
    <div>
      My connections
    </div>
  )
}
