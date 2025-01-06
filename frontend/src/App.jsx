import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useGlobalState } from "./hooks/useGlobalState";
import HomePage from "./pages/HomePage/HomePage";
import AuthenticationPage from "./pages/AuthenticationPage/AuthenticationPage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import ListingPage from "./pages/ListingPage/ListingPage";
import AdminListingPage from "./pages/AdminListingPage/AdminListingPage";
import OwnerListingPage from "./pages/OwnerListingPage/OwnerListingPage";
import Layout from "./pages/Layout/Layout";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import UsersListingPage from "./pages/UsersListingPage/UsersListingPage";

const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000"; // Set the base URL

const App = () => {
  const { state } = useGlobalState();
  const { auth } = state;
  const { userDetails } = auth;
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<AuthenticationPage />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="/layout" element={<Layout />}>
          <Route path="listing" element={<ListingPage />} />
          <Route path="admin-listing" element={<AdminListingPage />} />
          <Route path="owner-listing" element={<OwnerListingPage />} /> {/* Ensure this line is present */}
          <Route path="profile" element={<ProfilePage />} />
          <Route path="users" element={<UsersListingPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
