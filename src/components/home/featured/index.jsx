import { Container, Typography } from '@mui/material';
import React from 'react';
import StepperSlider from '../../slider/stepper-slider';

/**
 * ================
 * Featured section
 * ================
 */
const Featured = () => (
  <Container maxWidth="xl" sx={{ mt: 28 }}>
    <Typography
      mb={10}
      fontWeight="bold"
      textAlign="center"
      variant="h4"
      component="div"
    >
				Featured Cycles
    </Typography>
    <StepperSlider
      orientation="vertical"
      autoChange={true}
      stepDuration={5000}
    />
  </Container>
);

export default Featured;