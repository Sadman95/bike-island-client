import { Delete, MoreVert, SentimentSatisfiedAltOutlined } from '@mui/icons-material';
import { Card, CardContent, CardHeader, Grid, IconButton, Menu, MenuItem, Skeleton, Stack, Typography } from '@mui/material';
import { useDeleteAddress, useGetUserAddress } from 'api/hooks';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { selectCurrentUser } from 'redux/selector';
import { createStructuredSelector } from 'reselect';
import swal from 'sweetalert';


/**
 * =================================
 * AddressBook - user addresses view
 * =================================
 */
const AddressBook = ({ currentUser }) => {
  const [addresses, setAddresses] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { data, isPending, isSuccess, isError, error, refetch } = useGetUserAddress(currentUser.id);
  const { mutate: handleDeleteAddress, isSuccess: isDeleteSuccess, isPending: isDeletePending, data:deletedData } = useDeleteAddress()

  useEffect(() => {
    if (isSuccess && data) {
      setAddresses(data.data);
    }
  }, [isSuccess, data]);

  
  useEffect(() => {
    if (isDeleteSuccess && deletedData) {
      handleClose();
      refetch()
    }
  }, [isDeleteSuccess, deletedData]);

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
          {isPending || isDeletePending
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
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
                  >
                    <MenuItem
                      onClick={() => {
                        swal({
                          title: 'Are you sure?',
                          text: `Do you really want to delete this address-${address._id}?`,
                          icon: 'warning',
                          dangerMode: true,
                          buttons: true,
                        }).then((willDelete) => {
                          if (willDelete) {
                            handleDeleteAddress(address._id);
                          }
                        });
                      }}
                      disableRipple
                    >
                      <Delete />
                      Delete
                    </MenuItem>
                  </Menu>
                  <Card variant="outlined">
                    <CardHeader
                      title={<Typography variant="h6">Address Details</Typography>}
                      action={
                        <IconButton
                          aria-label="basic-menu"
                          aria-controls={open ? 'basic-menu' : undefined}
                          aria-haspopup="true"
                          aria-expanded={open ? 'true' : undefined}
                          onClick={handleClick}
                        >
                          <MoreVert />
                        </IconButton>
                      }
                    />
                    <CardContent>
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
