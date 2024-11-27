import { SentimentSatisfiedAltOutlined } from '@mui/icons-material';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import { useGetOwnReviews, useGetPendingReviews } from 'api/hooks';
import ProductReviewCard from 'components/cards/product-review-card';
import ProductToBeReviewed from 'components/product-tobe-reviewed';
import ReviewSkeleton from 'components/skeletons/review-skeleton';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { selectCurrentUser } from 'redux/selector';
import { createStructuredSelector } from 'reselect';
import { decrypt } from 'utils/decrypt';

// Tab Panel Component
const TabPanel = ({ children, value, index }) => (
  <Box role="tabpanel" hidden={value !== index} sx={{ p: 3 }}>
    {value === index && children}
  </Box>
);

/**
 * =============================
 * Reviews - user reviews
 * =============================
 */
const Reviews = ({ currentUser }) => {
  const [reviews, setReviews] = useState([]);
  const [toBeReviewed, setToBeReviewed] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [sortOption, setSortOption] = useState('relevance');
  const [filterOption, setFilterOption] = useState('all');

  const {
    data: ownReviews,
    isSuccess,
    isPending,
    isError,
    error,
    refetch,
  } = useGetOwnReviews({
    user: decrypt(currentUser.id),
  });

  const {
    data: pendingReviews,
    isSuccess: isPendingReviewsSuccess,
    isPending: isReviewsPending,
    isError: isPendingReviewsError,
    error: pendingReviewsError,
  } = useGetPendingReviews();

  useEffect(() => {
    if (isPendingReviewsSuccess && pendingReviews) {
      setToBeReviewed(pendingReviews.data);
    }
  }, [isPendingReviewsSuccess, pendingReviews]);

  useEffect(() => {
    if (isSuccess && ownReviews) {
      setReviews(ownReviews.data);
    }
  }, [isSuccess, ownReviews]);

  const handleTabChange = (_, newValue) => {
    setTabIndex(newValue);
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortOption(value);

    const sorted = [...filteredReviews].sort((a, b) => {
      if (value === 'recent') return new Date(b.date) - new Date(a.date);
      if (value === 'rating_high') return b.rating - a.rating;
      if (value === 'rating_low') return a.rating - b.rating;
      return 0; // Default (Relevance)
    });

    setFilteredReviews(sorted);
  };

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilterOption(value);

    const filtered =
      value === 'all' ? reviews : reviews.filter((review) => review.rating === parseInt(value));

    setFilteredReviews(filtered);
  };

  return (
    <Box sx={{ maxWidth: '100%', margin: 'auto', mt: 4 }}>
      <Typography variant="h6" mb={2}>
        My Reviews
      </Typography>
      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab label="To Be Reviewed" />
        <Tab label="History" />
      </Tabs>

      <TabPanel value={tabIndex} index={0}>
        {isPendingReviewsError ? (
          <Stack alignItems="center" justifyContent="center" spacing={2} sx={{ mt: 4 }}>
            <SentimentSatisfiedAltOutlined sx={{ fontSize: 48, color: 'lightgray' }} />
            <Typography variant="body1" color="text.secondary">
              {pendingReviewsError?.response?.data?.message}
            </Typography>
          </Stack>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {isReviewsPending
              ? Array.from({ length: 3 }).map((_, index) => <ReviewSkeleton key={index} />)
              : toBeReviewed.map((product) => (
                  <ProductToBeReviewed key={product.productId} product={product} />
                ))}
          </Box>
        )}
      </TabPanel>

      <TabPanel value={tabIndex} index={1}>
        {isError ? (
          <Stack alignItems="center" justifyContent="center" spacing={2} sx={{ mt: 4 }}>
            <SentimentSatisfiedAltOutlined sx={{ fontSize: 48, color: 'lightgray' }} />
            <Typography variant="body1" color="text.secondary">
              {error.response.data.message}
            </Typography>
          </Stack>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {isPending ? (
              Array.from({ length: 3 }).map((_, index) => <ReviewSkeleton key={index} />)
            ) : (
              <>
                <Stack direction="row" gap={2} alignItems="center" mb={4}>
                  <FormControl size="small" sx={{ minWidth: 150 }}>
                    <InputLabel id="sort-label">Sort</InputLabel>
                    <Select
                      labelId="sort-label"
                      value={sortOption}
                      onChange={handleSortChange}
                      label="Sort"
                    >
                      <MenuItem value="relevance">Relevance</MenuItem>
                      <MenuItem value="recent">Recent</MenuItem>
                      <MenuItem value="rating_high">Rating: High to Low</MenuItem>
                      <MenuItem value="rating_low">Rating: Low to High</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl size="small" sx={{ minWidth: 150 }}>
                    <InputLabel id="filter-label">Filter</InputLabel>
                    <Select
                      labelId="filter-label"
                      value={filterOption}
                      onChange={handleFilterChange}
                      label="Filter"
                    >
                      <MenuItem value="all">All stars</MenuItem>
                      <MenuItem value="5">5 stars</MenuItem>
                      <MenuItem value="4">4 stars</MenuItem>
                      <MenuItem value="3">3 stars</MenuItem>
                      <MenuItem value="2">2 stars</MenuItem>
                      <MenuItem value="1">1 star</MenuItem>
                    </Select>
                  </FormControl>
                </Stack>
                {reviews.map((review) => (
                  <ProductReviewCard key={review._id} {...review} refetch={refetch} />
                ))}
              </>
            )}
          </Box>
        )}
      </TabPanel>
    </Box>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(Reviews);
