import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, IconButton, Divider, Stack, Chip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import dayjs from 'dayjs';
import WorkHistoryEditor from '../WorkHistoryEditor/WorkHistoryEditor';

const WorkHistoryViewer = ({ formik }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const handleEdit = (id) => {
    setSelectedJob(formik.values.workHistory.find(job => job.id === id));
    setDialogOpen(true);
  };

  const handleAdd = () => {
    setSelectedJob(null);
    setDialogOpen(true);
  };

  const handleDelete = (id) => {
    formik.setFieldValue('workHistory', formik.values.workHistory.filter(job => job.id !== id));
  };

  const handleDialogSave = (job) => {
    if(job.id) {
      const index = formik.values.workHistory.findIndex(j => j.id === job.id);
      formik.setFieldValue(`workHistory[${index}]`, job);
    } else {
      formik.setFieldValue('workHistory', [ ...formik.values.workHistory, { ...job, id: `id${Math.random().toString(16)}` } ]);
    }
    setDialogOpen(false);
    setSelectedJob(null);
  };

  const handleDialogCancel = () => {
    setDialogOpen(false);
    setSelectedJob(null);
  };

  return(
    <>
      <Card
        sx={{ width: '100%', backgroundColor: 'elementBackground.main' }}
      >
        <CardContent>
          <Box mb={0.5}>
            <Box display='flex' justifyContent='space-between'>
              <Typography variant='h5' fontWeight='bold' gutterBottom>WORK HISTORY</Typography>
              <IconButton onClick={handleAdd}>
                <AddIcon color='primary' />
              </IconButton>
            </Box>
            <Divider/>
          </Box>
          {formik.values?.workHistory?.length > 0 &&
            formik.values.workHistory.toSorted((a,b) => dayjs(b.startDate).isAfter(dayjs(a.startDate)) ? 1 : -1).map(job => (
              <Box display='flex' justifyContent='space-between'>
                <Box width='100%'>  
                  <Box display='flex' justifyContent='space-between' mt={2}>
                    <Typography variant='body1'><b>{`${job.company ? job.company : 'Company'}`}</b></Typography>
                    <Typography variant='body1'>{`${dayjs(job?.startDate).format('MM/YYYY')} - ${job.endDate && !job.current ? dayjs(job?.endDate).format('MM/YYYY') : ''}`}</Typography>
                  </Box>
                  <Box display='flex'>
                    <Typography variant='body1'><i>{job?.role}</i></Typography>
                  </Box>
                  <Divider />
                  <Box my={1}>
                    <Typography variant='body1' flexWrap='wrap'>{job?.responsibilities || ''}</Typography>
                  </Box>
                  {job.technologies?.length > 0 &&
                    <Stack direction='row' columnGap={1} flexWrap='wrap' rowGap={1}>
                      {job.technologies.map(tech => (
                        <Chip label={tech.text} variant='outlined' color='primary' />
                      ))}
                    </Stack>
                  }
                </Box>
                <Box display='flex' flexDirection='column' justifyContent='center' my={1} ml={1}>
                  <IconButton
                    onClick={() => handleEdit(job.id)}
                  >
                    <EditIcon color='primary' />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(job.id)}
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
        <WorkHistoryEditor
          job={selectedJob}
          onSave={handleDialogSave}
          onCancel={handleDialogCancel}
        />
      }
    </>
  );
};

export default WorkHistoryViewer;