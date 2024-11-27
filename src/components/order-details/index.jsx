import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import { useGetOrder, useUpdateOrder } from 'api/hooks';
import Preloader from 'components/custom/Preloader';
import { baseUrlV2 } from 'config/env';
import { ORDER_STAT, ROLES } from 'enums';
import { socket } from 'helpers/socket';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { selectCurrentUser } from 'redux/selector';
import { createStructuredSelector } from 'reselect';
import { decrypt } from 'utils/decrypt';

const OrderDetails = ({ orderId, currentUser }) => {
  const [order, setOrder] = useState(null);

  const { data, isSuccess, isPending, isError, error, refetch } = useGetOrder(orderId);

  const {
    mutate: handleUpdateOrder,
    isPending: isUpdateOrderPending,
    isSuccess: isUpdateOrderSuccess,
    isError: isUpdateOrderError,
    error: updateOrderError,
    data: updatedOrder,
  } = useUpdateOrder(orderId);

  useEffect(() => {
    if (isSuccess && data) {
      setOrder(data.data);
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isUpdateOrderSuccess && updatedOrder) {
      if (
        currentUser.role != ROLES.USER ||
        decrypt(currentUser.id) == updatedOrder.data.data.user
      ) {
        socket.emit('order-updated', updatedOrder.data.data);
        refetch();
      }
    }
  }, [isUpdateOrderSuccess, updatedOrder]);

  return (
    <Box p={3}>
      {(isPending || isUpdateOrderPending) && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            height: '100vh',
          }}
        >
          <Preloader />
        </Box>
      )}
      {(isError || isUpdateOrderError) && (
        <Stack
          alignItems="center"
          justifyContent="center"
          p={16}
          width="100%"
          border="1px dashed lightgray"
          borderRadius={6}
          fontSize={32}
        >
          {error?.response?.data?.message || updateOrderError?.response?.data?.message}
        </Stack>
      )}
      {order && !isError && (
        <>
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={16}>
            <Typography variant="h6" gutterBottom>
              Order Details
            </Typography>

            <ButtonGroup
              size="small"
              disableElevation
              variant="contained"
              aria-label="Disabled button group"
            >
              {order.status !== ORDER_STAT.APPROVED && currentUser.role != ROLES.USER && (
                <Button
                  onClick={() => handleUpdateOrder({ status: ORDER_STAT.APPROVED })}
                  color="success"
                >
                  Approve
                </Button>
              )}
              {((currentUser.role != ROLES.USER && order.status === ORDER_STAT.APPROVED) ||
                order.status === ORDER_STAT.PENDING) && (
                <Button
                  color="error"
                  onClick={() => handleUpdateOrder({ status: ORDER_STAT.CANCELED })}
                >
                  Cancel
                </Button>
              )}
            </ButtonGroup>
          </Stack>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Order ID: {order._id}
          </Typography>
          <Divider sx={{ my: 2 }} />

          <List>
            <ListItem disableGutters>
              <ListItemText
                primary="User"
                secondary={currentUser.role != ROLES.USER ? order.user.email : 'You'}
              />
            </ListItem>
            <ListItem disableGutters>
              <ListItemText primary="Payment ID" secondary={order.paymentId} />
            </ListItem>
            <ListItem disableGutters>
              <ListItemText
                primary="Status"
                secondary={
                  <Typography
                    variant="body2"
                    color={order.status === 'pending' ? 'warning.main' : 'success.main'}
                  >
                    {order.status}
                  </Typography>
                }
              />
            </ListItem>
            <ListItem disableGutters>
              <ListItemText primary="Total Amount" secondary={`$${order.totalAmount}`} />
            </ListItem>
            <ListItem disableGutters>
              <ListItemText
                primary="Order Date"
                secondary={new Date(order.createdAt).toLocaleString()}
              />
            </ListItem>
          </List>

          <Divider sx={{ my: 2 }} />

          <Typography variant="subtitle1" gutterBottom>
            Item Details
          </Typography>

          {order.items.map((item) => (
            <Grid key={item._id} container spacing={2} alignItems="center">
              <Grid item>
                <Avatar
                  src={baseUrlV2 + '/' + item.product.productImg}
                  alt={item.product.productTitle}
                  variant="rounded"
                  sx={{ width: 64, height: 64 }}
                />
              </Grid>
              <Grid item xs>
                <Typography variant="body1" fontWeight="bold">
                  {item.product.productTitle}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Price: ${item.product.productPrice} {item.quantity > 1 && <>×{item.quantity}</>}
                </Typography>
              </Grid>
            </Grid>
          ))}
        </>
      )}
    </Box>
  );
};

OrderDetails.propTypes = {
  orderId: PropTypes.string.isRequired,
  currentUser: PropTypes.shape({
    token: PropTypes.string,
    id: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.string,
  }),
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(OrderDetails);
