import { Dialog, DialogContent, Button, DialogActions, Box, Divider, Typography } from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';
import FormikTextField from '../FormikTextField/FormikTextField';
import * as yup from 'yup';

const SkillsEditor = ({ skill, onSave, onCancel }) => {
  const formik = useFormik({
    initialValues: skill,
    enableReinitialize: true,
    // validationSchema: yup.object({
    //   type: yup.string().required('Required'),
    //   name: yup.string().required('Required'),
    //   proficiency: yup.number().required().max(10, 'Cannot exceed 10'),
    //   months: yup.number().required('Required')
    // })
  });

  return(
    <Dialog
      open
      fullWidth
    >
      <DialogContent>
        <Box mb={2}>
          <Typography variant='h5' fontWeight='bold' gutterBottom>SKILL EDITOR</Typography>
          <Divider/>
        </Box>
        <Box mb={2}>
          <FormikTextField 
            name='type'
            label='Type'
            formik={formik}
          />
        </Box>
        <Box mb={2}>
          <FormikTextField
            name='name'
            label='Name'
            formik={formik}
          />
        </Box>
        <Box mb={2}>
          <FormikTextField 
            name='proficiency'
            label='Proficiency'
            formik={formik}
          />
        </Box>
        <Box>
          <FormikTextField
            name='months'
            label='Months'
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

export default SkillsEditor;