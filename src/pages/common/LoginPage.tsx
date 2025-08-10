import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Paper, Alert } from '@mui/material';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { t, i18n } = useTranslation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem('role', 'user');
      navigate('/');
    } catch (err: any) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <Box
      sx={{
        height: '100vh',
        bgcolor: '#f8f9fa',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 8,
          width: '100%',
          maxWidth: 600,
          borderRadius: 3,
          textAlign: 'center',
        }}
      >
        <Typography variant="h5" fontWeight={600} mb={0.5} sx={{ letterSpacing: '-0.5px' }}>
          {t('login.loginbtn')}
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={3}>
          {t('login.welcome')}
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleLogin}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
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
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
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

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            sx={{
              mt: 2,
              py: 1.2,
              fontWeight: 600,
              borderRadius: 2,
              textTransform: 'none',
              bgcolor: '#111827',
              '&:hover': { bgcolor: '#1f2937' },
            }}
          >
            {loading ? t('login.logging') : t('login.loginbtn')}
          </Button>
        </form>
      </Paper>
      <div style={{ marginTop: 20 }}>
        <button onClick={() => i18n.changeLanguage('vi')}>🇻🇳 Tiếng Việt</button>
        <button onClick={() => i18n.changeLanguage('en')}>🇺🇸 English</button>
      </div>
    </Box>
  );
};

export default LoginPage;
