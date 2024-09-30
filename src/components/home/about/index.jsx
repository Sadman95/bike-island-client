import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import aboutImg from "../../../images/about/about.jpg";

const aboutStyle = {
  display: "flex",
  alignItems: "center",
  // padding: 2,
};

const About = () => {
  return (
    <div id="about">
      <Container sx={{ mt: 28 }}>
        <Grid
          paddingX={2}
          sx={aboutStyle}
          flexWrap={{ xs: "wrap", md: "nowrap" }}
          container
          spacing={{ xs: 2, md: 3 }}
          gap={2}
          columns={{ xs: 4, sm: 4, md: 12 }}
        >
          <Box>
            <Typography
              sx={{ mb: 2 }}
              fontWeight="bold"
              variant="h4"
              component="div"
            >
              Experience Smooth & Start Your Day Riding Cycles From Us.
            </Typography>
            <Typography
              textAlign={"justify"}
              color="GrayText"
              variant="p"
              component="div"
            >
              We have lots of collection of cycles. We provide 100% authentic &
              tested cycles from different brands. We are providing service like
              Ride, Share & Repair. You can buy bike from products.
            </Typography>
          </Box>
          <Box>
            <img width="100%" src={aboutImg} alt="about" />
          </Box>
        </Grid>
      </Container>
    </div>
  );
};

export default About;
