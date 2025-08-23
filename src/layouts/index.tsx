import { MainLayoutProps } from '../types/layout';
import { Box, Breadcrumbs, Typography, Link, IconButton, Divider, Tooltip } from '@mui/material';
import { useMemo, useState } from 'react';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { Brightness4, Brightness7, ChevronLeft, ChevronRight } from '@mui/icons-material';
import { getAppTheme } from './theme';

const MainLayout = ({ children }: MainLayoutProps) => {
  const location = useLocation();
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const [collapsed, setCollapsed] = useState(false);

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const toggleSidebar = () => {
    setCollapsed((prev) => !prev);
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
        gap={2}
      >
        {}
        <Box
          sx={{
            width: collapsed ? 72 : 260,
            transition: 'width 0.3s ease',
            bgcolor: 'background.paper',
            p: 2,
            boxShadow: 3,
            borderTopRightRadius: 12,
            borderBottomRightRadius: 12,
            display: 'flex',
            flexDirection: 'column',
            alignItems: collapsed ? 'center' : 'flex-start',
            position: 'relative',
          }}
        >
          {}
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            width="100%"
            mb={2}
          >
            <Box display="flex" alignItems="center">
              <Box
                component="img"
                src="/icon.png"
                alt="App Logo"
                sx={{ width: 32, height: 32, mr: collapsed ? 0 : 1 }}
              />
              {!collapsed && (
                <Typography variant="h6" fontWeight="bold" noWrap>
                  My App
                </Typography>
              )}
            </Box>
          </Box>

          <Tooltip title={collapsed ? 'Expand' : 'Collapse'}>
            <IconButton
              size="small"
              onClick={toggleSidebar}
              sx={{
                position: 'absolute',
                right: -15,
                top: '6.5%',
                transform: 'translateY(-50%)',
                bgcolor: 'background.paper',
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: '50%',
                '&:hover': {
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) scale(1.1)',
                  boxShadow: theme.shadows[3],
                },
              }}
            >
              {collapsed ? <ChevronRight /> : <ChevronLeft />}
            </IconButton>
          </Tooltip>

          <Divider sx={{ width: '100%', mb: 2 }} />

          {}
          <Box
            display="flex"
            flexDirection="column"
            gap={2}
            width="100%"
            alignItems={collapsed ? 'center' : 'left'}
          >
            <Link component={RouterLink} to="/" underline="none" color="text.primary">
              {collapsed ? '🏠' : '🏠 Dashboard'}
            </Link>
            <Link component={RouterLink} to="/settings" underline="none" color="text.primary">
              {collapsed ? '⚙️' : '⚙️ Settings'}
            </Link>
          </Box>
        </Box>

        {}
        <Box flex={1} display="flex" flexDirection="column" overflow="auto">
          {}
          <Box display="flex" justifyContent="space-between" alignItems="center" m={1}>
            <Breadcrumbs aria-label="breadcrumb">
              <Link component={RouterLink} underline="hover" color="inherit" to="/">
                Home
              </Link>
              {pathnames.map((value, index) => {
                const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                const isLast = index === pathnames.length - 1;
                return isLast ? (
                  <Typography color="text.primary" key={to} sx={{ textTransform: 'capitalize' }}>
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

          {}
          <Box flex={1} bgcolor="background.paper" borderRadius={3} boxShadow={1} p={3}>
            {children}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default MainLayout;
