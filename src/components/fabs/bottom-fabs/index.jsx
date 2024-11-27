import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { Fab } from '@mui/material';


/**
 * ============
 * Bottom Fabs
 * ============
 */
const BottomFabs = ({ orientation = 'horizontal', actions = [] }) => {
  const [hidden, setHidden] = useState(false);

  const toggleHidden = () => {
    setHidden(window.scrollY >= 66);
  };

  useEffect(() => {
    toggleHidden();
    window.addEventListener('scroll', toggleHidden);
    return () => window.removeEventListener('scroll', toggleHidden);
  }, []);

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 16,
        right: 16,
        display: 'flex',
        flexDirection: orientation === 'horizontal' ? 'row' : 'column',
        gap: 1,
        zIndex: 1000,
      }}
    >
      {actions.map((action) => (
        <Fab
          sx={{
            display: hidden ? 'none' : 'flex',
            transition: 'all 0.3s ease',
          }}
          color="primary"
          aria-label={action.name}
          key={action.name}
        >
          {action.icon}
        </Fab>
      ))}
    </Box>
  );
};

export default BottomFabs;
