import { DateField, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import React from 'react';

const FormikDateField = (props) => {
  return(
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateField 
        fullWidth
        id={props.name}
        label={props.label}
        value={dayjs(props.formik.values[props.name])}
        onChange={(value) => props.formik.setFieldValue(props.name, dayjs(value).isValid() ? dayjs(value).format('YYYY-MM-DD') : null)}
        onBlur={props.formik.handleBlur}
        helperText={props.helperText || ''}
        format='YYYY-MM-DD'
        size='small'
      />
    </LocalizationProvider>
  );
};

export default FormikDateField;