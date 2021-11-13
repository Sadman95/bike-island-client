import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth/useAuth';
import { useForm } from "react-hook-form";
import { Alert, Button, Typography } from '@mui/material';
import { Box } from '@mui/system';

const MakeAdmin = () => {
    const {user} = useAuth();
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const { register, handleSubmit, reset } = useForm();

  const onSubmit = data => {
      data.requester = user.email;
      fetch('http://localhost:5000/users', {
          method: 'PUT',
          headers: {
              'content-type': 'application/json'
          },
          body: JSON.stringify(data)
      })
      .then(res => res.json())
      .then(data => {
          if(data.modifiedCount === 1){
              setSuccess(true);
          }
          else{
              setError(true);
          }
      })
      reset()
  };

  const formBody = {
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      textAlign: 'center',
      border: '1px solid gray',
      padding: '50px 150px'
  }

    
    return (
        <Box sx={formBody}>
            {
                error && <Alert severity='error'>Error Occurred</Alert>
            }
            <Typography variant='h4' fontWeight='bold' color='darkorchid' component='div'>Add Admin</Typography>
             <form onSubmit={handleSubmit(onSubmit)}>
             <input style={{width: '100%', display: 'block', padding: '6px 12px'}} type='email' placeholder='Enter user email to make admin' {...register("adminEmail")} />
             <br />
             {
                success && <Alert severity='success'>Success! Made Admin</Alert>
            }
             <Button type='submit' variant='outlined' color='primary'>Add as admin</Button>
             </form>
        </Box>
    );
};

export default MakeAdmin;