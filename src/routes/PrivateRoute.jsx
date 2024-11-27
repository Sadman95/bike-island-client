import { Box } from '@mui/material';
import { useRefreshToken } from 'api/hooks';
import Preloader from 'components/custom/Preloader';
import { validateJwt } from 'helpers/jwtHelper';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
// import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { login } from 'redux/auth.reducer';
import { selectCurrentUser } from 'redux/selector';
import { decrypt } from 'utils/decrypt';

/**
 * =============================================
 * PrivateRoute - route to handle private access
 * =============================================
 */
const PrivateRoute = ({ children = null }) => {
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  const { mutate, isPending, isSuccess, isError, error, data } = useRefreshToken();

  useEffect(() => {
    if (data && isSuccess) {
      dispatch(
        login({
          ...currentUser,
          token: data.data.data.token,
        }),
      );
    }
  }, [data, isSuccess]);

  if (isPending) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          height: '100vh',
        }}
      >
        <Preloader />
      </Box>
    );
  }

  if (!currentUser || isError || error) {
    // setTimeout(() => {
    //     toast.error('Access denied!', {
    //         duration: 5000
    //     });
    // });
    return <Navigate to="/auth/login" replace />;
  } else if (!validateJwt(decrypt(currentUser.token))) {
    mutate();
  }
  
  return (
    <>
      {children}
      <Outlet/>
    </>
  );

};

PrivateRoute.propTypes = {
  children: PropTypes.node,
};

export default PrivateRoute;
