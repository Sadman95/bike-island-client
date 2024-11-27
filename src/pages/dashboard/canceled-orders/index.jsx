import { CancelOutlined, SentimentSatisfiedAltOutlined } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { useGetUserOrders } from 'api/hooks';
import CanceledOrderSkeleton from 'components/skeletons/canceled-order-skeleton';
import { baseUrlV2 } from 'config/env';
import { ORDER_STAT } from 'enums';
import { useEffect, useState } from 'react';
import { convertToTitleCase } from 'utils/convert-to-title-case';

/**
 * =====================================
 * CanceledOrders - canceled orders view
 * =====================================
 */
const CanceledOrders = () => {
  const [canceledOrders, setCanceledOrders] = useState([]);

  // api call to get canceled orders
  const { data, isPending, isSuccess, isError, error } = useGetUserOrders({
    status: ORDER_STAT.CANCELED,
  });

  useEffect(() => {
    if (isSuccess && data) {
      setCanceledOrders(data.data);
    }
  }, [isSuccess, data]);

  return (
    <Box
      sx={{
        maxWidth: '100vw',
        mx: 'auto',
        p: 3,
        backgroundColor: '#f9f9f9',
        minHeight: '100vh',
      }}
    >
      <Box
        sx={{
          position: 'sticky',
          top: document.getElementById('app-bar')?.clientHeight + 16,
          zIndex: 1000,
          backgroundColor: (theme) => theme.palette.background.paper,
          transition: 'background-color 0.3s ease',

          p: 2,
          borderRadius: 2,
          borderBottom: '1px solid lightgray',
        }}
      >
        <Typography variant="h6" gutterBottom>
          Canceled Orders
        </Typography>
      </Box>
      <Divider sx={{ mb: 3 }} />

      {isError ? (
        <Stack alignItems="center" justifyContent="center" spacing={2} sx={{ mt: 4 }}>
          <SentimentSatisfiedAltOutlined sx={{ fontSize: 48, color: 'lightgray' }} />
          <Typography variant="body1" color="text.secondary">
            {error.response.data.message}
          </Typography>
        </Stack>
      ) : isPending ? (
        Array.from({ length: 4 }).map((_, index) => <CanceledOrderSkeleton key={index} />)
      ) : canceledOrders.length > 0 ? (
        <Stack spacing={3}>
          {canceledOrders.map((order) => (
            <Card key={order._id} sx={{ p: 2, boxShadow: 2 }}>
              <CardHeader
                title={
                  <Typography variant="subtitle2" color="text.secondary">
                    Order ID:
                  </Typography>
                }
                subheader={<Typography variant="body1">{order._id}</Typography>}
              />
              <CardContent>
                <Grid container spacing={2}>
                  {/* Order Details */}
                  <Grid item xs={12} sm={3}>
                    <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 1 }}>
                      Placed On:
                    </Typography>
                    <Typography variant="body1">
                      {new Date(order.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </Typography>
                  </Grid>

                  {/* Items */}
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Items:
                    </Typography>
                    <Stack spacing={2} sx={{ mt: 1 }}>
                      {order.items.map((item) => (
                        <Stack key={item._id} direction="row" spacing={2} alignItems="center">
                          <Avatar
                            src={baseUrlV2 + '/' + item.product.productImg}
                            alt={item.product.productTitle}
                            variant="rounded"
                            sx={{ width: 50, height: 50, border: '1px solid #ddd' }}
                          />
                          <Box>
                            <Typography variant="body1">{item.product.productTitle}</Typography>
                            <Typography variant="body2" color="text.secondary">
                              Quantity: {item.quantity}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Price: ${item.product.productPrice}
                            </Typography>
                          </Box>
                        </Stack>
                      ))}
                    </Stack>
                  </Grid>

                  {/* Status and Total */}
                  <Grid item xs={12} sm={3}>
                    <Stack spacing={1}>
                      <Chip
                        icon={<CancelOutlined />}
                        label={convertToTitleCase(order.status)}
                        color="error"
                        size="small"
                        sx={{ alignSelf: 'start' }}
                      />
                      <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 1 }}>
                        Total Amount:
                      </Typography>
                      <Typography variant="h6">${order.totalAmount}</Typography>
                    </Stack>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))}
        </Stack>
      ) : (
        <Box
          sx={{
            textAlign: 'center',
            py: 5,
            backgroundColor: '#fff',
            borderRadius: '8px',
            boxShadow: 2,
          }}
        >
          <Typography variant="h6" color="text.secondary">
            No canceled orders found!
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default CanceledOrders;
