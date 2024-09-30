import { Box } from '@mui/system';
import React from 'react';


const notFound = {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
}


const NotFound = () => {
    return (
        <Box sx={notFound}>
            <img src="https://i.ibb.co/4TZpw2M/notfound.gif" alt="notFound" />
        </Box>
    );
};

export default NotFound;