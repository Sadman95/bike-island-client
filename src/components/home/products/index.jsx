import { Favorite } from '@mui/icons-material';
import { Box, Button, Container, Grid, Skeleton, Stack, Typography } from '@mui/material';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useCycles } from 'api/hooks';
import ProductCard from 'components/cards/product-card';
import { StyledOverlayCard } from 'components/styled';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { selectCurrentWishlist } from 'redux/selector';
import { addToWishlist, removeFromWishlist } from 'redux/wishlist.reducer';


/**
 * ==========================
 * Products view in home page
 * ==========================
 */
const Products = () => {
  const [products, setProducts] = useState(null);
  const { data, isPending, isSuccess, isError, error } = useCycles({
    sortBy: 'createdAt',
    sortOrder: 'desc',
    limit: 6
  });

  const wishlist = useSelector(selectCurrentWishlist);
  const dispatch = useDispatch();

  //aos init:
  useEffect(() => {
    AOS.init({
      duration: 2000,
    });
    AOS.refresh();
  }, []);

  const navigate = useNavigate();
  const location = useLocation();
  const goToStore = () => {
    navigate('/products', {
      state: {
        from: location.pathname,
      },
    });
  };

  // handle wishlist:
  const handleWishlist = (product) => {
    if (wishlist?.some((item) => item._id === product._id)) {
      dispatch(removeFromWishlist(product));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setProducts(data.data);
    }
    if (isError) {
      toast.error(error.response.data.message);
    }
  }, [isSuccess, isError]);
  return (
    <div id="products">
      <Container maxWidth="xl" sx={{ mt: 28, textAlign: 'center' }}>
        <Stack direction="row" spacing={2} mb={10} justifyContent="space-between">
          <Typography fontWeight="bold" textAlign="center" variant="h4" component="div">
            Products
          </Typography>
          <Button onClick={goToStore} variant="contained" color="warning" disableElevation>
            MORE
          </Button>
        </Stack>
        <Grid container spacing={2} mb={2}>
          {products &&
            products.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product._id}>
                {isPending ? (
                  <Skeleton variant="rectangular" width="100%" height={500} />
                ) : (
                  <StyledOverlayCard
                    sx={{
                      position: 'relative',
                    }}
                  >
                    <Box className="overlay">
                      <Favorite
                        fontSize="large"
                        sx={{
                          color: wishlist?.some((item) => item._id === product._id)
                            ? 'red'
                            : 'white',
                          cursor: 'pointer',
                        }}
                        onClick={() => handleWishlist(product)}
                      />
                    </Box>
                    <ProductCard product={product}></ProductCard>
                  </StyledOverlayCard>
                )}
              </Grid>
            ))}
        </Grid>
      </Container>
    </div>
  );
};

export default Products;
