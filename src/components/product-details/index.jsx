import { CameraAlt, Close, EditNote, Save } from '@mui/icons-material';
import {
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  Divider,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useCycle, useUpdateCycle } from 'api/hooks';
import Preloader from 'components/custom/Preloader';
import { baseUrlV2 } from 'config/env';
import { NOTIFICATION, ROLES } from 'enums';
import { useFormik } from 'formik';
import { socket } from 'helpers/socket';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { addNotification } from 'redux/notification.reducer';
import { selectCurrentNotifications, selectCurrentUser } from 'redux/selector';
import { removeBg } from 'utils/remove-bg';
import * as Yup from 'yup';

const ProductDetails = ({ productId }) => {
  const [product, setProduct] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [isModified, setIsModified] = useState(false);
  const [_file, setFile] = useState(null);
  const [picturePreview, setPicturePreview] = useState(null);
  const [hasBackground, setHasBackground] = useState(false);
  const [isRemovingBg, setIsRemovingBg] = useState(false);
  const currentUser = useSelector(selectCurrentUser);
  const { notifications, unreadCount } = useSelector(selectCurrentNotifications);
  const dispatch = useDispatch();

  const { data, isPending, isSuccess, isError, error, refetch } = useCycle(productId);
  const {
    mutate: handleUpdate,
    data: updatedData,
    isPending: isUpdatePending,
    isSuccess: isUpdateSuccess,
    isError: isUpdateError,
    error: updateError,
  } = useUpdateCycle(productId);

  useEffect(() => {
    if (isUpdateSuccess && updatedData) {
      toast.success(updatedData.data.message);
      socket.emit('product-updated', updatedData.data);
      refetch();
    }
    return () => socket.off('product-updated');
  }, [isUpdateSuccess, updatedData]);

  useEffect(() => {
    if (data && isSuccess) {
      const {
        _id,
        brand,
        createdAt,
        updatedAt,
        productDesc,
        productImg,
        productPrice,
        productTitle,
        type,
      } = data.data;
      setProduct({
        _id,
        brand,
        createdAt,
        updatedAt,
        productDesc,
        productImg,
        productPrice,
        productTitle,
        type,
      });
    }
  }, [data, isSuccess]);

  useEffect(() => {
    if (currentUser) {
      socket.on('product-updated', (productData) => {
        // Dispatch an action to add the new notification
        if (currentUser.role != ROLES.USER) {
          dispatch(
            addNotification({
              id: productData._id, // Assuming data contains _id as a unique identifier
              message: `Product #${productData._id} is updated`,
              timestamp: productData.updatedAt,
              read: false,
              productId: productData._id,
              type: NOTIFICATION.UPDATE_PRODUCT,
            }),
          );
        }
        refetch();
      });
    }
    return () => socket.off('product-updated');
  }, [currentUser, notifications, unreadCount, updatedData]);

  const formik = useFormik({
    initialValues: product || {
      brand: '',
      productTitle: '',
      productDesc: '',
      productPrice: '',
      type: '',
      productImg: null,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      brand: Yup.string().required('Brand is required'),
      productTitle: Yup.string().required('Title is required'),
      productDesc: Yup.string(),
      productPrice: Yup.number().required('Price is required'),
      type: Yup.string().required('Type is required'),
      productImg: Yup.mixed(),
    }),
    onSubmit: ({ _id, createdAt, ...values }) => {
      handleUpdate(values);
      setEditMode(false);
      setIsModified(false);
    },
    validateOnChange: true,
    validateOnBlur: true,
  });

  const handleInputChange = (e) => {
    formik.handleChange(e);
    setIsModified(true);
  };

  // Check if the image has a background
  useEffect(() => {
    if (_file) {
      const checkBackground = async () => {
        try {
          await removeBg(_file);
          setHasBackground(true);
        } catch {
          setHasBackground(false);
        }
      };
      checkBackground();
    }
  }, [_file]);

  const handleChooseProfilePic = (e, values) => {
    e.preventDefault();
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.png,.jpg,.jpeg';
    input.click();
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      if (!file.type.startsWith('image/')) {
        toast.error('Only image files are accepted');
        return;
      }
      setFile(file);
      values.productImg = file;
      setPicturePreview(URL.createObjectURL(file));
      setIsModified(true);
    };
  };

  /**
   * REMOVE BG HANDLER
   * @param
   */
  const handleRemoveBackground = async (values) => {
    setIsRemovingBg(true);
    try {
      const removedBg = await removeBg(_file);
      const blob = new Blob([removedBg], { type: 'image/png' });

      // Get the original file name and extension
      const originalName = _file.name;
      const dotIndex = originalName.lastIndexOf('.');
      const baseName = originalName.substring(0, dotIndex);
      const extension = originalName.substring(dotIndex);

      // Create the new name with '-rm' appended
      const newName = `${baseName}-rm${extension}`;

      // Create the new File with the dynamic name
      const file = new File([blob], newName, { type: 'image/png' });

      const objectUrl = URL.createObjectURL(file);
      setPicturePreview(objectUrl);
      setFile(file); // Store the File with the new name
      values.productImg = file;
      setHasBackground(false);
      setIsModified(true);
    } catch (error) {
      toast.error('Failed to remove background:', error);
    } finally {
      setIsRemovingBg(false);
    }
  };

  return (
    <Box sx={{ padding: 2, width: '100%', minWidth: window.innerWidth * 0.5 }}>
      {(isPending || isUpdatePending) && (
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
      {(isError || isUpdateError) && (
        <Stack
          alignItems="center"
          justifyContent="center"
          p={16}
          width="100%"
          border="1px dashed lightgray"
          borderRadius={6}
          fontSize={32}
        >
          {error?.response?.data?.message || updateError?.response?.data?.message}
        </Stack>
      )}
      {product && !isError && (
        <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
          <ButtonGroup
            sx={{ my: 1, display: 'flex', justifyContent: 'start' }}
            size="small"
            disableElevation
            variant="contained"
            aria-label="Product actions"
          >
            <IconButton
              aria-label={editMode ? 'close' : 'edit'}
              onClick={() => setEditMode(!editMode)}
            >
              {editMode ? <Close /> : <EditNote />}
            </IconButton>

            {isModified && editMode && (
              <IconButton aria-label="save" onClick={() => formik.handleSubmit()}>
                <Save />
              </IconButton>
            )}
          </ButtonGroup>

          {/* Image with overlay camera icon */}
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              height: 200,
              backgroundImage: `url(${picturePreview ? picturePreview : baseUrlV2 + '/' + product.productImg})`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              borderRadius: 2,
              border: '1px solid #ddd',
              mb: 2,
            }}
          >
            {editMode && (
              <IconButton
                onClick={(e) => handleChooseProfilePic(e, formik.values)}
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  backgroundColor: 'rgba(0,0,0,0.6)',
                  color: 'white',
                  '&:hover': { backgroundColor: 'rgba(0,0,0,0.8)' },
                }}
              >
                <CameraAlt />
              </IconButton>
            )}
            {hasBackground && (
              <Button
                size="small"
                onClick={() => handleRemoveBackground(formik.values)}
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  color: '#fff',
                }}
              >
                {isRemovingBg ? <CircularProgress size={24} color="inherit" /> : 'Remove BG'}
              </Button>
            )}
          </Box>

          <Typography variant="h6" gutterBottom>
            {editMode ? 'Edit Product Details' : 'Product Details'}
          </Typography>
          <Divider sx={{ my: 2 }} />

          {/* Product Form */}
          <Stack spacing={2}>
            {editMode ? (
              <>
                <TextField
                  label="Title"
                  name="productTitle"
                  value={formik.values.productTitle}
                  onChange={handleInputChange}
                  error={Boolean(formik.errors.productTitle)}
                  helperText={formik.errors.productTitle}
                  fullWidth
                />
                <TextField
                  label="Brand"
                  name="brand"
                  value={formik.values.brand}
                  onChange={handleInputChange}
                  error={Boolean(formik.errors.brand)}
                  helperText={formik.errors.brand}
                  fullWidth
                />
                <TextField
                  label="Type"
                  name="type"
                  value={formik.values.type}
                  onChange={handleInputChange}
                  error={Boolean(formik.errors.type)}
                  helperText={formik.errors.type}
                  fullWidth
                />
                <TextField
                  label="Description"
                  name="productDesc"
                  value={formik.values.productDesc}
                  onChange={handleInputChange}
                  error={Boolean(formik.errors.productDesc)}
                  helperText={formik.errors.productDesc}
                  fullWidth
                />
                <TextField
                  label="Price"
                  name="productPrice"
                  type="number"
                  value={formik.values.productPrice}
                  onChange={handleInputChange}
                  error={Boolean(formik.errors.productPrice)}
                  helperText={formik.errors.productPrice}
                  fullWidth
                />
              </>
            ) : (
              <>
                <Typography variant="body2" color="textSecondary">
                  Title: {product.productTitle}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Brand: {product.brand}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Type: {product.type}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Description: {product.productDesc}
                </Typography>
                <Typography variant="h5" color="primary">
                  ${product.productPrice}
                </Typography>
              </>
            )}
          </Stack>
          <Divider sx={{ my: 2 }} />
          <Typography variant="caption" color="textSecondary">
            Added on: {new Date(product.createdAt).toLocaleDateString()}
          </Typography>
          <br />
          {new Date(product.updatedAt).getMilliseconds() >
            new Date(product.createdAt).getMilliseconds() && (
            <Typography variant="caption" color="textSecondary">
              Updated on: {new Date(product.updatedAt).toLocaleDateString()}
            </Typography>
          )}
        </form>
      )}
    </Box>
  );
};

ProductDetails.propTypes = {
  productId: PropTypes.string.isRequired,
};

export default ProductDetails;
