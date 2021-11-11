import React from 'react';
import useAuth from '../../../hooks/useAuth/useAuth';
import About from '../About/About';
import Header from '../Header/Header';
import Products from '../Products/Products';
import Services from '../Services/Services';

const Home = () => {
    const {isLoading} = useAuth();

    if(isLoading){
        return <>
            <img style={{ margin: 'auto', display: 'table'}} src="https://i.ibb.co/R2tS1bh/graphloader.gif" alt="preloader" />
        </>
    }
    
    return (
        <div id='home'>
            <Header></Header>
            <Services></Services>
            <About></About>
            <Products></Products>
        </div>
    );
};

export default Home;