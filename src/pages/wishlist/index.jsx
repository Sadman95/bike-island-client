import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Box, Container, Grid, Skeleton, Stack, Typography } from '@mui/material';
import AOS from 'aos';
import 'aos/dist/aos.css';
import React, { useEffect, useState } from 'react';
import useWishlist from '../../hooks/useWishlist';
import { StyledOverlayCard } from '../../components/styled';
import ProductCard from '../../components/cards/product-card';

const Wishlist = () => {
  const { wishlist, dispatch } = useWishlist() || {};
  const [loading, setLoading] = useState(true);
  const [wishlistItems, setWishlistItems] = useState([]);
  //aos init:

  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
    AOS.refresh();
  }, []);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setWishlistItems(wishlist?.items || []);
      setLoading(false);
    }, 1000);
  }, [wishlist]);

  const handleRemoveFromWishlist = (product) => {
    dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: product });
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 28, textAlign: 'center' }}>
      <Stack direction="row" spacing={2} mb={10} justifyContent="space-between">
        <Typography fontWeight="bold" textAlign="center" variant="h4" component="div">
          Wishlist&nbsp;[{wishlist?.items.length}]
        </Typography>
      </Stack>
      <Grid container spacing={2} mb={2}>
        {wishlistItems.map((product) => (
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
                  <DeleteOutlineIcon
                    fontSize="large"
                    sx={{
                      color: wishlist?.items.some((item) => item._id === product._id)
                        ? 'red'
                        : 'white',
                      cursor: 'pointer',
                      backgroundColor: 'white',
                      borderRadius: '6px',
                      padding: '2px',
                    }}
                    onClick={() => handleRemoveFromWishlist(product)}
                  />
                </Box>
                <ProductCard product={product}></ProductCard>
              </StyledOverlayCard>
            )}
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Wishlist;
