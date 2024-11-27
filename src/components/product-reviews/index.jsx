import { RateReviewOutlined } from '@mui/icons-material';
import {
  Box,
  Button,
  Divider,
  FormControl,
  InputLabel,
  LinearProgress,
  MenuItem,
  Rating,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import { useReviews } from 'api/hooks';
import ProductReviewCard from 'components/cards/product-review-card';
import AddReview from 'components/modals/add-review';
import ReviewSkeleton from 'components/skeletons/review-skeleton';
import { useEffect, useState } from 'react';

const ProductReviews = ({ ...props }) => {
  const { _id, ...rest } = props;
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortOption, setSortOption] = useState('relevance');
  const [filterOption, setFilterOption] = useState('all');

  const { data, isPending, isError, error, isSuccess, refetch } = useReviews(_id);

  useEffect(() => {
    if (isSuccess) {
      setReviews(data.data.data);
      setFilteredReviews(data.data.data);
    }
  }, [data, isSuccess]);

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

  // Helper to calculate rating breakdown
  const calculateRatingSummary = () => {
    if (!reviews || reviews.length === 0) return { average: 0, counts: {} };

    const counts = [0, 0, 0, 0, 0];
    reviews.forEach(({ rating }) => {
      counts[rating - 1] += 1;
    });

    const totalRatings = reviews.length;
    const average = reviews.reduce((sum, { rating }) => sum + rating, 0) / totalRatings;

    return { average, counts, totalRatings };
  };

  const { average, counts, totalRatings } = calculateRatingSummary();

  return (
    <section id={`prod-${_id}`}>
      <Box sx={{ mt: 16 }}>
        <Stack direction="row" flexWrap="wrap" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Product Reviews</Typography>
          <Button
            disableElevation
            size="small"
            variant="contained"
            endIcon={<RateReviewOutlined />}
            onClick={() => setIsModalOpen(true)}
          >
            Write Review
          </Button>
        </Stack>
        <Divider sx={{ my: 2 }} />

        {reviews.length > 0 && (
          <>
            {/* Star Rating Summary */}
            <Stack direction="row" gap={4} alignItems="center">
              <Typography variant="h3" fontWeight="bold">
                {average.toFixed(1)}/5
              </Typography>
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <Rating value={average} readOnly />
              </Stack>
              <Typography variant="body2" color="text.secondary">
                {totalRatings} Ratings
              </Typography>
            </Stack>

            {/* Rating Breakdown */}
            <Box mt={4} mb={6}>
              {Array.from({ length: 5 })
                .reverse()
                .map((_, index) => (
                  <Stack key={index} direction="row" alignItems="center" spacing={2}>
                    <Typography variant="body2">{5 - index} stars</Typography>
                    <LinearProgress
                      variant="determinate"
                      value={((counts[4 - index] || 0) / totalRatings) * 100}
                      sx={{ flexGrow: 1 }}
                    />
                    <Typography variant="body2">{counts[4 - index] || 0}</Typography>
                  </Stack>
                ))}
            </Box>

            {/* Filter and Sort Controls */}
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
          </>
        )}

        {/* Reviews Section */}
        {isError ? (
          <Stack
            alignItems="center"
            justifyContent="center"
            p={16}
            width="100%"
            border="1px dashed lightgray"
            borderRadius={6}
            fontSize={32}
          >
            {error.response.data.message}
          </Stack>
        ) : (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            {isPending
              ? Array.from({ length: 3 }).map((_, index) => <ReviewSkeleton key={index} />)
              : filteredReviews.map((review) => (
                  <ProductReviewCard key={review._id} {...review} refetch={refetch} />
                ))}
          </Box>
        )}

        {/* Modal for Write Review */}
        <AddReview
          {...props}
          isModalOpen={isModalOpen}
          setModalOpen={setIsModalOpen}
          refetch={refetch}
        />
      </Box>
    </section>
  );
};

export default ProductReviews;
