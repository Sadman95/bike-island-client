import { Box, Container, Grid, Typography } from '@mui/material';
import React from 'react';
import aboutImg from 'assets/images/about/about.jpg';
import { styled } from '@mui/material/styles';
import { bounce, moveAround, rotate, StyledTypography } from '../../styled';


const aboutStyle = {
  display: 'flex',
  alignItems: 'center',
  // padding: 2,
};

const CycleContainer = styled(Container)(({ theme }) => ({
  position: 'relative',
  border: `2px dashed ${theme.palette.grey[500]}`,
  overflow: 'visible',
  height: 'auto',
  minHeight: '200px',
  padding: '48px',
  boxSizing: 'border-box',
  marginTop: theme.breakpoints.down('md') ? theme.spacing(16) : theme.spacing(28),
}));

const Cycle = styled('div')({
  position: 'absolute',
  width: '50px',
  height: '50px',
  animation: `
    ${moveAround} 12s linear infinite,
    ${bounce} 0.3s ease-in-out infinite,
    ${rotate} 12s linear infinite
  `,
  zIndex: 1000,
  transformOrigin: 'center center',
});

const ContentWrapper = styled('div')({
  position: 'relative',
  zIndex: 1,
  maxWidth: '100%',
  overflow: 'hidden',
  padding: '20px',
});

/**
 * ===============================
 * Animated cycle in about section
 * @param {Node} children 
 */
const AnimatedCycle = ({ children }) => (
  <CycleContainer maxWidth="lg">
    <Cycle>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        fill="none"
        viewBox="0 0 400 400"
      >
        <path
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity={0.9}
          strokeWidth={16}
          d="M249.664 249.389c36.824-40.452 109.658 3.841 77.5 55.394-36.005 57.724-94.893 24.922-83.698-36.754M65.024 266.147c0-4.093 9.51-22.305 28.733-30.717 37.146-16.256 81.291 21.002 63.757 62.549C132.03 358.365 68.538 339.106 64 279.191"
        />
        <path
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity={0.9}
          strokeWidth={16}
          d="M235.31 206.358c-16.483 4.185-52.302-8.873-66.289 1.542-13.363 9.956-22.484 37.814-33.14 51.416-1.777 2.268-23.87 23.508-23.305 25.193.427 1.274 49.995-1.025 52.823-1.025 2.769 0 23.812 2.063 26.411-.517 12.663-12.572 72.51-114.12 88.036-86.378"
        />
        <path
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity={0.9}
          strokeWidth={16}
          d="M242.073 217.442c13.551 22.956 21.839 54.08 41.82 71.499M192.824 276.61c7.859 28.199-54.66 12.198-55.781 8.624-1.842-5.877 9.802-6.863 15.217-9.161 9.428-4.009 28.596-1 33.971 1.079M142.244 174.272c28.822 29.547 34.037 61.762 26.689 97.131M142.244 174.272c15.119-15.198 34.89-34.021 48.566-41.82M195.247 137.848c3.371 14.148.716 29.129 3.27 43.169M200.253 182.547c19.133-2.065 33.93 14.156 51.263 17.357M206.655 97.64c2.004-7.562 7.362-14.321 13.123-19.54 5.848-5.293 19.251-5.471 26.748-4.625 47.692 5.401-26.551 112.157-40.877 31.874"
        />
        <path
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity={0.9}
          strokeWidth={16}
          d="M248.733 98.726c-7.43-3.017-15.803-3.447-23.825-4.504-97.943-12.894 14.653-54.903 34.703-6.499"
        />
      </svg>
    </Cycle>
    <ContentWrapper>{children}</ContentWrapper>
  </CycleContainer>
);

/**
 * =============
 * About Section
 * =============
 */
const About = () => (
  <Box id="about" sx={{ overflow: 'hidden' }}>
    <AnimatedCycle>
      <Grid
        paddingX={2}
        sx={aboutStyle}
        flexWrap={{ xs: 'wrap', md: 'nowrap' }}
        container
        spacing={{ xs: 2, md: 3 }}
        gap={2}
        columns={{ xs: 4, sm: 4, md: 12 }}
      >
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
          <StyledTypography
            sx={{ mb: 2 }}
            fontWeight="bold"
            variant="h3"
            component="div"
          >
								Experience Smooth & Start Your Day Riding Cycles From Us.
          </StyledTypography>
          <Typography
            textAlign={'justify'}
            color="GrayText"
            variant="p"
            component="div"
          >
								We have lots of collection of cycles. We provide 100% authentic
								& tested cycles from different brands. We are providing service
								like Ride, Share & Repair. You can buy bike from products.
          </Typography>
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center">
          <img style={{ borderRadius: '10px' }} width="100%" src={aboutImg} alt="about" />
        </Box>
      </Grid>
    </AnimatedCycle>
  </Box>
);

export default About;
