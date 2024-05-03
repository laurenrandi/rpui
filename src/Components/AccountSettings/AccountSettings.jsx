import { Box, Button, Dialog, DialogActions, DialogContent, Divider, Typography } from '@mui/material';
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext } from 'react';
import ServiceUtils from '../../Lib/ServiceUtils';
import UserContext from '../../Lib/UserContext/UserContext';
import FormikTextField from '../FormikTextField/FormikTextField';

const AccountSettings = ({ profile, onCancel, onSave}) => {
    const { user } = useContext(UserContext);
    const { setUser } = useContext(UserContext);
    const initialValues = {
        name: user.name
    }

  const formik = useFormik({
    initialValues: profile || initialValues,
    enableReinitialize: true,
  });


    const handleSave = async () => {
    axios.put(`${ServiceUtils.baseUrl}/users/${user.id}/update`, formik.values).then(response => setUser(response.data));
    }

    function myFunction(){
      handleSave();
      onCancel();
    }

    return(
        <Dialog open fullWidth>
            <DialogContent>
                <Box>
                    <Typography variant='h5' fontWeight='bold' gutterBottom>Account Settings</Typography>
                    <Divider/>
                </Box>
                <Box mt={2}>
                <Typography variant='body2' fontWeight='bold'>Name</Typography>
                    <FormikTextField
                        name='name'
                        formik={formik}
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button variant='outlined' onClick={onCancel}>Cancel</Button>
                <Button variant='contained' color='primary' onClick={myFunction}>Save</Button>
            </DialogActions>
        </Dialog>
        
    );
};

export default AccountSettings;