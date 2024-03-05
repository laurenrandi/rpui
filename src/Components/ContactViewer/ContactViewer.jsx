import React, { useState } from 'react';
import { Edit } from '@mui/icons-material';
import { Box, Typography, Divider, Card, CardContent, IconButton } from '@mui/material';
import ContactEditor from '../ContactEditor/ContactEditor';

const ContactViewer = ({ formik }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSave = (contact) => {
    formik.setFieldValue('firstName', contact.firstName);
    formik.setFieldValue('middleName', contact.middleName);
    formik.setFieldValue('lastName', contact.lastName);
    formik.setFieldValue('headline', contact.headline);
    formik.setFieldValue('email', contact.email);
    formik.setFieldValue('phone', contact.phone);
    setDialogOpen(false);
  };

  const handleCancel = () => {
    setDialogOpen(false);
  };

  return(
    <>
      <Card
        sx={{ width: '100%', backgroundColor: 'elementBackground.main', height: '100%' }}
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
          {(formik.values?.firstName || formik.values?.middleName || formik.values?.lastName) && 
            <Box mb={2}>
              <Typography variant='body2' fontWeight='bold'>Name</Typography>
              <Typography variant='body1'>{`${formik.values?.firstName || ''} ${formik.values?.middleName || ''} ${formik.values?.lastName || ''}`}</Typography>
            </Box>
          }
          {formik.values?.email && 
            <Box mb={2}>
              <Typography variant='body2' fontWeight='bold'>Email</Typography>
              <Typography variant='body1'>{formik.values?.email}</Typography>
            </Box>
          }
          {formik.values?.phone &&
            <Box mb={2}>
              <Typography variant='body2' fontWeight='bold'>Phone Number</Typography>
              <Typography variant='body1'>{formik.values?.phone}</Typography>
            </Box>
          }
           {formik.values?.contact?.headline &&
            <Box mb={2}>
              <Typography variant='body2' fontWeight='bold'>Headline</Typography>
              <Typography variant='body1'>{formik.values?.contact?.headline}</Typography>
            </Box>
          }
           {formik.values?.headline &&
            <Box mb={2}>
              <Typography variant='body2' fontWeight='bold'>Headline</Typography>
              <Typography variant='body1'>{formik.values?.headline}</Typography>
            </Box>
          }
        </CardContent>
      </Card>
      {dialogOpen && 
        <ContactEditor 
          onSave={handleSave}
          onCancel={handleCancel}
          profile={formik.values || {}}
        />
      }
    </>
  );
};

export default ContactViewer;