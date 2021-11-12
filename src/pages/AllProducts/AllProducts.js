import { Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import AllProduct from './AllProduct/AllProduct';
import Navigation from '../../../src/pages/shared/Navigation/Navigation'
import Footer from "../shared/Footer/Footer";

const AllProducts = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/cycles')
        .then(res => res.json())
        .then(data => setProducts(data))
    }, [])
    return (
        <>
          <Navigation></Navigation>
          <Container sx={{mt: 28}}>
        <Typography fontWeight='bold' textAlign='center' variant='h4' component='div'>Explore All Products</Typography>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {products.map((product, index) => (
          <AllProduct key={index} product={product}></AllProduct>
        ))}
      </Grid>
    </Container>
    <Footer></Footer>
        </>
    );
};

export default AllProducts;