import { Box } from "@mui/material";
import React from "react";
import { Outlet, useLocation } from "react-router";
import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth/useAuth";

const PrivateRoute = () => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

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

  if (!user.email) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <Outlet />;
};

export default PrivateRoute;
