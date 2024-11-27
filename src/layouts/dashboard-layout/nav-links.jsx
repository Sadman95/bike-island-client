import {
  AdminPanelSettings,
  Cancel,
  InterpreterMode,
  Inventory,
  PeopleAlt,
  Reviews,
  List,
} from '@mui/icons-material';

export const adminNavLinks = [
  {
    to: '/teams',
    icon: <InterpreterMode />,
    title: 'Teams',
  },
  {
    to: '/manage-orders',
    icon: <List />,
    title: 'Orders',
  },
  {
    to: '/manage-products',
    icon: <Inventory />,
    title: 'Products',
  },
  {
    to: '/customers',
    icon: <PeopleAlt />,
    title: 'Customers',
  },
  {
    to: '/role-permission',
    icon: <AdminPanelSettings />,
    title: 'Role-Permission',
  },
];

export const userNavLinks = [
  {
    to: '/orders',
    icon: <List />,
    title: 'My Orders',
  },
  {
    to: '/reviews',
    icon: <Reviews />,
    title: 'My Reviews',
  },
  {
    to: '/returned-canceled',
    icon: <Cancel />,
    title: 'My Returns & Cancellations',
  },
];
