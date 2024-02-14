import React from 'react';
// import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Box,Typography,Grid, Header } from '@mui/material';
import ReportProblemRoundedIcon from '@mui/icons-material/ReportProblemRounded';

const ErrorPage = () => {
  
  return(
    <>
    <Header />
      <Box
        sx={{
          width: 400, 
          height: 200, 
          border: '4px solid #005799',
          borderRadius: 4,
          bgcolor: 'white',
          justifyContnet: 'center',

        }}
      > 
        <Typography color='primary'> 
          <h1><ReportProblemRoundedIcon/> There was an error logging you in!</h1>
          Your username or password is incorrect!
        </Typography>
      </Box>
    </>
  );
};

export default ErrorPage;
