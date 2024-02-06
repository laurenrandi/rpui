import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom/dist';
import { Box, LinearProgress, Typography } from '@mui/material';

const LoginSuccess = ({ setUser }) => {
  const { userId } = useParams();
  

  // useEffect(() => {
  //   if(userId) {
  //     const fetchUserInfo = async () => {
  //       try {
  //         await axios.get(`http://localhost:8080/users/${userId}/info`)
  //         .then(res => {
  //           const { data } = res;
  //           console.log(data);
  //           setUser(data);
  //         });
  //       } catch (err) {
  //         console.error(err);
          
  //       }
  //     }
  //   }
  // }, [userId]);

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