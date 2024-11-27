import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

/**
 * ========================================
 * NotFound - not found page view
 * ========================================
 */
const NotFound = () => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      height: '100vh',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 4,
    }}
  >
    <Typography variant="h1" fontWeight={900} fontSize={90}>
      404
    </Typography>
    <Typography variant="h4">Page not found!</Typography>
    <Link to={'/'}>
      <Button variant="contained">Go Home</Button>
    </Link>
  </Box>
);

export default NotFound;
