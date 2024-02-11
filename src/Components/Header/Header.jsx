import React, { useState, useEffect, useContext } from 'react';
import { Box, Button, Grid, Tab, Tabs, Typography, useTheme } from '@mui/material';
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom';
import GoogleIcon from '@mui/icons-material/Google';
import LogoutIcon from '@mui/icons-material/Logout';
import axios from 'axios';
import UserContext from '../../Lib/UserContext/UserContext';

const Header = ({ hideLoginButton=false }) => {
  const [tabValue, setTabValue] = useState(0);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleChange = (e, v) => {
    setTabValue(v);
  }

  useEffect(() => {
    switch(location.pathname) {
      case '/profiles':
        setTabValue(0);
        break;
      case '/documents':
        setTabValue(1);
        break;
      case '/users':
        setTabValue(2);
        break;
      default:
        setTabValue(-1);
        break;
    }
  }, [location.pathname]);

  useEffect(() => {
    if(user) {
      console.log(user);
      setLoggedIn(true);
      if(user?.admin === true) {
        setIsAdmin(true);
      }
    } else {
      setLoggedIn(false);
      setIsAdmin(false);
    }
  }, [user]);

  const loginLogoutHandler = async () => {
    if(loggedIn) {
      setUser(null);
      window.location.href = 'http://localhost:8080/logout';
    } else {
      window.location.href = 'http://localhost:8080/oauth2/authorization/google';
    }
  }

  return(
    <>
      <Box
        sx={{
          height: 75,
          userSelect: 'none'
        }}
        bgcolor='elementBackground.main'
      >
        <Grid container>
          <Grid item xs={6}>
            <Box display='flex' justifyContent='left' pl={2} height={75} alignItems='center'>
              <Typography color='primary' fontWeight='bolder' variant='h4'>SPB</Typography>
              {loggedIn &&
                <Box display='flex' justifyContent='center' flexDirection='column' height={75} ml={2}>
                  <Box display='flex' justifyContent='left'>
                    <Tabs
                      value={tabValue}
                      onChange={handleChange}
                      variant="scrollable"
                      scrollButtons="auto"
                    >
                      <Tab label='your profiles' tabIndex={0} onClick={() => navigate('/profiles')} />
                      <Tab label='documents' tabIndex={0} onClick={() => navigate('/documents')} />
                      {isAdmin && <Tab label='users' tabIndex={0} onClick={() => navigate('/users')} />}
                    </Tabs>
                  </Box>
                </Box>
              }
            </Box>
          </Grid>
          <Grid item xs={6}>
            {!hideLoginButton &&
              <Box display='flex' justifyContent='right' height={75} alignItems='center' mr={2}>
                <Button
                  variant={ loggedIn ? 'outlined' : 'contained' }
                  color={ loggedIn ? 'secondary' : 'primary' }
                  endIcon={ loggedIn ? <LogoutIcon /> : <GoogleIcon /> }
                  onClick={loginLogoutHandler}
                >
                  {loggedIn ? 'Log out' : 'Log in'}
                </Button>
              </Box>
            }
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Header;