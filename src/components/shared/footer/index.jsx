import { Instagram } from "@mui/icons-material";
import { Twitter } from "@mui/icons-material";
import { Facebook } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";


const footerStyle ={
  backgroundColor: 'lightGrey',
  textAlign: "center",
  padding: '48px 0',
  position: 'fixed',
  bottom: 0,
  width: '100vw'
}

const Footer = () => {

  const toggleFooter = () => {
		if (window.scrollY >= 80) {
			console.log(window.scrollY);
		}
	};

	useEffect(() => {
		window.addEventListener("scroll", toggleFooter);

		return () => {
			window.removeEventListener("scroll", toggleFooter);
		};
	}, []);

  return (
    <Box sx={footerStyle}>
      <Typography
      sx={{ mt: 16 }}
      color="GrayText"
      
      variant="subtitle2"
      component="div"
    >
      Copyright {new Date().getFullYear()} All Rights Reserved
    </Typography>
    <Typography>
      <Facebook/>
      <Twitter/>
      <Instagram/>
    </Typography>
    </Box>
  );
};

export default Footer;
