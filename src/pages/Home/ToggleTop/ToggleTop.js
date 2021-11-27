import React from 'react';
import NavigationIcon from '@mui/icons-material/Navigation';
import { HashLink } from 'react-router-hash-link';
import { Box } from '@mui/system';





const toggleTopStyle = {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
}

const ToggleTop = () => {
    return (
        <Box sx={toggleTopStyle}>
            <HashLink id='topToggle' to='/home#home'><NavigationIcon color='warning'></NavigationIcon></HashLink>
        </Box>
    );
};

export default ToggleTop;