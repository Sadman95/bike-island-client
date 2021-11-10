import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../src/pages/Home/Home/Home';
import Navigation from '../src/pages/shared/Navigation/Navigation';
import './App.css';
import './index.css'

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
        </Switch>
      </Router>
    </div>
  );
}

export default App;
