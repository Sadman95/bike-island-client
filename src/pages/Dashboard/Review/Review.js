import { Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../../../backend/api";
import useAuth from "../../../hooks/useAuth/useAuth";
import SingleReview from "./SingleReview/SingleReview";

const Review = () => {
  const { user } = useAuth();
  const [myOrders, setMyOrders] = useState([]);

  useEffect(() => {
    fetch(`${baseUrl}/orders?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => setMyOrders(data));
  }, [user.email]);

  return (
    <Container sx={{ mt: 16 }}>
      <Grid
        gap="4"
        container
        spacing={{ xs: 2, md: 2 }}
        columns={{ xs: 12, sm: 12, md: 12 }}
      >
        {myOrders.map((order, index) => (
          <SingleReview key={index} order={order}></SingleReview>
        ))}
      </Grid>
    </Container>
  );
};

export default Review;
