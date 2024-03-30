import React, { useState, useEffect } from 'react';
import { Box, Typography, Divider, Dialog, DialogContent, DialogActions, Button, IconButton, Chip, Stack, TextField, Autocomplete } from '@mui/material';
import { useFormik } from 'formik';
import FormikTextField from '../FormikTextField/FormikTextField';
import FormikDateField from '../FormikDateField/FormikDateField';
import AddIcon from '@mui/icons-material/Add';
import * as yup from 'yup';
import axios from 'axios';
import ServiceUtils from '../../Lib/ServiceUtils';

const initialValues = {
  technologies: [], 
  startDate: null, 
  endDate: null, 
  name: null, 
  description: null, 
  type: null,
};

const ProjectEditor = ({ project, onSave, onCancel }) => {
  const [currentTechnology, setCurrentTechnology] = useState('');
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const formik = useFormik({
    initialValues: project || initialValues, 
    enableReinitialize: true,
    onSubmit: values => {onSave(values)},
    validationSchema: yup.object().shape({
      'name': yup.string().required('Required'),
      'type': yup.string().required('Required'),
      'startDate': yup.string().required('Required')
    }),
    validateOnChange: false,
    validateOnBlur: true
  });

  const handleAddTechnology = (value) => {
    if(value) {
      formik.setFieldValue('technologies', [ ...formik.values.technologies, { id: `id${Math.random().toString(16)}`, text: value } ]);
    } else {
      if(currentTechnology?.length > 0) {
        formik.setFieldValue('technologies', [ ...formik.values.technologies, { id: `id${Math.random().toString(16)}`, text: currentTechnology } ]);
      }
    }
    setCurrentTechnology();
  };

  const handleDeleteTechnology = (id) => {
    formik.setFieldValue('technologies', formik.values.technologies.filter(tech => tech.id !== id));
  };

  useEffect(() => {
    if(!currentTechnology) {
      setLoading(false);
      setOptions([]);
      return;
    }
    setLoading(true);
    const getOptions = setTimeout(async () => {
      try {
        await axios.get(`${ServiceUtils.baseUrl}/technologies`, {params: { name: currentTechnology }}).then(resp => {
          const { data } = resp;
          setOptions(data);
        })
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(getOptions);
  }, [currentTechnology]);
  
  return(
    <Dialog
      open
      fullWidth
    >
      <DialogContent>
        <Box mb={2}>
          <Typography variant='h5' fontWeight='bold' gutterBottom>ADD PROJECT</Typography>
          <Divider/>
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
            name='type'
            label='Type'
            formik={formik}
          />
        </Box>
        <Box mb={2}>
          <FormikTextField
            name='description'
            label='Description'
            formik={formik}
            multiline
            minRows={4}
          />
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
            name='link'
            label='Link'
            formik={formik}
          />
        </Box>
        <Box mb={2} display='flex'>
          <Autocomplete 
            fullWidth
            freeSolo
            size='small'
            loading={loading}
            options={options}
            value={currentTechnology}
            onFocus={() => {setCurrentTechnology(); setOptions([])}}
            onChange={(event, value, reason) => {
              if(reason === 'selectOption') {
                event.preventDefault();
                handleAddTechnology(value);
                setCurrentTechnology();
              }
            }}
            renderInput={(params) => (
              <TextField 
                {...params}
                label="Technologies"
                onChange={e => setCurrentTechnology(e.target.value)}
                onKeyDown={(e) => {
                  if(e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTechnology();
                  }
                }}
              />
            )}
          />
          <Box ml={1}>
            <IconButton 
              onClick={() => handleAddTechnology()}
            >
              <AddIcon color='primary' />
            </IconButton>
          </Box>
        </Box>
        {formik.values?.technologies?.length > 0 &&
          <Stack direction='row' columnGap={1} flexWrap='wrap' rowGap={1}>
            {formik.values.technologies.map(tech => (
              <Chip label={tech.text} variant='outlined' color='primary' onDelete={() => handleDeleteTechnology(tech.id)} />
            ))}
          </Stack>
        }        
      </DialogContent>
      <DialogActions>
        <Button variant='outlined' onClick={onCancel}>Cancel</Button>
        <Button variant='contained' color='primary' onClick={formik.submitForm}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProjectEditor;