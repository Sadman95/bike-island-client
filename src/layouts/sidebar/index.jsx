import ExpandIcon from '@mui/icons-material/ArrowBack';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { useState } from 'react';

const Sidebar = () => {
  const [minimized, setMinimized] = useState(false);

  const toggleSidebar = () => setMinimized(!minimized);

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: minimized ? 80 : 240,
        transition: 'width 0.3s',
      }}
    >
      <IconButton onClick={toggleSidebar}>
        <ExpandIcon />
      </IconButton>
      <List>
        <ListItem button>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          {!minimized && <ListItemText primary="Dashboard" />}
        </ListItem>
        {/* Add more items as needed */}
      </List>
    </Drawer>
  );
};

export default Sidebar;
