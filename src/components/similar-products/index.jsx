import { Favorite } from '@mui/icons-material';
import {
  Alert,
  AlertTitle,
  Box,
  Divider,
  FormControl,
  Grid,
  Pagination,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import { useCycles } from 'api/hooks';
import ProductCard from 'components/cards/product-card';
import RangeSlider from 'components/custom/RangeSlider';
import { BootstrapInput, StyledOverlayCard } from 'components/styled';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { selectCurrentWishlist } from 'redux/selector';
import { addToWishlist, removeFromWishlist } from 'redux/wishlist.reducer';

const SimilarProducts = ({ queryParams = {} }) => {
  const { productId } = queryParams;
  const [products, setProducts] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [priceRage, setPriceRange] = useState(null);
  const initialQuery = {
    searchTerm: '',
  };

  const [queries, setQueries] = useState({ ...initialQuery, ...queryParams });
  const { data, isPending, isError, error, isSuccess } = useCycles({
    ...queries,
    productId,
  });

  useEffect(() => {
    if (isSuccess) {
      setProducts(data.data.data);
      setPagination(data.data.meta.pagination);
      setPriceRange([data.data.meta.minPrice, data.data.meta.maxPrice]);
    }
  }, [data, isSuccess]);

  const wishlist = useSelector(selectCurrentWishlist);
  const dispatch = useDispatch();

  const handleWishlist = (product) => {
    if (wishlist?.some((item) => item._id === product._id)) {
      dispatch(removeFromWishlist(product));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  // search handler
  const handleSearchOnChange = (e) => {
    setQueries({
      ...queryParams,
      [e.target.name]: e.target.value,
    });
  };

  // page change handler
  const handleChangePage = (_e, page) => {
    setQueries({
      ...queryParams,
      page,
    });
  };

  // price change handle
  const handlePriceChange = (priceRange) => {
    setQueries({
      ...queryParams,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
    });
  };

  //sort handler
  const handleSort = (sortBy, sortOrder) => {
    setQueries({
      ...queryParams,
      sortBy,
      sortOrder,
    });
  };

  return (
    <>
      {products && (
        <Box maxWidth="xl" sx={{ mt: 24 }}>
          <Typography variant="h6" textAlign="left">
            Similar Products
          </Typography>
          <Divider
            sx={{
              my: 2,
            }}
          />
          <Grid container spacing={2} mb={2} alignItems="start">
            <Grid item xs={12} md={2}>
              <FormControl variant="standard" fullWidth>
                <BootstrapInput
                  name="searchTerm"
                  placeholder="Search..."
                  id="bootstrap-input"
                  fullWidth
                  onChange={handleSearchOnChange}
                />
              </FormControl>
              {priceRage && (
                <RangeSlider onChange={handlePriceChange} min={priceRage[0]} max={priceRage[1]} />
              )}
              <Stack my={2}>
                <Select
                  className="basic-single"
                  classNamePrefix="select"
                  options={[
                    {
                      value: 'desc',
                      label: 'Newest First',
                    },
                    {
                      value: 'asc',
                      label: 'Oldest First',
                    },
                  ]}
                  defaultValue={{
                    value: 'desc',
                    label: 'Newest First',
                  }}
                  onChange={(v) => handleSort('createdAt', v.value)}
                  isSearchable={false}
                />
              </Stack>
              <Stack my={2}>
                <Select
                  className="basic-single"
                  classNamePrefix="select"
                  options={[
                    {
                      value: 'desc',
                      label: 'High to Low',
                    },
                    {
                      value: 'asc',
                      label: 'Low to High',
                    },
                  ]}
                  placeholder={<Typography variant="p">Select Price</Typography>}
                  onChange={(v) => handleSort('productPrice', v.value)}
                  isClearable={true}
                  isSearchable={false}
                />
              </Stack>
            </Grid>
            <Grid item xs={12} md={10}>
              {isError ? (
                <Alert severity="error">
                  <AlertTitle>Error</AlertTitle>
                  {error.response.data.message}
                </Alert>
              ) : (
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
              )}
            </Grid>
          </Grid>
          {pagination && (
            <Stack spacing={2} my={4} alignItems="center">
              <Pagination
                count={pagination.totalPages}
                variant="outlined"
                shape="rounded"
                onChange={handleChangePage}
              />
            </Stack>
          )}
        </Box>
      )}
    </>
  );
};

export default SimilarProducts;
