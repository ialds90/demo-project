import React from "react";
import ReactDOM from "react-dom/client";
import { Provider} from 'react-redux';
import store from './store/store';
import "./index.css"; // Import global CSS styles
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import AppProvider from "./context/AppContext"; // Import the AppProvider for global state management

import "bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  // Wrap the app with AppProvider to provide global state
  <Provider store={store}> 
    {/* React.StrictMode helps identify potential problems in development mode */}
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);

// Run performance monitoring function (optional, can be used to track app performance)
reportWebVitals();
