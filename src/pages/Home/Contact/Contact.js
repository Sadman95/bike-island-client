import { Container, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import EmailIcon from "@mui/icons-material/Email";
import TwitterIcon from "@mui/icons-material/Twitter";

const contactBg = {
  background: "url('https://i.ibb.co/CwNtfSZ/subscribe.jpg') center no-repeat",
  backgroundSize: "cover",
  width: '100%',
  backgroundColor: "lightCoral",
  backgroundBlendMode: "multiply",
  marginTop: "100px",
  paddingTop: '100px',
  backgroundAttachment: "fixed",
  minHeight: '400px'
};

const Contact = () => {
  return (
    <div id="contact">
      <Box sx={contactBg}>
        <Container sx={{ color: "white", textAlign: "center" }}>
          <Typography
            mb="16px"
            color="white"
            fontWeight="bold"
            textAlign="center"
            variant="h4"
            component="div"
          >
            Contact
          </Typography>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 12, sm: 12, md: 12 }}
          >
            <Grid item xs={12} sm={6} md={4}>
              <div className='w-100'>
              <ContactPhoneIcon></ContactPhoneIcon>
              <Typography variant="h6" component="div">
                +00009999
              </Typography>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
             <div className='w-100'>
             <EmailIcon></EmailIcon>
              <Typography variant="h6" component="div">
                admin@admin.com
              </Typography>
             </div>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
             <div className='w-100'>
             <TwitterIcon></TwitterIcon>
              <Typography variant="h6" component="div">
                bike.island@twitter.com
              </Typography>
             </div>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
};

export default Contact;
