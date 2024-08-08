// src/routes.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import DistanceLearning from "./pages/DistanceLearning";
import About from "./pages/About";
import WomensWear from "./pages/WomensWear";
import MensWear from "./pages/MensWear";
import KidsWear from "./pages/KidsWear";
import PhonesAndAccessories from "./pages/PhonesAndAccessories";
import Appliances from "./pages/Appliances";
import Banking from "./pages/Banking";
import SearchResults from "./pages/SearchResult";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/search-results" element={<SearchResults />} />
    <Route path="/blog" element={<Blog />} />
    <Route path="/distancelearning" element={<DistanceLearning />} />
    <Route path="/about" element={<About />} />
    <Route path="/fashion/womens-wear" element={<WomensWear />} />
    <Route path="/fashion/mens-wear" element={<MensWear />} />
    <Route path="/fashion/kids-wear" element={<KidsWear />} />
    <Route
      path="/electronics/phones-accessories"
      element={<PhonesAndAccessories />}
    />
    <Route path="/electronics/appliances" element={<Appliances />} />
    <Route path="/banking" element={<Banking />} />
  </Routes>
);

export default AppRoutes;
