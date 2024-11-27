import { Card, CardContent, CardHeader } from '@mui/material';
import PropTypes from 'prop-types';
import { forwardRef } from 'react';


const ChartCard = forwardRef(function ChartCard({ title = '', children = null, headerComponent= null }, ref) {
  return (
    <Card sx={{ minWidth: '100%', borderRadius: 4 }} elevation={1} ref={ref}>
      <CardHeader title={title} component={headerComponent} />
      <CardContent
      >{children}</CardContent>
    </Card>
  );
});

ChartCard.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  headerComponent: PropTypes.node,
};

export default ChartCard;
