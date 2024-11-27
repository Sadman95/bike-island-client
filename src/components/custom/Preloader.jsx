// Preloader.js
import { styled } from '@mui/material/styles';

const Spinner = styled('div')(({ size, color }) => ({
  width: size || 50,
  height: size || 50,
  border: `4px solid ${color || '#4A90E2'}`,
  borderRadius: '50%',
  borderTopColor: 'transparent',
  animation: 'spin 1s linear infinite',

  '@keyframes spin': {
    to: {
      transform: 'rotate(360deg)',
    },
  },
}));

const Preloader = ({ size = 50, color = '#4A90E2' }) => (
  <>
    <Spinner size={size} color={color} />
  </>
);

export default Preloader;
