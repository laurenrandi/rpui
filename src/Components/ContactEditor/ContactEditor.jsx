import { Box, Typography, Divider, Card, CardContent, Dialog, DialogContent, DialogActions, Button } from '@mui/material';
import React from 'react';
import FormikTextField from '../FormikTextField/FormikTextField';
import { useFormik } from 'formik';

const ContactEditor = ({ contact, onSave, onCancel }) => {
  const formik = useFormik({
    initialValues: contact,
    enableReinitialize: true
  });
  
  return(
    <Dialog
      sx={{ backgroundColor: 'elementBackground.main' }}
      open
      fullWidth
    >
      <DialogContent>
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
      </DialogContent>
      <DialogActions>
        <Button variant='outlined' onClick={onCancel}>Cancel</Button>
        <Button variant='contained' color='primary' onClick={() => {onSave(formik.values)}}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ContactEditor;