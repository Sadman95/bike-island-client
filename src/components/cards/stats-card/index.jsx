import { Card, CardContent, Typography } from '@mui/material';

const StatsCard = ({ title, value, percentage, description }) => (
  <Card sx={{ minWidth: 200, borderRadius: 4 }} elevation={1}>
    <CardContent>
      <Typography variant="h6" color="textSecondary">
        {title}
      </Typography>
      <Typography variant="h4">{value}</Typography>
      <Typography color={percentage > 0 ? 'primary' : 'error'}>
        {percentage > 0 ? `+${percentage}%` : `${percentage}%`}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        {description}
      </Typography>
    </CardContent>
  </Card>
);

export default StatsCard;
