import { Box, Typography, Divider, Card, CardContent, Dialog, DialogContent, DialogActions, Button } from '@mui/material';
import React from 'react';
import FormikTextField from '../FormikTextField/FormikTextField';
import { useFormik } from 'formik';
import FormikDateField from '../FormikDateField/FormikDateField';

const WorkHistoryEditor = ({ onSave, onCancel }) => {
  const formik = useFormik({
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
          <Typography variant='h5' fontWeight='bold' gutterBottom>WORK HISTORY</Typography>
          <Divider/>
        </Box>
        <Box mb={2}>
          <FormikDateField
            name='startDate'
            label='Start Date'
            formik={formik}
          />
        </Box>
        <Box mb={2}>
          <FormikDateField
            name='endDate'
            label='End Date'
            formik={formik}
          />
        </Box>
        <Box mb={2}>
          <FormikTextField
            name='company'
            label='Company'
            formik={formik}
          />
        </Box>
        <Box mb={2}>
          <FormikTextField
            name='role'
            label='Role'
            formik={formik}
          />
        </Box>
        <Box>
          <FormikTextField
            name='responsibilites'
            label='Short Description of Responsibilites'
            formik={formik}
          />
        </Box>
        <Box>
          <FormikTextField
            name='current'
            label='Current Job (Yes/No)'
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

export default WorkHistoryEditor;