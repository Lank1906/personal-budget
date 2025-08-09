import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Paper, Alert } from '@mui/material';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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
          Đăng nhập
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={3}>
          Chào mừng trở lại
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
            label="Mật khẩu"
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
            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default LoginPage;
