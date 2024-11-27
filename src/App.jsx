import { Box } from '@mui/material';
import { useGetUser } from 'api/hooks';
import 'bootstrap/dist/css/bootstrap.min.css';
import Preloader from 'components/custom/Preloader';
import NotificationDetails from 'components/notification-details';
import { ROLES } from 'enums';
import { socket } from 'helpers/socket';
import BreadcrumbLayout from 'layouts/breadcrumd-layout';
import ClientLayout from 'layouts/client-layout';
import Customers from 'pages/admin/customers';
import ManageOrders from 'pages/admin/manage-orders';
import ManageProducts from 'pages/admin/manage-products';
import RolePermission from 'pages/admin/role-permission';
import Teams from 'pages/admin/teams';
import Auth from 'pages/authentication/Auth';
import AuthLogin from 'pages/authentication/auth-forms/AuthLogin';
import AuthRegister from 'pages/authentication/auth-forms/AuthRegister';
import AuthVerify from 'pages/authentication/auth-forms/AuthVerify';
import Checkout from 'pages/checkout';
import CanceledOrders from 'pages/dashboard/canceled-orders';
import Dashboard from 'pages/dashboard/home';
import Profile from 'pages/dashboard/profile';
import Reviews from 'pages/dashboard/reviews';
import Settings from 'pages/dashboard/settings';
import UserOrders from 'pages/dashboard/user-orders';
import Home from 'pages/home';
import NotFound from 'pages/not-found/NotFound';
import Product from 'pages/product';
import Products from 'pages/products';
import Wishlist from 'pages/wishlist';
import { lazy, Suspense, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { updateInfo } from 'redux/auth.reducer';
import { selectCurrentUser } from 'redux/selector';
import { createStructuredSelector } from 'reselect';
import AdminRoute from 'routes/AdminRoute';
import PrivateRoute from 'routes/PrivateRoute';
import './App.css';
import ResetPassword from 'components/auth/ResetPassword';

// lazy
const DashboardLayout = lazy(() => import('layouts/dashboard-layout'));

/**
 * ===========================
 * App component
 * @param {object} currentUser
 * =========================== 
 */
const App = ({ currentUser }) => {
  const { data } = useGetUser(currentUser?.id);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      dispatch(updateInfo(data));
    }
  }, [data]);

  useEffect(() => {
    if (currentUser) {
      if (currentUser?.role == ROLES.ADMIN) {
        socket.emit('join-admin');
      }

      if (currentUser?.role == ROLES.USER) {
        socket.emit('join-user', { email: currentUser?.email });
      } else {
        socket.emit('userOnline', currentUser.id);
      }
      return () => {
        socket.off('join-admin');
        socket.off('join-user');
        socket.off('userOnline');
      };
    }
  }, [currentUser]);

  return (
    <Suspense
      fallback={
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
      }
    >
      <Routes>
        <Route element={<ClientLayout />}>
          <Route path={'/'} element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route
            path="/products"
            element={
              <BreadcrumbLayout>
                <Products />
              </BreadcrumbLayout>
            }
          />
          <Route path={'/products/:id'} element={<Product />} />

          <Route
            path="/wishlist"
            element={
              <BreadcrumbLayout>
                <Wishlist />
              </BreadcrumbLayout>
            }
          />
          <Route element={<PrivateRoute />}>
            <Route path="/checkout" element={<Checkout />} />
          </Route>
        </Route>

        <Route path="/auth" element={<Auth />}>
          <Route path="/auth/register" element={<AuthRegister />} />
          <Route path="/auth/login" element={<AuthLogin />} />
          <Route path="/auth/verify" element={<AuthVerify />} />
          <Route path="/auth/reset-password" element={<ResetPassword />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route path={'/dashboard'} element={<Dashboard />} />
            <Route path="/dashboard/profile" element={<Profile />} />
            <Route path="/dashboard/settings" element={<Settings />} />
            <Route path={'/dashboard/orders'} element={<UserOrders />} />
            <Route path={'/dashboard/reviews'} element={<Reviews />} />
            <Route path={'/dashboard/returned-canceled'} element={<CanceledOrders />} />
            <Route path="/dashboard/notifications/:id" element={<NotificationDetails />} />

            <Route element={<AdminRoute />}>
              <Route path="/dashboard/manage-products" element={<ManageProducts />} />
              <Route path="/dashboard/manage-orders" element={<ManageOrders />} />
              <Route path="/dashboard/customers" element={<Customers />} />
              <Route path="/dashboard/role-permission" element={<RolePermission />} />
              <Route path="/dashboard/teams" element={<Teams />} />
            </Route>
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(App);
