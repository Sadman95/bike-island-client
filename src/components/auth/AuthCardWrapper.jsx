import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectCurrentMode } from 'redux/selector';
import MainCard from 'ui-component/cards/MainCard';


/**
 * ========================================
 * AuthCardWrapper - auth card wrapper
 * ========================================
 */
const AuthCardWrapper = ({ children, ...other }) => {
  const theme = useTheme();
  const { mode } = useSelector(selectCurrentMode);

  return (
    <MainCard
      sx={{
        maxWidth: { xs: 400, lg: 475 },
        margin: { xs: 2.5, md: 3 },
        backgroundColor: mode == 'light' ? theme.palette.common.white : theme.palette.common.white,
        color: mode == 'light' ? theme.palette.background.paper : theme.palette.common.white,
        '& > *': {
          flexGrow: 1,
          flexBasis: '50%',
        },
      }}
      content={false}
      {...other}
    >
      <Box sx={{ p: { xs: 2, sm: 3, xl: 5 } }}>{children}</Box>
    </MainCard>
  );
};

AuthCardWrapper.propTypes = {
  children: PropTypes.node,
};

export default AuthCardWrapper;
