import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // Import global CSS styles
import App from "./App"; 
import reportWebVitals from "./reportWebVitals";
import AppProvider from "./context/AppContext"; // Import the AppProvider for global state management

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  // Wrap the app with AppProvider to provide global state
  <AppProvider>
    {/* React.StrictMode helps identify potential problems in development mode */}
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </AppProvider>
);

// Run performance monitoring function (optional, can be used to track app performance)
reportWebVitals();
