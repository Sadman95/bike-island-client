import "bootstrap/dist/css/bootstrap.min.css";
import * as React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Route, Routes } from "react-router-dom";
import AddProduct from "./pages/Admin/AddProduct/AddProduct";
import AllOrders from "./pages/Dashboard/AllOrders/AllOrders";
import MakeAdmin from "./pages/Dashboard/MakeAdmin/MakeAdmin";
import ManageProducts from "./pages/Dashboard/ManageProducts/ManageProducts";
import Payment from "./pages/Dashboard/Payment/Payments";
import Review from "./pages/Dashboard/Review/Review";
import Orders from "./pages/Dashboard/UserOrders/UserOrders";
import Home from "./pages/Home/Home/Home";
import Footer from "./pages/shared/Footer/Footer";
import "./App.css";
import useAuth from "./hooks/useAuth/useAuth";
import "./index.css";
import LogIn from "./Login/Login/Login";
import Register from "./Login/Register/Register";
import AllProducts from "./pages/AllProducts/AllProducts";
import Dashboard from "./pages/Dashboard/Dashboard/Dashboard";
import NotFound from "./pages/NotFound/NotFound";
import PrivateRoute from "./pages/PrivateRoute/PrivateRoute";
import Purchase from "./pages/Purchase/Purchase/Purchase";
import Navigation from "./pages/shared/Navigation/Navigation";
import { Box } from "@mui/material";

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
      <Box className="App" sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        flex: 1,
      }}>
				{visible && <Navigation cart={cart} />}
				<Routes>
					<Route path={"/"} element={<Home />} />
					<Route path="/home" element={<Home />} />
					<Route path="/allProducts" element={<AllProducts />} />

					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<LogIn />} />

					<Route path="/dashboard" element={<Dashboard />}>
						<Route path="/dashboard/admin/makeAdmin" element={<MakeAdmin />} />
						<Route path="/dashboard/admin/allOrders" element={<AllOrders />} />
						<Route
							path="/dashboard/admin/addProduct"
							element={<AddProduct />}
						/>
						<Route
							path="/dashboard/admin/manageProducts"
							element={<ManageProducts />}
						/>
						<Route
							path={`/dashboard/${user && user.displayName}/orders`}
							element={<Orders />}
						/>
						<Route
							path={`/dashboard/${user && user.displayName}/payment`}
							element={<Payment />}
						/>
						<Route
							path={`/dashboard/${user && user.displayName}/review`}
							element={<Review />}
						/>
					</Route>

					<Route element={<PrivateRoute />}>
						<Route
							path={"/cycles/:id"}
							element={<Purchase cart={cart} setCart={setCart} />}
						/>
					</Route>

					<Route path="*" element={<NotFound />} />
				</Routes>
			</Box>
			{visible && <Footer />}
		</>
	);
}

export default App;
