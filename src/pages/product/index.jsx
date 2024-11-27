import AddBoxIcon from '@mui/icons-material/AddBox';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import { Alert, AlertTitle, Box, Button, Container, Grid, Typography } from '@mui/material';
import { useCycle } from 'api/hooks';
import Collapsible from 'components/custom/Collapsible';
import ProductReviews from 'components/product-reviews';
import SimilarProducts from 'components/similar-products';
import ProductSkeleton from 'components/skeletons/product-skeleton';
import { baseUrlV2 } from 'config/env';
import { useEffect, useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import { connect } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { addToCart, removeFromCart } from 'redux/cart.reducer';
import { selectCurrentCart, selectCurrentUser, selectCurrentWishlist } from 'redux/selector';
import { addToWishlist } from 'redux/wishlist.reducer';
import { createStructuredSelector } from 'reselect';

/**
 * =============================
 * Product - single product view
 * =============================
 */
const Product = ({
  currentUser,
  cart,
  wishlist,
  handleAddToCart,
  handleRemoveFromCart,
  handleAddToWishlist,
}) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [queryParams, setQueryParams] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const isInWishlist = wishlist.some(item => item._id == id);
  

  const { data, isPending, isError, error, isSuccess } = useCycle(id);

  const cartItemCount = cart.reduce((acc, curr) => {
    if (curr._id == id) {
      acc += curr.quantity;
    }
    return acc;
  }, 0);

  useEffect(() => {
    if (isSuccess) {
      setProduct(data.data);
      setQueryParams({
        ...queryParams,
        type: data.data.type,
      });
    }
  }, [isSuccess, id]);

  return (
    <Container maxWidth="lg" sx={{ my: 24, mx: 'auto' }}>
      {isError && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {error.response.data.message}
        </Alert>
      )}

      {isPending && <ProductSkeleton/>}
      {product && (
        <>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            alignItems="center"
            justifyContent="space-between"
          >
            <Grid item xs={12} md={6}>
              <img width={'100%'} src={baseUrlV2 + '/' + product.productImg} alt={`Prod-${id}`} />
            </Grid>
            <Grid
              item
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                padding: 4,
                textAlign: { xs: 'left', md: 'center' },
              }}
              xs={12}
              md={6}
              flexDirection="column"
              gap={16}
            >
              <Typography mb="16px" variant="h4" component="div" fontWeight="bold">
                {product.productTitle}
              </Typography>

              <Collapsible>{product.productDesc}</Collapsible>
              <Box>
                {/* onclick handler to be added */}
                <Button
                  onClick={() => {
                    if (!currentUser) {
                      navigate('/auth/login', {
                        replace: true,
                        state: {
                          from: location.pathname,
                        },
                      });
                    } else {
                      handleAddToCart({ token: currentUser.token, product });
                    }
                  }}
                >
                  <AddBoxIcon color="action" />
                </Button>
                {cartItemCount}
                {/* onclick handler to be added */}

                <Button
                  onClick={() => {
                    if (!currentUser) {
                      navigate('/auth/login', {
                        replace: true,
                        state: {
                          from: location.pathname,
                        },
                      });
                    } else {
                      handleRemoveFromCart({ token: currentUser.token, product });
                    }
                  }}
                  disabled={cartItemCount <= 0}
                >
                  <IndeterminateCheckBoxIcon color={cartItemCount > 0 ? 'action' : 'disabled'} />
                </Button>
              </Box>
              <Typography variant="h3" component="div" fontWeight="bold">
                {/* productprice to be calculated with order amount */}${product.productPrice}
              </Typography>
              <Button
                onClick={handleAddToWishlist}
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
                {isInWishlist ? 'REMOVE FROM' : 'ADD TO'} &nbsp; <FaHeart size={20} />
              </Button>
            </Grid>
          </Grid>
          {/* reviews */}
          <ProductReviews {...product} />
          <SimilarProducts queryParams={{ productId: id, ...queryParams }} />
        </>
      )}
    </Container>
  );
};

const mapStateToProps = createStructuredSelector({
  cart: selectCurrentCart,
  currentUser: selectCurrentUser,
  wishlist: selectCurrentWishlist
});

const mapDispatchToProps = (dispatch) => ({
  handleAddToCart: (payload) => dispatch(addToCart(payload)),
  handleAddToWishlist: (payload) => dispatch(addToWishlist(payload)),
  handleRemoveFromCart: (payload) => dispatch(removeFromCart(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Product);
