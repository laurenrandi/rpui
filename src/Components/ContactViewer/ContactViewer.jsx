import { Box, Grid, Paper, Typography, Divider, Card, CardHeader, CardContent } from '@mui/material';
import React from 'react';

const ContactViewer = ({ contact }) => {
  
  return(
    <Card
      sx={{ minWidth: 500, backgroundColor: 'elementBackground.main' }}
    >
      <CardContent>
        <Box mb={2}>
          <Typography variant='h5' fontWeight='bold' gutterBottom>CONTACT INFO</Typography>
          <Divider/>
        </Box>
        <Box mb={2}>
          <Typography variant='body2' fontWeight='bold'>Name</Typography>
          <Typography variant='body1'>{`${contact?.firstName || ''} ${contact?.lastName || ''}`}</Typography>
        </Box>
        <Box mb={2}>
          <Typography variant='body2' fontWeight='bold'>Email</Typography>
          <Typography variant='body1'>{contact?.email}</Typography>
        </Box>
        <Box>
          <Typography variant='body2' fontWeight='bold'>Phone Number</Typography>
          <Typography variant='body1'>{contact?.phone}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ContactViewer;