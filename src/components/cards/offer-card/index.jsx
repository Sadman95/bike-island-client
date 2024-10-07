import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const OfferCard = ({ offer }) => (
  <Card elevation={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 120, borderRadius: 4 }}>
    <Box sx={{ display: 'flex', flexDirection: 'column', padding: 1 }}>
      <CardContent sx={{ flex: '1 0 auto' }}>
        <Typography component="div" variant="caption" fontWeight="bold">
          {offer.title}
        </Typography>
        <Typography
          variant="subtitle1"
          component="div"
          sx={{ color: 'text.secondary' }}
        >
          {offer.description}
        </Typography>
      </CardContent>
				
    </Box>
    <CardMedia
      component="img"
      sx={{ width: 100, height: 50 }}
      image={offer.image}
      alt="Live from space album cover"
    />
  </Card>
);

export default OfferCard;