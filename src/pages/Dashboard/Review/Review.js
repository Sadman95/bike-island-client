import { Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth/useAuth";
import SingleReview from "./SingleReview/SingleReview";

const Review = () => {
  const { user } = useAuth();
  const [myOrders, setMyOrders] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/orders?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => setMyOrders(data));
  }, [user.email]);

  return (
      <Container sx={{ mt: 16 }}>
        <Grid
          gap="4"
          container
          spacing={{ xs: 2, md: 2 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {myOrders.map((order, index) => (
            <SingleReview key={index} order={order}></SingleReview>
          ))}
        </Grid>
      </Container>
  );
};

export default Review;
