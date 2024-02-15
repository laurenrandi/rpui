import { Box, Grid, Paper, Typography, Divider, Card, CardHeader, CardContent, List, ListItem, ListItemText, ListItemIcon, CircleIcon } from '@mui/material';
import React from 'react';

const AboutViewer = ({ about }) => {
  
  return(
    <Card
      sx={{ minWidth: 500, maxWidth: 600, backgroundColor: 'elementBackground.main' }}
    >
      <CardContent>
        <Box mb={2}>
          <Typography variant='h5' fontWeight='bold' gutterBottom>ABOUT</Typography>
          <Divider/>
        </Box>
        <Box mb={2}>
          
          <Typography variant='body1'>{about?.description}</Typography>
        </Box>
        <Divider/>
        <Box mb={2}>
          <Typography mt={2} variant='body1' fontWeight='bold'>Hobbies</Typography>
          <List>
            <ListItem>
              <ListItemText>
                {about?.bulletList[0].text}
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                {about?.bulletList[1].text}
              </ListItemText>
            </ListItem>
          </List>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AboutViewer;