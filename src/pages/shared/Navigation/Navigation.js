import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MoreIcon from "@mui/icons-material/MoreVert";
import {useHistory} from 'react-router-dom';
import { Button, Chip } from "@mui/material";
import { HashLink } from "react-router-hash-link";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth/useAuth";

export default function PrimarySearchAppBar() {
  const { user, logOut } = useAuth();
  const history = useHistory();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  /* log out */
  const handleLogOut = () => {
    logOut();
    handleMenuClose();
  };

  /* dashboard open */
  const handleDashboard = ()=>{
    history.replace('/dashboard');
    handleMenuClose();
  }

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleDashboard}>Dashboard</MenuItem>
      <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <HashLink
          style={{ color: "#1976D2", textDecoration: "none" }}
          smooth
          to="/home#home"
        >
          Home
        </HashLink>
      </MenuItem>
      <MenuItem>
        <HashLink
          style={{ color: "#1976D2", textDecoration: "none" }}
          smooth
          to="/home#services"
        >
          Services
        </HashLink>
      </MenuItem>
      <MenuItem>
        <HashLink
          style={{ color: "#1976D2", textDecoration: "none" }}
          smooth
          to="/home#about"
        >
          About Us
        </HashLink>
      </MenuItem>
      <MenuItem>
        <HashLink
          style={{ color: "#1976D2", textDecoration: "none" }}
          smooth
          to="/home#products"
        >
          Products
        </HashLink>
      </MenuItem>
      <MenuItem>
        <HashLink
          style={{ color: "#1976D2", textDecoration: "none" }}
          smooth
          to="/home#reviews"
        >
          Reviews
        </HashLink>
      </MenuItem>
      <MenuItem>
        <HashLink
          style={{ color: "#1976D2", textDecoration: "none" }}
          smooth
          to="/home#contact"
        >
          Contact
        </HashLink>
      </MenuItem>
      {user.email ? (
        <IconButton
          size="large"
          edge="end"
          aria-label="account of current user"
          aria-controls={menuId}
          aria-haspopup="true"
          onClick={handleProfileMenuOpen}
          color="inherit"
        >
          <Chip label={user.displayName} variant="outlined" />
        </IconButton>
      ) : (
        <Link style={{ textDecoration: "none" }} to="/login">
          <Button variant="contained" color="secondary">
            Log In
          </Button>
        </Link>
      )}
    </Menu>
  );

    

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{ zIndex: 999 }} position="fixed">
        <Toolbar>
          <img
            width="100px"
            src="https://i.ibb.co/PmftjT2/logo.png"
            alt="logo"
          />

          <Typography
            color="white"
            fontFamily="Poppins"
            variant="h4"
            fontWeight="bold"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Bike Island
          </Typography>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
              <HashLink
                style={{ color: "white", textDecoration: "none" }}
                smooth
                to="/home#home"
              >
                Home
              </HashLink>
              <HashLink
                style={{ color: "white", textDecoration: "none" }}
                to="/home#services"
                smooth
              >
                Services
              </HashLink>
              <HashLink
                style={{ color: "white", textDecoration: "none" }}
                smooth
                to="/home#about"
              >
                About Us
              </HashLink>
              <HashLink
                style={{ color: "white", textDecoration: "none" }}
                smooth
                to="/home#products"
              >
                Products
              </HashLink>
              <HashLink
                style={{ color: "white", textDecoration: "none" }}
                smooth
                to="/home#reviews"
              >
                Reviews
              </HashLink>
              <HashLink
                style={{ color: "white", textDecoration: "none" }}
                smooth
                to="/home#contact"
              >
                Contact
              </HashLink>
              
            </Box>

            {user.email ? (
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <Chip label={user.displayName} variant="outlined" color='default' />
              </IconButton>
            ) : (
              <Link style={{ textDecoration: "none" }} to="/login">
                <Button variant="contained" color="secondary">
                  Log In
                </Button>
              </Link>
            )}
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
