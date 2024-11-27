import { BottomFabsActions } from 'components/constants';
import BottomFabs from 'components/fabs/bottom-fabs';
import About from 'components/home/about';
import Brands from 'components/home/brands';
import Contact from 'components/home/contact';
import Featured from 'components/home/featured';
import Header from 'components/home/header';
import Offers from 'components/home/offers';
import Products from 'components/home/products';
import Services from 'components/home/services';
import ToggleTop from 'components/home/toggle-top';

/**
 * =========
 * Home Page
 * =========
 */
const Home = () => (
  <div id="home">
    <Header />
    <Services />
    <About />
    <Products />
    <Offers />
    <Featured />
    <Brands />
    <Contact />
    <ToggleTop />
    <BottomFabs orientation="vertical" actions={BottomFabsActions()} />
  </div>
);

export default Home;
