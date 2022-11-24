import React from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from "../hooks/useAuthContext";
import Home from "../pages/Home";
import About from "../pages/About";
import NotFound from "../pages/NotFound";
import Blog from "../pages/Blog";
import BlogDetails from "../pages/BlogDetails";
import CarDetails from "../pages/CarDetails";
import CarListing from "../pages/CarListing";
import CarListingDetails from "../pages/CarListingDetails";
import Contact from "../pages/Contact";
import CityDetails from "../pages/CityDetails";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Profile from "../pages/Profile";
import Cancel from "../pages/Cancel";
import Success from "../pages/Success";

const Routers = () => {
  const { user } = useAuthContext();

  return (
    <Routes>
      <Route path="/" element={<Navigate to='/home' />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/blogs" element={<Blog />} />
      <Route path="/blogs/:slug" element={<BlogDetails />} />
      <Route path="/cars" element={<CarListing />} />
      <Route path="/cars/:id" element={<CarDetails />} />
      <Route path="/cars/monthly/:id/:page/:city/:min/:max/:availability/:fuel/:trans/:brand/:segment/:sort" element={<CarListingDetails />} />
      <Route path="/cars/:startDate/:startTime/:endDate/:endTime/:location" element={<CityDetails />} />

      <Route path="/login" exact element={!user ? <Login /> : <Navigate to="/home" />} />
      <Route path="/signup" exact element={!user ? <Signup /> : <Navigate to="/home" />} />
      <Route path="/profile" exact element={user ? <Profile />: <Navigate to="/home" />} />

      <Route path="/cancel" element={<Cancel />} />
      <Route path="/success" element={<Success />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Routers;
