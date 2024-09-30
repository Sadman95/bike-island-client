import { Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../../backend/api";
import ProductCard from "../../components/cards/product-card";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${baseUrl}/cycles`)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);
  return (
    <Container sx={{ mt: 28 }}>
        <Typography
          fontWeight="bold"
          textAlign="center"
          variant="h4"
          component="div"
        >
          Explore All Products
        </Typography>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {products.map((product, index) => (
            <ProductCard key={index} product={product}></ProductCard>
          ))}
        </Grid>
      </Container>
  );
};

export default Products;
