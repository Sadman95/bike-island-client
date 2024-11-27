import { Box, Stack } from '@mui/material';
import { useDeleteBulkOrder, useDeleteOrder, useGetAllOrders } from 'api/hooks';
import Preloader from 'components/custom/Preloader';
import PersistentDrawer from 'components/drawers/persistant-drawer';
import OrderDetails from 'components/order-details';
import DataTable from 'components/table/data-table';
import { NOTIFICATION, ROLES } from 'enums';
import { socket } from 'helpers/socket';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { connect, useDispatch, useSelector } from 'react-redux';
import { addNotification } from 'redux/notification.reducer';
import { selectCurrentNotifications, selectCurrentUser } from 'redux/selector';
import { createStructuredSelector } from 'reselect';
import swal from 'sweetalert';
import { decrypt } from 'utils/decrypt';

/**
 * ========================================
 * ManageOrders - manage orders page view
 * ========================================
 */
const ManageOrders = ({ currentUser }) => {
  const [orders, setOrders] = useState(null);
  const [open, setOpen] = useState('');
  const [filters, setFilters] = useState({ searchTerm: '', selectedFields: [] });

  const dispatch = useDispatch();
  const { notifications, unreadCount } = useSelector(selectCurrentNotifications);

  const [sortOrder, setSortOrder] = useState('desc');
  const [sortBy, setSortBy] = useState('createdAt');

  const { data, isPending, isSuccess, isError, error, refetch } = useGetAllOrders({
    sortBy,
    sortOrder,
    searchTerm: filters.searchTerm,
  });
  const {
    mutate,
    isPending: isDeleteOrdersPending,
    isError: isDeleteOrdersError,
    error: deleteOrdersError,
    isSuccess: isDeleteOrdersSuccess,
    data: deleteOrdersData,
  } = useDeleteBulkOrder();
  const {
    mutate: deleteMutate,
    isPending: isDeleteOrderPending,
    isError: isDeleteOrderError,
    error: deleteOrderError,
    isSuccess: isDeleteOrderSuccess,
    data: deleteOrderData,
  } = useDeleteOrder();

  useEffect(() => {
    if (data && isSuccess) {
      setOrders(data);
      refetch();
    }
  }, [data, isSuccess, sortOrder, sortBy]);

  useEffect(() => {
    refetch();
  }, [filters]);

  useEffect(() => {
    if (currentUser) {
      socket.on('new-order', (orderData) => {
        // Dispatch an action to add the new notification
        if (currentUser.role != ROLES.USER || currentUser.id == orderData.data.user) {
          dispatch(
            addNotification({
              id: orderData._id, // Assuming data contains _id as a unique identifier
              message: `New order received: Order #${orderData._id}`,
              timestamp: orderData.createdAt,
              read: false,
              orderId: orderData._id,
              type: NOTIFICATION.CREATE_ORDER,
            }),
          );
        }
        refetch();
      });
    }
    return () => socket.off('new-order');
  }, [currentUser, notifications, unreadCount, data]);

  useEffect(() => {
    socket.on('order-updated', (_data) => {
      if (currentUser.role != ROLES.USER || decrypt(currentUser.id) == _data.userId) {
        refetch();
      }
    });
    return () => socket.off('order-updated');
  }, [data]);

  useEffect(() => {
    if (isDeleteOrdersSuccess) {
      toast.success(deleteOrdersData.data.message);
      refetch();
    }
    if (isDeleteOrderSuccess) {
      toast.success(deleteOrderData.data.message);
      refetch();
    }
  }, [isDeleteOrdersSuccess, isDeleteOrderSuccess]);

  // handle delete order
  const handleDelete = (id) => {
    swal({
      title: 'Are you sure?',
      text: `Are you sure that you want to delete this order-${id}?`,
      icon: 'warning',
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteMutate(id);
        socket.emit('delete-order', id);
      }
    });
  };

  // handle bulk order delete
  const handleBulkDelete = (ids) => {
    swal({
      title: 'Are you sure?',
      text: `Are you sure that you want to delete this orders-${ids.join(',')}?`,
      icon: 'warning',
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        mutate({
          ids,
        });
      }
    });
  };

  // handle view order
  const handleView = (id) => {
    setOpen(id);
  };

  return (
    <>
      <PersistentDrawer open={open} onClose={() => setOpen('')}>
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
      {isDeleteOrdersError && (
        <Stack
          alignItems="center"
          justifyContent="center"
          p={16}
          width="100%"
          border="1px dashed lightgray"
          borderRadius={6}
          fontSize={32}
        >
          {deleteOrdersError.response?.data.message}
        </Stack>
      )}
      {isDeleteOrderError && (
        <Stack
          alignItems="center"
          justifyContent="center"
          p={16}
          width="100%"
          border="1px dashed lightgray"
          borderRadius={6}
          fontSize={32}
        >
          {deleteOrderError.response?.data.message}
        </Stack>
      )}
      {(isPending || isDeleteOrdersPending || isDeleteOrderPending) && (
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
          title="orders"
          filters={filters}
          setFilters={setFilters}
          handleBulkDelete={handleBulkDelete}
          handleView={handleView}
          handleDelete={handleDelete}
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
          }))}
        />
      )}
    </>
  );
};

ManageOrders.propTypes = {
  currentUser: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(ManageOrders);
