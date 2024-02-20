import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { Dialog, DialogContent, DialogActions, Button, Box, Typography, Divider, TextField, IconButton } from '@mui/material';
import FormikTextField from '../FormikTextField/FormikTextField';
import DeleteIcon from '@mui/icons-material/Delete';

const initialValues = {
    bulletList: [],
    description: null
}

const AboutEditor = ({ about, onSave, onCancel }) => {

    const formik = useFormik({
        initialValues: about || initialValues,
        enableReinitialize: true,
    });

    useEffect(() => {
        console.log(formik.values);
    }, [formik.values]);

    return(
        <Dialog open fullWidth>
            <DialogContent>
                <Box>
                    <Typography variant='h5' fontWeight='bold' gutterBottom>ABOUT EDITOR</Typography>
                    <Divider/>
                </Box>
                <Box mt={2}>
                    <FormikTextField
                        name='description'
                        label='Description'
                        multiline
                        minRows={4}
                        formik={formik}
                    />
                </Box>
                <Box>
                    {formik.values.bulletList.map((listItem, index) => (
                        <Box display='flex' justifyContent='space-between' width='100%' mt={2}>
                            <TextField 
                                fullWidth
                                id={index}
                                name={`['bulletList'][${index}]['text']`}
                                label='List Item'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.bulletList?.at(index)?.text}
                                helperText={formik.errors.bulletList?.at(index)?.text}
                                error={formik.errors.bulletList?.at(index).text}
                                FormHelperTextProps={{ sx: {position: 'absolute', top: 40, textWrap: 'pretty'} }}
                                size='small'
                            />
                            <Box ml={1}>
                                <IconButton onClick={() => formik.setFieldValue('bulletList', formik.values.bulletList.filter(item => item.id !== listItem.id))}>
                                    <DeleteIcon color='secondary'/>
                                </IconButton>
                            </Box>   
                        </Box>
                    ))}
                    <Box display='flex' justifyContent='center' mt={2}>
                        <Button variant='contained' onClick={() => formik.setFieldValue('bulletList', [...formik.values.bulletList, { id: `id${Math.random().toString(16)}`, text: '' }])}>Add Bullet</Button>
                    </Box>
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