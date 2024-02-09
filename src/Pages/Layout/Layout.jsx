import React, { useContext, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from '../../Components/Header/Header';
import { matchPath, useLocation } from 'react-router-dom/dist';
import UserContext from '../../Lib/UserContext/UserContext';
import { Container } from '@mui/material';

const Layout = () => {
  const [loggingIn, setLoggingIn] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const loading = matchPath('login/success/*', pathname) !== null ? true : false;
    setLoggingIn(loading);
  }, [pathname]);
  
  return(
    <>
      <Header hideLoginButton={loggingIn} />
      <Container>
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;