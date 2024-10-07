import React from 'react';
import Header from '../../components/home/header';
import Services from '../../components/home/services';
import useAuth from '../../hooks/useAuth';
import About from '../../components/home/about';
import Products from '../../components/home/products';
import Offers from '../../components/home/offers';
import ToggleTop from '../../components/home/toggle-top';
import Contact from '../../components/home/contact';
import BottomFabs from '../../components/fabs/bottom-fabs';
import { BottomFabsActions } from '../../components/constants';
import Featured from '../../components/home/featured';
import Brands from '../../components/home/brands';
import Footer from '../../components/shared/footer';


const Home = () => {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <img
        style={{ margin: 'auto', display: 'table' }}
        src="https://i.ibb.co/R2tS1bh/graphloader.gif"
        alt="preloader"
      />
    );
  }

  return (
    <div id="home">
      <Header />
      <Services />
      <About />
      <Products />
      <Offers />
      <Featured />
      <Brands />
		  {/* <Reviews /> */}
      <Contact />
		  <Footer />
      <ToggleTop />
      <BottomFabs orientation="vertical" actions={BottomFabsActions()} />
    </div>
  );
};

export default Home;
