import { Button, Card, CardContent, CardMedia, Divider, Stack, Typography } from '@mui/material';
import { baseUrlV2 } from 'config/env';
import { HashLink } from 'react-router-hash-link';

const ProductToBeReviewed = ({ product }) => {
  const { productTitle, productImg, purchaseDate, productId } = product;

  return (
    <Card
      sx={{
        display: 'flex',
        gap: 2,
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        borderRadius: 2,
        padding: 2,
      }}
    >
      <CardMedia
        component="img"
        sx={{ width: '30%', borderRadius: 2, objectFit: 'cover' }}
        image={baseUrlV2 + '/' + productImg}
        alt={productTitle}
      />
      <Divider orientation="vertical" variant="middle" flexItem />
      <CardContent sx={{ flex: 1 }}>
        <Typography variant="h4" fontWeight="bold" sx={{ mb: 1 }}>
          {productTitle}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Purchased on: {new Date(purchaseDate).toLocaleDateString()}
        </Typography>
        <Stack direction="row" spacing={2} sx={{ mt: 2 }} alignSelf={'end'} flex={1}>
          <Button
            variant="outlined"
            color="secondary"
            component={HashLink}
            to={`/products/${productId}#prod-${productId}`}
          >
            Write Review
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ProductToBeReviewed;
