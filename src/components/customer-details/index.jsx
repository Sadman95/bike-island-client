import { Box, Avatar, Typography, Divider, List, ListItem, ListItemText } from '@mui/material';
import { baseUrlV2 } from 'config/env';
import PropTypes from 'prop-types';

const CustomerDetails = ({ user }) => (
  <Box sx={{ width: '100%', padding: 2 }}>
    {/* Header Section */}
    <Box display="flex" alignItems="center" gap={2} mb={2}>
      <Avatar
        src={baseUrlV2 + '/' + user.avatar}
        alt={`${user.firstName} ${user.lastName}`}
        sx={{ width: 64, height: 64 }}
      />
      <Box>
        <Typography variant="h6" fontWeight="bold">
          {user.firstName} {user.lastName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {user.email}
        </Typography>
      </Box>
    </Box>

    <Divider />

    {/* User Info Section */}
    <List>
      <ListItem>
        <ListItemText
          primary="Role"
          secondary={user.role.charAt(0).toUpperCase() + user.role.slice(1)}
        />
      </ListItem>
      <ListItem>
        <ListItemText primary="Verified" secondary={user.isVerified ? 'Yes' : 'No'} />
      </ListItem>
      <ListItem>
        <ListItemText primary="Contact No" secondary={user.contactNo || 'N/A'} />
      </ListItem>
      <ListItem>
        <ListItemText
          primary="Joined On"
          secondary={new Date(user.createdAt).toLocaleDateString()}
        />
      </ListItem>
      <ListItem>
        <ListItemText primary="Total Orders" secondary={user.totalOrders} />
      </ListItem>
    </List>
  </Box>
);

CustomerDetails.propTypes = {
  user: PropTypes.object,
};

export default CustomerDetails;
