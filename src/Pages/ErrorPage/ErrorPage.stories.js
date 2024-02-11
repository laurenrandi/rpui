import ErrorPage from './ErrorPage';

export default {
  title: '/ErrorPage',
  component: ErrorPage,
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