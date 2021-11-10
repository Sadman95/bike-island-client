import { Container, Grid, Typography } from "@mui/material";
import React from "react";
import aboutImg from '../../../images/about/about.jpg'

const aboutStyle = {
    display: 'flex',
    alignItems: 'center'
}

const About = () => {
  return (
    <div id='about'>
        <Container sx={{ mt: 28 }}>
      <Grid
         sx={aboutStyle}
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 4, md: 12 }}
      >
        <Grid item xs={4} sm={4} md={6}>
            <Typography sx={{mb: 2}} fontWeight='bold' variant='h4' component='div'>
                Experience Smooth & Start Your Day Riding Cycles From Us. 
            </Typography>
            <Typography color='GrayText' variant='p' component='div'>
            We have lots of collection of cycles. We provide 100% authentic & tested cycles from different brands. We are providing service like Ride, Share & Repair. You can buy bike from products.
            </Typography>
        </Grid>
        <Grid item xs={4} sm={4} md={6}>
            <img style={{minHeight:'500px'}} width='100%' src={aboutImg} alt="about" />
        </Grid>
      </Grid>
    </Container>
    </div>
  );
};

export default About;
