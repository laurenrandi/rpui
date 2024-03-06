import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Dialog, DialogContent, DialogActions, Button, Box, Typography, Divider, TextField, IconButton, Chip, Stack } from '@mui/material';
import FormikTextField from '../FormikTextField/FormikTextField';
import FormikDateField from '../FormikDateField/FormikDateField';
import FormikCheckboxField from '../FormikCheckboxField/FormikCheckboxField';
import AddIcon from '@mui/icons-material/Add';

const initialValues = {
  school: null,
  degree: null,
  minor: null,
  major: null,
  startDate: null,
  graduationDate: null,
}

const EducationEditor = ({ education, onSave, onCancel }) => {
  
  const formik = useFormik({
    initialValues: education || initialValues,
    enableReinitialize: true
  });

  return(
    <Dialog
      open
      fullWidth
    >
      <DialogContent>
        <Box mb={2}>
          <Typography variant='h5' fontWeight='bold' gutterBottom>ADD DEGREE</Typography>
          <Divider/>
        </Box>
        <Box mb={2}>
          <FormikTextField
            name='school'
            label='School'
            formik={formik}
          />
        </Box>
        <Box mb={2}>
          <FormikTextField 
            name='fieldOfStudy'
            label='Major'
            formik={formik}
          />
        </Box>
        <Box mb={2}>
          <FormikTextField 
            name='minor'
            label='Minor'
            formik={formik}
          />
        </Box>
        <Box mb={2} display='flex'>
          <FormikDateField 
            name='startDate'
            label='Start Date'
            formik={formik}
          />
          <Box ml={1}>
            <FormikCheckboxField 
              name='current'
              label='In Progress'
              formik={formik}
            />
          </Box>
        </Box>
        {!formik.values?.current === true &&
          <Box mb={2}>
            <FormikDateField 
              name='endDate'
              label='Graduation Date'
              formik={formik}
            />
          </Box>
        }
      </DialogContent>
      <DialogActions>
        <Button variant='outlined' onClick={onCancel}>Cancel</Button>
        <Button variant='contained' color='primary' onClick={() => {onSave(formik.values)}}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EducationEditor;