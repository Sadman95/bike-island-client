import { Facebook, Instagram, Twitter } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

import { CreditCard, Payment } from '@mui/icons-material';
import {
  Container,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import Visa from '../../svg/Visa';

const footerSections = [
  {
    title: 'Categories',
    items: ['Mountain Bikes', 'Road Bikes', 'Electric Bikes', 'BMX'],
  },
  {
    title: 'Types',
    items: ['Adult Bikes', 'Kids Bikes', 'Accessories', 'Parts'],
  },
  {
    title: 'Policies',
    items: [
      'Privacy Policy',
      'Terms of Service',
      'Return Policy',
      'Shipping Info',
    ],
  },
];


const socialIcons = [
  { Icon: Facebook, link: 'https://facebook.com' },
  { Icon: Twitter, link: 'https://twitter.com' },
  { Icon: Instagram, link: 'https://instagram.com' },
];

const paymentIcons = [Visa, CreditCard];

const Footer = () => (
  <Box
    component="footer"
    sx={{
      backgroundColor: '#f5f5f5',
      padding: '48px 0 24px',
      position: 'relative',
      bottom: 0,
      width: '100%',
    }}
  >
    <Container maxWidth="lg">
      <Grid container spacing={4} alignItems="start">
        <Grid item xs={12} sm={4}>
          <img height={100} width={100} src="logo.jpg" alt="Logo" />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
							Your one-stop shop for all things cycling.
          </Typography>
        </Grid>
        {footerSections.map((section) => (
          <Grid item xs={12} sm={2}  key={section.title}>
            <Typography fontWeight={'bold'} variant="h6" color="text.primary" gutterBottom>
              {section.title}
            </Typography>
            <List>
              {section.items.map((item) => (
                <ListItem key={item} disablePadding>
                  <ListItemText primary={item} sx={{ color: 'text.secondary' }}/>
                </ListItem>
              ))}
            </List>
          </Grid>
        ))}
        <Grid item xs={12} sm={2}>
          <Typography variant="body1" color="text.secondary" gutterBottom>
							Follow Us
          </Typography>
          {socialIcons.map(({ Icon, link }) => (
            <IconButton
              key={link}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon />
            </IconButton>
          ))}
        </Grid>
      </Grid>
      <Divider sx={{ my: 4 }} />
      <Grid container justifyContent="space-between" alignItems="flex-start">
        <Grid item>
          <Typography variant="body2" color="text.secondary">
							© {new Date().getFullYear()} Your Company Name. All rights
							reserved.
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            We accept:
            <Box>
              {paymentIcons.map((Icon, index) => (
                <Icon key={index} sx={{ ml: 1 }} />
              ))}
            </Box>
          </Typography>
        </Grid>
      </Grid>
    </Container>
  </Box>
);

export default Footer;
