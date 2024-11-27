import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {
  Badge,
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  styled,
  useScrollTrigger,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Menu, MenuItem, Toolbar, useMediaQuery, useTheme } from '@mui/material';
import PersistentDrawer from 'components/drawers/persistant-drawer';
import CartList from 'components/list/cart-list';
import { StyledTypography } from 'components/styled';
import UserMenu from 'components/user-menu';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { clearAllFromCart } from 'redux/cart.reducer';
import { selectCurrentCart, selectCurrentUser, selectCurrentWishlist } from 'redux/selector';
import { createStructuredSelector } from 'reselect';
import { navLinks } from './data';

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
          padding: '1rem',
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
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { cart, currentUser, wishlist } = props;
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!currentUser) {
      dispatch(clearAllFromCart());
    }
  }, [currentUser]);

  const cartItemCount = cart?.reduce((total, item) => total + item.quantity, 0) || 0;
  const wishlistItemCount = wishlist?.length || 0;

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleWishlist = () => {
    navigate('/wishlist', {
      state: {
        from: location.pathname,
      },
    });
  };

  // login handler
  const handleLogin = () => {
    navigate('/auth/login', {
      replace: true,
      state: {
        from: location.pathname,
      },
    });
  };

  return (
    <>
      <ElevationScroll {...props}>
        <AppBar
          color="theme.palette.common.black"
          position="fixed"
          id="app-bar"
          sx={{
            position: 'fixed',
            zIndex: 0,
          }}
        >
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
                    {navLinks.map((item) => (
                      <MenuItem
                        key={item.title}
                        onClick={handleClose}
                        component={HashLink}
                        to={'/home#' + item.hashValue}
                      >
                        {item.title}
                      </MenuItem>
                    ))}
                  </Menu>
                </>
              ) : (
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                  {navLinks.map((item) => (
                    <Button
                      key={item.title}
                      component={HashLink}
                      to={'/home#' + item.hashValue}
                      sx={{ my: 2, color: 'black', display: 'block' }}
                    >
                      {item.title}
                    </Button>
                  ))}
                </Box>
              )}

              <Stack direction={(theme) => (theme.breakpoints.down('md') ? 'column' : 'row')}>
                <IconButton
                  aria-label="wishlist"
                  onClick={handleWishlist}
                  disabled={wishlistItemCount === 0 || location.pathname.includes('wishlist')}
                >
                  <StyledBadge badgeContent={wishlistItemCount} color="error">
                    <FavoriteBorderIcon />
                  </StyledBadge>
                </IconButton>
                <IconButton aria-label="cart" onClick={handleDrawerOpen}>
                  <StyledBadge badgeContent={cartItemCount} color="secondary">
                    <ShoppingCartIcon />
                  </StyledBadge>
                </IconButton>
                {currentUser ? (
                  <UserMenu />
                ) : (
                  <Button color="inherit" onClick={handleLogin}>
                    Login
                  </Button>
                )}
              </Stack>
            </Toolbar>
          </Container>
        </AppBar>
      </ElevationScroll>
      <PersistentDrawer open={open} setOpen={setOpen}>
        <CartList />
      </PersistentDrawer>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  cart: selectCurrentCart,
  currentUser: selectCurrentUser,
  wishlist: selectCurrentWishlist,
});

export default connect(mapStateToProps)(Navigation);
