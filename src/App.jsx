import { Payment } from "@mui/icons-material";
import { Box } from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";
import * as React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import useAuth from "./hooks/useAuth";
import "./index.css";
import AdminRoute from "./pages/admin-route";
import AddProduct from "./pages/admin/add-product";
import MakeAdmin from "./pages/admin/make-admin";
import ManageProducts from "./pages/admin/manage-products";
import Dashboard from "./pages/dashboard/home";
import Review from "./pages/dashboard/review";
import UserOrders from "./pages/dashboard/user-orders";
import Home from "./pages/home";
import NotFound from "./pages/not-found/NotFound";
import PrivateRoute from "./pages/private-route";
import Products from "./pages/products";
import Purchase from "./pages/purchase";
import Footer from "./components/shared/footer";
import Navigation from "./components/shared/navigation";
import LogIn from "./pages/login";
import Register from "./pages/register";

const App = () => {
	const [cart, setCart] = useState([]);
	const [visible, setVisible] = useState(true);
	const { user } = useAuth();
	const location = useLocation();
	// console.log(location);

	useEffect(() => {
		if (location.pathname.includes("/dashboard")) {
			setVisible(false);
		}
		return () => setVisible(true);
	}, [location.pathname]);

	return (
		<>
			<Box
				className="App"
				sx={{
					display: "flex",
					flexDirection: "column",
					height: "100vh",
					flex: 1,
				}}
			>
				{visible && <Navigation cart={cart} />}
				<Routes>
					<Route path={"/"} element={<Home />} />
					<Route path="/home" element={<Home />} />
					<Route path="/products" element={<Products />} />

					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<LogIn />} />

					<Route element={<PrivateRoute />}>
						<Route path="/dashboard" element={<Dashboard />}>
							<Route
								path={`/dashboard/${user.displayName}`}
								element={<h1>Welcome! {user.displayName}</h1>}
							/>
							<Route
								path={`/dashboard/${user.displayName}/orders`}
								element={<UserOrders />}
							/>
							<Route
								path={`/dashboard/${user.displayName}/payment`}
								element={<Payment />}
							/>
							<Route
								path={`/dashboard/${user.displayName}/review`}
								element={<Review />}
							/>
						</Route>
						<Route
							path={"/products/:id"}
							element={<Purchase cart={cart} setCart={setCart} />}
						/>
					</Route>

					<Route element={<AdminRoute />}>
						<Route path="/admin/add-product" element={<AddProduct />} />
						<Route path="/admin/make-admin" element={<MakeAdmin />} />
						<Route path="/admin/manage-products" element={<ManageProducts />} />
					</Route>

					<Route path="*" element={<NotFound />} />
				</Routes>
			</Box>
			{visible && <Footer />}
		</>
	);
};

export default App;
