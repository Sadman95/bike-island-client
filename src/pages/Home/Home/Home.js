import React from 'react';
import About from '../About/About';
import Header from '../Header/Header';
import Services from '../Services/Services';

const Home = () => {
    
    return (
        <div id='home'>
            <Header></Header>
            <Services></Services>
            <About></About>
        </div>
    );
};

export default Home;