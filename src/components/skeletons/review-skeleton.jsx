import { Box, Card, Grid, Skeleton } from '@mui/material';

const ReviewSkeleton = () => (
  <Card sx={{ maxWidth: '100%', p: 2, boxShadow: 3, borderRadius: 2, position: 'relative' }}>
    {/* Header Section */}
    <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
      <Box display="flex" alignItems="center">
        <Skeleton variant="circular" width={40} height={40} sx={{ mr: 2 }} />
        <Box>
          <Skeleton variant="text" width={100} height={20} />
          <Skeleton variant="text" width={80} height={16} />
        </Box>
      </Box>
      <Skeleton variant="circular" width={32} height={32} />
    </Box>

    {/* Rating and Date Section */}
    <Box display="flex" alignItems="center" mb={2}>
      <Skeleton variant="text" width={100} height={20} />
      <Skeleton variant="text" width={60} height={16} sx={{ ml: 2 }} />
    </Box>

    {/* Comment Section */}
    <Box mb={2}>
      <Skeleton variant="rectangular" width="100%" height={60} />
    </Box>

    {/* Images Section */}
    <Grid container spacing={1}>
      {Array.from({ length: 3 }).map((_, index) => (
        <Grid item xs={4} sm={2} key={index}>
          <Skeleton variant="rectangular" width="100%" height={80} />
        </Grid>
      ))}
    </Grid>

    {/* Likes Section */}
    <Box display="flex" alignItems="center" mt={2}>
      <Skeleton variant="circular" width={24} height={24} />
      <Skeleton variant="text" width={40} height={20} sx={{ ml: 1 }} />
    </Box>
  </Card>
);

export default ReviewSkeleton;
