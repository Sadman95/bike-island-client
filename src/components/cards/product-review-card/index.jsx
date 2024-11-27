import { Delete } from '@mui/icons-material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  IconButton,
  Rating,
  Typography,
} from '@mui/material';
import { useDeleteReview } from 'api/hooks';
import { DateTime } from 'components/core/DateTime';
import { baseUrlV2 } from 'config/env';
import { socket } from 'helpers/socket';
import { useEffect, useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from 'redux/selector';
import swal from 'sweetalert';
import { GradientCircularProgress } from 'ui-component/progess/GradientCircularProgress';
import { decrypt } from 'utils/decrypt';

const ProductReviewCard = ({
  rating,
  comment,
  user,
  createdAt,
  reviewImages,
  likes,
  refetch,
  _id,
}) => {
  const [hoveredImage, setHoveredImage] = useState(null);
  const [likeState, setLikeState] = useState(null); 
  const [likeCount, setLikeCount] = useState(likes || 0);
  const [isUpdating, setIsUpdating] = useState(false);
  const currentUser = useSelector(selectCurrentUser);

  // Delete review API call
  const { mutate: handleDeleteReview, isSuccess, isPending, data } = useDeleteReview(_id);

  const handleMouseEnter = (src) => setHoveredImage(src);
  const handleMouseLeave = () => setHoveredImage(null);

  const handleLikeToggle = useCallback(() => {
    if (isUpdating) return;

    setIsUpdating(true);
    const newLikeState = likeState === 'liked' ? null : 'liked';
    const likeDelta = newLikeState === 'liked' ? 1 : -1;

    // Optimistic update
    setLikeState(newLikeState);
    setLikeCount((prev) => Math.max(0, prev + likeDelta));

    // Emit like/dislike data to the server
    socket.emit('like-dislike', { reviewId: _id, likes: likeDelta }, () => {
      setIsUpdating(false); // Allow further interactions after server acknowledgment
    });
  }, [likeState, isUpdating, _id]);

  useEffect(() => {
    // Listen for real-time updates from the server
    const handleLikeDislikeUpdate = (updatedData) => {
      if (updatedData.reviewId === _id) {
        setLikeCount(updatedData.likes);
      }
    };

    socket.on('like-dislike-update', handleLikeDislikeUpdate);

    return () => {
      socket.off('like-dislike-update', handleLikeDislikeUpdate);
    };
  }, [_id, likeCount]);

  useEffect(() => {
    if (isSuccess && data) {
      toast.success(data.data.message);
      refetch();
    }
  }, [isSuccess, data, refetch]);

  return (
    <Card sx={{ maxWidth: '100%', p: 2, boxShadow: 3, borderRadius: 2, position: 'relative' }}>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <Box display="flex" alignItems="center">
          <Avatar src={`${baseUrlV2}/${user.avatar}`} sx={{ bgcolor: 'primary.main', mr: 2 }} />
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              {user.firstName}
            </Typography>
            <Chip label="Verified Purchase" color="success" size="small" />
          </Box>
        </Box>
        {user.id === decrypt(currentUser.id) && (
          <IconButton
            disabled={isPending}
            color="error"
            onClick={() => {
              swal({
                title: 'Are you sure?',
                text: 'Do you really want to delete this review?',
                icon: 'warning',
                dangerMode: true,
                buttons: true,
              }).then((willDelete) => {
                if (willDelete) {
                  handleDeleteReview();
                }
              });
            }}
            sx={{ position: 'relative' }}
          >
            {isPending ? <GradientCircularProgress size={20} /> : <Delete />}
          </IconButton>
        )}
      </Box>
      <Box display="flex" alignItems="center" mb={1}>
        <Rating value={rating} readOnly precision={0.5} />
        <Typography variant="body2" color="text.secondary" ml={1}>
          {new DateTime(createdAt).formatDate()}
        </Typography>
      </Box>
      <CardContent>
        <Typography variant="body2" color="text.primary" paragraph>
          {comment}
        </Typography>
        <Grid container spacing={1}>
          {reviewImages.map((src, index) => (
            <Grid item xs={4} sm={2} key={index}>
              <Box
                onMouseEnter={() => handleMouseEnter(`${baseUrlV2}/${src}`)}
                onMouseLeave={handleMouseLeave}
                sx={{
                  overflow: 'hidden',
                  borderRadius: 1,
                  cursor: 'pointer',
                }}
              >
                <Box
                  component="img"
                  src={`${baseUrlV2}/${src}`}
                  alt={`Image ${index + 1}`}
                  sx={{
                    width: '100%',
                    height: 'auto',
                    transition: 'transform 0.3s ease',
                  }}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
        {hoveredImage && (
          <Box
            sx={{
              width: '50%',
              height: 300,
              overflow: 'hidden',
              borderRadius: 2,
              boxShadow: 3,
              transition: 'opacity 0.3s ease',
              bgcolor: 'background.paper',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10,
            }}
          >
            <Box
              component="img"
              src={hoveredImage}
              alt="Zoomed preview"
              sx={{
                width: '200%',
                height: 'auto',
                transition: 'transform 0.3s ease',
              }}
            />
          </Box>
        )}
        <Box display="flex" alignItems="center" mt={1} gap={1}>
          <IconButton
            color={likeState === 'liked' ? 'primary' : 'default'}
            onClick={handleLikeToggle}
            disabled={isUpdating}
          >
            {likeState === 'liked' ? <ThumbUpIcon /> : <ThumbUpOffAltIcon />}
          </IconButton>
          <Typography variant="body2">{likeCount}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductReviewCard;
