import { Box } from "@mui/material";
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const AdminRoute = () => {
	const { user, isLoading, admin } = useAuth();
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

	if (!user.email || !admin) {
		return <Navigate to="/login" state={{ from: location.pathname }} replace />;
	}

	return <Outlet />;
};

export default AdminRoute;
