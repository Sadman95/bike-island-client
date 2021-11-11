import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../src/pages/Home/Home/Home';
import Navigation from '../src/pages/shared/Navigation/Navigation';
import './App.css';
import AuthProvider from './contexts/AuthProvider/AuthProvider';
import './index.css'
import LogIn from './Login/Login/Login';
import Register from './Login/Register/Register';
import AddProduct from './pages/Admin/AddProduct/AddProduct';
import AllProducts from './pages/AllProducts/AllProducts';
import PrivateRoute from './pages/PrivateRoute/PrivateRoute';
import Purchase from './pages/Purchase/Purchase/Purchase';
import Footer from './pages/shared/Footer/Footer';

function App() {
  return (
    <div className='App'>
      <AuthProvider>
      <Router>
        <Navigation></Navigation>
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
          <PrivateRoute exact path='/cycles/:id'>
            <Purchase></Purchase>
          </PrivateRoute>
        </Switch>
        <Footer></Footer>
      </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
