import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, IconButton, Divider, List } from '@mui/material';
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
    formik.setFieldValue('bulletList', about.bulletList.filter(item => item.text?.length > 0));
    formik.setFieldValue('bio', about.bio);
    setDialogOpen(false);
  }

  useEffect(() => {
    console.log(formik.values);
  }, [formik.values]);

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
          {formik.values?.bio &&
            <>
              <Box mb={2}>
                <Typography variant='body1'>{formik.values?.bio}</Typography>
              </Box>
              <Divider/>
            </>
          }
          {formik.values?.bulletList?.length > 0 && 
            <>
              <Box mb={1}>
                <Typography mt={2} variant='h6' fontWeight='bold'>Interests</Typography>
              </Box>
              {formik.values?.bulletList?.length > 0 &&
                formik.values?.bulletList?.map(hobby => (
                  <Box display='flex'>
                    <List
                      sx={{
                        padding: 0,
                        listStyleType: 'disc',
                        listStylePosition: 'inside',
                        marginLeft: 3
                      }}
                    >
                        <Typography my={1} sx={{ display: 'list-item' }}>{hobby?.text}</Typography>
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
          profile={formik.values}
          onSave={handleDialogSave}
          onCancel={handleDialogCancel}
        />
      }
    </>
  );
};

export default AboutViewer;