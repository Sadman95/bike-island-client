import { Cancel } from '@mui/icons-material';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useAddProduct } from 'api/hooks';
import { useFormik } from 'formik';
import { socket } from 'helpers/socket';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { GradientCircularProgress } from 'ui-component/progess/GradientCircularProgress';
import { removeBg } from 'utils/remove-bg';
import * as Yup from 'yup';

// Validation Schema
const validationSchema = Yup.object({
  productTitle: Yup.string()
    .min(3, 'Name must be at least 3 characters')
    .max(50, 'Name must not exceed 50 characters')
    .required('Product name is required'),
  productDesc: Yup.string()
    .min(10, 'Description must be at least 10 characters')
    .max(300, 'Description must not exceed 300 characters')
    .required('Description is required'),
  productPrice: Yup.number()
    .positive('Price must be a positive number')
    .required('Price is required'),
  stock: Yup.number()
    .integer('Stock must be a whole number')
    .positive('Stock must be greater than 0')
    .required('Stock is required'),
  type: Yup.string()
    .min(3, 'Type must be at least 3 characters')
    .max(30, 'Type must not exceed 30 characters')
    .required('Type is required'),
  brand: Yup.string()
    .min(3, 'Brand must be at least 3 characters')
    .max(30, 'Brand must not exceed 30 characters')
    .required('Brand is required'),
  productImg: Yup.mixed().required('Product image is required'),
});

const AddProduct = ({ onClose }) => {
  const [picturePreview, setPicturePreview] = useState(null);
  const [hasBackground, setHasBackground] = useState(false);
  const [isRemovingBg, setIsRemovingBg] = useState(false);
  const [_file, setFile] = useState(null);

  const { mutate: handleAdd, isSuccess, isPending, isError, error, data } = useAddProduct();

  useEffect(() => {
    if (isSuccess && data) {
      socket.emit('product-added', data.data);
      toast.success(data.data.message);
      onClose();
    }
  }, [isSuccess, data]);

  const formik = useFormik({
    initialValues: {
      productTitle: '',
      productDesc: '',
      productPrice: '',
      stock: '',
      type: '',
      brand: '',
      productImg: null,
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      handleAdd(values);
      isSuccess && resetForm();
    },
  });

  /**
   * CHOOSE PICTURE
   */
  const handleChoosePic = (e, values) => {
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
    };
  };

  /**
   * REMOVE BG HANDLER
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
    } catch (error) {
      toast.error('Failed to remove background:', error);
    } finally {
      setIsRemovingBg(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        width: '100%',
        mx: 'auto',
        p: 3,
      }}
    >
      <Typography variant="h5" fontWeight="bold" textAlign="center" mb={2}>
        Add New Product
      </Typography>

      {/* Product Name */}
      <TextField
        fullWidth
        label="Product Name"
        name="productTitle"
        value={formik.values.productTitle}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.productTitle && Boolean(formik.errors.productTitle)}
        helperText={formik.touched.productTitle && formik.errors.productTitle}
      />

      {/* Description */}
      <TextField
        fullWidth
        label="Description"
        name="productDesc"
        multiline
        rows={4}
        value={formik.values.productDesc}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.productDesc && Boolean(formik.errors.productDesc)}
        helperText={formik.touched.productDesc && formik.errors.productDesc}
      />

      {/* Price */}
      <TextField
        fullWidth
        label="Price ($)"
        name="productPrice"
        type="number"
        value={formik.values.productPrice}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.productPrice && Boolean(formik.errors.productPrice)}
        helperText={formik.touched.productPrice && formik.errors.productPrice}
      />

      {/* Stock */}
      <TextField
        fullWidth
        label="Stock"
        name="stock"
        type="number"
        value={formik.values.stock}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.stock && Boolean(formik.errors.stock)}
        helperText={formik.touched.stock && formik.errors.stock}
      />

      {/* Type */}
      <TextField
        fullWidth
        label="Type"
        name="type"
        value={formik.values.type}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.type && Boolean(formik.errors.type)}
        helperText={formik.touched.type && formik.errors.type}
      />

      {/* Brand */}
      <TextField
        fullWidth
        label="Brand"
        name="brand"
        value={formik.values.brand}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.brand && Boolean(formik.errors.brand)}
        helperText={formik.touched.brand && formik.errors.brand}
      />

      {/* Image Upload */}
      {!_file ? (
        <Button
          onClick={(e) => handleChoosePic(e, formik.values)}
          variant="outlined"
          component="label"
          fullWidth
          sx={{ textAlign: 'left' }}
        >
          Upload Image
        </Button>
      ) : 
      <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: 200,
            backgroundImage: `url(${picturePreview})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            borderRadius: 2,
            border: '1px solid #ddd',
            mb: 2,
          }}
        >
          <Button
            size="small"
            onClick={() => {
              setPicturePreview(null);
              setFile(null);

            }}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              backgroundColor: 'rgba(0,0,0,0.5)',
              color: '#fff',
            }}
          >
            Close
          </Button>
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
      }


      {formik.errors.productImg && formik.touched.productImg && (
        <Typography color="error" variant="body2">
          {formik.errors.productImg}
        </Typography>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={formik.isSubmitting || isPending}
      >
        {isPending ? <GradientCircularProgress /> : 'Add Product'}
      </Button>
    </Box>
  );
};

export default AddProduct;
