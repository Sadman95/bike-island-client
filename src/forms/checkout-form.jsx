import {
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  AddressElement,
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { useCreateOrder, useGetUserAddress, usePaymentIntent } from 'api/hooks';
import Preloader from 'components/custom/Preloader';
import { socket } from 'helpers/socket';
import { useCartCalculation } from 'hooks/useCartCalculation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { MdOutlinePayment } from 'react-icons/md';
import { connect, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearAllFromCart } from 'redux/cart.reducer';
import { selectCurrentCart, selectCurrentUser } from 'redux/selector';
import { createStructuredSelector } from 'reselect';
import swal from 'sweetalert';
import { objectMapper } from 'utils/object-mapper';

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      lineHeight: '27px',
      color: '#212529',
      fontSize: '1.1rem',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
    },
  },
};

const CheckoutForm = ({ cart, currentUser }) => {
  const [address, setAddress] = useState({});
  const stripe = useStripe();
  const elements = useElements();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { invoiceTotal } = useCartCalculation(cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [clientSecret, setClientSecret] = useState('');
  const [addresses, setAddresses] = useState([]);
  const [selectedId, setSelectedId] = useState('')

  // Fetch addresses
  const {
    data: addressesData,
    isPending: isAddresssPending,
    isSuccess,
    isError: isAddressError,
    error: addressError,
  } = useGetUserAddress(currentUser?.id);

  useEffect(() => {
    if (isSuccess && addressesData) {
      setAddresses(addressesData.data);
    }
  }, [isSuccess, addressesData]);

  const { mutate: createPaymentIntent, isPending, isError, error, data } = usePaymentIntent();
  const {
    mutate: createOrderMutation,
    isPending: isOrderLoading,
    isError: isOrderError,
    error: orderError,
    isSuccess: isOrderSuccess,
    data: orderData,
  } = useCreateOrder();

  useEffect(() => {
    if (data && data.data) {
      setClientSecret(data.data.data);
    }
  }, [data]);

  useEffect(() => {
    if (clientSecret) {
      handleCompletePayment(clientSecret);
    }
  }, [clientSecret]);

  useEffect(() => {
    if (isOrderSuccess && orderData) {
      swal('Well Done!', orderData.data.message, orderData.data.status);
      dispatch(clearAllFromCart());
      navigate('/dashboard/orders');

      if (currentUser?.id === orderData.data.data.user) {
        socket.emit('new-order', orderData.data);
      }
    }
  }, [isOrderSuccess, orderData]);

  // Handle address selection
  const handleAddressSelect = (addressId) => {
    const selectedAddress = addresses.find((address) => address._id === addressId);
    const formattedAddress = objectMapper(selectedAddress, [
      'city',
      'country',
      'line1',
      'line2',
      'postal_code',
      'state',
    ]);
    setAddress({ ...address, ...formattedAddress });
  };

  const handleAddressChange = (event) => {
    setSelectedId('')
    setAddress(event.value.address);
  };

  const handlePay = (event) => {
    event.preventDefault();
    if (stripe && elements) {
      createPaymentIntent({ amount: Math.round(invoiceTotal * 100), currency: 'usd' });
    }
  };

  const handleCompletePayment = async (clientSecret) => {
    const cardElement = elements.getElement(CardNumberElement);
    try {
      const { paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          name: `${currentUser.firstName} ${currentUser.lastName}`,
          email: currentUser.email,
          address,
        },
      });

      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });

      await createOrderMutation({
        address: {
          ...address,
          _id: selectedId
        },
        items: cart.map((item) => ({
          product: item._id,
          quantity: item.quantity,
          price: item.productPrice,
        })),
        totalAmount: invoiceTotal,
        paymentId: paymentIntent.payment_method,
      });
    } catch (err) {
      toast.error(err.message || 'Payment failed');
    }
  };

  useEffect(() => {
    if (selectedId) {
      handleAddressSelect(selectedId);
    }
  }, [selectedId]);

  return (
    <Box sx={{ padding: isMobile ? 2 : 4 }}>
      <Typography variant="h5" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
        <MdOutlinePayment /> &nbsp; Payment
      </Typography>
      <Divider sx={{ my: 2 }} />

      <form onSubmit={handlePay}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="body2" gutterBottom>
              Card Number
            </Typography>
            <Box sx={{ border: 1, borderRadius: 1, padding: 1, borderColor: 'grey.400' }}>
              <CardNumberElement options={CARD_ELEMENT_OPTIONS} />
            </Box>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="body2" gutterBottom>
              Expiration Date
            </Typography>
            <Box sx={{ border: 1, borderRadius: 1, padding: 1, borderColor: 'grey.400' }}>
              <CardExpiryElement options={CARD_ELEMENT_OPTIONS} />
            </Box>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="body2" gutterBottom>
              CVC
            </Typography>
            <Box sx={{ border: 1, borderRadius: 1, padding: 1, borderColor: 'grey.400' }}>
              <CardCvcElement options={CARD_ELEMENT_OPTIONS} />
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="body2" gutterBottom>
              Address
            </Typography>
            <Box sx={{ border: 1, borderRadius: 1, padding: 1, borderColor: 'grey.400' }}>
              {addresses.length > 0 && (
                <Stack direction="row" spacing={1} alignItems="center" flexWrap={'wrap'} mb={1}>
                  {addresses.map((address, indx) => (
                    <Chip
                      color={selectedId == address._id ? 'success' : 'default'}
                      key={address._id}
                      label={`Address-${indx + 1}`}
                      size="small"
                      onClick={() => setSelectedId(address._id)}
                    />
                  ))}
                </Stack>
              )}
              <AddressElement
                onChange={handleAddressChange}
                options={{
                  ...CARD_ELEMENT_OPTIONS,
                  mode: 'billing',
                  defaultValues: {
                    name: currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : null,
                    address: {...address},
                  },
                }}
              />
            </Box>
          </Grid>
        </Grid>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3 }}
          disabled={isPending || isOrderLoading}
        >
          {isPending || isOrderLoading ? <Preloader size={20} /> : `PAY $${invoiceTotal}`}
        </Button>

        {(isError || isOrderError) && (
          <Typography color="error" variant="body2" sx={{ mt: 2 }}>
            {error?.message || orderError?.response?.data?.message || 'An error occurred'}
          </Typography>
        )}
      </form>
    </Box>
  );
};

const mapStateToProps = createStructuredSelector({
  cart: selectCurrentCart,
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(CheckoutForm);
