import { MainLayoutProps } from '../types/layout';
import { Box, Breadcrumbs, Typography, Link, IconButton } from '@mui/material';
import { useMemo, useState } from 'react';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { getAppTheme } from './theme';

const MainLayout = ({ children }: MainLayoutProps) => {
  const location = useLocation();
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const theme = useMemo(() => getAppTheme(mode), [mode]);

  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <ThemeProvider theme={theme}>
      <Box
        display="flex"
        width="100%"
        height="100vh"
        bgcolor="background.default"
        color="text.primary"
      >
        <Box
          sx={{
            width: '250px',
            bgcolor: 'background.sidebar',
            p: 2,
          }}
        >
          <Typography variant="h6" mb={2}>
            Sidebar
          </Typography>
        </Box>

        <Box flex={1} p={3} overflow="auto">
          <Box display={'flex'}>
            <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
              <Link component={RouterLink} underline="hover" color="inherit" to="/">
                Home
              </Link>
              {pathnames.map((value, index) => {
                const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                const isLast = index === pathnames.length - 1;
                return isLast ? (
                  <Typography color="text.primary" key={to}>
                    {value}
                  </Typography>
                ) : (
                  <Link component={RouterLink} underline="hover" color="inherit" to={to} key={to}>
                    {value}
                  </Link>
                );
              })}
            </Breadcrumbs>
            <IconButton onClick={toggleColorMode} sx={{ color: 'text.primary' }}>
              {mode === 'light' ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Box>
          <Box>{children}</Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default MainLayout;
