import React, { useState } from 'react';
import { Edit } from '@mui/icons-material';
import { Box, Typography, Divider, Card, CardContent, IconButton, Button, AddIcon } from '@mui/material';
import WorkHistoryEditor from '../WorkHistoryEditor/WorkHistoryEditor';

const WorkHistoryViewer = ({ formik }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSave = (workHistory) => {
    formik.setFieldValue('workHistory', workHistory);
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
              <Typography variant='h5' fontWeight='bold' gutterBottom>CONTACT INFO</Typography>
              <IconButton color='primary' onClick={() => setDialogOpen(true)}>
                <Edit />
              </IconButton>
            </Box>
            <Divider/>
          </Box>
          <Box mb={2}>
            <Typography variant='body2' fontWeight='bold'>Start and End Date</Typography>
            <Typography variant='body1'>{`${formik.values?.contact?.startDate || ''} ${formik.values?.contact?.endDate || ''} `}</Typography>
          </Box>
          <Box mb={2}>
            <Typography variant='body2' fontWeight='bold'>Company</Typography>
            <Typography variant='body1'>{formik.values?.contact?.company}</Typography>
          </Box>
          <Box>
            <Typography variant='body2' fontWeight='bold'>Role</Typography>
            <Typography variant='body1'>{formik.values?.contact?.role}</Typography>
          </Box>
          <Box>
            <Typography variant='body2' fontWeight='bold'>Responsibilites</Typography>
            <Typography variant='body1'>{formik.values?.contact?.responsibilites}</Typography>
          </Box>
          <Box>
            <Typography variant='body2' fontWeight='bold'>current</Typography>
            <Typography variant='body1'>{formik.values?.contact?.current}</Typography>
          </Box>
          <Button><AddIcon /> Add Another Role </Button>
        </CardContent>
      </Card>
      {dialogOpen && 
        <WorkHistoryEditor 
          onSave={handleSave}
          onCancel={handleCancel}
        />
      }
    </>
  );
};

export default WorkHistoryViewer;