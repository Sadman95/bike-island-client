import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../src/pages/Home/Home/Home';
import Navigation from '../src/pages/shared/Navigation/Navigation';
import './App.css';
import './index.css'
import AddProduct from './pages/Admin/AddProduct/AddProduct';
import AllProducts from './pages/AllProducts/AllProducts';

function App() {
  return (
    <div className='App'>
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
          <Route exact path='/addProduct'>
            <AddProduct></AddProduct>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
