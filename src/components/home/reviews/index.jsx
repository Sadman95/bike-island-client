import { Container, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { baseUrl } from '../../../backend/api';
import Review from '../../review';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch(`${baseUrl}/reviews`)
      .then((res) => res.json())
      .then((data) => setReviews(data));
    
    return () => setReviews([]);
  }, []);
  return (
    <div id="reviews">
      <Container sx={{ mt: 24 }}>
        <Typography
          sx={{ mb: 2 }}
          variant="h4"
          fontWeight="bold"
          component="div"
        >
          Reviews
        </Typography>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {reviews.map((review, index) => (
            <Review key={index} review={review}></Review>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default Reviews;
