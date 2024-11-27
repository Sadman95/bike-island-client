import { Button, CardActions, CardContent, CardMedia, Typography, useTheme } from '@mui/material';
import { baseUrlV2 } from 'config/env';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart } from 'redux/cart.reducer';
import { selectCurrentUser } from 'redux/selector';
import 'styles/product.module.css';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { _id, productImg, productTitle, productDesc, productPrice } = product;
  const theme = useTheme();
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);

  const handlePurchase = (id) => {
    navigate(`/products/${id}`);
  };

  const handleAddToCart = () => {
    if (!currentUser) {
      navigate('/auth/login', {
        replace: true,
      });
    } else {
      dispatch(
        addToCart({
          token: currentUser.token,
          product,
        }),
      );
    }
  };

  return (
    <>
      <CardMedia
        sx={{
          height: '300px',
          width: '100%',
          objectFit: 'contain',
          borderRadius: 3,
          border: `1px solid ${theme.palette.grey[300]}`,
        }}
        component="img"
        height="300px"
        image={baseUrlV2 + '/' + productImg}
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
          {productDesc?.slice(0, 18)}
        </Typography>
        <Typography fontWeight="medium" gutterBottom variant="h5" component="div" my={4}>
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
          sx={{
            border: '1px solid transparent',
            '&:hover': {
              backgroundColor: 'success.main',
              color: 'white',
              border: '1px solid transparent',
            },
          }}
        >
          BUY NOW
        </Button>
        <Button
          onClick={handleAddToCart}
          variant="contained"
          disableElevation
          color="error"
          sx={{
            border: '1px solid transparent',
            '&:hover': {
              backgroundColor: 'white !important',
              color: 'red !important',
              border: '1px solid white !important',
            },
          }}
        >
          ADD TO CART
        </Button>
      </CardActions>
    </>
  );
};

export default ProductCard;
