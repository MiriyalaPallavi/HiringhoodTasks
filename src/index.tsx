import React from 'react';
import ReactDOM from 'react-dom/client';
import CalculatorApp from './calculatorapp';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <ThemeProvider theme={theme}>
    <React.StrictMode>
      <CalculatorApp />
    </React.StrictMode>
  </ThemeProvider>
);
