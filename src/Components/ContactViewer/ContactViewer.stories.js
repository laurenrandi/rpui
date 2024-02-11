import ContactViewer from './ContactViewer';
import sampleProfile from '../../Lib/sampleProfile.json';
import { Box } from '@mui/material';

export default {
  title: 'ProfileViewers/Contact',
  component: ContactViewer,
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

export const Primary = {};
export const Populated = {
  args: {
    contact: sampleProfile.contact
  }
};