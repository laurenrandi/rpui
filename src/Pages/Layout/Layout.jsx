import React, { useContext, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from '../../Components/Header/Header';
import { matchPath, useLocation } from 'react-router-dom/dist';
import UserContext from '../../Lib/UserContext/UserContext';
import { Container } from '@mui/material';
import ServiceUtils from '../../Lib/ServiceUtils';
import axios from 'axios';

const Layout = () => {
  const [loggingIn, setLoggingIn] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const publicPages = [
    '/', 
    'login/success/*',
    'logout/success/*',
    'profiles/*'
  ];

  //set logging in state
  useEffect(() => {
    const loading = matchPath('login/success/*', pathname) !== null ? true : false;
    setLoggingIn(loading);
  }, [pathname]);

  //send user back to landing page if they try to visit anything else without logging in
  useEffect(() => {
    if(!user) {
      if(!localStorage.getItem("UserId")) {
        if(!publicPages.some(route => matchPath(route) !== null)) {
          navigate('/');
        }
      }
    }
  }, [pathname, navigate, user]);

  //save/load user to/from browser session storage on refresh or mount
  useEffect(() => {
    const fetchUserInfo = async (userId) => {
      try {
        await axios.get(`${ServiceUtils.baseUrl}/users/${userId}/info`)
        .then(res => {
          const { data } = res;
          setUser(data);
        });
      } catch (err) {
        console.error(err);
      }
    }
    if(!user) {
      if(localStorage.getItem("UserId")) {
        fetchUserInfo(localStorage.getItem("UserId"));
      }
    } else {
      if(!localStorage.getItem("UserId")) {
        localStorage.setItem("UserId", user.id);
      }
    }
  }, [user, setUser]);
  
  return(
    <>
      <Header hideLoginButton={loggingIn} />
      <Container maxWidth = 'xl'>
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;