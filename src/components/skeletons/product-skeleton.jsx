import { AddBox, IndeterminateCheckBox } from '@mui/icons-material';
import { Box, Button, Grid, Skeleton, Typography } from '@mui/material';

const ProductSkeleton = () => (
  <Grid container spacing={{ xs: 2, md: 3 }} alignItems="center" justifyContent="space-between">
    {/* Image Section */}
    <Grid item xs={12} md={6}>
      <Skeleton variant="rectangular" width="100%" height={300} />
    </Grid>

    {/* Details Section */}
    <Grid
      item
      xs={12}
      md={6}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        padding: 4,
        textAlign: { xs: 'left', md: 'center' },
      }}
    >
      {/* Product Title */}
      <Typography variant="h4" component="div" fontWeight="bold">
        <Skeleton width="60%" />
      </Typography>

      {/* Product Description */}
      <Box>
        <Skeleton width="100%" height={80} />
        <Skeleton width="90%" height={80} />
      </Box>

      {/* Add/Remove from Cart Buttons */}
      <Box display="flex" alignItems="center" gap={2}>
        <Button disabled>
          <AddBox color="disabled" />
        </Button>
        <Typography>
          <Skeleton width={20} />
        </Typography>
        <Button disabled>
          <IndeterminateCheckBox color="disabled" />
        </Button>
      </Box>

      {/* Product Price */}
      <Typography variant="h3" component="div" fontWeight="bold">
        <Skeleton width="40%" />
      </Typography>

      {/* Wishlist Button */}
      <Button
        variant="contained"
        disableElevation
        disabled
        sx={{
          border: '1px solid transparent',
        }}
      >
        <Skeleton width="50%" height={40} />
      </Button>
    </Grid>
  </Grid>
);

export default ProductSkeleton;
