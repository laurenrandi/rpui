import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Dialog, DialogContent, DialogActions, Button, Box, Typography, Divider, TextField, IconButton, Chip, Stack } from '@mui/material';
import FormikTextField from '../FormikTextField/FormikTextField';
import FormikDateField from '../FormikDateField/FormikDateField';
import FormikCheckboxField from '../FormikCheckboxField/FormikCheckboxField';
import AddIcon from '@mui/icons-material/Add';

const initialValues = {
  startDate: null,
  endDate: null,
  company: null,
  role: null,
  responsibilities: null,
  current: false,
  technologies: []
}

const WorkHistoryEditor = ({ job, onSave, onCancel }) => {
  const [currentTechnology, setCurrentTechnology] = useState('');
  const formik = useFormik({
    initialValues: job || initialValues,
    enableReinitialize: true
  });

  const handleAddTechnology = () => {
    if(currentTechnology.length > 0) {
      formik.setFieldValue('technologies', [ ...formik.values.technologies, { id: `id${Math.random().toString(16)}`, text: currentTechnology } ]);
      setCurrentTechnology('');
    }
  };

  const handleDeleteTechnology = (id) => {
    formik.setFieldValue('technologies', formik.values.technologies.filter(tech => tech.id !== id));
  };

  return(
    <Dialog
      open
      fullWidth
    >
      <DialogContent>
        <Box mb={2}>
          <Typography variant='h5' fontWeight='bold' gutterBottom>ADD JOB</Typography>
          <Divider/>
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
        <Box mb={2}>
          <FormikTextField 
            name='responsibilities'
            label='Responsibilities'
            multiline
            minRows={4}
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
              label='Current Position'
              formik={formik}
            />
          </Box>
        </Box>
        {!formik.values?.current === true &&
          <Box mb={2}>
            <FormikDateField 
              name='endDate'
              label='End Date'
              formik={formik}
            />
          </Box>
        }
        <Box mb={2} display='flex'>
          <TextField 
            id='technologies'
            label='Technology'
            size='small'
            fullWidth
            value={currentTechnology}
            onChange={e => setCurrentTechnology(e.target.value)}
            onKeyDown={e => {
              if(e.key === 'Enter') {
                e.preventDefault();
                handleAddTechnology();
              }
            }}
          />
          <Box ml={1}>
            <IconButton 
              onClick={handleAddTechnology}
            >
              <AddIcon color='primary' />
            </IconButton>
          </Box>
        </Box>
        {formik.values.technologies?.length > 0 &&
          <Stack direction='row' columnGap={1} flexWrap='wrap' rowGap={1}>
            {formik.values.technologies.map(tech => (
              <Chip label={tech.text} variant='outlined' color='primary' onDelete={() => handleDeleteTechnology(tech.id)} />
            ))}
          </Stack>
        }
      </DialogContent>
      <DialogActions>
        <Button variant='outlined' onClick={onCancel}>Cancel</Button>
        <Button variant='contained' color='primary' onClick={() => {onSave(formik.values)}}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default WorkHistoryEditor;