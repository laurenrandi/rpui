import React from 'react';
import Typography from '@mui/material/Typography';
import Spacing from '@mui/system';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';


const Landing = () => {
  return(
    <>
    {/* Welcome Text */}
    <Box
    sx={{
      mt: '3%', //margin top for welcome text
    }}
    >
  <Typography align='center' fontSize='6em' color='primary'>  Welcome to<strong>  SPARQ Profile Builder </strong></Typography>{/*title & uses the Typography from MUI*/}
  </Box>

  {/* Blue background formatting */}
    <Box
      sx = {{
        width: '90%',
        background: 'linear-gradient(to right bottom, rgba(37,141,236,100),  rgba(40,146,244,50), rgba(40,146,244,15),rgba(209,224,227,50))',
        borderRadius:20, 
        ml: '5%',
        mb: '5%', 
        mt: '2%',
      }}
      >

        {/*About : left side text*/}
        <Box
          sx = {{
            width:'30%',
            ml: '6%',
            color: 'white',
            p: '3%',
          }}
          >
          <Typography mt = '10%' fontSize='7em'><strong>ABOUT SPB</strong></Typography>
          </Box>
        {/* Description : right side text */}
          <Box
          sx = {{
            width: "50%",
            mt:"-27%",
            ml: '40%',
            mr: 6,
            p: 7,
            color:'white',
          }}
         >
          <Typography fontSize='2em'> SPB provides colleagues who are part of a professional services firm 
            with an effective way to store, update, and product professional profiles for 
            Client consideration. Think of these as configurable resumes. With SPB you will 
            be able to enter and maintain your professional skills, experiences, education 
            and capabilities in an easy to use platform. You can quickly produce PDF versions 
            of customization profiles that can be shared.
          </Typography>
        </Box>
    </Box>
    </>
  );
};
export default Landing; 