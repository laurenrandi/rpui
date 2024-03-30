import { Dialog, DialogContent, Button, DialogActions, Box, Divider, Typography, ButtonGroup, Slider } from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';
import FormikTextField from '../FormikTextField/FormikTextField';
import * as yup from 'yup';

const types = [
  'Frontend',
  'Backend',
  'Database',
  'Other'
];

const SkillsEditor = ({ skill, onSave, onCancel }) => {
  const formik = useFormik({
    initialValues: skill,
    enableReinitialize: true,
    onSubmit: values => {onSave(values)},
    validationSchema: yup.object({
      type: yup.string().required('Required'),
      name: yup.string().required('Required'),
      months: yup.number().required('Required').typeError('Must be a valid integer').min(1, 'Must be at least 1 month')
    }),
    validateOnChange: false,
    validateOnBlur: true
  });

  const handleTypeChange = (type) => {
    formik.setFieldValue('type', type);
  }

  return(
    <Dialog
      open
      fullWidth
    >
      <DialogContent>
        <Box mb={2}>
          <Typography variant='h5' fontWeight='bold' gutterBottom>ADD SKILL</Typography>
          <Divider/>
        </Box>
        <Box display='flex' justifyContent='center' mb={2}>
          <Box display='flex' flexDirection='column' justifyContent='top'>
            <ButtonGroup>
              {types.map(type => (
                <Button
                onClick={() => handleTypeChange(type)}
                variant={formik.values.type === type ? 'contained' : 'outlined'}
                disableElevation
                color={formik.errors.type ? 'error' : 'primary'}
                >
                  {type}
                </Button>
              ))}
            </ButtonGroup>
            {formik.errors.type &&
              <Box display='flex' justifyContent='center' mt={0.5}>
                <Typography variant='caption' align='center' color='error'>Required</Typography>
              </Box>
            }
          </Box>
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
            name='months'
            label='Months'
            formik={formik}
          />
        </Box>
        <Box>
          <Box display='flex' justifyContent='center'>
            <Typography>Proficiency</Typography>
          </Box>
          <Box display='flex' justifyContent='center'>
            <Box width='90%'>
              <Slider 
                color='primary'
                min={1}
                max={10}
                step={1}
                marks
                valueLabelDisplay='auto'
                defaultValue={formik.values.proficiency}
                onChange={(e, v) => formik.setFieldValue('proficiency', v)}
              />
            </Box>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant='outlined' onClick={onCancel}>Cancel</Button>
        <Button variant='contained' color='primary' onClick={formik.submitForm}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default SkillsEditor;