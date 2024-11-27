import { Container, Grid } from '@mui/material';
import { Box } from '@mui/system';
import 'aos/dist/aos.css';
import { useServices } from 'api/hooks';
import ServiceSkeleton from 'components/skeletons/service-skeleton';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Service from '../service';

/**
 * ========
 * Services
 * ========
 */
const Services = () => {
  const [services, setServices] = useState(null);
  const { data, isPending, isError, error, isSuccess } = useServices();

  useEffect(() => {
    if (isSuccess) {
      setServices(data.data.data);
    }
    if (isError) {
      toast.error(error.message);
    }
  }, [isSuccess, isError]);

  return (
    <Box
      id="services"
      sx={{
        position: 'relative',
        zIndex: 999,
      }}
    >
      <Container sx={{ mt: -18 }}>
        <Box>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {services &&
              services.map((service, i) =>
                isPending ? (
                  <ServiceSkeleton key={i} />
                ) : (
                  <Service key={service._id} service={service}></Service>
                ),
              )}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Services;
