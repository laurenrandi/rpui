import { Box, Typography, Divider, Card, CardContent } from '@mui/material';
import React from 'react';
import FormikTextField from '../FormikTextField/FormikTextField';

const ContactEditor = ({ formik }) => {
  
  return(
    <Card
      sx={{ width: '100%', backgroundColor: 'elementBackground.main' }}
    >
      <CardContent>
        <Box mb={2}>
          <Typography variant='h5' fontWeight='bold' gutterBottom>CONTACT INFO</Typography>
          <Divider/>
        </Box>
        <Box mb={2}>
          <FormikTextField 
            name='firstName'
            label='First Name'
            formik={formik}
          />
        </Box>
        <Box mb={2}>
          <FormikTextField
            name='middleName'
            label='Middle Name'
            formik={formik}
          />
        </Box>
        <Box mb={2}>
          <FormikTextField
            name='lastName'
            label='Last Name'
            formik={formik}
          />
        </Box>
        <Box mb={2}>
          <FormikTextField
            name='email'
            label='Email'
            formik={formik}
          />
        </Box>
        <Box>
          <FormikTextField
            name='phone'
            label='Phone Number'
            formik={formik}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default ContactEditor;