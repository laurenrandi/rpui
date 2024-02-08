import React, { useContext, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from '../../Components/Header/Header';
import { matchPath, useLocation } from 'react-router-dom/dist';
import UserContext from '../../Lib/UserContext/UserContext';

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
      <Outlet />
    </>
  );
};

export default Layout;