import ContactViewer from './ContactViewer';
import sampleProfile from '../../Lib/sampleProfile.json';

export default {
  title: 'ProfileViewers/Contact',
  component: ContactViewer,
  parameters: {
    layout: 'centered',
  }
};

export const Default = {};
export const Populated = {
  args: {
    contact: sampleProfile.contact
  }
};