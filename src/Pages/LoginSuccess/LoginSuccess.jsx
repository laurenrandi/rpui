import React, { useEffect } from 'react';
import axios from 'axios';

const LoginSuccess = () => {

  // useEffect(() => {
  //   axios.get('http://localhost:8080/oauth2/v3/userinfo')
  //     .then(res => {
  //       const { data } = res;
  //       console.log(data);
  //     });
  // }, []);

  return(
    <>
      Login Success
    </>
  );
};

export default LoginSuccess;