import React, { useContext } from "react";

const AppContext = React.createContext();

const data = {
  user: null,
};

const AppProvider = ({ children }) => {
  return (
    <AppContext.Provider
      value={{
        data,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useGlobalContext };
