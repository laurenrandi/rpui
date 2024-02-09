import React, { useContext } from 'react';
import UserContext from '../../Lib/UserContext/UserContext';
import { useNavigate } from 'react-router-dom';

const LogoutSuccess = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  setUser(null);
  navigate('/');

  
  return(
    <>
    </>
  );
};

export default LogoutSuccess;