import React, { useState } from 'react';
import { Edit } from '@mui/icons-material';
import { Box, Typography, Divider, Card, CardContent, IconButton } from '@mui/material';
import EducationEditor from '../EducationEditor/EducationEditor';
import {Grid} from '@mui/material';

const EducationViewer = ({ formik }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSave = (education) => {
    formik.setFieldValue('education', education);
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
          <Box >
            <Box display='flex' justifyContent='space-between'>
              <Typography variant='h5' fontWeight='bold' gutterBottom>EDUCATION INFO</Typography>
              <IconButton color='primary' onClick={() => setDialogOpen(true)}>
                <Edit />
              </IconButton>
            </Box>
            <Divider/>
          </Box>
          <Grid container spacing = {2}>
            <Grid item xs={6}>
              <Box>
                <Typography variant='body2' fontWeight='bold'>School</Typography>
                <Typography variant='body1'>{formik.values?.education?.school}</Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box>
                <Typography variant='body2' fontWeight='bold'>Degree</Typography>
                <Typography variant='body1'>{formik.values?.education?.degree}</Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box >
                <Typography variant='body2' fontWeight='bold'>Field of Study</Typography>
                <Typography variant='body1'>{formik.values?.education?.fieldOfStudy}</Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box >
                <Typography variant='body2' fontWeight='bold'>Minor</Typography>
                <Typography variant='body1'>{formik.values?.education?.startDate}</Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box>
                <Typography variant='body2' fontWeight='bold'>Start Date</Typography>
                <Typography variant='body1'>{formik.values?.education?.startDate}</Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
            <Box >
              <Typography variant='body2' fontWeight='bold'>End Date</Typography>
              <Typography variant='body1'>{formik.values?.education?.endDate}</Typography>
            </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      {dialogOpen && 
        <EducationEditor 
          onSave={handleSave}
          onCancel={handleCancel}
          education={formik.values?.education || {}}
        />
      }
    </>
  );
};

export default EducationViewer;