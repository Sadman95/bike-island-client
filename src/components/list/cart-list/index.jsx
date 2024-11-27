import { Button, Divider, List, Stack, Typography } from '@mui/material';
import CartItemCard from 'components/cards/cart-item-card';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeFromCart } from 'redux/cart.reducer';
import { selectCurrentCart, selectCurrentUser } from 'redux/selector';
import { createStructuredSelector } from 'reselect';

const CartList = ({ currentUser, cart, handleRemoveFromCart }) => {
  const navigate = useNavigate();
  // handle checout
  const handleCheckout = () => {
    navigate('/checkout', {
      replace: true,
    });
  };

  return (
    <>
      {cart.length > 0 ? (
        <>
          <List
            sx={{
              p: 2,
              pt: 6,
              maxHeight: '70vh',
              overflowY: 'auto',
              overflowX: 'hidden',
            }}
          >
            {cart.map((item, indx) => (
              <>
                <CartItemCard
                  key={indx}
                        onRemove={() => handleRemoveFromCart({ token: currentUser.token, product: item })}
                        item={item}
                />
                {indx !== cart.length - 1 && <Divider />}
              </>
            ))}
          </List>
          <Divider />
          <Stack
            flex={1}
            padding={2}
            direction="row"
            justifyContent="space-between"
            alignItems="start"
          >
            <Typography>Total</Typography>
            <Typography>
              {cart.reduce((acc, item) => acc + item.productPrice * item.quantity, 0)}
            </Typography>
          </Stack>
          <Button
            onClick={handleCheckout}
            variant="contained"
            disableElevation
            color="warning"
            sx={{
              padding: '1rem 0',
              border: '1px solid transparent',
              '&:hover': {
                backgroundColor: 'white !important',
                color: (theme) => theme.palette.warning.main,
                borderTop: (theme) => `1px solid ${theme.palette.warning.main} !important`,
              },
            }}
          >
            Checkout
          </Button>
        </>
      ) : (
        <Typography
          sx={{
            border: '1px dashed lightgray',
            borderRadius: 6,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          variant="h6"
          textAlign={'center'}
          my={2}
          p={2}
          width="100%"
        >
          Cart is empty!
        </Typography>
      )}
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  cart: selectCurrentCart,
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  handleRemoveFromCart: (payload) => dispatch(removeFromCart(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartList);
