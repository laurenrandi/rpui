import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, IconButton, Divider } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import dayjs from 'dayjs';
import EducationEditor from '../EducationEditor/EducationEditor';

const EducationViewer = ({ formik }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedEducation, setSelectedEducation] = useState(null);

  const handleEdit = (id) => {
    setSelectedEducation(formik.values.education.find(education => education.id === id));
    setDialogOpen(true);
  };

  const handleAdd = () => {
    setSelectedEducation(null);
    setDialogOpen(true);
  };

  const handleDelete = (id) => {
    formik.setFieldValue('education', formik.values.education.filter(education => education.id !== id));
  };

  const handleDialogSave = (education) => {
    if(education.id) {
      const index = formik.values.education.findIndex(e => e.id === education.id);
      formik.setFieldValue(`education[${index}]`, education);
    } else {
      formik.setFieldValue('education', [ ...formik.values.education, { ...education, id: `id${Math.random().toString(16)}` } ]);
    }
    setDialogOpen(false);
    setSelectedEducation(null);
  };

  const handleDialogCancel = () => {
    setDialogOpen(false);
    setSelectedEducation(null);
  };

  return(
    <>
      <Card
        sx={{ width: '100%', backgroundColor: 'elementBackground.main', height: '100%' }}
      >
        <CardContent>
          <Box mb={0.5}>
            <Box display='flex' justifyContent='space-between'>
              <Typography variant='h5' fontWeight='bold' gutterBottom>EDUCATION</Typography>
              <IconButton onClick={handleAdd}>
                <AddIcon color='primary' />
              </IconButton>
            </Box>
            <Divider/>
          </Box>
          {formik.values?.education?.length > 0 &&
            formik.values.education.toSorted((a,b) => dayjs(b.startDate).isAfter(dayjs(a.startDate)) ? 1 : -1).map(education => (
              <Box display='flex' justifyContent='space-between'>
                <Box width='100%'>  
                  <Box display='flex' justifyContent='space-between' mt={2}>
                    <Typography variant='body1'><b>{`${education.school ? education.school : 'School'}`}</b></Typography>
                    <Typography variant='body1'>{`${dayjs(education?.startDate).format('MM/YYYY')} - ${education.endDate && !education.current ? dayjs(education?.endDate).format('MM/YYYY') : ''}`}</Typography>
                  </Box>
                  <Box display='flex'>
                    <Typography variant='body1'>{education?.degree ? `${education.degree}, ` : ''}{education?.fieldOfStudy}</Typography>
                  </Box>
                  {education?.minor && 
                    <Box>
                      <Typography variant='body1' fontStyle='italic'>{`Minor: ${education.minor}`}</Typography>
                    </Box>
                  }              
                </Box>
                <Box display='flex' flexDirection='column' justifyContent='center' my={1} ml={1}>
                  <IconButton
                    onClick={() => handleEdit(education.id)}
                  >
                    <EditIcon color='primary' />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(education.id)}
                  >
                    <DeleteIcon color='secondary' />
                  </IconButton>
                </Box>
              </Box>
            ))
          }
        </CardContent>
      </Card>
      {dialogOpen && 
        <EducationEditor
          education={selectedEducation}
          onSave={handleDialogSave}
          onCancel={handleDialogCancel}
        />
      }
    </>
  );
};

export default EducationViewer;
