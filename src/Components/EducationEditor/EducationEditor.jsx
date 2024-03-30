import React from 'react';
import { useFormik } from 'formik';
import { Dialog, DialogContent, DialogActions, Button, Box, Typography, Divider } from '@mui/material';
import FormikTextField from '../FormikTextField/FormikTextField';
import FormikDateField from '../FormikDateField/FormikDateField';
import FormikCheckboxField from '../FormikCheckboxField/FormikCheckboxField';
import * as yup from 'yup';

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
    enableReinitialize: true,
    onSubmit: (values) => {onSave(values)},
    validationSchema: yup.object().shape({
      'school': yup.string().required('Required'),
      'degree': yup.string().required('Required'),
      'startDate': yup.string().required('Required')
    }),
    validateOnChange: false,
    validateOnBlur: true
  });

  return(
    <Dialog
      open
      fullWidth
    >
      <DialogContent>
        <Box mb={1}>
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
            name='degree'
            label='Degree Type'
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
          <Box>
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
        <Button variant='contained' color='primary' onClick={formik.submitForm}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EducationEditor;