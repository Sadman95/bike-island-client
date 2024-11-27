import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Breadcrumbs, Container, Stack, Typography } from '@mui/material';
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

/**
 * ****
 * Breadcrumb Layout - Layout to display breadcrumb preferred page
 * @param {Node} children - React Node element
 * ****
 */
const BreadcrumbLayout = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    if (location.state && (!location.state?.from || location.state?.from === '/')) {
      location.state.from = '/home';
    }
  }, [location.state?.from]);

  const breadcrumbs = [
    <Link
      underline="hover"
      key="1"
      style={{ color: '#313131', fontWeight: 'bold' }}
      component={Typography}
    >
      {location.pathname.charAt(1).toUpperCase() + location.pathname.slice(2)}
    </Link>,
  ];

  if (location.state && location.state?.from) {
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
      {location.state && location.state.from && (
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
      )}
      {children}
    </>
  );
};

export default BreadcrumbLayout;
