import React, { useState, useEffect, useContext } from 'react';
import { Box, Button, Grid, LinearProgress, Tab, Tabs, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import GoogleIcon from '@mui/icons-material/Google';
import LogoutIcon from '@mui/icons-material/Logout';
import UsersIcon from '@mui/icons-material/Groups';
import ProfilesIcon from '@mui/icons-material/Description';
import UserContext from '../../Lib/UserContext/UserContext';
import ServiceUtils from '../../Lib/ServiceUtils';
import LoadingContext from '../../Lib/LoadingContext/LoadingContext';
import BackButtonChanges from '../../Pages/ProfileEditor/BackButtonChange';
import AccountMenu from '../AccountMenu/AccountMenu';
import {useFormik} from 'formik';


const Header = ({ hideLoginButton=false }) => {
  
  const [tabValue, setTabValue] = useState(0);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const { loading } = useContext(LoadingContext);
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
      case '/users':
        setTabValue(1);
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
      window.location.href = `${ServiceUtils.baseUrl}/logout`;
    } else {
      window.location.href = `${ServiceUtils.baseUrl}/oauth2/authorization/google`;
    }
  }

  const [backDialogOpen, setBackDialogOpen] = useState(false);
  const [backDialog2Open, setBack2DialogOpen] = useState(false);
  ////
  const handleDialogCancel = () => {
    setBackDialogOpen(false);
  }

  const handleBack = () => {
    if(location.pathname == '/profiles/master' || location.pathname == '/profiles/:profileId')
    {
    setBackDialogOpen(true);
    }
    else{navigate('/profiles')};
  };
  const handleLeave = () => {
    navigate('/profiles');
    setBackDialogOpen(false);
  };

  ////
  const handleDialog2Cancel = () => {
    setBack2DialogOpen(false);
  }

  const handleBack2 = () => {
    if(location.pathname == '/profiles/master' || location.pathname == '/profiles/:profileId')
    {
    setBack2DialogOpen(true);
    }
    else{navigate('/users')};
  };
  const handleLeave2 = () => {
    navigate('/users');
    setBack2DialogOpen(false);
  };

////
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
          <Grid item xs={9}>
            <Box display='flex' justifyContent='left' pl={2} height={75} alignItems='center'>
              <Typography color='primary' fontWeight='bolder' variant='h4'>SPB</Typography>
              {loggedIn &&
                <Box display='flex' justifyContent='center' flexDirection='column' height={75}>
                  <Box display='flex' justifyContent='left'>
                    <Tabs
                      value={tabValue}
                      onChange={handleChange}
                      variant="scrollable"
                      scrollButtons="auto"
                      indicatorColor='none'
                    >
                      <Tab label='your profiles' icon={<ProfilesIcon />} iconPosition='start' tabIndex={0} onClick={handleBack} />
                      {isAdmin && <Tab label='users' icon={<UsersIcon />} iconPosition='start' tabIndex={1} onClick={handleBack2}/>}
                    </Tabs>
                  </Box>
                </Box>
              }
            </Box>
          </Grid>
          <Grid item xs={3}>
            {!hideLoginButton &&
            <Box display='flex' justifyContent='right' height={75}>
              {loggedIn &&
               <AccountMenu  mr={2}/>
              }
                <Box display='flex' justifyContent='right' height={75} alignItems='center' pl={2} pr={2}>
                  
                  <Button
                    variant={ loggedIn ? 'outlined' : 'contained' }
                    color={ loggedIn ? 'secondary' : 'primary' }
                    endIcon={ loggedIn ? <LogoutIcon /> : <GoogleIcon /> }
                    onClick={loginLogoutHandler}
                  >
                    {loggedIn ? 'Log out' : 'Log in'}
                  </Button>
                </Box>
                  
              </Box>
}
          </Grid>
          
        </Grid>
        {loading && <LinearProgress color='primary' />}
      </Box>
 
      {backDialogOpen &&
          <BackButtonChanges
            onLeave={handleLeave}
            onCancel={handleDialogCancel}
          />
        
      }
       {backDialog2Open &&
          <BackButtonChanges
            onLeave={handleLeave2}
            onCancel={handleDialog2Cancel}
          />
        
      }
      
    </>
  );
};

export default Header;