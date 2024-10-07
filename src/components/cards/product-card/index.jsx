import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Typography,
  useTheme,
} from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../styles/product.module.css';
import { useCart } from '../../../hooks/useCart';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { _id, productImg, productTitle, productDesc, productPrice } = product;
  const theme = useTheme(); 
  const { dispatch } = useCart();

  const handlePurchase = (id) => {
    navigate(`/products/${id}`);
  };

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  return (
    <>
      <CardMedia
        sx={{
          height: '300px',
          width: '100%',
          objectFit: 'cover',
          borderRadius: 3,
          border: `1px solid ${theme.palette.grey[300]}`,
        }}
        component="img"
        height="300"
        image={productImg}
        alt="green iguana"
      />
      <CardContent>
        <Typography
          fontWeight="medium"
          gutterBottom
          variant="caption"
          component="div"
          position="absolute"
          top={24}
          left={24}
        >
          {productTitle}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {productDesc.slice(0, 18)}
        </Typography>
        <Typography
          fontWeight="medium"
          gutterBottom
          variant="h5"
          component="div"
          my={4}
        >
					${productPrice}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          display: 'flex',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Button
          onClick={() => handlePurchase(_id)}
          variant="outlined"
          disableElevation
          color="success"
        >
					BUY NOW
        </Button>
        <Button
          onClick={handleAddToCart}
          variant="contained"
          disableElevation
          color="error"
        >
					ADD TO CART
        </Button>
      </CardActions>
    </>
  );
};

export default ProductCard;
