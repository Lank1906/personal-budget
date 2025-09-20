import { Box, Button, Paper, Typography } from '@mui/material';
import React from 'react';

export default function CategoryPage() {
  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight="bold">
          Category (20)
        </Typography>
        <Button variant="contained" color="success">
          + Add Category
        </Button>
      </Box>
      <Paper elevation={2}></Paper>
    </Box>
  );
}
