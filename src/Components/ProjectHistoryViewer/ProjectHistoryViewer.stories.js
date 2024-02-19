import ProjectHistoryViewer from './ProjectHistoryViewer';
import sampleProfile from '../../Lib/sampleProfile.json';
import emptyProfile from '../../Lib/emptyProfile.json';
import { Box } from '@mui/material';
import { useFormik } from 'formik';

const Wrapper = ({ initialValues }) => {
  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true
  });

  return (
    <ProjectHistoryViewer formik={formik} />
  )
}

export default {
  title: 'Components/ProjectHistory',
  component: Wrapper,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    Story => (
      <Box width={500}>
        <Story />
      </Box>
    )
  ]
};

export const Primary = {
  args: {
    initialValues: emptyProfile
  }
};
export const Populated = {
  args: {
    initialValues: sampleProfile
  }
};