import { Box, TextField, Typography } from '@mui/material';
import { ErrorMessage } from 'formik';
import React from 'react';

const FormikTextField = (props) => {
  return(
    <Box display='flex' flexDirection='column' width='100%'>
      <TextField
        fullWidth
        id={props.name}
        name={props.name}
        label={props.label}
        value={props.formik.values[props.name]}
        onChange={props.formik.handleChange}
        onBlur={props.formik.handleBur}
        helperText={props.formik.errors[props.name]}
        error={props.formik.errors[props.name]}
        size='small'
        FormHelperTextProps={{ sx: {position: 'absolute', top: 40, textWrap: 'pretty'} }}
        {...props}
      />
      {/* <Typography variant='caption' color='error'>{props.formik.errors[props.name]}</Typography> */}
    </Box>
  );
};

export default FormikTextField;