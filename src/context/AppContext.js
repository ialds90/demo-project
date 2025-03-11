import React, { createContext, useState } from "react";

// Create a Context object to manage global state
export const AppContext = createContext();

const AppProvider = ({ children }) => {
  // State to store the list of tasks, initialized as an empty array
  const [tasks, setTasks] = useState([]);

  return (
    // Provide the task state and setTask function to the component tree
    <AppContext.Provider value={{ tasks, setTasks }}>
      {children} {/* Render child components inside the provider */}
    </AppContext.Provider>
  );
};

export default AppProvider; // Export the provider for use in the application
