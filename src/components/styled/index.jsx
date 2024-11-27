import { Box, Card, InputBase, keyframes, Menu, Paper, styled, Typography } from '@mui/material';
import { alpha } from '@mui/system';
import { getFontSize } from 'utils/get-font-size';

/**
 * ==============
 * css animations
 * ==============
 */
export const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
export const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-2px); }
`;

export const rotate = keyframes`
  0% { 
    transform: translate(0, 0) rotate(0deg);
  }
  24.99% { 
    transform: translate(-100% + 45px, 0) rotate(0deg);
  }
  25% {
    transform: translate(-100% + 45px, 0) rotate(-90deg);
  }
  49.99% { 
    transform: translate(-100% + 45px, -100% + 45px) rotate(-90deg);
  }
  50% {
    transform: translate(-100% + 45px, -100% + 45px) rotate(-180deg);
  }
  74.99% { 
    transform: translate(0, -100% + 45px) rotate(-180deg);
  }
  75% {
    transform: translate(0, -100% + 45px) rotate(-270deg);
  }
  100% { 
    transform: translate(0, 0) rotate(-360deg);
  }
`;
export const moveAround = keyframes`
  0%, 100% { 
    top: -45px;
    left: -45px;
    transform: translate(0, 0) rotate(0deg);
  }
  24.99% { 
    top: -45px;
    left: calc(100%);
    transform: translate(-100%, 0) rotate(0deg);
  }
  25% {
    top: -45px;
    left: calc(100%);
    transform: translate(-100%, 0) rotate(90deg);
  }
  49.99% { 
    top: calc(100%);
    left: calc(100%);
    transform: translate(-100%, -100%) rotate(90deg);
  }
  50% {
    top: calc(100%);
    left: calc(100%);
    transform: translate(-100%, -100%) rotate(180deg);
  }
  74.99% { 
    top: calc(100%);
    left: -45px;
    transform: translate(0, -100%) rotate(180deg);
  }
  75% {
    top: calc(100%);
    left: -45px;
    transform: translate(0, -100%) rotate(270deg);
  }
`;

/**
 * ==================
 * styled componentts
 * ==================
 */
// styled paper
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

// styled overlay card
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
    '& button': {
      color: 'white',
      border: '1px solid white',
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

// styled card
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

// styled header content
export const StyledHeaderContent = styled(Box)({
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  textAlign: 'center',
});

// styled typo graphy
export const StyledTypography = styled(Typography)(({ theme }) => ({
  mt: 8,
  fontSize: getFontSize(theme),
}));

// styled bootstrap input
export const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: '#F3F6F9',
    border: '1px solid',
    borderColor: '#E0E3E7',
    fontSize: 16,
    width: '100%',
    padding: '10px 12px',
    transition: theme.transitions.create(['border-color', 'background-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
    ...theme.applyStyles('dark', {
      backgroundColor: '#1A2027',
      borderColor: '#2D3843',
    }),
  },
}));

// styled menu
export const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: 'rgb(55, 65, 81)',
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
      },
    },
    ...theme.applyStyles('dark', {
      color: theme.palette.grey[300],
    }),
  },
}));
