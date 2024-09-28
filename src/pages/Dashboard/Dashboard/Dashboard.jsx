import MenuIcon from "@mui/icons-material/Menu";
import { Button } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import * as React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth/useAuth";
import "./Dashboard.css";

const drawerWidth = 250;

function Dashboard(props) {
  const { user, logOut, admin } = useAuth();
  console.log(admin);
  const navigate = useNavigate();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  /* log out */
  const userLogOut = () => {
    logOut();
    navigate("/");
  };

  const drawer = (
    <div id="drawer">
      <Toolbar>
        <Typography color="GrayText" variant="subtitle2" component="div">
          {user.email}
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        <ListItem>
          <Link to="/home">Home</Link>
        </ListItem>
        {admin && (
          <>
            <ListItem>
              <Link to={`/dashboard/admin/makeAdmin`}>Make Admin</Link>
            </ListItem>
            <ListItem>
              <Link to={`/dashboard/admin/allOrders`}>Manage All Orders</Link>
            </ListItem>
            <ListItem>
              <Link to={`/dashboard/admin/addProduct`}>Add Product</Link>
            </ListItem>
            <ListItem>
              <Link to={`/dashboard/admin/manageProducts`}>
                Manage Products
              </Link>
            </ListItem>
          </>
        )}
        {!admin && (
          <>
            <ListItem>
              <Link to={`/dashboard/${user && user.displayName}/orders`}>
                My Orders
              </Link>
            </ListItem>
            <ListItem>
              <Link to={`/dashboard/${user && user.displayName}/payment`}>
                Payment
              </Link>
            </ListItem>
            <ListItem>
              <Link to={`/dashboard/${user && user.displayName}/review`}>
                Review
              </Link>
            </ListItem>
          </>
        )}
        <ListItem>
          <Button onClick={userLogOut} variant="contained" color="warning">
            Log Out
          </Button>
        </ListItem>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {admin ? "Admin" : user.displayName}'s Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />

        <Outlet />
        {/* <Switch>
        <Route exact path={`${path}`}>
          <UserOrders></UserOrders>
        </Route>
        <Route  path={`${path}/payment`}>
          <Payment></Payment>
        </Route>
        <Route  path={`${path}/review`}>
        <Review></Review>
        </Route>
        <Route  path={`${path}/makeAdmin`}>
          <MakeAdmin></MakeAdmin>
        </Route>
        <Route path={`${path}/allOrders`}>
          <AllOrders></AllOrders>
        </Route>
        <Route  path={`${path}/addProduct`}>
          <AddProduct></AddProduct>
        </Route>
        <Route  path={`${path}/manageProducts`}>
          <ManageProducts></ManageProducts>
        </Route>
      </Switch> */}
      </Box>
    </Box>
  );
}

Dashboard.propTypes = {
  window: PropTypes.func,
};

export default Dashboard;
