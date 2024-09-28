import { Grid, Paper, Typography } from "@mui/material";
import React from "react";

const Service = ({ service }) => {
  const { serviceTitle, serviceImg, serviceDesc, servicePrice } = service;

  const paperBg = {
    backgroundImage: `url(${serviceImg})`,
    backgroundPosition: "bottomCenter",
    backgroundSize: "cover",
    backgroundColor: "lightSteelBlue",
    backgroundBlendMode: "multiply",
    color: "white",
    textAlign: "center",
    padding: "8px 12px",
  };

  return (
    <Grid item xs={4} sm={4} md={4}>
      <Paper sx={paperBg}>
        <Typography fontWeight="medium" variant="h4" component="div">
          {serviceTitle}
        </Typography>
        <Typography variant="p" component="div">
          {serviceDesc}
        </Typography>
        <Typography fontWeight="bold" variant="h5" component="div">
          Price ${servicePrice}
        </Typography>
      </Paper>
    </Grid>
  );
};

export default Service;
