import AboutViewer from './AboutViewer';
import sampleProfile from '../../Lib/sampleProfile.json';

export default {
  title: 'ProfileViewers/About',
  component: AboutViewer,
  parameters: {
    layout: 'centered',
  }
};

export const Default = {};
export const Populated = {
  args: {
    about: sampleProfile.about
  }
};