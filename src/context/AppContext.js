import React, { createContext, useState } from "react";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [task, setTask] = useState([]);

  return (
    <AppContext.Provider value={{ task, setTask }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
