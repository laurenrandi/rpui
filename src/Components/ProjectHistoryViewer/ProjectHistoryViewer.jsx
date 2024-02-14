import React, { useState } from 'react';
import { Edit } from '@mui/icons-material';
import { Box, Typography, Divider, Card, CardContent, IconButton, Button, AddIcon } from '@mui/material';
import ProjectHistoryEditor from '../ProjectHistoryEditor/ProjectHistoryEditor';

const ProjectHistoryViewer = ({ formik }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSave = (contact) => {
    formik.setFieldValue('contact', contact);
    setDialogOpen(false);
  };

  const handleCancel = () => {
    setDialogOpen(false);
  };

  return(
    <>
      <Card
        sx={{ width: '100%', backgroundColor: 'elementBackground.main' }}
      >
        <CardContent>
          <Box mb={2}>
            <Box display='flex' justifyContent='space-between'>
              <Typography variant='h5' fontWeight='bold' gutterBottom>PROJECT HISTORY</Typography>
              <IconButton color='primary' onClick={() => setDialogOpen(true)}>
                <Edit />
              </IconButton>
            </Box>
            <Divider/>
          </Box>
          <Box mb={2}>
            <Typography variant='body2' fontWeight='bold'>Name</Typography>
            <Typography variant='body1'>{formik.values?.contact?.name}</Typography>
          </Box>
          <Box>
          <Box mb={2}>
            <Typography variant='body2' fontWeight='bold'>Timeline</Typography>
            <Typography variant='body1'>{`${formik.values?.contact?.startDate || ''} ${formik.values?.contact?.endDate || ''} `}</Typography>
          </Box>
            <Typography variant='body2' fontWeight='bold'>Description</Typography>
            <Typography variant='body1'>{formik.values?.contact?.description}</Typography>
          </Box>

          <Button><AddIcon />Add Project</Button>
        </CardContent>
      </Card>
      {dialogOpen && 
        <ProjectHistoryEditor 
          onSave={handleSave}
          onCancel={handleCancel}
          contact={formik.values?.contact || {}}
        />
      }
    </>
  );
};

export default ProjectHistoryViewer;