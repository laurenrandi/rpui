import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, IconButton, Divider } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AboutEditor from '../AboutEditor/AboutEditor';

const AboutViewer = ({ formik }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleAdd = () => {
    setDialogOpen(true);
  }
  
  const handleDialogCancel = () => {
    setDialogOpen(false);
  }

  const handleDialogSave = (about) => {
    formik.setFieldValue('about', { ...about, bulletList: about.bulletList.filter(item => item.text?.length > 0) });
    setDialogOpen(false);
  }

  return(
    <>
      <Card
        sx={{ width: '100%', height: '100%', backgroundColor: 'elementBackground.main' }}
      >
        <CardContent>
          <Box mb={2}>
            <Box display='flex' justifyContent='space-between'>
              <Typography variant='h5' fontWeight='bold' gutterBottom>ABOUT</Typography>
              <IconButton onClick={handleAdd}>
                  <AddIcon color='primary' />
                </IconButton>
            </Box>
            <Divider/>
          </Box>
          {formik.values?.about?.description &&
            <>
              <Box mb={2}>
                <Typography variant='body1'>{formik.values?.about?.description}</Typography>
              </Box>
              <Divider/>
            </>
          }
          {formik.values?.about?.bulletList?.length > 0 && 
            <>
              <Box mb={2}>
                <Typography mt={2} variant='body1' fontWeight='bold'>Hobbies</Typography>
              </Box>
              {formik.values?.about?.bulletList?.length > 0 &&
                formik.values?.about?.bulletList?.map(hobby => (
                  <Box mb={2} >
                    <Typography>{hobby?.text}</Typography>
                  </Box>
                ))
              }
            </>
          }
        </CardContent>
      </Card>
      {dialogOpen &&
        <AboutEditor
          about={formik.values?.about}
          onSave={handleDialogSave}
          onCancel={handleDialogCancel}
        />
      }
    </>
  );
};

export default AboutViewer;