import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const Cloud = ({ size = 100, top = '10%', left = '10%', duration = 12 }: any) => (
    <motion.div
      animate={{ x: [0, 60, 0] }}
      transition={{ duration, repeat: Infinity, ease: 'easeInOut' }}
      style={{ position: 'absolute', top, left, opacity: 0.7 }}
    >
      <svg width={size} height={size / 2} viewBox="0 0 100 50" fill="white">
        <circle cx="25" cy="25" r="25" />
        <circle cx="60" cy="25" r="20" />
        <circle cx="85" cy="30" r="15" />
      </svg>
    </motion.div>
  );

  const UFO = ({ size = 200, top = '50%', left = '50%', delay = 0 }: any) => (
    <motion.div
      animate={{ y: [0, -15, 0], rotate: [-2, 2, -2] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay }}
      style={{
        position: 'absolute',
        top,
        left,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <svg width={size} height={size * 0.6} viewBox="0 0 200 120">
        <ellipse cx="100" cy="60" rx="80" ry="30" fill="#fff" opacity="0.9" />
        <ellipse cx="100" cy="50" rx="50" ry="20" fill="#764ba2" />
        <circle cx="70" cy="45" r="8" fill="#fff" />
        <circle cx="100" cy="40" r="10" fill="#fff" />
        <circle cx="130" cy="45" r="8" fill="#fff" />
      </svg>
    </motion.div>
  );

  const BrokenWire = () => (
    <motion.div
      animate={{ opacity: [1, 0.3, 1] }}
      transition={{ duration: 1, repeat: Infinity }}
      style={{
        position: 'absolute',
        bottom: '5%',
        left: '50%',
        transform: 'translateX(-50%)',
      }}
    >
      <svg width="200" height="80" viewBox="0 0 200 80">
        <line x1="0" y1="40" x2="200" y2="40" stroke="#222" strokeWidth="6" />
        <line x1="95" y1="35" x2="105" y2="20" stroke="orange" strokeWidth="4" />
        <line x1="105" y1="35" x2="95" y2="20" stroke="orange" strokeWidth="4" />
        <circle cx="100" cy="25" r="6" fill="yellow" opacity="0.8" />
        <circle cx="110" cy="30" r="4" fill="yellow" opacity="0.6" />
        <circle cx="90" cy="30" r="4" fill="yellow" opacity="0.6" />
      </svg>
    </motion.div>
  );

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        background: 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)',
        color: '#fff',
        position: 'relative',
        overflow: 'hidden',
        px: 2,
      }}
    >
      <Cloud size={120} top="15%" left="10%" duration={14} />
      <Cloud size={150} top="25%" left="70%" duration={18} />
      <Cloud size={100} top="40%" left="20%" duration={12} />
      <Cloud size={80} top="60%" left="80%" duration={16} />

      <UFO size={160} top="30%" left="40%" delay={0} />
      <UFO size={120} top="55%" left="70%" delay={1} />
      <UFO size={100} top="70%" left="25%" delay={2} />

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Typography
          variant="h1"
          sx={{
            fontWeight: 800,
            fontSize: { xs: '5rem', md: '9rem' },
            textShadow: '2px 2px 10px rgba(0,0,0,0.3)',
          }}
        >
          404
        </Typography>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <Typography
          variant="h6"
          sx={{
            mb: 3,
            color: 'rgba(255,255,255,0.9)',
            fontWeight: 400,
          }}
        >
          {t('notfound.title')}
        </Typography>
      </motion.div>

      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.6 }}
      >
        <Button
          variant="contained"
          onClick={() => navigate('/user')}
          sx={{
            px: 4,
            py: 1.5,
            fontSize: '1rem',
            fontWeight: 600,
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            boxShadow: '0 6px 20px rgba(0,0,0,0.2)',
            '&:hover': {
              background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
              transform: 'scale(1.05)',
              transition: 'all 0.3s ease-in-out',
            },
          }}
        >
          {t('notfound.backToHome')}
        </Button>
      </motion.div>
      <BrokenWire />
    </Box>
  );
};

export default NotFoundPage;
