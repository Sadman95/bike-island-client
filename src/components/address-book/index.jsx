import { SentimentSatisfiedAltOutlined } from '@mui/icons-material';
import { Card, CardContent, Grid, Skeleton, Stack, Typography } from '@mui/material';
import { useGetUserAddress } from 'api/hooks';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { selectCurrentUser } from 'redux/selector';
import { createStructuredSelector } from 'reselect';


/**
 * =================================
 * AddressBook - user addresses view
 * =================================
 */
const AddressBook = ({ currentUser }) => {
  const [addresses, setAddresses] = useState([]);

  const { data, isPending, isSuccess, isError, error } = useGetUserAddress(currentUser.id);

  useEffect(() => {
    if (isSuccess && data) {
      setAddresses(data.data);
    }
  }, [isSuccess, data]);

  return (
    <>
      {isError ? (
        <Stack alignItems="center" justifyContent="center" spacing={2} sx={{ mt: 4 }}>
          <SentimentSatisfiedAltOutlined sx={{ fontSize: 48, color: 'lightgray' }} />
          <Typography variant="body1" color="text.secondary">
            {error.response.data.message}
          </Typography>
        </Stack>
      ) : (
        <Grid container spacing={3}>
          {isPending
            ? // Show skeletons while loading
            Array.from({ length: 4 }).map((_, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 1 }}>
                      <Skeleton width="60%" />
                    </Typography>
                    <Typography color="text.secondary" sx={{ mt: 1 }}>
                      <Skeleton width="90%" />
                    </Typography>
                    <Typography color="text.secondary" sx={{ mt: 1 }}>
                      <Skeleton width="75%" />
                    </Typography>
                    <Typography color="text.secondary" sx={{ mt: 1 }}>
                      <Skeleton width="50%" />
                    </Typography>
                    <Typography color="text.secondary" sx={{ mt: 1 }}>
                      <Skeleton width="80%" />
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
            : addresses.map((address) => (
              <Grid item xs={12} sm={6} key={address._id}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 1 }}>
                        Address Details
                    </Typography>
                    <Typography color="text.secondary" sx={{ mt: 1 }}>
                      <strong>Line 1:</strong> {address.line1}
                    </Typography>
                    {address.line2 && (
                      <Typography color="text.secondary" sx={{ mt: 1 }}>
                        <strong>Line 2:</strong> {address.line2}
                      </Typography>
                    )}
                    <Typography color="text.secondary" sx={{ mt: 1 }}>
                      <strong>City:</strong> {address.city}
                    </Typography>
                    <Typography color="text.secondary" sx={{ mt: 1 }}>
                      <strong>State:</strong> {address.state || 'N/A'}
                    </Typography>
                    <Typography color="text.secondary" sx={{ mt: 1 }}>
                      <strong>Postal Code:</strong> {address.postal_code}
                    </Typography>
                    <Typography color="text.secondary" sx={{ mt: 1 }}>
                      <strong>Country:</strong> {address.country}
                    </Typography>
                    <Typography color="text.secondary" sx={{ mt: 1 }}>
                      <strong>Created At:</strong>{' '}
                      {new Date(address.createdAt).toLocaleDateString()}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>
      )}
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(AddressBook);
