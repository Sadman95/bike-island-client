import React, { useEffect, useState } from 'react';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Badge, Drawer, SwipeableDrawer } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCart } from '../../hooks/useCart';
import { HashLink } from 'react-router-hash-link';

export const BottomFabsActions = () => [
  {
    icon: (
      <HashLink id="topToggle" to="/home#home">
        <KeyboardArrowUpIcon color="action" />
      </HashLink>
    ),
    name: 'Toggle Top',
  },
];
