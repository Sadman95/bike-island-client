import { Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import LoadReview from "./LoadReview/LoadReview";

const LoadReviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("https://polar-bastion-89865.herokuapp.com/reviews")
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);
  return (
    <div id='reviews'>
      <Container sx={{mt: 24}}>
      <Typography sx={{mb: 2}} variant="h4" fontWeight="bold" component="div">
        Reviews
      </Typography>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {reviews.map((review, index) => (
          <LoadReview key={index} review={review}></LoadReview>
        ))}
      </Grid>
    </Container>
    </div>
  );
};

export default LoadReviews;
