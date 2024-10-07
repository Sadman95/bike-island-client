import { Grid, Typography } from '@mui/material';
import React from 'react';
import { StyledPaper } from '../../styled';

const Service = ({ service }) => {
  const { serviceTitle, serviceImg, serviceDesc, servicePrice } = service;

  return (
    <Grid item xs={4} sm={4} md={4}>
      <StyledPaper
        bgimage={serviceImg}
        color="white"
        bgcolor="lightSteelBlue"
        sx={{ borderRadius: 4, outline: '6px solid #ffffff' }}
      >
        <Typography fontWeight="medium" variant="h3" component="div">
          {serviceTitle}
        </Typography>
        <Typography variant="p" component="div">
          {serviceDesc}
        </Typography>
        <Typography fontWeight="bold" variant="h5" component="div">
          Price ${servicePrice}
        </Typography>
      </StyledPaper>
    </Grid>
  );
};

export default Service;
