import React from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from "../pages/Home";
import About from "../pages/About";
import NotFound from "../pages/NotFound";
import Blog from "../pages/Blog";
import BlogDetails from "../pages/BlogDetails";
import CarDetails from "../pages/CarDetails";
import CarListing from "../pages/CarListing";
import Contact from "../pages/Contact";
import CityDetails from "../pages/CityDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to='/home' />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/blogs" element={<Blog />} />
      <Route path="/blogs/:slug" element={<BlogDetails />} />
      <Route path="/cars" element={<CarListing />} />
      <Route path="/cars/:id" element={<CarDetails />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/cars/:startDate/:startTime/:endDate/:endTime/:location" element={<CityDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

    </Routes>
  );
};

export default Routers;
