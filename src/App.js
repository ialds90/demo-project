import React from "react"; 
import { BrowserRouter as Router, Link } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes"; // Import the route definitions

const App = () => {
  return (
    // Wrap the entire application with Router to enable routing
    <Router>
      {/* Navigation menu with links to different pages */}
      <nav>
        <Link to="/">Home</Link> | <Link to="/about">About</Link>
      </nav>
      
      {/* Render the route definitions from AppRoutes */}
      <AppRoutes />
    </Router>
  );
};

export default App; // Export the App component for use in the application
