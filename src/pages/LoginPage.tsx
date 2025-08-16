import React, { JSX, useState } from 'react';
import {
  Button,
  Container,
  Tab,
  Tabs,
  TextField,
  Typography,
  Paper,
  Stack,
  CircularProgress,
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { FirebaseAuthService } from '../apis/auth';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useGlobalLoading } from '../hooks/useGlobalLoading';

const authService = new FirebaseAuthService();

export default function LoginPage(): JSX.Element {
  const { t } = useTranslation();
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const loading = useGlobalLoading();

  const handleSubmit = async (): Promise<void> => {
    if (tab === 'register' && password !== confirmPassword) {
      toast.error(t('passwordMismatch'));
      return;
    }

    if (tab === 'login') {
      await authService.login(email, password, {
        successFn: (user: any) => toast('login success', user?.toJSON()),
      });
    } else {
      await authService.register(email, password, {
        successFn: (user: any) => toast('register success', user?.toJSON()),
      });
    }
  };

  const handleGoogleAuth = async (): Promise<void> => {
    await authService.loginWithGoogle({
      successFn: (user: any) => toast('login success', user?.toJSON()),
    });
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={4} sx={{ mt: 8, p: 4, borderRadius: 3, textAlign: 'center' }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          {tab === 'login' ? t('login.login') : t('login.register')}
        </Typography>

        <Tabs value={tab} onChange={(_, value) => setTab(value)} centered sx={{ mb: 3 }}>
          <Tab label={t('login.login')} value="login" />
          <Tab label={t('login.register')} value="register" />
        </Tabs>

        <Stack spacing={2}>
          <TextField
            label={t('login.email')}
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                backgroundColor: '#f3f4f6',
              },
              '& .MuiInputBase-input': {
                padding: '12px 14px',
                marginBottom: 0,
              },
              '& .MuiInputLabel-root': {
                backgroundColor: 'white',
              },
            }}
          />
          <TextField
            label={t('login.password')}
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                backgroundColor: '#f3f4f6',
              },
              '& .MuiInputBase-input': {
                padding: '12px 14px',
                marginBottom: 0,
              },
              '& .MuiInputLabel-root': {
                backgroundColor: 'white',
              },
            }}
          />

          {tab === 'register' && (
            <TextField
              label={t('login.confirmPassword')}
              type="password"
              fullWidth
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  backgroundColor: '#f3f4f6',
                },
                '& .MuiInputBase-input': {
                  padding: '12px 14px',
                  marginBottom: 0,
                },
                '& .MuiInputLabel-root': {
                  backgroundColor: 'white',
                },
              }}
            />
          )}

          <Button
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            onClick={handleSubmit}
            disabled={loading}
            sx={{ mt: 1 }}
          >
            {loading ? (
              <CircularProgress size={26} color="inherit" />
            ) : tab === 'login' ? (
              t('login.login')
            ) : (
              t('login.register')
            )}
          </Button>

          <Typography variant="body2" sx={{ my: 1, color: 'gray' }}>
            {t('or')}
          </Typography>

          <Button
            variant="outlined"
            startIcon={<GoogleIcon />}
            fullWidth
            size="large"
            onClick={handleGoogleAuth}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={26} color="inherit" />
            ) : tab === 'login' ? (
              t('login.loginWithGoogle')
            ) : (
              t('login.registerWithGoogle')
            )}
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}
