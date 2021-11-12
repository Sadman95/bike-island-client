import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../src/pages/Home/Home/Home';
import './App.css';
import AuthProvider from './contexts/AuthProvider/AuthProvider';
import './index.css'
import LogIn from './Login/Login/Login';
import Register from './Login/Register/Register';
import AddProduct from './pages/Admin/AddProduct/AddProduct';
import AllProducts from './pages/AllProducts/AllProducts';
import Dashboard from './pages/Dashboard/Dashboard/Dashboard';
import PrivateRoute from './pages/PrivateRoute/PrivateRoute';
import Purchase from './pages/Purchase/Purchase/Purchase';
import Payment from '././pages/Dashboard/Payment/Payments'
import Review from './pages/Dashboard/Review/Review';
import MakeAdmin from './pages/Dashboard/MakeAdmin/MakeAdmin';

function App() {
  return (
    <div className='App'>
      <AuthProvider>
      <Router>
        
        <Switch>
          <Route exact path='/'>
            <Home></Home>
          </Route>
          <Route exact path='/home'>
            <Home></Home>
          </Route>
          <Route exact path='/allProducts'>
            <AllProducts></AllProducts>
          </Route>
          <Route exact path='/register'>
            <Register></Register>
          </Route>
          <Route exact path='/login'>
            <LogIn></LogIn>
          </Route>
          <Route exact path='/addProduct'>
            <AddProduct></AddProduct>
          </Route>
          <Route exact path='/dashboard'>
            <Dashboard></Dashboard>
          </Route>
          <Route exact path='/payment'>
            <Payment></Payment>
          </Route>
          <Route exact path='/review'>
            <Review></Review>
          </Route>
          <Route exact path='/makeAdmin'>
            <MakeAdmin></MakeAdmin>
          </Route>
          
          <PrivateRoute exact path='/cycles/:id'>
            <Purchase></Purchase>
          </PrivateRoute>
        </Switch>
        
      </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
