import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  Dashboard,
  AccountBalanceWallet,
  PieChart,
  Flag,
  Settings,
  Category,
  CreditCard,
  BarChart,
  Person,
  HelpOutline,
} from '@mui/icons-material';
import { SidebarProps } from '../types/layout';
import { useTranslation } from 'react-i18next';

const SidebarMenu = ({ collapsed }: SidebarProps) => {
  const location = useLocation();
  const { t } = useTranslation();

  const menuItems = [
    { text: t('sidebar.home'), path: '/user', icon: <Dashboard fontSize="small" /> },
    {
      text: t('sidebar.transaction'),
      path: '/user/transactions',
      icon: <AccountBalanceWallet fontSize="small" />,
    },
    { text: t('sidebar.category'), path: '/user/categories', icon: <Category fontSize="small" /> },
    { text: t('sidebar.wallet'), path: '/user/wallets', icon: <CreditCard fontSize="small" /> },
    { text: t('sidebar.report'), path: '/user/reports', icon: <BarChart fontSize="small" /> },
    { text: t('sidebar.budget'), path: '/user/budget', icon: <PieChart fontSize="small" /> },
    { text: t('sidebar.target'), path: '/user/goals', icon: <Flag fontSize="small" /> },
    { text: t('sidebar.setting'), path: '/user/settings', icon: <Settings fontSize="small" /> },
    {
      text: t('sidebar.account'),
      path: '/user/settings/profile',
      icon: <Person fontSize="small" />,
    },
    { text: t('sidebar.helper'), path: '/user/help', icon: <HelpOutline fontSize="small" /> },
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
