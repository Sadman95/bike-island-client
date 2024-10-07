import React from 'react';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
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
