import { AddBox } from '@mui/icons-material';
import { Box, IconButton, Stack, Tooltip } from '@mui/material';
import { useCycles, useDeleteBulkCycles, useDeleteCycle } from 'api/hooks';
import Preloader from 'components/custom/Preloader';
import PersistentDrawer from 'components/drawers/persistant-drawer';
import ProductDetails from 'components/product-details';
import DataTable from 'components/table/data-table';
import { NOTIFICATION, ROLES } from 'enums';
import AddProduct from 'forms/add-product';
import { socket } from 'helpers/socket';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { connect, useDispatch } from 'react-redux';
import { addNotification } from 'redux/notification.reducer';
import { selectCurrentUser } from 'redux/selector';
import { createStructuredSelector } from 'reselect';
import swal from 'sweetalert';

/**
 * ========================================
 * ManageProducts - manage products page
 * ========================================
 */
const ManageProducts = ({ currentUser }) => {
  const [appBarHeight, setAppBarHeight] = useState(0);
  const [cycles, setCycles] = useState(null);
  const [openDrawer, setOpenDrawer] = useState({ type: '', productId: '' });
  const [filters, setFilters] = useState({ searchTerm: '', selectedFields: [] });
  const [sortOrder, setSortOrder] = useState('desc');
  const [sortBy, setSortBy] = useState('createdAt');

  const dispatch = useDispatch();

  const { data, isPending, isSuccess, isError, error, refetch } = useCycles({
    sortBy,
    sortOrder,
    searchTerm: filters.searchTerm,
  });

  const {
    mutate,
    isPending: isDeleteProductsPending,
    isError: isDeleteProductsError,
    error: deleteProductsError,
    isSuccess: isDeleteProductsSuccess,
    data: deleteProductsData,
  } = useDeleteBulkCycles();

  const {
    mutate: deleteMutate,
    isPending: isDeleteProductPending,
    isError: isDeleteProductError,
    error: deleteProductError,
    isSuccess: isDeleteProductSuccess,
    data: deleteProductData,
  } = useDeleteCycle();

  useEffect(() => {
    if (document.getElementById('app-bar')) {
      setAppBarHeight(document.getElementById('app-bar').clientHeight);
    }
  }, [document]);

  useEffect(() => {
    if (data && isSuccess) {
      setCycles(data);
    }
  }, [data, isSuccess]);

  useEffect(() => {
    if (currentUser) {
      socket.on('product-added', (productData) => {
        if (currentUser.role != ROLES.USER) {
          dispatch(
            addNotification({
              id: productData._id,
              message: `New product added: Product #${productData._id}`,
              timestamp: productData.createdAt,
              read: false,
              orderId: productData._id,
              type: NOTIFICATION.CREATE_PRODUCT,
            }),
          );
        }
        refetch();
      });
    }
    return () => {
      socket.off('product-added');
    };
  }, [currentUser, dispatch, refetch]);

  useEffect(() => {
    if (isDeleteProductsSuccess) {
      toast.success(deleteProductsData.data.message);
      refetch();
    }
  }, [isDeleteProductsSuccess, deleteProductsData, refetch]);

  const handleDelete = (id) => {
    swal({
      title: 'Are you sure?',
      text: `Are you sure that you want to delete this product-${id}?`,
      icon: 'warning',
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteMutate(id);
        socket.emit('delete-product', id);
      }
    });
  };

  const handleBulkDelete = (ids) => {
    swal({
      title: 'Are you sure?',
      text: `Are you sure that you want to delete these products-${ids.join(',')}?`,
      icon: 'warning',
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        mutate({ ids });
      }
    });
  };

  const handleView = (id) => {
    setOpenDrawer({ type: 'view', productId: id });
  };

  const handleAddProduct = () => {
    setOpenDrawer({ type: 'add', productId: '' });
  };

  const closeDrawer = () => {
    setOpenDrawer({ type: '', productId: '' });
  };

  return (
    <>
      <Stack
        bgcolor={(theme) => theme.palette.common.white}
        position="sticky"
        zIndex={1000}
        top={appBarHeight}
        right={0}
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        width="100%"
        marginLeft="auto"
        border="1px solid lightgray"
        spacing={0.5}
        p={0.5}
        my={2}
        borderRadius={1}
      >
        <Tooltip title="Add Product">
          <IconButton onClick={handleAddProduct} sx={{ p: 0 }}>
            <AddBox />
          </IconButton>
        </Tooltip>
      </Stack>
      <PersistentDrawer open={openDrawer.type !== ''} onClose={closeDrawer} anchor="right">
        {openDrawer.type === 'view' && <ProductDetails productId={openDrawer.productId} />}
        {openDrawer.type === 'add' && <AddProduct onClose={closeDrawer} />}
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
      {(isPending || isDeleteProductsPending || isDeleteProductPending) && (
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
      {cycles && !isError && (
        <DataTable
          filters={filters}
          setFilters={setFilters}
          title="Products"
          handleBulkDelete={handleBulkDelete}
          handleView={handleView}
          handleDelete={handleDelete}
          order={sortOrder}
          setOrder={setSortOrder}
          orderBy={sortBy}
          setOrderBy={setSortBy}
          pagination={cycles.meta.pagination}
          data={cycles.data.map(({ productImg, productDesc, updatedAt, __v, _id, ...rest }) => ({
            id: _id,
            ...rest,
            createdAt: new Date(rest.createdAt).toLocaleDateString(),
          }))}
        />
      )}
    </>
  );
};

ManageProducts.propTypes = {
  currentUser: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(ManageProducts);
