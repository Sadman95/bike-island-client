import {
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { baseUrlV2 } from 'config/env';
import { useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from 'redux/auth.reducer';
import { clearNotifications, markAllAsRead } from 'redux/notification.reducer';
import { selectCurrentNotifications, selectCurrentUser } from 'redux/selector';
import { createStructuredSelector } from 'reselect';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { AccountCircle, Dashboard, Logout, Settings } from '@mui/icons-material';
import { ROLES } from 'enums';

const UserMenu = ({ user, onLogout }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { notifications, unreadCount } = useSelector(selectCurrentNotifications);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAvatarClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleNotificationClick = (event) => setNotificationAnchorEl(event.currentTarget);
  const handleNotificationClose = () => setNotificationAnchorEl(null);

  // Handle viewing notifications
  const handleNotificationsView = () => {
    dispatch(markAllAsRead());
    handleNotificationClose();
  };

  // Handle clearing notifications
  const handleClearNotifications = () => {
    dispatch(clearNotifications());
  };

  // handle logout

  const handleLogout = () => {
    onLogout();
    navigate('/auth/login', { replace: true });
  };

  return (
    <Toolbar
      sx={{
        display: 'flex',
        gap: 2,
      }}
    >
      {/* <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
        <SearchIcon />
        <input
          placeholder="Ctrl + K"
          style={{ border: '1px solid lightgrey', outline: 'none', marginLeft: 10, borderRadius: 6, padding: 4 }}
        />
      </Box> */}
      {unreadCount > 0 && (
        <IconButton color="inherit" onClick={handleNotificationClick}>
          <Badge badgeContent={unreadCount} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
      )}

      <Tooltip title="Profile">
        <IconButton onClick={handleAvatarClick} sx={{ p: 0 }}>
          <Avatar alt="User" src={`${baseUrlV2}/${user.avatar}`} />
        </IconButton>
      </Tooltip>

      {/* Profile Menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {user.role !== ROLES.USER && <MenuItem onClick={() => navigate('/dashboard')}>
          <Dashboard fontSize="small" sx={{ mr: 1 }} /> Dashboard
        </MenuItem>}
        <MenuItem onClick={() => navigate('/dashboard/profile')}>
          <AccountCircle fontSize="small" sx={{ mr: 1 }} /> Profile
        </MenuItem>
        <MenuItem onClick={() => navigate('/dashboard/settings')}>
          <Settings fontSize="small" sx={{ mr: 1 }} /> Settings
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <Tooltip title="Logout" placement="left">
            <Logout fontSize="small" sx={{ mr: 1 }} />
          </Tooltip>
          Logout
        </MenuItem>
      </Menu>

      {/* Notification Dropdown */}
      <Menu
        anchorEl={notificationAnchorEl}
        open={Boolean(notificationAnchorEl)}
        onClose={handleNotificationClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Box sx={{ px: 2, py: 1 }}>
          <Typography variant="h6">Notifications</Typography>
        </Box>
        <Divider />
        {notifications.length > 0 ? (
          <Box>
            <List sx={{ maxHeight: 300, overflow: 'auto' }}>
              {notifications.slice(0, 5).map((notification) => (
                <ListItem
                  key={notification.id}
                  button
                  component={Link}
                  to={`/dashboard/notifications/${notification.id}`}
                  onClick={handleNotificationsView}
                >
                  <ListItemText
                    primary={notification.message}
                    secondary={new Date(notification.timestamp).toLocaleString()}
                  />
                </ListItem>
              ))}
            </List>
            <Divider />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 1 }}>
              <Button onClick={handleNotificationsView}>Mark all as read</Button>
              <Button onClick={handleClearNotifications} color="error">
                Clear All
              </Button>
            </Box>
          </Box>
        ) : (
          <MenuItem>No new notifications</MenuItem>
        )}
      </Menu>
    </Toolbar>
  );
};

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  onLogout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);
