import { useFormik } from 'formik';
import ContactEditor from './ContactEditor';
import { Box } from '@mui/material';
import sampleProfile from '../../Lib/sampleProfile.json';

const Wrapper = ({ initialValues }) => {
  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true
  })

  return(
    <Box width={500}>
      <ContactEditor formik={formik} />
    </Box>
  )
}

export default {
  title: 'ProfileEditors/Contact',
  component: Wrapper,
  parameters: {
    layout: 'centered',
  }
};

const initialValues = {
  firstName: '',
  middleName: '',
  lastName: '',
  email: '',
  phoneNumber: ''
}

export const Primary = {
  args: {
    initialValues: initialValues
  }
};

export const Populated = {
  args: {
    initialValues: sampleProfile.contact
  }
};