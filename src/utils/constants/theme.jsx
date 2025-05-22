import { createTheme } from '@mui/material';

const theme = createTheme({
  typography: {
    fontFamily: `'Nunito', sans-serif`,
  },
  palette: {
    primary: {
      main: '#4C9AFF',
    },
    secondary: {
      main: '#F53939',
    },
    background: {
      default: '#F9F9F9',
    },
    text: {
      dark: '#333333',
      light: '#F7F7F8',
    },
    accent: {
      main: '#F4D35E',
      highlight: '#FF7518',
      dark: '#333333',
    }
  },
});

export default theme;
