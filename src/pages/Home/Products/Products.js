import { Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Product from "./Product/Product";



const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/cycles')
        .then(res => res.json())
        .then(data => setProducts(data))
    }, [])
  return (
    <Container sx={{mt: 28}}>
        <Typography fontWeight='bold' textAlign='center' variant='h4' component='div'>Products</Typography>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {products.slice(0, 6).map((product, index) => (
          <Product key={index} product={product}></Product>
        ))}
      </Grid>
    </Container>
  );
};

export default Products;
