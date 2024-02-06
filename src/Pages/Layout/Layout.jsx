import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../Components/Header/Header';
import { matchPath, useLocation } from 'react-router-dom/dist';
import { FOCUSABLE_SELECTOR } from '@testing-library/user-event/dist/utils';

const Layout = () => {
  const [loggingIn, setLoggingIn] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => {
    const loading = matchPath('login/success/*', pathname) !== null ? true : false;
    setLoggingIn(loading);
    console.log(loading);
  }, [pathname]);
  
  return(
    <>
      <Header hideLoginButton={loggingIn} />
      <Outlet />
    </>
  );
};

export default Layout;