import { useFormik } from 'formik';
import { Container } from '@mui/material';
import FormikCheckboxField from './FormikCheckboxField';

const Wrapper = ({ initialValues }) => {
  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true
  })
  return (
    <Container>
      <FormikCheckboxField
        formik={formik}
        name='checkField'
        label='Checkbox Field'
      />
    </Container>

  )
}

export default {
  title: 'FormikComponents/FormikCheckboxField',
  component: Wrapper,
  parameters: {
    layout: 'centered',
  }
};

export const Primary = {
  args: {
    initialValues: {
      checkField: false
    }
  }
};