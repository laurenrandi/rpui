import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, IconButton, Divider, Stack, Chip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const AboutViewer = ({ formik }) => {
  
  return(
    <Card
      sx={{ backgroundColor: 'elementBackground.main' }}
    >
      <CardContent>
        <Box mb={2}>
          <Box display='flex' justifyContent='space-between'>
            <Typography variant='h5' fontWeight='bold' gutterBottom>ABOUT</Typography>
            <IconButton>
                <AddIcon color='primary' />
              </IconButton>
          </Box>
          <Divider/>
        </Box>
        {formik.values?.about?.bulletList?.length > 0 &&
          <>
            <Box mb={2}>
              <Typography variant='body1'>{formik.values?.about?.description}</Typography>
            </Box>
            <Divider/>
            <Box mb={2}>
              <Typography mt={2} variant='body1' fontWeight='bold'>Hobbies</Typography>
            </Box>
            {formik.values?.about?.bulletList?.length > 0 &&
              formik.values?.about?.bulletList?.map(hobby => (
                <Box mb={2} >
                  <Typography>{hobby?.text}</Typography>
                </Box>
              ) )}
          </>
        }
      </CardContent>
    </Card>
  );
};

export default AboutViewer;