import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../src/pages/Home/Home/Home';
import './App.css';
import AuthProvider from './contexts/AuthProvider/AuthProvider';
import './index.css'
import LogIn from './Login/Login/Login';
import Register from './Login/Register/Register';
import AllProducts from './pages/AllProducts/AllProducts';
import Dashboard from './pages/Dashboard/Dashboard/Dashboard';
import NotFound from './pages/NotFound/NotFound';
import PrivateRoute from './pages/PrivateRoute/PrivateRoute';
import Purchase from './pages/Purchase/Purchase/Purchase';


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
         
          <Route path='/dashboard'>
            <Dashboard></Dashboard>
          </Route>
          
          <PrivateRoute exact path='/cycles/:id'>
            <Purchase></Purchase>
          </PrivateRoute>

          <Route path='*'>
            <NotFound></NotFound>
          </Route>

        </Switch>
        
      </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
