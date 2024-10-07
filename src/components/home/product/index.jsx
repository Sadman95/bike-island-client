import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../styles/product.module.css';

const Product = ({ product }) => {
  const { _id, productImg, productTitle, productDesc } = product;
  const navigate = useNavigate();

  const handlePurchase = (id) => {
    navigate(`/products/${id}`);
  };

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card
        className="product"
        sx={{ boxShadow: 0, textAlign: 'center', py: 2, borderRadius: '16px' }}
      >
        <CardMedia
          component="img"
          height="280"
          image={productImg}
          alt="green iguana"
        />
        <CardContent>
          <Typography
            fontWeight="medium"
            gutterBottom
            variant="h5"
            component="div"
          >
            {productTitle}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {productDesc.slice(0, 18)}
          </Typography>
        </CardContent>

        <Button
          onClick={() => handlePurchase(_id)}
          variant="contained"
          color="primary"
        >
          Purchase
        </Button>
      </Card>
    </Grid>
  );
};

export default Product;
