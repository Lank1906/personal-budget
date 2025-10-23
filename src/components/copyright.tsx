import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import { CopyrightProps } from '../types/layout';

export default function Copyright({ collapsed }: CopyrightProps) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <Box
      mt="auto"
      width="100%"
      py={2}
      px={collapsed ? 0 : 2}
      textAlign="center"
      sx={{
        borderTop: (theme) => `1px solid ${theme.palette.divider}`,
      }}
    >
      {!collapsed ? (
        <Box display="flex" flexDirection="column" alignItems="center" mb={1}>
          <Box
            sx={{
              width: 80,
              height: 80,
              mb: 0.5,
              borderRadius: 2,
              boxShadow: 2,
              bgcolor: 'background.paper',
              cursor: 'pointer',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {}
            {!imgError ? (
              <Box
                component="img"
                src="/qr-placeholder.png"
                alt="Buy me a coffee"
                onLoad={() => setImgLoaded(true)}
                onError={() => setImgError(true)}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: imgLoaded ? 'none' : 'blur(6px)',
                  opacity: imgLoaded ? 1 : 0.6,
                  transition: 'opacity 0.3s ease, filter 0.3s ease',
                }}
              />
            ) : (
              <Typography variant="caption" color="text.secondary">
                📷 QR
              </Typography>
            )}
          </Box>

          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
          >
            ☕ Buy me a coffee
          </Typography>
        </Box>
      ) : (
        <Box display="flex" flexDirection="column" alignItems="center" mb={1}>
          <Typography variant="caption" sx={{ fontSize: 18 }}>
            ☕
          </Typography>
        </Box>
      )}

      {}
      {!collapsed ? (
        <Typography variant="caption" color="text.secondary">
          © 2025 Personal Budget
        </Typography>
      ) : (
        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
          ©Lank
        </Typography>
      )}
    </Box>
  );
}
