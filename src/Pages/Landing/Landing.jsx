import React from 'react';
import Typography from '@mui/material/Typography';


const Landing = () => {
  
  return(
    <>
      <Typography> <div class="Welcome">Welcome to <strong>  SPARQ Profile Builder </strong>  </div>
      <div class = "square">
        <div class = "float-container">
          <div class = "float-childleft">
            <strong>ABOUT SPB</strong>
          </div>
          <div class = "float-childright">
           SPB provides colleagues who are part of a professional services firm with an effective way to store, update, and product professional profiles for Client consideration. Think of these as configurable resumes. With SPB you will be able to enter and maintain your professional skills, experiences, education and capabilities in an easy to use platform. You can quickly produce PDF versions of customization profiles that can be shared.
          </div>
        </div>
    
      </div>
      </Typography>
    </>
  );
};

export default Landing;