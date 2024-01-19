import Nav from './Nav';

export default {
  title: 'Components/Nav',
  component: Nav,
  parameters: {
    layout: 'centered',
  }
};

export const User = {};
export const Admin = {
  args: {
    isAdmin: true
  }
};