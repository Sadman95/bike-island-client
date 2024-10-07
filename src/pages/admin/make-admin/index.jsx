import { Alert, Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { baseUrl } from '../../../backend/api';
import useAuth from '../../../hooks/useAuth';

const MakeAdmin = () => {
  const { user } = useAuth();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    data.requester = user.email;
    fetch(`${baseUrl}/users`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount === 1) {
          setSuccess(true);
        } else {
          setError(true);
        }
      });
    reset();
  };

  const formBody = {
    textAlign: 'center',
    padding: '50px',
    borderRadius: '24px',
    backgroundColor: 'lavender',
  };

  return (
    <Box sx={formBody}>
      {error && <Alert severity="error">Error Occurred</Alert>}
      <Typography
        variant="h4"
        fontWeight="bold"
        color="darkorchid"
        component="div"
      >
				Add Admin
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          style={{ width: '100%', display: 'block', padding: '6px 12px' }}
          type="email"
          placeholder="Enter user email to make admin"
          {...register('adminEmail')}
        />
        <br />
        {success && <Alert severity="success">Success! Made Admin</Alert>}
        <Button type="submit" variant="outlined" color="primary">
					Add as admin
        </Button>
      </form>
    </Box>
  );
};

export default MakeAdmin;
