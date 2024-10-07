import { Button, Container, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import '../../styles/form.module.css';

const Register = () => {
  const navigate = useNavigate();
  const { registerUser, authError } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const { name, email, password } = data;
    registerUser(name, email, password);
    navigate('/home');
    reset();
  };

  return (
    <Container sx={{ mt: 12 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 2, sm: 4, md: 12 }}
      >
        <Grid item xs={2} sm={4} md={6}>
          <Box className="formLeft">
            <Typography
              mb="24px"
              color="indianred"
              variant="h6"
              component="div"
            >
							Register
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor="name">Name</label>
              <br />
              <input
                style={{
                  marginBottom: '4px',
                  display: 'block',
                  width: '80%',
                  padding: '2px 4px',
                }}
                id="name"
                type="text"
                placeholder="Your Name"
                {...register('name', { minLength: 3, maxLength: 20 })}
              />

              <Typography color="red">
                {errors.name?.type === 'minLength' && "Can't be taken"}
                {errors.name?.type === 'maxLength' && "Can't be taken"}
              </Typography>

              <label htmlFor="email">Email</label>
              <br />
              <input
                style={{
                  marginBottom: '6px',
                  display: 'block',
                  width: '80%',
                  padding: '2px 4px',
                }}
                id="email"
                type="email"
                placeholder="Your Email"
                {...register('email', { required: true })}
              />
              <Typography color="red">
                {errors.email?.type === 'required' && 'Email is required'}
              </Typography>

              <label htmlFor="password">Password</label>
              <br />
              <input
                style={{
                  marginBottom: '6px',
                  display: 'block',
                  width: '80%',
                  padding: '2px 4px',
                }}
                id="password"
                type="password"
                placeholder="Password"
                {...register('password', {
                  required: true,
                  pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
                })}
              />
              <br />
              <Typography color="red">
                {authError}
                {errors.password?.type === 'pattern' &&
									'Password must be more than 6 characters containing at least one letter and one number'}
              </Typography>
              <br />

              <Button
                sx={{ marginBottom: '12px' }}
                type="submit"
                variant="contained"
                color="secondary"
              >
								Sign Up
              </Button>
              <Typography
                color="lightsalmon"
                variant="subtitle1"
                component="div"
              >
								Already Having An Account? Please{' '}
                <Link style={{ textDecoration: 'underline' }} to="/login">
									Log In
                </Link>
              </Typography>
            </form>
          </Box>
        </Grid>
        <Grid item xs={2} sm={4} md={6}>
          <img src="https://i.ibb.co/JCfBY5y/form.png" alt="img" />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Register;
