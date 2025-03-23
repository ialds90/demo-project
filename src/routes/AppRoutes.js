import React from "react";
import { Routes, Route } from "react-router-dom"; // Import routing components from React Router

// Import page components
import Home from "../pages/Home";
import About from "../pages/About";
import NotFound from "../pages/NotFound";
import Users from "../pages/Users";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Define routes for the pages */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/users" element={<Users />} />

      {/* Catch-all route for undefined paths, rendering the NotFound page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
