import React from "react";
import Contact from "../../components/home/Contact";
import Header from "../../components/home/Header";
import Services from "../../components/home/Services";
import useAuth from "../../hooks/useAuth";
import About from "../../components/home/about";
import Reviews from "../../components/home/reviews";
import Products from "../../components/home/Products";
import ToggleTop from "../../components/home/toggle-top";

const Home = () => {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <img
          style={{ margin: "auto", display: "table" }}
          src="https://i.ibb.co/R2tS1bh/graphloader.gif"
          alt="preloader"
        />
    );
  }

  return (
    <div id="home">
      <Header></Header>
      <Services></Services>
      <About></About>
      <Products></Products>
      <Reviews></Reviews>
      <Contact></Contact>
      <ToggleTop></ToggleTop>
    </div>
  );
};

export default Home;
