import { Delete } from '@mui/icons-material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { styled, useTheme } from '@mui/material/styles';
import * as React from 'react';
import useCart from '../../../hooks/useCart';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

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
  })
);

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));

export default function PersistentDrawerRight({ open, setOpen, data }) {
  const theme = useTheme();
  const { dispatch } = useCart() || {};
  const [isDragging, setIsDragging] = React.useState(false);
  const [drawerWidth, setDrawerWidth] = React.useState(300); // Start with a default width of 300px

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
      const minWidth = 200; // Minimum width of the drawer
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

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Main open={open}>
        <DrawerHeader />
      </Main>
      <Drawer
        ref={drawerRef}
        sx={{
          position: 'relative',
          width: drawerWidth, // Bind the drawer's width to the dynamic state
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth, // Ensure the paper width also reflects the dynamic state
            backgroundColor: theme.palette.background.default, // Set the drawer background color to match the theme
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <DragIndicatorIcon
          sx={{
            position: 'absolute',
            zIndex: 1000,
            backgroundColor: theme.palette.common.white,
            top: '50%',
            left: '-15px',
            cursor: 'ew-resize', // Change cursor to indicate resize action
            width: 30,
            height: 30,
            color: theme.palette.text.primary,
          }}
          onMouseDown={handleMouseDown} // Use onMouseDown to start dragging
        />
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        {data.items.length > 0 ? (
          <List>
            {data.items.map((item, indx) => (
              <ListItem button key={item._id}>
                <Box>
                  <img
                    style={{ width: 100, height: 100 }}
                    src={item.productImg}
                    alt={item.productTitle}
                  />
                </Box>
                <ListItemText
                  primary={item.productTitle}
                  sx={{ color: theme.palette.text.primary }} // Ensure text is visible
                />
                <ListItemText
                  primary={`${item.productPrice}`}
                  sx={{ color: theme.palette.text.primary }} // Ensure price is visible
                />
                <ListItemText
                  primary={`${item.quantity}`}
                  sx={{ color: theme.palette.text.primary }} // Ensure quantity is visible
                />
                <IconButton
                  onClick={() =>
                    dispatch({ type: 'REMOVE_FROM_CART', payload: item })
                  }
                >
                  <Delete />
                </IconButton>
                {indx !== data.items.length - 1 && <Divider />}
              </ListItem>
            ))}
            <Divider />
            <ListItem>
              <ListItemText
                primary="Total"
                sx={{ color: theme.palette.text.primary }} // Ensure total is visible
              />
              <ListItemText
                primary={`${data.items.reduce(
                  (acc, item) => acc + item.productPrice * item.quantity,
                  0
                )}`}
                sx={{
                  color: theme.palette.text.primary,
                  display: 'flex',
                  justifyContent: 'flex-end',
                }} // Ensure total price is visible
              />
            </ListItem>
          </List>
        ) : (
          <Typography variant="h4" textAlign={'center'} my={4}>
						Cart is empty!
          </Typography>
        )}
      </Drawer>
    </Box>
  );
}
