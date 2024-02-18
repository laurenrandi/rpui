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
    <Typography  align = 'center'  fontSize = '5em' color='primary'>  Welcome to<strong>  SPARQ Profile Builder </strong></Typography>
    </Box>

  {/* Blue background formatting */}
  
    <Box
      sx = {{
        minWidth: '100%',
        background: 'linear-gradient(to right bottom, rgba(37,141,236,100),  rgba(40,146,244,50), rgba(40,146,244,15),rgba(209,224,227,50))',
        borderRadius:20, 
      }}
    >
      <Grid container spacing = {2} >
        <Grid item xs={5}>
            <Typography ml = '.5em' mt = '3%' fontSize='7em' color= 'white'><strong>ABOUT SPB</strong></Typography>
        </Grid>
        <Grid item xs={6}>
        {/* Description : right side text */}
        <Typography fontSize='1.5em' color = 'white' mr='..3em' mt='.5em'> SPB provides colleagues who are part of a professional services firm 
          with an effective way to store, update, and product professional profiles for 
          Client consideration. Think of these as configurable resumes. With SPB you will 
          be able to enter and maintain your professional skills, experiences, education 
          and capabilities in an easy to use platform. You can quickly produce PDF versions 
          of customization profiles that can be shared.
        </Typography>
        </Grid>
      </Grid>
    </Box>
    </>
  );
};
export default Landing; 