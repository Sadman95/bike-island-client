import { Box, Button, Divider, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import {
  AddressElement,
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { useCreateOrder, usePaymentIntent } from 'api/hooks';
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

      if(currentUser.id == orderData.data.data.user)
        socket.emit('new-order', orderData.data);
    }

   
  }, [isOrderSuccess, orderData]);

  const handleAddressChange = (event) => {
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
        address,
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
              <AddressElement
                onChange={handleAddressChange}
                options={{
                  ...CARD_ELEMENT_OPTIONS,
                  mode: 'billing',
                  defaultValues: {
                    name: currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : null,
                    address: address,
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
