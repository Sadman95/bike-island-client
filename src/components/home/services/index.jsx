import { Container, Grid } from "@mui/material";
import { Box } from "@mui/system";
import AOS from "aos";
import "aos/dist/aos.css";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../../../backend/api";
import Service from "../service";

const Services = () => {
  const [services, setServices] = useState([]);

  //aos init:

  useEffect(() => {
    AOS.init({
      duration: 2000,
    });
    AOS.refresh();
  }, []);

  useEffect(() => {
    fetch(`${baseUrl}/services`)
      .then((res) => res.json())
      .then((data) => setServices(data));
    
    return () => setServices([])
  }, []);
  return (
    <div id="services" data-aos="fade-down">
      <Container sx={{ mt: -18 }}>
        <Box>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {services.map((service) => (
              <Service key={service._id} service={service}></Service>
            ))}
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

export default Services;
