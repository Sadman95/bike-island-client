import { Box, Stack } from '@mui/material';
import { useGetUserOrders } from 'api/hooks';
import Preloader from 'components/custom/Preloader';
import PersistentDrawer from 'components/drawers/persistant-drawer';
import OrderDetails from 'components/order-details';
import DataTable from 'components/table/data-table';
import { NOTIFICATION, ROLES } from 'enums';
import { socket } from 'helpers/socket';
import { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { addNotification } from 'redux/notification.reducer';
import { selectCurrentNotifications, selectCurrentUser } from 'redux/selector';
import { createStructuredSelector } from 'reselect';
import { decrypt } from 'utils/decrypt';

/**
 * =============================
 * UserOrders - UserOrders view
 * =============================
 */
const UserOrders = ({ currentUser }) => {
  const [orders, setOrders] = useState(null);
  const [open, setOpen] = useState('');
  const [filters, setFilters] = useState({ searchTerm: '', selectedFields: [] });

  const dispatch = useDispatch();
  const { notifications, unreadCount } = useSelector(selectCurrentNotifications);

  const [sortOrder, setSortOrder] = useState('asc');
  const [sortBy, setSortBy] = useState('createdAt');

  const { data, isPending, isSuccess, isError, error, refetch } = useGetUserOrders({
    user: decrypt(currentUser.id),
    sortBy,
    sortOrder,
  });

  useEffect(() => {
    if (data && isSuccess) {
      setOrders(data);
      refetch();
    }
  }, [data, isSuccess]);

  useEffect(() => {
    if (currentUser) {
      socket.on('order-updated', (orderData) => {
        // Dispatch an action to add the new notification
        if (currentUser.role != ROLES.USER || decrypt(currentUser.id) == orderData.userId) {
          dispatch(
            addNotification({
              id: orderData._id, // Assuming data contains _id as a unique identifier
              message: orderData.message,
              timestamp: orderData.createdAt,
              read: false,
              orderId: orderData._id,
              type: NOTIFICATION.UPDATE_ORDER,
            }),
          );
          refetch();
        }
      });
    }
    return () => socket.off('order-updated');
  }, [currentUser, notifications, unreadCount, data]);

  // handle view order
  const handleView = (id) => {
    setOpen(id);
  };

  return (
    <>
      <PersistentDrawer open={open} onClose={() => setOpen('')} anchor="right">
        {open && <OrderDetails orderId={open} />}
      </PersistentDrawer>
      {isError && (
        <Stack
          alignItems="center"
          justifyContent="center"
          p={16}
          width="100%"
          border="1px dashed lightgray"
          borderRadius={6}
          fontSize={32}
        >
          {error.response?.data.message}
        </Stack>
      )}

      {isPending && (
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
      )}
      {orders && !isError && (
        <DataTable
          filters={filters}
          setFilters={setFilters}
          handleView={handleView}
          order={sortOrder}
          setOrder={setSortOrder}
          orderBy={sortBy}
          setOrderBy={setSortBy}
          pagination={orders.meta.pagination}
          data={orders.data.map(({ image, _id, ...rest }) => ({
            id: _id,
            ...rest,
            items: rest.items?.length ? rest.items?.length : 1,
            createdAt: new Date(rest.createdAt).toLocaleDateString(),
            user: rest.user.email,
          }))}
        />
      )}
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(UserOrders);
