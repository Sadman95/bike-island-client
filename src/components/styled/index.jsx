import { Box, Card, Paper, styled, Typography } from '@mui/material';

export const StyledPaper = styled(Paper)(({ bgimage = null, bgcolor = null, color = null }) => ({
  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.371), rgba(0, 0, 0, 0.371)), url(${bgimage})`,
  backgroundPosition: 'bottomCenter',
  backgroundSize: 'cover',
  backgroundColor: bgcolor,
  backgroundBlendMode: 'multiply',
  color: color,
  textAlign: 'center',
  padding: '8px 12px',
}));

export const StyledOverlayCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
  padding: '1rem',
  position: 'relative',
  overflow: 'hidden',
  transition: theme.transitions.create(['box-shadow'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.short,
  }),
  '&:hover': {
    boxShadow: theme.shadows[4],
    '& .overlay': {
      opacity: 1,
      transform: 'translateY(0)',
      origin: 'top',
    },
  },
  '& .overlay': {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    origin: 'bottom',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0,
    transform: 'translateY(100%)',
    transition: theme.transitions.create(['opacity', 'transform'], {
      duration: theme.transitions.duration.standard,
    }),
  },
}));

// Usage:
// <StyledOverlayCard overlayComponent={<YourOverlayComponent />}>
//   {/* Card content */}
// </StyledOverlayCard>

export const StyledCard = styled(Card)(({ theme }) => ({
  padding: '16px',
  boxShadow: theme.shadows[1],
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create(['box-shadow'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.short,
  }),
  '&:hover': {
    boxShadow: theme.shadows[4],
  },
}));

export const StyledHeader = styled(Box)({
  backgroundImage:
    "radial-gradient(circle at center, rgba(255, 255, 255, 0.218) 0%, rgba(14, 13, 14, 0.9) 100%), url('https://i.ibb.co/YyNRgm1/banner.jpg')",
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  width: '100%',
  minHeight: '800px',
  position: 'relative',
});

export const StyledHeaderContent = styled(Box)({
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  textAlign: 'center',
});

export const StyledTypography = styled(Typography)(({ theme }) => ({
  mt: 8,
  fontSize: getFontSize(theme),
}));

// Add this function outside the component
const getFontSize = (theme) => {
  if (theme.breakpoints.up('sm')) return '2rem';
  if (theme.breakpoints.up('md')) return '4rem';
  return '1rem';
};
