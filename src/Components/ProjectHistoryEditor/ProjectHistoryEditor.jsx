import React, { useState } from 'react';
import { Box, Typography, Divider, Card, CardContent, Dialog, DialogContent, DialogActions, Button, IconButton, Chip, Stack } from '@mui/material';
import { useFormik } from 'formik';
import FormikTextField from '../FormikTextField/FormikTextField';
import FormikDateField from '../FormikDateField/FormikDateField';
import FormikCheckboxField from '../FormikCheckboxField/FormikCheckboxField';
import AddIcon from '@mui/icons-material/Add';

const initialValues = {
  technologies: [], 
  startDate: null, 
  endDate: null, 
  name: null, 
  description: null, 
  type: null,
}

const ProjectHistoryEditor = ({ project, onSave, onCancel }) => {
  const [currentTechnology, setCurrentTechnology] = useState('');
  const formik = useFormik({
    intialValues: project || initialValues, 
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
      sx={{ backgroundColor: 'elementBackground.main' }}
      open
      fullWidth
    >
      <DialogContent>
        <Box mb={2}>
          <Typography variant='h5' fontWeight='bold' gutterBottom>PROJECT HISTORY</Typography>
          <Divider/>
        </Box>
        <Box mb={2} display='flex'>
          <FormikTextField
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
        <Box mb={2}>
          <FormikDateField 
            name='startDate'
            label='Start Month Year'
            formik={formik}
          />
        </Box>
        <Box mb={2}>
          <FormikDateField
            name='endDate'
            label='End Month Year'
            formik={formik}
          />
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
            name='description'
            label='Short Description of Project'
            formik={formik}
          />
        </Box> 
        <Box mb={2}>
          <FormikTextField
            name='type'
            label='Type of Project'
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

export default ProjectHistoryEditor;