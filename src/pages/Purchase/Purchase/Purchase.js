import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Grid, Typography, Button } from "@mui/material";

const Purchase = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  console.log(product);

  useEffect(() => {
    fetch(`http://localhost:5000/cycles/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, []);
  return (
    <Container sx={{ mt: 24 }}>
      <Grid
       sx={{display: 'flex', alignItems: 'center'}}
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 4, md: 12 }}
      >
        <Grid item xs={4} sm={4} md={6}>
            <img src={product.productImg} alt="" />
        </Grid>
        <Grid item xs={2} sm={4} md={6}>
            <Typography mb='16px' variant='h4' component='div' fontWeight='bold'>
                {product.productTitle}
            </Typography>
            <Typography mb='24px' variant='p' component='div' fontWeight='medium' color='GrayText'>
                {product.productDesc}
            </Typography>
            <Typography variant='h3' component='div' fontWeight='bold'>
                ${product.productPrice}
            </Typography>
            <Button variant='contained' color='error'>Place Order</Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Purchase;
