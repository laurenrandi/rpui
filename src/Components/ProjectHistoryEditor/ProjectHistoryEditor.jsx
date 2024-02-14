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
          <Typography variant='h5' fontWeight='bold' gutterBottom>PROJECT HISTORY</Typography>
          <Divider/>
        </Box>
        <Box mb={2}>
          <FormikTextField
            name='name'
            label='Name of Project'
            formik={formik}
          />
        </Box>
        <Box mb={2}>
          <FormikTextField 
            name='startDate'
            label='Start Month Year'
            formik={formik}
          />
        </Box>
        <Box mb={2}>
          <FormikTextField
            name='endDate'
            label='End Month Year'
            formik={formik}
          />
        </Box>
        <Box mb={2}>
          <FormikTextField
            name='description'
            label='Short Description of Project'
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