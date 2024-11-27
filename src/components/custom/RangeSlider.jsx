import { Box, Slider, Typography } from '@mui/material';
import { useState } from 'react';

function RangeSlider({ min = 0, max = 1000, onChange }) {
  const [range, setRange] = useState([min, max]);

  const handleChange = (_event, newValue) => {
    setRange(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <Box sx={{ width: '100%', my: 3 }}>
      <Typography gutterBottom>Price</Typography>
      <Slider
        value={range}
        onChange={handleChange}
        valueLabelDisplay="auto"
        min={min}
        max={max}
      />
      <Box display="flex" justifyContent="space-between">
        <Typography variant="body2">${range[0]}</Typography>
        <Typography variant="body2">${range[1]}</Typography>
      </Box>
    </Box>
  );
}

export default RangeSlider;
