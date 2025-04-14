import ReactDOM from 'react-dom/client';
import './index.css';
import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './utils/constants/theme.jsx';
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
