import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const headerStyle = {
  background: "url('https://i.ibb.co/YyNRgm1/banner.jpg') center no-repeat",
  backgroundSize: "cover",
  width: "100%",
  minHeight: "700px",
  backgroundColor: "lightBlue",
  backgroundBlendMode: "multiply",
  position: "relative"
};

const headerContent = {
  position: "absolute",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
  textAlign: "center",
};

const Header = () => {
  return (
    <Box sx={headerStyle}>
      <Box sx={headerContent}>
        <Typography
          sx={{ mt: 8 }}
          variant="h3"
          color="white"
          fontWeight="bold"
          component="div"
        >
          Ride a Bike or Buy a Bike?
        </Typography>
      </Box>
    </Box>
  );
};

export default Header;
