import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

const FilterOptions = ({ options, onApplyFilters }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFields, setSelectedFields] = useState([]);

  const handleFieldChange = (field) => {
    setSelectedFields((prev) =>
      prev.includes(field) ? prev.filter((f) => f !== field) : [...prev, field],
    );
  };

  const handleApplyFilters = () => {
    onApplyFilters({ searchTerm, selectedFields });
  };

  useEffect(() => {
    if (searchTerm || selectedFields.length) {
      handleApplyFilters();
    }
    
  }, [searchTerm, selectedFields]);
  

  return (
    <Box sx={{ width: 300, padding: 2 }}>
      <Typography variant="h6" gutterBottom>
        Filter Options
      </Typography>
      <Divider sx={{ mb: 2 }} />

      {/* Search Box */}
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 3 }}
      />

      {/* Dynamic Field Selection */}
      <Typography variant="subtitle1" gutterBottom>
        Select Fields to Display
      </Typography>
      <Stack spacing={1}>
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            control={
              <Checkbox
                checked={selectedFields.includes(option.value)}
                onChange={() => handleFieldChange(option.value)}
              />
            }
            label={option.label}
          />
        ))}
      </Stack>

    </Box>
  );
};

FilterOptions.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onApplyFilters: PropTypes.func.isRequired,
};

export default FilterOptions;
