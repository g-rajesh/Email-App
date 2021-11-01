import React, { useContext, useState } from "react";

const AppContext = React.createContext();

const initialState = {
  username: JSON.parse(localStorage.getItem('username')),
  token: JSON.parse(localStorage.getItem('token')),
  showModal: false,
};

console.log(initialState);

const AppProvider = ({ children }) => {
  const [data, setData] = useState(initialState);
  
  const showModalHandler = () => {
    setData({ ...data, showModal: !data.showModal });
  };

  const updateUserDetails = () => {
    setData({...data, username: JSON.parse(localStorage.getItem('username')), token: JSON.parse(localStorage.getItem('token')) })
  }

  return (
    <AppContext.Provider value={{ data, showModalHandler, updateUserDetails }}>
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useGlobalContext };
