import React, { useState } from 'react';
import { Edit } from '@mui/icons-material';
import { Box, Typography, Divider, Card, CardContent, IconButton } from '@mui/material';
import ContactEditor from '../ContactEditor/ContactEditor';

const ContactViewer = ({ formik }) => {
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
              <Typography variant='h5' fontWeight='bold' gutterBottom>CONTACT INFO</Typography>
              <IconButton color='primary' onClick={() => setDialogOpen(true)}>
                <Edit />
              </IconButton>
            </Box>
            <Divider/>
          </Box>
          {(formik.values?.contact?.firstName || formik.values?.contact?.middleName || formik.values?.contact?.lastName) && 
            <Box mb={2}>
              <Typography variant='body2' fontWeight='bold'>Name</Typography>
              <Typography variant='body1'>{`${formik.values?.contact?.firstName || ''} ${formik.values?.contact?.middleName || ''} ${formik.values?.contact?.lastName || ''}`}</Typography>
            </Box>
          }
          {formik.values?.contact?.email && 
            <Box mb={2}>
              <Typography variant='body2' fontWeight='bold'>Email</Typography>
              <Typography variant='body1'>{formik.values?.contact?.email}</Typography>
            </Box>
          }
          {formik.values?.contact?.phone &&
            <Box>
              <Typography variant='body2' fontWeight='bold'>Phone Number</Typography>
              <Typography variant='body1'>{formik.values?.contact?.phone}</Typography>
            </Box>
          }
        </CardContent>
      </Card>
      {dialogOpen && 
        <ContactEditor 
          onSave={handleSave}
          onCancel={handleCancel}
          contact={formik.values?.contact || {}}
        />
      }
    </>
  );
};

export default ContactViewer;