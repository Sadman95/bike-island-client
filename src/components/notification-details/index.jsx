import { Box, Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { markAllAsRead } from 'redux/notification.reducer';
import { selectCurrentNotifications } from 'redux/selector';

/**
 * ========================================
 * NotificationDetails - notifications view
 * ========================================
 */
const NotificationDetails = () => {
  const { id } = useParams();
  const { notifications } = useSelector(selectCurrentNotifications);
  const dispatch = useDispatch();
  const notification = notifications.find((n) => n.id === id);

  const handleMarkAsRead = () => {
    if (notification && !notification.read) {
      dispatch(markAllAsRead());
    }
  };

  if (!notification) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h6">Notification not found</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        {notification.message}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Order ID: {notification.orderId}
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Received at: {new Date(notification.timestamp).toLocaleString()}
      </Typography>
      {!notification.read && (
        <Button variant="contained" onClick={handleMarkAsRead}>
          Mark as Read
        </Button>
      )}
    </Box>
  );
};

export default NotificationDetails;
