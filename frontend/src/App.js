import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/LandingHero";
import SignIn from "./pages/SignIn";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} /> {/* Added SignIn route */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
