import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom/dist';
import { Box, LinearProgress, Typography } from '@mui/material';
import UserContext from '../../Lib/UserContext/UserContext';

const LoginSuccess = () => {
  const { userId } = useParams();
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if(userId) {
      const fetchUserInfo = async () => {
        try {
          await axios.get(`http://localhost:8080/users/${userId}/info`)
          .then(res => {
            const { data } = res;
            setUser(data);
            navigate('/profiles');
          });
        } catch (err) {
          console.error(err);
          
        }
      }
      fetchUserInfo();
    }
  }, [userId]);

  return(
    <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' height='75vh'>
      <Box my={3}>
        <Typography variant='h4'>Initializing</Typography>  
      </Box>
      <LinearProgress
        color='primary'
        style={{ width: "75%" }}
      />
    </Box>
  );
};

export default LoginSuccess;