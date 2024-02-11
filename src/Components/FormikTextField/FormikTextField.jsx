import { TextField } from '@mui/material';
import React from 'react';

const FormikTextField = (props) => {
  return(
    <TextField
      fullWidth
      id={props.name}
      name={props.name}
      label={props.label}
      value={props.formik.values[props.name]}
      onChange={props.formik.handleChange}
      onBlur={props.formik.handleBur}
      helperText={props.helperText || ''}
      error={props.formik.errors[props.name]}
      {...props}
    />
  );
};

export default FormikTextField;