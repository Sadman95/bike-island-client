import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {
  Badge,
  Box,
  Button,
  Container,
  IconButton,
  styled,
  useScrollTrigger,
} from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import useAuth from '../../../hooks/useAuth';
import { useCart } from '../../../hooks/useCart';
import PersistentDrawerRight from '../../drawers/persistant-drawer';
import { data } from './data';

import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Menu,
  MenuItem,
  Toolbar,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import PropTypes from 'prop-types';
import { StyledTypography } from '../../styled';

// elevation
function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return children
    ? React.cloneElement(children, {
      sx: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: trigger && 'blur(10px)',
        transition: 'all 0.3s ease',
      },
		  })
    : null;
}

ElevationScroll.propTypes = {
  children: PropTypes.element,
  /**
	 * Injected by the documentation to work in an iframe.
	 * You won't need it on your project.
	 */
  window: PropTypes.func,
};

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

const Navigation = (props) => {
  const [open, setOpen] = useState(false);
  const { cart } = useCart();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const { user, logOut } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <ElevationScroll {...props}>
      <AppBar color="theme.palette.common.black" position="fixed">
        <PersistentDrawerRight open={open} setOpen={setOpen} data={cart} />
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <StyledTypography
              variant="h1"
              noWrap
              component={Link}
              to="/home"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontWeight: 700,
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
							Bike Island
            </StyledTypography>

            {isMobile ? (
              <>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={handleMenu}
                  sx={{ ml: 'auto' }}
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  {data.map((item) => (
                    <MenuItem
                      key={item.title}
                      onClick={handleClose}
                      component={HashLink}
                      to={'#' + item.hashValue}
                    >
                      {item.title}
                    </MenuItem>
                  ))}
                </Menu>
              </>
            ) : (
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {data.map((item) => (
                  <Button
                    key={item.title}
                    component={HashLink}
                    to={'#' + item.hashValue}
                    sx={{ my: 2, color: 'black', display: 'block' }}
                  >
                    {item.title}
                  </Button>
                ))}
              </Box>
            )}

            <Box sx={{ flexGrow: 0 }}>
              <IconButton aria-label="cart" onClick={handleDrawerOpen}>
                <StyledBadge badgeContent={cart.length} color="secondary">
                  <ShoppingCartIcon />
                </StyledBadge>
              </IconButton>
              {user?.email ? (
                <Button color="inherit" onClick={logOut}>
									Logout
                </Button>
              ) : (
                <Button color="inherit" component={Link} to="/login">
									Login
                </Button>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ElevationScroll>
  );
};

export default Navigation;
