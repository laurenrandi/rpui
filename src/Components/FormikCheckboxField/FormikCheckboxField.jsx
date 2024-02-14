import { Box, Checkbox, Typography } from '@mui/material';
import React from 'react';

const FormikCheckboxField = (props) => {
  
  return(
    <Box display='flex' justifyContent='left' alignItems='center'>
      <Checkbox
        id={props.name}
        value={props.formik[props.name] || false}
        onChange={props.formik.handleChange}
        onBlur={props.formik.handleBlur}
        onError={props.formik.errors[props.name]}
        size='small'
        />
      {props.label && <Box ml={1}><Typography>{props.label}</Typography></Box>}
    </Box>
  );
};

export default FormikCheckboxField;