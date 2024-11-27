import { AddBox } from '@mui/icons-material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Box, Container, Grid, Skeleton, Stack, Typography } from '@mui/material';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ProductCard from 'components/cards/product-card';
import { StyledOverlayCard } from 'components/styled';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { selectCurrentWishlist } from 'redux/selector';
import { removeFromWishlist } from 'redux/wishlist.reducer';
import { createStructuredSelector } from 'reselect';

/**
 * =============================
 * Wishlist - Wishlist page view
 * =============================
 */
const Wishlist = ({ wishlist, removeItemFromWishlist }) => {
  const [loading, setLoading] = useState(true);
  const [wishlistItems, setWishlistItems] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

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
      setWishlistItems(wishlist);
      setLoading(false);
    }, 1000);
  }, [wishlist]);

  return (
    <Container maxWidth="xl" sx={{ mt: 28, textAlign: 'center' }}>
      <Grid container spacing={2} mb={2}>
        {wishlistItems.length == 0 ? (
          <Stack
            onClick={() =>
              navigate('/products', {
                state: { from: location.pathname },
              })
            }
            alignItems="center"
            justifyContent="center"
            flexDirection="row"
            sx={{
              backgroundColor: 'HighlightText',
              border: '1px dashed lightslategray',
              borderRadius: 4,
              minHeight: '100vh',
              minWidth: '100%',
              gap: 4,
              cursor: 'cell',
            }}
          >
            <AddBox fontSize="large" />
            <Typography variant="h2">Add to wishlist!</Typography>
          </Stack>
        ) : (
          <>
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
                          color: wishlist?.some((item) => item._id === product._id)
                            ? 'red'
                            : 'white',
                          cursor: 'pointer',
                          backgroundColor: 'white',
                          borderRadius: '6px',
                          padding: '2px',
                        }}
                        onClick={() => removeItemFromWishlist(product)}
                      />
                    </Box>
                    <ProductCard product={product}></ProductCard>
                  </StyledOverlayCard>
                )}
              </Grid>
            ))}
          </>
        )}
      </Grid>
    </Container>
  );
};

Wishlist.propTypes = {
  wishlist: PropTypes.object,
  removeItemFromWishlist: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  wishlist: selectCurrentWishlist,
});

const mapDispatchToProps = (dispatch) => ({
  removeItemFromWishlist: (product) => dispatch(removeFromWishlist(product)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist);
