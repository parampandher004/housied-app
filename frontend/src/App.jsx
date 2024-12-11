import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import AuthenticationPage from "./pages/AuthenticationPage/AuthenticationPage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import ListingPage from "./pages/ListingPage/ListingPage";
import Layout from "./pages/Layout/Layout";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<AuthenticationPage />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="/l" element={<Layout />} />
      </Routes>
    </Router>
  );
};

export default App;
