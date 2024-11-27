import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { selectCurrentMode } from 'redux/selector';

/**
 * ==========================
 * AuthWrapper - auth wrapper
 * ==========================
 */
const AuthWrapper = styled('div')(({ theme }) => ({
  backgroundColor:
    useSelector(selectCurrentMode).mode == 'dark'
      ? theme.palette.grey[400]
      : theme.palette.grey[100],
  minHeight: '100vh',
  overflowY: 'hidden',
}));

export default AuthWrapper;
