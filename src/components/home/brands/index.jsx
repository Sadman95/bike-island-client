import { Container, Typography, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';
import MultiSlider from '../../slider/multi-slider';

/**
 * ==============
 * Brands section
 * ==============
 */
const Brands = () => {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));


  return (
    <Container maxWidth="xl" sx={{ mt: 28 }}>
      <Typography
        mb={10}
        fontWeight="bold"
        textAlign="center"
        variant="h4"
        component="div"
      >
				Popular Brands
      </Typography>
      <MultiSlider
        itemsPerSlide={isMobile ? 1 : 3}
        initialStep={0}
        stepDuration={5000}
        autoChange={true}
        swipeable={true}
      />
    </Container>
  );
};

export default Brands;