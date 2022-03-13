import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Route, Routes } from "react-router-dom";
import AddProduct from "../src/pages/Admin/AddProduct/AddProduct";
import AllOrders from "../src/pages/Dashboard/AllOrders/AllOrders";
import MakeAdmin from "../src/pages/Dashboard/MakeAdmin/MakeAdmin";
import ManageProducts from "../src/pages/Dashboard/ManageProducts/ManageProducts";
import Payment from "../src/pages/Dashboard/Payment/Payments";
import Review from "../src/pages/Dashboard/Review/Review";
import Orders from "../src/pages/Dashboard/UserOrders/UserOrders";
import Home from "../src/pages/Home/Home/Home";
import Footer from "../src/pages/shared/Footer/Footer";
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

function App() {
  const [cart, setCart] = useState([]);
  const [visible, setVisible] = useState(true);
  const { user } = useAuth();
  const location = useLocation();
  // console.log(location);

  useEffect(() => {
    if (location.pathname === "/" || "/home" || "/allProducts") {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location.pathname]);

  return (
    <div className="App">
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
          <Route path="/dashboard/admin/addProduct" element={<AddProduct />} />
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
      {visible && <Footer />}
    </div>
  );
}

export default App;
