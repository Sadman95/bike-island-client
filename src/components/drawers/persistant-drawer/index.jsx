import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import { styled, useTheme } from '@mui/material/styles';
import * as React from 'react';

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: 'auto',
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    }),
  }),
);

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));

export default function PersistentDrawer({ open, onClose, children, anchor='right' }) {
  const theme = useTheme();
  const [isDragging, setIsDragging] = React.useState(false);
  const [drawerWidth, setDrawerWidth] = React.useState(window.innerWidth * 0.3);

  const drawerRef = React.useRef(null);

  // Start dragging on mouse down
  const handleMouseDown = (e) => {
    setIsDragging(true);
    e.preventDefault();
  };

  // End dragging on mouse up
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Handle drawer resizing on mouse move
  const handleMouseMove = (e) => {
    if (isDragging) {
      const newWidth = window.innerWidth - e.clientX;
      const minWidth = window.innerWidth * 0.3; // Minimum width of the drawer
      const maxWidth = window.innerWidth * 0.8; // Maximum width (80% of window width)

      // Update drawer width state if it's within bounds
      if (newWidth >= minWidth && newWidth <= maxWidth) {
        setDrawerWidth(newWidth);
      }
    }
  };

  React.useEffect(() => {
    // Attach event listeners for resizing when dragging starts
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      // Remove event listeners when dragging stops
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }

    // Cleanup event listeners on unmount or when dragging stops
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <Box
      sx={{
        position: 'absolute',
        zIndex: 999,
      }}
    >
      <CssBaseline />
      <Main open={open}>
        <Drawer
          onClose={onClose}
          ref={drawerRef}
          sx={{
            position: 'relative',
            zIndex: 1000,
            width: drawerWidth, // Bind the drawer's width to the dynamic state
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth, // Ensure the paper width also reflects the dynamic state
              backgroundColor: theme.palette.common.white, // Set the drawer background color to match the theme
            },
          }}
          variant="temporary"
          anchor={anchor}
          open={open}
        >
          <DragIndicatorIcon
            sx={{
              position: 'absolute',
              zIndex: 1000,
              backgroundColor: 'transparent',
              top: '50%',
              left: '-8px',
              cursor: 'ew-resize', // Change cursor to indicate resize action
              width: 30,
              height: 30,
              color: theme.palette.text.primary,
            }}
            onMouseDown={handleMouseDown} // Use onMouseDown to start dragging
          />
          <DrawerHeader></DrawerHeader>
          <Divider />
          {children}
        </Drawer>
      </Main>
    </Box>
  );
}
