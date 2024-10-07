import React from 'react';
import { offers } from '../../../backend/_mockdata';
import { Container, Grid, Typography } from '@mui/material';
import OfferCard from '../../cards/offer-card';
const Offers = () => (
  <Container maxWidth="xl" sx={{ mt: 28 }}>
    <Typography
      mb={10}
      fontWeight="bold"
      textAlign="center"
      variant="h4"
      component="div"
    >
						Exclusive Offers
    </Typography>
					
    <Grid container spacing={2} mb={2}>
      {offers.map((offer) => (
        <Grid item xs={12} sm={6} md={3} key={offer.id}>
          <OfferCard offer={offer} />
							
        </Grid>
      ))}
    </Grid>
  </Container>
);

export default Offers;