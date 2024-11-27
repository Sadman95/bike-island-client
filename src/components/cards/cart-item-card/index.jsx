import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { Box, IconButton, ListItem, ListItemText } from '@mui/material';
import { baseUrlV2 } from 'config/env';

const CartItemCard = ({ onRemove, item }) => (
  <ListItem
    button
    key={item._id}
    sx={{
      backgroundColor: (theme) => theme.palette.background.default,
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
      sx={{ color: (theme) => theme.palette.text.primary }} // Ensure text is visible
    />
    <ListItemText
      primary={`${item.productPrice}`}
      sx={{ color: (theme) => theme.palette.text.primary }} // Ensure price is visible
    />
    <ListItemText
      primary={`${item.quantity}`}
      sx={{ color: (theme) => theme.palette.text.primary }} // Ensure quantity is visible
    />
    <IconButton onClick={onRemove}>
      <RemoveCircleOutlineIcon />
    </IconButton>
  </ListItem>
);

export default CartItemCard;
