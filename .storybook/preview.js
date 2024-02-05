import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';
import { withThemeFromJSXProvider } from '@storybook/addon-themes';
import { withRouter } from 'storybook-addon-react-router-v6';

const theme = createTheme({
  palette: {
    primary: {
      main: '#005799',
    },
    secondary: {
      main: '#a32828',
    },
    elementBackground: {
      main: '#f2f2f2'
    }
  }
});

export const preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  withRouter
};

export const decorators =  [withThemeFromJSXProvider({
  GlobalStyles: CssBaseline,
  Provider: ThemeProvider,
  themes: {
    light: theme,
  },
  defaultTheme: 'light',
  withRouter
})];