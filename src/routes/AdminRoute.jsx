// AdminRoute.js
import { ROLES } from 'enums';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { selectCurrentUser } from 'redux/selector';

/**
 * ===========================================================
 * AdminRoute - admin route wrapper to allow only admin access
 * ===========================================================
 */
const AdminRoute = ({ children = null }) => {
  const currentUser = useSelector(selectCurrentUser);

  if (currentUser.role == ROLES.USER) {
    setTimeout(() => {
      toast.error('Unauthorized access found!', {
        duration: 5000,
      });
    });
    return <Navigate to="/auth/login" replace />;
  }
  return (
    <>
      {children}
      <Outlet />
    </>
  );
};

AdminRoute.propTypes = {
  children: PropTypes.node,
};

export default AdminRoute;
