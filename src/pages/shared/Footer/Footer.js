import { Facebook, Instagram } from "@mui/icons-material";
import Twitter from "@mui/icons-material/Twitter";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";


const footerStyle ={
  backgroundColor: 'lightGrey',
  textAlign: "center",
  padding: '48px 0'
}

const Footer = () => {
  return (
    <Box sx={footerStyle}>
      <Typography
      sx={{ mt: 16 }}
      color="GrayText"
      
      variant="subtitle2"
      component="div"
    >
      Copyright 2022 All Rights Reserved
    </Typography>
    <Typography>
      <Facebook></Facebook>
      <Twitter></Twitter>
      <Instagram></Instagram>
    </Typography>
    </Box>
  );
};

export default Footer;
