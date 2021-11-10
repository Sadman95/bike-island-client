import { Container, Grid } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import Service from './Service/Service';


const Services = () => {
    const [services, setServices] = useState([]);

    useEffect(() =>{
        fetch('http://localhost:5000/services')
        .then(res => res.json())
        .then(data => setServices(data))
    }, [])
    return (
        <div id='services'>
            <Container sx={{mt: -18, mb: 32}}>
            <Box>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
  {services.map((service) => (
    <Service key={service._id} service={service}></Service>
  ))}
</Grid>
        </Box>
        </Container>
        </div>
    );
};

export default Services;