import { Grid, Skeleton, Typography } from '@mui/material';
import { StyledPaper } from 'components/styled';

const ServiceSkeleton = () => (
  <Grid item xs={4} sm={4} md={4}>
    <StyledPaper
      color="white"
      bgcolor="lightSteelBlue"
      sx={{ borderRadius: 4, outline: '6px solid #ffffff', padding: 2 }}
    >
      <Skeleton variant="rectangular" width="100%" height={140} />
      <Typography variant="h3" component="div" sx={{ mt: 2 }}>
        <Skeleton width="60%" />
      </Typography>
      <Typography component="div" sx={{ mt: 1 }}>
        <Skeleton width="80%" />
        <Skeleton width="70%" />
        <Skeleton width="90%" />
      </Typography>
      <Typography variant="h5" component="div" sx={{ mt: 2 }}>
        <Skeleton width="40%" />
      </Typography>
    </StyledPaper>
  </Grid>
);

export default ServiceSkeleton;
