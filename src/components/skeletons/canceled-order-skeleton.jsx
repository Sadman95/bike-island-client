import { Box, Card, CardContent, CardHeader, Grid, Skeleton, Stack } from '@mui/material';

const CanceledOrderSkeleton = () => (
  <Card sx={{ p: 2, boxShadow: 2 }}>
    <CardHeader title={<Skeleton width="30%" />} subheader={<Skeleton width="50%" />} />
    <CardContent>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3}>
          <Skeleton width="60%" />
          <Skeleton width="80%" sx={{ mt: 1 }} />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Skeleton width="20%" />
          <Stack spacing={2} sx={{ mt: 1 }}>
            {[...Array(2)].map((_, index) => (
              <Stack key={index} direction="row" spacing={2} alignItems="center">
                <Skeleton variant="rounded" width={50} height={50} />
                <Box>
                  <Skeleton width="60%" />
                  <Skeleton width="40%" />
                  <Skeleton width="30%" />
                </Box>
              </Stack>
            ))}
          </Stack>
        </Grid>

        <Grid item xs={12} sm={3}>
          <Stack spacing={1}>
            <Skeleton variant="rounded" width="60px" height="24px" />
            <Skeleton width="40%" sx={{ mt: 1 }} />
            <Skeleton width="50%" />
          </Stack>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);

export default CanceledOrderSkeleton;
