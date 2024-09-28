import { Alert, Button, Container, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth/useAuth";
import "./Form.css";

const LogIn = () => {
  const { logInUser, authError, user, admin } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const redirect_uri = location.state?.from || "/login";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const { email, password } = data;
    logInUser(email, password);
    navigate(redirect_uri);
    reset();
    console.log(admin);
  };

  return (
    <>
      {/* {
      user.email && <Navigation ></Navigation>
    } */}

      <Container sx={{ mt: 12 }}>
        <Grid
          sx={{ display: "flex", alignItems: "center", backgroundColor: "" }}
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 2, sm: 4, md: 12 }}
        >
          <Grid item xs={2} sm={4} md={6}>
            <Box className="formLeft">
              <Typography
                mb="24px"
                variant="h5"
                component="div"
                color="goldenrod"
              >
                Log In
              </Typography>
              <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="email">Email</label>
                <br />
                <input
                  style={{
                    marginBottom: "8px",
                    display: "block",
                    width: "80%",
                    padding: "2px 4px",
                  }}
                  id="email"
                  type="email"
                  placeholder="Your Email"
                  {...register("email", { required: true })}
                />
                {errors.email?.type === "required" && "Email is required"}

                <label htmlFor="password">Password</label>
                <br />
                <input
                  style={{
                    marginBottom: "16px",
                    display: "block",
                    width: "80%",
                    padding: "2px 4px",
                  }}
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
                <br />
                <Button type="submit" variant="contained" color="primary">
                  Log In
                </Button>

                <Typography
                  mt="8px"
                  variant="subtitle1"
                  color="lightsalmon"
                  component="div"
                >
                  Not Having An Account? Please{" "}
                  <Link style={{ textDecoration: "underline" }} to="/register">
                    Register
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
    </>
  );
};

export default LogIn;
