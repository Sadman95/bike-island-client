import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import './Product.css'

const Product = ({ product }) => {
  const { productImg, productTitle, productDesc } = product;

  const handlePurchase = () => {
    console.log("purchase clicked");
  };

  return (
    <Grid item xs={4} sm={4} md={4}>
      <Card className='product' elevation='0' sx={{ maxWidth: 345, textAlign: 'center', py: 2 }}>
          <CardMedia
            component="img"
            height="280"
            image={productImg}
            alt="green iguana"
          />
          <CardContent>
            <Typography fontWeight='medium' gutterBottom variant="h5" component="div">
              {productTitle}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {productDesc.slice(0, 18)}
            </Typography>
          </CardContent>
          
        <Button onClick={handlePurchase} variant="contained" color="primary">
            Purchase
          </Button>
      </Card>
    </Grid>
  );
};

export default Product;
