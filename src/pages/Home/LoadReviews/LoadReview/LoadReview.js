import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const LoadReview = ({ review }) => {
  const { reviewMsg, rating, userName, imgUrl, title } = review;
  return (
    <Grid item xs={4} sm={4} md={4}>
      <Card sx={{ display: "flex", minHeight: '250px', boxShadow: 10 }}>
        <CardMedia
          component="img"
          sx={{ width: 150 }}
          image={imgUrl}
          alt="review img"
        />

        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography color='darkorange' component="div" variant="h5">
              {title}
            </Typography>
            <Typography component="div" variant="body2">
              "{reviewMsg}"
            </Typography>
            <Typography component="div" variant="subtitle2">
              {rating}
            </Typography>
            <Typography
            fontWeight='bold'
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              {userName}
            </Typography>
          </CardContent>
        </Box>
      </Card>
    </Grid>
  );
};

export default LoadReview;
