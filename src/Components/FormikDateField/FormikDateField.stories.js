import { useFormik } from 'formik';
import { Container } from '@mui/material';
import FormikDateField from './FormikDateField';

const Wrapper = ({ initialValues }) => {
  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true
  })
  return (
    <Container>
      <FormikDateField
        formik={formik}
        name='dateField'
        label='Date Field'
      />
    </Container>

  )
}

export default {
  title: 'Components/FormikDateField',
  component: Wrapper,
  parameters: {
    layout: 'centered',
  }
};

export const Primary = {
  args: {
    initialValues: {
      dateField: ''
    }
  }
};

export const Populated = {
  args: {
    initialValues: {
      dateField: '2014-10-01T00:00:00.000+00:00'
    }
  }
};