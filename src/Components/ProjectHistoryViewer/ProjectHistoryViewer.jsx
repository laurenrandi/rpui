import React, { useState } from 'react';
import { Edit } from '@mui/icons-material';
import { Box, Typography, Divider, Card, CardContent, IconButton, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ProjectHistoryEditor from '../ProjectHistoryEditor/ProjectHistoryEditor';

const ProjectHistoryViewer = ({ formik }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSave = (projects) => {
    formik.setFieldValue('projects', projects);
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
            <Typography variant='body1'>{formik.values?.projects?.name}</Typography>
          </Box>
          <Box>
          <Box mb={2}>
            <Typography variant='body2' fontWeight='bold'>Timeline</Typography>
            <Typography variant='body1'>{`${formik.values?.projects?.startDate || ''} ${formik.values?.projects?.endDate || ''} `}</Typography>
          </Box>
            <Typography variant='body2' fontWeight='bold'>Description</Typography>
            <Typography variant='body1'>{formik.values?.projects?.description}</Typography>
          </Box>
          <Box display='flex' justifyContent='center'>
            <Button variant='contained'><AddIcon />Add Project</Button>
          </Box>
        </CardContent>
      </Card>
      {dialogOpen && 
        <ProjectHistoryEditor 
          onSave={handleSave}
          onCancel={handleCancel}
          projects={formik.values?.projects || {}}
        />
      }
    </>
  );
};

export default ProjectHistoryViewer;