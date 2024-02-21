import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, IconButton, Divider, List, ListItem } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import EditIcon from '@mui/icons-material/Edit';
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
                  <EditIcon color='primary' />
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
              <Box mb={1}>
                <Typography mt={2} variant='h6' fontWeight='bold'>Hobbies</Typography>
              </Box>
              {formik.values?.about?.bulletList?.length > 0 &&
                formik.values?.about?.bulletList?.map(hobby => (
                  <Box display='flex'>
                    <List
                      sx={{
                        padding: 0,
                        listStyleType: 'disc',
                        listStylePosition: 'inside'
                      }}
                    >
                      <ListItem sx={{ display: 'list-item' }}>
                        {hobby?.text}
                      </ListItem>
                    </List>
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