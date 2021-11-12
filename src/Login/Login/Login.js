import { Alert, Container, Grid, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth/useAuth";
import {useHistory, useLocation} from 'react-router-dom';


const LogIn = () => {
  const { logInUser, authError, user } = useAuth();
  const history = useHistory();
  const location = useLocation();
  const redirect_uri = location.state?.from || '/home';

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const { email, password } = data;
    logInUser(email, password);
    history.push(redirect_uri);
    reset();
  };

  return (
    <Container sx={{ mt: 24 }}>
      <Grid
        sx={{ display: "flex", alignItems: "center" }}
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 2, sm: 4, md: 12 }}
      >
        <Grid item xs={2} sm={4} md={6}>
          <Typography variant="h5" component="div" color="goldenrod">
            Log In
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="email">Email</label>
            <br />
            <input
              style={{ marginBottom: "16px", display: 'block', width: '80%', padding: '2px 4px' }}
              id="email"
              type="email"
              placeholder="Your Email"
              {...register("email", { required: true })}
            />
            {errors.email?.type === "required" && "Email is required"}
            <br />
            <label htmlFor="password">Password</label>
            <br />
            <input
              style={{ marginBottom: "16px", display: 'block', width: '80%' ,padding: '2px 4px' }}
              id="password"
              type="password"
              placeholder="Password"
              {...register("password", {
                required: true,
                pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
              })}
            />
            {errors.password?.type === "pattern" &&
              "Password must be more than 6 characters containing at least one letter and one number"}
            <br />
            {authError && (
              <Alert severity="error" color="error">
                {authError}
              </Alert>
            )}
            {user.email && (
              <Alert severity="success" color="info">
                Successfully logged in!!!
              </Alert>
            )}
            <input type="submit" value="Log In" />

            <Typography variant="subtitle1" component="div">
              Not Having An Account? Please <Link style={{textDecoration: 'underline'}} to="/register">Register</Link>
            </Typography>
          </form>
        </Grid>
        <Grid item xs={2} sm={4} md={6}>
          <img src="https://i.ibb.co/JCfBY5y/form.png" alt="img" />
        </Grid>
      </Grid>
    </Container>
  );
};

export default LogIn;
