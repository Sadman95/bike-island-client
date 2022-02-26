import { Button, Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import useHistory from "react-router";
import Product from "./Product/Product";

const Products = () => {
  const [products, setProducts] = useState([]);

  const history = useHistory();

  const goToStore = () => {
    history.push("/allProducts");
  };

  useEffect(() => {
    fetch("https://polar-bastion-89865.herokuapp.com/cycles")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);
  return (
    <div id="products">
      <Container sx={{ mt: 28 }}>
        <Typography
          mb="24px"
          fontWeight="bold"
          textAlign="center"
          variant="h4"
          component="div"
        >
          Products
        </Typography>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 12, sm: 12, md: 12 }}
        >
          {products.slice(0, 6).map((product, index) => (
            <Product key={index} product={product}></Product>
          ))}
        </Grid>
        <Button onClick={goToStore} variant="contained" color="warning">
          Bike Store
        </Button>
      </Container>
    </div>
  );
};

export default Products;
