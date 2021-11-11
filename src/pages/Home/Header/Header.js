import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useHistory } from 'react-router-dom';


const headerStyle = {
    background: "url('https://i.ibb.co/YyNRgm1/banner.jpg') center no-repeat",
    backgroundSize: 'cover',
    minHeight: '700px',
    backgroundColor: 'lightBlue',
    backgroundBlendMode: 'multiply'
}

const headerContent = {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center'
}


const Header = () => {
    const history = useHistory();

    const goToStore = () =>{
        history.push('/allProducts');
    }

    return (
        <Box sx={headerStyle}>
            <Box sx={headerContent}>
            <Typography sx={{mb: 4}} color='white' variant='h2' fontWeight='bold' component='div'>
                Ride a Bike or Buy a Bike?
            </Typography>
            <Button onClick={goToStore} variant='contained' color='warning'>
                Bike Store
            </Button>
            </Box>
        </Box>
    );
};

export default Header;