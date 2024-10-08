import { Container, Grid, Skeleton, Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { baseUrl } from '../../backend/api';
import ProductCard from '../../components/cards/product-card';
import useWishlist from '../../hooks/useWishlist';
import { StyledOverlayCard } from '../../components/styled';
import { Favorite } from '@mui/icons-material';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { wishlist, dispatch } = useWishlist() || {};

  useEffect(() => {
    setLoading(true);
    fetch(`${baseUrl}/cycles`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  const handleWishlist = (product) => {
    if (wishlist?.items.some((item) => item._id === product._id)) {
      dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: product });
    } else {
      dispatch({ type: 'ADD_TO_WISHLIST', payload: product });
    }
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 24, textAlign: 'center' }}>
      <Grid container spacing={2} mb={2}>
        {products.map((product) => (
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
                    sx={{
                      color: wishlist?.items.some((item) => item._id === product._id)
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
  );
};

export default Products;
