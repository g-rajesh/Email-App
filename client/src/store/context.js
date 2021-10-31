import React, { useContext, useState } from "react";

const AppContext = React.createContext();

const initialState = {
  user: null,
  showModal: false,
};

const AppProvider = ({ children }) => {
  const [data, setData] = useState(initialState);
  const showModalHandler = () => {
    console.log("Called");
    // setData((previousState) => {
    //   return {
    //     ...previousState,
    //     showModal: !previousState.showModal,
    //   };
    // });
    setData({ ...data, showModal: !data.showModal });
  };

  return (
    <AppContext.Provider value={{ data, showModalHandler }}>
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useGlobalContext };
