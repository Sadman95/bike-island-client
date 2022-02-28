import React from "react";
import useAuth from "../../../hooks/useAuth/useAuth";
import About from "../About/About";
import Contact from "../Contact/Contact";
import Header from "../Header/Header";
import LoadReviews from "../LoadReviews/LoadReviews";
import Products from "../Products/Products";
import Services from "../Services/Services";
import ToggleTop from "../ToggleTop/ToggleTop";

const Home = () => {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <>
        <img
          style={{ margin: "auto", display: "table" }}
          src="https://i.ibb.co/R2tS1bh/graphloader.gif"
          alt="preloader"
        />
      </>
    );
  }

  return (
    <div id="home">
      <Header></Header>
      <Services></Services>
      <About></About>
      <Products></Products>
      <LoadReviews></LoadReviews>
      <Contact></Contact>
      <ToggleTop></ToggleTop>
    </div>
  );
};

export default Home;
