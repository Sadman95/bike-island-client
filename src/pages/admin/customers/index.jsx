import { Box, Stack } from '@mui/material';
import { useDeleteBulkUser, useDeleteUser, useGetAllUsers } from 'api/hooks';
import Preloader from 'components/custom/Preloader';
import CustomerDetails from 'components/customer-details';
import PersistentDrawer from 'components/drawers/persistant-drawer';
import DataTable from 'components/table/data-table';
import { ROLES } from 'enums';
import { socket } from 'helpers/socket';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { connect } from 'react-redux';
import { selectCurrentUser } from 'redux/selector';
import { createStructuredSelector } from 'reselect';
import swal from 'sweetalert';

/**
 * ========================================
 * Customers - customers page view
 * ========================================
 */
const Customers = ({ currentUser }) => {
  const [customers, setCustomers] = useState(null);
  const [open, setOpen] = useState('');
  const [filters, setFilters] = useState({ searchTerm: '', selectedFields: [] });

  const [sortOrder, setSortOrder] = useState('desc');
  const [sortBy, setSortBy] = useState('createdAt');

  const { data, isPending, isSuccess, isError, error, refetch } = useGetAllUsers({
    sortBy,
    sortOrder,
    searchTerm: filters.searchTerm,
  });
  const {
    mutate,
    isPending: isDeleteUsersPending,
    isError: isDeleteUsersError,
    error: deleteUsersError,
    isSuccess: isDeleteUsersSuccess,
    data: deleteUsersData,
  } = useDeleteBulkUser();
  const {
    mutate: deleteMutate,
    isPending: isDeleteUserPending,
    isError: isDeleteUserError,
    error: deleteUserError,
    isSuccess: isDeleteUserSuccess,
    data: deleteUserData,
  } = useDeleteUser();

  useEffect(() => {
    if (data && isSuccess) {
      setCustomers(data);
      refetch();
    }
  }, [data, isSuccess, sortOrder, sortBy]);

  useEffect(() => {
    refetch();
  }, [filters]);

  useEffect(() => {
    if (isDeleteUsersSuccess) {
      toast.success(deleteUsersData.data.message);
      refetch();
    }
    if (isDeleteUserSuccess) {
      toast.success(deleteUserData.data.message);
      refetch();
    }
  }, [isDeleteUsersSuccess, isDeleteUserSuccess]);

  // handle delete customer
  const handleDelete = (id) => {
    swal({
      title: 'Are you sure?',
      text: `Are you sure that you want to delete this customer-${id}?`,
      icon: 'warning',
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        socket.emit('delete-user', id);
        deleteMutate(id);
      }
    });
  };

  // handle bulk customer delete
  const handleBulkDelete = (ids) => {
    swal({
      title: 'Are you sure?',
      text: `Are you sure that you want to delete this customers-${ids.join(',')}?`,
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

  // handle view customer
  const handleView = (id) => {
    setOpen(id);
  };

  return (
    <>
      <PersistentDrawer open={open} onClose={() => setOpen('')} anchor="right">
        {open && customers && (
          <CustomerDetails user={customers.data.find((user) => user._id === open)} />
        )}
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
      {isDeleteUsersError && (
        <Stack
          alignItems="center"
          justifyContent="center"
          p={16}
          width="100%"
          border="1px dashed lightgray"
          borderRadius={6}
          fontSize={32}
        >
          {deleteUsersError.response?.data.message}
        </Stack>
      )}
      {isDeleteUserError && (
        <Stack
          alignItems="center"
          justifyContent="center"
          p={16}
          width="100%"
          border="1px dashed lightgray"
          borderRadius={6}
          fontSize={32}
        >
          {deleteUserError.response?.data.message}
        </Stack>
      )}
      {(isPending || isDeleteUsersPending || isDeleteUserPending) && (
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
      {customers && customers.data.length > 0 && (
        <DataTable
          title="customers"
          filters={filters}
          setFilters={setFilters}
          handleBulkDelete={handleBulkDelete}
          handleView={handleView}
          handleDelete={handleDelete}
          customer={sortOrder}
          setOrder={setSortOrder}
          orderBy={sortBy}
          setOrderBy={setSortBy}
          pagination={customers.meta.pagination}
          data={customers.data
            .filter((user) => user.role !== ROLES.ADMIN)
            .map(({ image, _id, avatar, contactNo, ...rest }) => ({
              id: _id,
              ...rest,
              isVerified: rest.isVerified ? 'YES' : 'NO',
              createdAt: new Date(rest.createdAt).toLocaleDateString(),
            }))}
        />
      )}
    </>
  );
};

Customers.propTypes = {
  currentUser: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(Customers);
