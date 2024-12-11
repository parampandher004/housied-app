import React from "react";
import { Home } from "../../components/HomePage/Home/Home";
import About from "../../components/HomePage/About/About";
import Offers from "../../components/HomePage/Offers/Offers";
import Team from "../../components/HomePage/Team/Team";
import FAQ from "../../components/HomePage/FAQ/FAQ";
import Header from "../../components/HomePage/Header/Header";
import Footer from "../../components/HomePage/Footer/Footer";

const HomePage = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <Header scrollToSection={scrollToSection} />
      <main className="w-full h-full mt-20 p-4 bg-white dark:bg-black">
        <Home />
        <About />
        <Offers />
        <Team />
        <FAQ />
      </main>

      <Footer />
    </>
  );
};

export default HomePage;
