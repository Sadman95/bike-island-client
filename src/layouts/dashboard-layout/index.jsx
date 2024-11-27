import { ChevronLeft, ChevronRight, Home, Menu as MenuIcon } from '@mui/icons-material';
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import { ROLES } from 'enums';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import { logout } from 'redux/auth.reducer';
import { selectCurrentUser } from 'redux/selector';

import UserMenu from 'components/user-menu';
import { createStructuredSelector } from 'reselect';
import { adminNavLinks, userNavLinks } from './nav-links';

const minimizedDrawerWidth = 60;

/**
 * ==========================================
 * DashboardLayout - dashboard layout wrapper
 * ==========================================
 */
const DashboardLayout = (props) => {
  const { user } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDrawerMinimized, setIsDrawerMinimized] = useState(false);
  const [drawerWidth, setDrawerWidth] = useState(window?.innerWidth * 0.2);

  useEffect(() => {
    if (window) {
      setDrawerWidth(window.innerWidth * 0.2);
    }
  }, [window]);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const handleDrawerMinimizeToggle = () => setIsDrawerMinimized(!isDrawerMinimized);

  const drawerContent = (
    <div>
      <Toolbar
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: isDrawerMinimized ? 'center' : 'end',
          justifyContent: 'center',
        }}
      >
        <IconButton onClick={handleDrawerMinimizeToggle}>
          {isDrawerMinimized ? <ChevronRight /> : <ChevronLeft />}
        </IconButton>
      </Toolbar>
      <Divider />
      <List sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <ListItem component={Link} to={`/${user.role == ROLES.USER ? '' : 'dashboard'}`}>
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          {!isDrawerMinimized && <ListItemText primary="Home" />}
        </ListItem>
        {user.role != ROLES.USER
          ? adminNavLinks.map((navlink) => (
            <ListItem key={navlink.to} component={Link} to={`/dashboard${navlink.to}`} >
              <ListItemIcon>{navlink.icon}</ListItemIcon>
              {!isDrawerMinimized && <ListItemText primary={navlink.title} />}
            </ListItem>
          ))
          : userNavLinks.map((navlink) => (
            <ListItem key={navlink.to} component={Link} to={`/dashboard${navlink.to}`} >
              <ListItemIcon>{navlink.icon}</ListItemIcon>
              {!isDrawerMinimized && <ListItemText primary={navlink.title} />}
            </ListItem>
          ))}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window.document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        id="app-bar"
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${isDrawerMinimized ? minimizedDrawerWidth : drawerWidth}px)` },
          ml: { sm: `${isDrawerMinimized ? minimizedDrawerWidth : drawerWidth}px` },
          bgcolor: 'primary.main',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            {user.role != ROLES.USER ? user.role?.toUpperCase() : `${user.firstName}`}'s Dashboard
          </Typography>
          {user && <UserMenu />}
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{
          width: { sm: isDrawerMinimized ? minimizedDrawerWidth : drawerWidth },
          flexShrink: { sm: 0 },
        }}
        aria-label="dashboard menu"
      >
        <Drawer
          id='dashboard-drawer'
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: isDrawerMinimized ? minimizedDrawerWidth : drawerWidth,
              transition: 'width 0.3s',
            },
          }}
        >
          {drawerContent}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: isDrawerMinimized ? minimizedDrawerWidth : drawerWidth,
              transition: 'width 0.3s',
            },
          }}
          open
        >
          {drawerContent}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 4,
          mt: 8,
          width: `${window?.innerWidth} - ${isDrawerMinimized ? minimizedDrawerWidth : drawerWidth}px` ,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

DashboardLayout.propTypes = {
  user: PropTypes.object,
  window: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardLayout);
