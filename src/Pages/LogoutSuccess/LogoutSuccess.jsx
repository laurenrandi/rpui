import React, { useContext, useEffect } from 'react';
import UserContext from '../../Lib/UserContext/UserContext';
import { useNavigate } from 'react-router-dom';

const LogoutSuccess = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    setUser(null);
    localStorage.removeItem("UserId");
    navigate('/')
  }, [navigate]);
  
  return(
    <>
    </>
  );
};

export default LogoutSuccess;