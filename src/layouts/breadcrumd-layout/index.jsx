import { Breadcrumbs, Container, Stack } from '@mui/material';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';


const BreadcrumbLayout = ({ children }) => {
  const location = useLocation();

  const breadcrumbs = [
    <Link
      underline="hover"
      key="1"
      style={{ color: '#313131', fontWeight: 'bold' }}
      component={Link}
    >
      {location.pathname.charAt(1).toUpperCase() + location.pathname.slice(2)}
    </Link>,
  ];

  if (location.state?.from) {
    breadcrumbs.unshift(
      <Link
        underline="hover"
        key="2"
        style={{ color: '#787878', fontWeight: 'bold' }}
        component={Link}
        to={location.state.from}
      >
        {location.state.from.charAt(1).toUpperCase() + location.state.from.slice(2)}
      </Link>,
    );
  }

  return (
    <>
      <Container
        maxWidth="xl"
        sx={{
          position: 'sticky',
          top: document.getElementById('app-bar')?.clientHeight,
          zIndex: 1000,
          backgroundColor: (theme) => theme.palette.background.paper,
          transition: 'background-color 0.3s ease',
        }}
      >
        <Stack spacing={2} py={4}>
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
            {breadcrumbs}
          </Breadcrumbs>
        </Stack>
      </Container>
      {children}
    </>
  );
};

export default BreadcrumbLayout;
