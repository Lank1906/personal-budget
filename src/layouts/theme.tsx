import { createTheme } from '@mui/material/styles';

export const getAppTheme = (mode: 'light' | 'dark') =>
  createTheme({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            background: {
              default: 'var(--color-bg-light)',
              paper: 'var(--color-paper-light)',
            },
            text: {
              primary: 'var(--color-text-light)',
            },
            custom: {
              sidebar: 'var(--color-sidebar-light)',
            },
          }
        : {
            background: {
              default: 'var(--color-bg-dark)',
              paper: 'var(--color-paper-dark)',
            },
            text: {
              primary: 'var(--color-text-dark)',
            },
            custom: {
              sidebar: 'var(--color-sidebar-light)',
            },
          }),
    },
  });
