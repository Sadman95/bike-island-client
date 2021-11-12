import React from 'react';
import useAuth from '../../../hooks/useAuth/useAuth';
import About from '../About/About';
import Header from '../Header/Header';
import Products from '../Products/Products';
import Services from '../Services/Services';
import Navigation from '../../shared/Navigation/Navigation'
import Footer from '../../shared/Footer/Footer';
import LoadReviews from '../LoadReviews/LoadReviews';
import Contact from '../Contact/Contact';

const Home = () => {
    const {isLoading} = useAuth();

    if(isLoading){
        return <>
            <img style={{ margin: 'auto', display: 'table'}} src="https://i.ibb.co/R2tS1bh/graphloader.gif" alt="preloader" />
        </>
    }
    
    return (
        <div id='home'>
            <Navigation></Navigation>
            <Header></Header>
            <Services></Services>
            <About></About>
            <Products></Products>
            <LoadReviews></LoadReviews>
            <Contact></Contact>
            <Footer></Footer>
        </div>
    );
};

export default Home;