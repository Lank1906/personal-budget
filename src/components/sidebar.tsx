import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  Dashboard,
  AccountBalanceWallet,
  PieChart,
  Flag,
  TrendingUp,
  Settings,
} from '@mui/icons-material';
import { SidebarProps } from '../types/layout';

const SidebarMenu = ({ collapsed }: SidebarProps) => {
  const location = useLocation();

  const menuItems = [
    { text: 'Dashboard', path: '/', icon: <Dashboard fontSize="small" /> },
    { text: 'Giao dịch', path: '/transactions', icon: <AccountBalanceWallet fontSize="small" /> },
    { text: 'Ngân sách', path: '/budget', icon: <PieChart fontSize="small" /> },
    { text: 'Mục tiêu', path: '/goals', icon: <Flag fontSize="small" /> },
    { text: 'Báo cáo', path: '/reports', icon: <TrendingUp fontSize="small" /> },
    { text: 'Cài đặt', path: '/settings', icon: <Settings fontSize="small" /> },
  ];

  return (
    <List sx={{ width: '100%', mt: 1 }}>
      {menuItems.map((item) => {
        const active = location.pathname === item.path;

        return (
          <ListItemButton
            key={item.text}
            component={RouterLink}
            to={item.path}
            sx={{
              justifyContent: collapsed ? 'center' : 'flex-start',
              px: collapsed ? 1.5 : 2,
              py: 1,
              borderRadius: 2,
              fontWeight: active ? 'bold' : 'normal',
              color: active ? 'primary.main' : 'text.primary',
              bgcolor: active ? 'action.selected' : 'transparent',
              transition: 'all 0.2s ease',
              '&:hover': {
                bgcolor: 'action.hover',
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: collapsed ? 0 : 1.5,
                justifyContent: 'center',
                color: active ? 'primary.main' : 'text.secondary',
              }}
            >
              {item.icon}
            </ListItemIcon>
            {!collapsed && (
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontSize: 14,
                  fontWeight: active ? 600 : 400,
                }}
              />
            )}
          </ListItemButton>
        );
      })}
    </List>
  );
};

export default SidebarMenu;
