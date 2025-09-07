import { createTheme } from '@mui/material/styles';

export const getAppTheme = (mode: 'light' | 'dark') =>
  createTheme({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            background: {
              default: '#f5f5f5',
              paper: '#ffffff',
            },
            text: {
              primary: '#1f2937',
            },
            custom: {
              sidebar: '#e5e7eb',
            },
          }
        : {
            background: {
              default: '#111827',
              paper: '#1f2937',
            },
            text: {
              primary: '#f9fafb',
            },
            custom: {
              sidebar: '#1f2937',
              transition: 'all ease .2s',
            },
          }),
    },
  });
