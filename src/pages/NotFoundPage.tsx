import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        backgroundColor: '#f8f9fa',
      }}
    >
      <Typography variant="h1" color="primary" fontWeight={700}>
        404
      </Typography>
      <Typography variant="h5" color="text.secondary" mb={2}>
        Oops! Trang bạn tìm không tồn tại.
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate('/')}>
        Quay về Trang chủ
      </Button>
    </Box>
  );
};

export default NotFoundPage;
