import {  Container, Grid, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import EmailIcon from '@mui/icons-material/Email';
import TwitterIcon from '@mui/icons-material/Twitter';



const contactBg ={
    background: "url('https://i.ibb.co/CwNtfSZ/subscribe.jpg') center no-repeat",
    backgroundSize: 'cover',
    backgroundColor: 'lightCoral',
    backgroundBlendMode: 'multiply',
    marginTop: '100px',
    padding: '48px 0',
    backgroundAttachment: 'fixed'
}

const Contact = () => {
    
    return (
        <div id='contact'>
            <Box sx={contactBg}>
            <Container sx={{color: 'white', textAlign: 'center'}}>
                <Typography mb='16px' color='white' fontWeight='bold' textAlign='center' variant='h4' component='div'>Contact</Typography>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
    <Grid item xs={2} sm={4} md={4}>
    <Paper  elevation={0} />
             <ContactPhoneIcon></ContactPhoneIcon>
             <Typography  variant='h6' component='div'>
                 +00009999
                 </Typography>                                                                                                                                                                       
    </Grid>
    <Grid item xs={2} sm={4} md={4}>
    <Paper elevation={0} />
        <EmailIcon></EmailIcon>
        <Typography  variant='h6' component='div'>
                 admin@admin.com
                 </Typography>
    </Grid>
    <Grid item xs={2} sm={4} md={4}>
    <Paper elevation={0} />
<TwitterIcon></TwitterIcon>
<Typography  variant='h6' component='div'>
                 bike.island@twitter.com
                 </Typography>
    </Grid>
</Grid>
            </Container>
        </Box>
        </div>
    );
};

export default Contact;