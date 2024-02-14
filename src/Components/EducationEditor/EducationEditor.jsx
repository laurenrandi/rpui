import { Box, Typography, Divider, Card, CardContent, Dialog, DialogContent, DialogActions, Button } from '@mui/material';
import React from 'react';
import FormikTextField from '../FormikTextField/FormikTextField';
import { useFormik } from 'formik';
import FormikDateField from '../FormikDateField/FormikDateField';
import {Grid} from '@mui/material';

const EducationEditor = ({ education, onSave, onCancel }) => {
  const formik = useFormik({
    initialValues: education,
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
          <Typography variant='h5' fontWeight='bold' gutterBottom>Education Info</Typography>
          <Divider/>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Box mb={2}>
              <FormikTextField 
                name='school'
                label='School'
                formik={formik}
              />
          </Box>
          </Grid>
          <Grid item xs={6}>
            <Box mb={2}>
              <FormikTextField
                name='degree'
                label='Degree'
                formik={formik}
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
          <Box mb={2}>
            <FormikTextField
              name='fieldOfStudy'
              label='Field Of Study'
              formik={formik}
            />
          </Box>
          </Grid>
          <Grid item xs={6}>
          <Box mb={2}>
            <FormikTextField
              name='minor'
              label='Minor'
              formik={formik}
            />
          </Box>
          </Grid>
          <Grid item xs={6}>
          <Box mb={2}>
            <FormikDateField
              name='startDate'
              label ='Start Date'
              formik={formik}
              />
          </Box>
          </Grid>
          <Grid item xs={6}>
          <Box mb={2}>
            <FormikDateField
              name='endDate'
              label = 'End Date'
              formik={formik}
              />
          </Box>
          </Grid>
      </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant='outlined' onClick={onCancel}>Cancel</Button>
        <Button variant='contained' color='primary' onClick={() => {onSave(formik.values)}}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EducationEditor;