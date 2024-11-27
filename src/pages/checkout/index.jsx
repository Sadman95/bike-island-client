import { Card, CardContent, Container, Grid } from '@mui/material';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { stripePublishableKey } from 'config/env';
import CartTable from 'components/table/cart-table';
import CheckoutForm from 'forms/checkout-form';

// Initialize Stripe with your public key
const stripePromise = loadStripe(stripePublishableKey);

/**
 * =============================
 * Checkout - Checkout page
 * =============================
 */
const Checkout = () => (
  <Container maxWidth="xl" sx={{ mt: 16, textAlign: 'center' }}>
    <Elements stripe={stripePromise}>
      <Grid container p={4} spacing={2}>
        {/* Left Side: Cart Items */}
        <Grid xs={12} md={7} item>
          {/* <List
              sx={{
                p: 2,
                pt: 6,
                maxHeight: '70vh',
                overflowY: 'auto',
                overflowX: 'hidden',
              }}
            >
              {cartItems.map((item, indx) => (
                <ListItem
                  button
                  key={item._id}
                  sx={{
                    backgroundColor: theme.palette.background.default,
                    my: 1,
                    border: '1px solid lightgrey',
                    borderRadius: 4,
                  }}
                >
                  <Box>
                    <img
                      style={{ width: 100, height: 100 }}
                      src={baseUrlV2 + '/' + item.productImg}
                      alt={item.productTitle}
                    />
                  </Box>
                  <ListItemText
                    primary={item.productTitle}
                    sx={{ color: theme.palette.text.primary }} // Ensure text is visible
                  />
                  <ListItemText
                    primary={`${item.productPrice}`}
                    sx={{ color: theme.palette.text.primary }} // Ensure price is visible
                  />
                  <ListItemText
                    primary={`${item.quantity}`}
                    sx={{ color: theme.palette.text.primary }} // Ensure quantity is visible
                  />
                  <IconButton
                    onClick={() =>
                      dispatch(removeFromCart({ token: currentUser.token, product: item }))
                    }
                  >
                    <RemoveCircleOutlineIcon />
                  </IconButton>
                  {indx !== cartItems.length - 1 && <Divider />}
                </ListItem>
              ))}
            </List> */}
          <CartTable />
        </Grid>

        {/* Right Side: Checkout Form */}
        <Grid xs={12} md={5} item>
          <Card sx={{ padding: 3, boxShadow: 3 }}>
            <CardContent>
              {/* Stripe Checkout Form */}
              <CheckoutForm />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Elements>
  </Container>
);

export default Checkout;
