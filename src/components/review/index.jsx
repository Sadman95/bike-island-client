import { Card, CardContent, CardMedia, Grid, Rating, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const Review = ({ review }) => {
  const { reviewMsg, rating, userName, imgUrl, title } = review;
  return (
    <Grid item xs={4} sm={4} md={4}>
      <Card sx={{ display: "flex", boxShadow: 10,height: '300px', padding: 2, alignItems: 'center'  }}>
        <CardMedia
          component="img"
          sx={{ height: 80,width: 90 }}
          image={imgUrl}
          alt="review img"
        />

        <Box>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography color='darkorange' component="div" variant="h5">
              {title}
            </Typography>
            <Typography component="div" variant="body2">
              "{reviewMsg}"
            </Typography>
            <Typography component="div" variant="subtitle2">
            <Rating
        name="simple-controlled"
        value={parseInt(rating)}
        
      />
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

export default Review;
