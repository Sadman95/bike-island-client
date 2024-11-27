import { Box, Chip, TextField, useTheme } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { MdDelete } from 'react-icons/md';

/**
 * Props for the component.
 *
 * @typedef {Object} Payload
 * @property {string} name - The name of the input field.
 * @property {string} label - The label text for the input field.
 * @property {string} [variant='outlined'] - The variant of the input field (e.g., 'outlined', 'filled', etc.).
 * @property {string} [margin='none'] - The margin around the input field (e.g., 'none', 'dense', 'normal').
 * @property {boolean} [fullWidth=false] - Whether the input field should take up the full width of its container.
 * @property {string} [size='medium'] - The size of the input field (e.g., 'small', 'medium', 'large').
 * @property {string|null} [helperText=null] - The helper text displayed below the input field.
 * @property {Function} [onBlur=() => null] - The function to be called when the input field loses focus.
 * @property {Function} [onChange=() => null] - The function to be called when the value of the input field changes.
 *
 * @param {Payload}
 */
const ControlledInput = ({
  name = '',
  label = '',
  variant = 'outlined',
  margin = 'none',
  fullWidth = false,
  size = 'medium',
  helperText = null,
  onBlur = () => null,
  onChange = () => null,
}) => {
  const [inputs, setInputs] = useState([]);
  const [currentInput, setCurrentInput] = useState('');
  const theme = useTheme();

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && currentInput.trim() !== '') {
      const newInputs = [...inputs, currentInput.trim()];
      setInputs(newInputs);
      setCurrentInput('');
      onChange(newInputs);
    }
  };

  const handleDelete = (indx) => {
    setInputs(inputs.filter((v) => inputs.indexOf(v) != indx));
  };

  return (
    <>
      {inputs.length > 0 && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            flexWrap: 'wrap',
            my: 1,
          }}
        >
          {inputs.map((v, i) => (
            <Chip
              key={i}
              color={'warning'}
              size={'small'}
              variant={'filled'}
              label={v}
              onDelete={() => handleDelete(i)}
              deleteIcon={<MdDelete color={theme.palette.error.dark} />}
            />
          ))}
        </Box>
      )}
      <TextField
        name={name}
        label={label}
        variant={variant}
        margin={margin}
        fullWidth={fullWidth}
        size={size}
        helperText={helperText}
        value={currentInput}
        onChange={(e) => setCurrentInput(e.target.value)}
        onBlur={onBlur}
        onKeyDown={handleKeyDown}
      />
    </>
  );
};

ControlledInput.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  variant: PropTypes.oneOf(['filled', 'outlined', 'standard']),
  margin: PropTypes.oneOf(['none', 'normal', 'dense']),
  fullWidth: PropTypes.bool,
  size: PropTypes.oneOf(['medium', 'small']),
  helperText: PropTypes.node,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
};

export default ControlledInput;
