import { Box, Button, Container, Grid, Skeleton, Stack, Typography } from '@mui/material';
import AOS from 'aos';
import 'aos/dist/aos.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../../../backend/api';
import ProductCard from '../../cards/product-card';
import { StyledOverlayCard } from '../../styled';
import { Favorite } from '@mui/icons-material';
import useWishlist from '../../../hooks/useWishlist';
const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  
  const { wishlist, dispatch } = useWishlist() || {};
  //aos init:

  useEffect(() => {
    AOS.init({
      duration: 2000,
    });
    AOS.refresh();
  }, []);

  const navigate = useNavigate();

  const goToStore = () => {
    navigate('/products');
  };

  // handle wishlist:
  const handleWishlist = (product) => {
    if (wishlist?.items.some((item) => item._id === product._id)) {
      dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: product });
    } else {
      dispatch({ type: 'ADD_TO_WISHLIST', payload: product });
    }
  };

  useEffect(() => {
    setLoading(true);
    fetch(`${baseUrl}/cycles`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .finally(() => setLoading(false));
  },
  []
  );
  return (
    <div id="products">
      <Container maxWidth="xl" sx={{ mt: 28, textAlign: 'center' }}>
        <Stack
          direction="row"
          spacing={2}
          mb={10}
          justifyContent="space-between"
        >
          <Typography
            fontWeight="bold"
            textAlign="center"
            variant="h4"
            component="div"
          >
						Products
          </Typography>
          <Button
            onClick={goToStore}
            variant="contained"
            color="warning"
            disableElevation
          >
						MORE
          </Button>
        </Stack>
        <Grid container spacing={2} mb={2}>
          {products.slice(0, 6).map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product._id}>
              {loading ? (
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
                      sx={{ color: wishlist?.items.some((item) => item._id === product._id) ? 'red' : 'white', cursor: 'pointer' }}
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
