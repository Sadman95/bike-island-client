import { AttachFile } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  Modal,
  Rating,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { useCreateReview } from 'api/hooks';
import { baseUrlV2 } from 'config/env';
import { Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { GradientCircularProgress } from 'ui-component/progess/GradientCircularProgress';
import * as Yup from 'yup';

const AddReview = ({ ...props }) => {
  const { productTitle, productImg, _id: productId, isModalOpen, setModalOpen, refetch } = props;

  const [selectedImages, setSelectedImages] = useState([]);
  const [files, setFiles] = useState([]);

  // Validation Schema
  const validationSchema = Yup.object({
    rating: Yup.number().required('Rating is required').min(1, 'Select at least 1 star'),
    comment: Yup.string().required('Comment is required').max(500, 'Max 500 characters allowed'),
  });

  // Handle Image Upload
  const handleImageUpload = (event) => {
    setFiles([...event.target.files]);
    const inputFiles = Array.from(event.target.files);
    if (selectedImages.length + inputFiles.length > 5) {
      return alert('Maximum of 5 images allowed');
    }
    const newImages = inputFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setSelectedImages((prev) => [...prev, ...newImages]);
  };

  // Remove Preview Image
  const removeImage = (index) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
    setFiles(files.filter((_, i) => i !== index));
  };

  // add review api call
  const { mutate: handleAddReview, isPending, isSuccess, data } = useCreateReview(productId);

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.data.message);
        setModalOpen(false);
        refetch();
    }
  }, [isSuccess]);

  return (
    <Modal
      open={isModalOpen}
      onClose={() => setModalOpen(false)}
      aria-labelledby="write-review-modal"
      aria-describedby="write-a-review-for-the-product"
    >
      <Box
        sx={{
          maxWidth: 600,
          mx: 'auto',
          mt: 5,
          bgcolor: 'white',
          borderRadius: 2,
          boxShadow: 24,
          p: 3,
          position: 'relative',
        }}
      >
        {/* Product Info */}
        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
          <Avatar
            variant="square"
            src={baseUrlV2 + '/' + productImg}
            sx={{ width: 60, height: 60, border: '1px solid lightgrey', borderRadius: 2 }}
            alt="Product"
          />
          <Typography variant="h6">{productTitle}</Typography>
        </Stack>
        <Divider />

        {/* Review Form */}
        <Formik
          initialValues={{ rating: 0, comment: '', reviewImages: [] }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            values.reviewImages = files;
            handleAddReview(values);
          }}
        >
          {({ errors, touched, setFieldValue }) => (
            <Form encType="multipart/form-data">
              <Box sx={{ mt: 2 }}>
                {/* Star Rating */}
                <Field name="rating">
                  {({ field }) => (
                    <Stack
                      spacing={1}
                      direction="row"
                      flexWrap="wrap"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <div>
                        <Typography variant="subtitle1">Your Rating</Typography>
                        <Rating
                          name="rating"
                          value={field.value}
                          onChange={(_, value) => setFieldValue('rating', value)}
                          precision={0.5}
                        />
                        {touched.rating && errors.rating && (
                          <Typography color="error" variant="caption">
                            {errors.rating}
                          </Typography>
                        )}
                      </div>
                      {/* Attachment Icon */}
                      <Tooltip title="Attach up to 5 images">
                        <IconButton
                          component="label"
                          // sx={{ position: 'absolute', bottom: 16, right: 16 }}
                        >
                          <AttachFile />
                          <input
                            type="file"
                            name="reviewImages"
                            hidden
                            accept="image/*"
                            multiple
                            onChange={handleImageUpload}
                          />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  )}
                </Field>

                {/* Comment */}
                <Field name="comment">
                  {({ field }) => (
                    <TextField
                      {...field}
                      label="Your Review"
                      fullWidth
                      multiline
                      rows={4}
                      sx={{ mt: 2 }}
                      error={touched.comment && !!errors.comment}
                      helperText={touched.comment && errors.comment}
                    />
                  )}
                </Field>

                {/* Image Previews */}
                <Stack direction="row" spacing={2} sx={{ mt: 2, flexWrap: 'wrap' }}>
                  {selectedImages.map((img, index) => (
                    <Box
                      key={index}
                      sx={{
                        position: 'relative',
                        width: 80,
                        height: 80,
                        border: '1px solid lightgray',
                        borderRadius: 1,
                        overflow: 'hidden',
                      }}
                    >
                      <img
                        src={img.preview}
                        alt={`Preview ${index}`}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <Button
                        size="small"
                        sx={{
                          position: 'absolute',
                          top: 0,
                          right: 0,
                          bgcolor: 'white',
                          minWidth: 'unset',
                        }}
                        onClick={() => removeImage(index)}
                      >
                        ×
                      </Button>
                    </Box>
                  ))}
                </Stack>

                {/* Submit Button */}
                <Button
                  disabled={isPending}
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{ mt: 4 }}
                >
                  {isPending ? <GradientCircularProgress size={20} /> : 'Submit Review'}
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};

export default AddReview;
