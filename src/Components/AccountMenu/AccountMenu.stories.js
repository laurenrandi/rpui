import AccountMenu from './AccountMenu';
import { MemoryRouter } from 'react-router-dom';

export default {
  title: 'Components/AccountMenu',
  component: AccountMenu,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    )
  ],
};

export const Primary = {};