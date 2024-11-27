import { Box } from '@mui/material';
import Footer from 'components/shared/footer';
import Navigation from 'components/shared/navigation';
import { Outlet } from 'react-router-dom';

/**
 * ===========================================================
 * ClientLayout - a coomon layout for every visitor in the app
 * @param {Node} [children = null] - JSX children
 * ===========================================================
*/
const ClientLayout = ({ children = null }) => (
  <>
    <Navigation />
    <Box
      sx={{
        height: '100vh',
      }}
    >
      {children}
      <Outlet />
      <Footer />
    </Box>
  </>
);

export default ClientLayout;
