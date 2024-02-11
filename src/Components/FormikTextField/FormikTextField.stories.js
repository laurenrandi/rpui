import { useFormik } from 'formik';
import FormikTextField from './FormikTextField';
import { Container, Typography } from '@mui/material';

const initialValues = {
  field: ""
}

const Wrapper = (props) => {
  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true
  })
  return (
    <Container>
      <FormikTextField
        formik={formik}
        name='field'
        label='Field'
      />
    </Container>

  )
}

export default {
  title: 'Components/FormikTextField',
  component: Wrapper,
  parameters: {
    layout: 'centered',
  }
};

export const Primary = {};