import { Box } from "@mui/material";
import React from "react";
import { Redirect, Route } from "react-router-dom";
import useAuth from "../../hooks/useAuth/useAuth";

const PrivateRoute = ({ children, ...rest }) => {
  const { user, isLoading } = useAuth();

  const style = {
    position: "relative",
    height: "100%",
    width: "100%",
  };

  if (isLoading) {
    return (
      <Box sx={style}>
        <img
          style={{ objectFit: "cover" }}
          src="https://i.ibb.co/R2tS1bh/graphloader.gif"
          alt="preloader"
        />
      </Box>
    );
  }

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user.email ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    ></Route>
  );
};

export default PrivateRoute;
