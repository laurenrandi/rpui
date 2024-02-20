import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Dialog, DialogContent, DialogActions, Button, Box, Typography, Divider, TextField, IconButton, Chip, Stack } from '@mui/material';
import FormikTextField from '../FormikTextField/FormikTextField';
import AddIcon from '@mui/icons-material/Add';

const initialValues = {
    bulletList: [],
    description: null
}

const AboutEditor = ({ about, onSave, onCancel }) => {

    const formik = useFormik({
        initialValues: about || initialValues,
        enableReinitialize: true
    });

    return(
        <Dialog open fullWidth>
            <DialogContent>
                <Box>
                    <Typography variant='h5' fontWeight='bold' gutterBottom>ABOUT EDITOR</Typography>
                    <Divider/>
                </Box>
                <Box>
                    <FormikTextField
                      name='description'
                      label='Description'
                      formik={formik}
                    />
                </Box>
                <Divider/>
                <Box>
                    {formik.values.bulletList.map((listItem, index) => (
                        <Box>
                            <FormikTextField
                              name={`bulletList[${index}].text`}
                              label='Bullet List Entry'
                              formik={formik}
                            />
                            <Box display='flex' flexDirection='column' justifyContent='center'>
                                <IconButton onClick={() => formik.values.bulletList.filter(item => item.id !== listItem.id)}>
                                    <DeleteIcon color='secondary'/>
                                </IconButton>
                            </Box>   
                            <Button onClick={() => formik.values.bulletList.push({ id: `id${Math.Random().toString(16)}`, text: '' })}/>
                        </Box>
                    ))}
                </Box>
            </DialogContent>
            <DialogActions>
                <Button variant='outlined' onClick={onCancel}>Cancel</Button>
                <Button variant='contained' color='primary' onClick={() => {onSave(formik.values)}}>Save</Button>
            </DialogActions>
        </Dialog>
    );

};

export default AboutEditor;