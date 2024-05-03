import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../Lib/UserContext/UserContext';

const LogoutSuccess = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    setUser(null);
    localStorage.removeItem("UserId");
    navigate('/')
  }, [navigate, setUser]);
  
  return(
    <>
    </>
  );
};

export default LogoutSuccess;